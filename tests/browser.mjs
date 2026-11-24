// Optional browser QA: install Playwright in a development environment, or set PLAYWRIGHT_MODULE.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:8080";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const data = JSON.parse(
  await readFile("data/processed/products_clean.json", "utf8"),
);
const errors = [],
  httpErrors = [],
  checks = [];
await mkdir("test-results", { recursive: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400 && r.url().startsWith(base))
    httpErrors.push(`${r.status()} ${r.url()}`);
});
async function go(path, selector) {
  await page.goto(`${base}/${path}`, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.documentElement.dataset.uiReady === "true",
  );
  if (selector) await page.locator(selector).first().waitFor();
}
async function settleImages() {
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images]
        .filter((im) => im.loading !== "lazy")
        .map((im) => im.decode().catch(() => {})),
    );
  });
}
async function screenshot(name, fullPage = false) {
  await settleImages();
  await page.screenshot({ path: `test-results/${name}.png`, fullPage });
}
async function noOverflow(label) {
  const over = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: innerWidth,
  }));
  assert.ok(
    over.document <= over.viewport + 1,
    `${label}: overflow ${JSON.stringify(over)}`,
  );
}
async function scrollAll() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 55));
    }
    scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(650);
}
try {
  await go("catalogue.html", "#products-grid");
  assert.equal(await page.locator(".product-card").count(), 12);
  assert.match(await page.locator("#results-count").textContent(), /34/);
  await page.locator("#load-more").click();
  assert.equal(await page.locator(".product-card").count(), 24);
  await page.locator("#load-more").click();
  assert.equal(await page.locator(".product-card").count(), 34);
  assert.ok(await page.locator("#load-more").isHidden());
  checks.push("Catalog loads all 34 products in batches");
  await page
    .locator('input[data-facet="category"][value="laine-de-roche"]')
    .check();
  assert.equal(await page.locator(".product-card").count(), 9);
  await page.locator('input[data-facet="brand"][value="Rockwool"]').check();
  assert.equal(await page.locator(".product-card").count(), 5);
  await page.locator("#catalog-sort").selectOption("za");
  const titles = await page.locator(".product-card h3").allTextContents();
  assert.deepEqual(
    titles,
    [...titles].sort((a, b) => b.localeCompare(a, "fr", { numeric: true })),
  );
  const persisted = page.url();
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.documentElement.dataset.uiReady === "true",
  );
  assert.equal(await page.locator(".product-card").count(), 5);
  assert.equal(page.url(), persisted);
  await page.locator('[data-remove="brand"]').click();
  assert.equal(await page.locator(".product-card").count(), 9);
  await page.locator(".filter-top .reset-filters").click();
  assert.equal(await page.locator(".product-card").count(), 12);
  checks.push(
    "Category + brand filters, sorting, removable chips and URL persistence",
  );
  await page.locator("#catalog-search").fill("ROCKFACADE");
  await page.waitForTimeout(300);
  assert.equal(await page.locator(".product-card").count(), 1);
  assert.match(
    await page.locator(".product-card h3").textContent(),
    /Rockfaçade/,
  );
  await page.locator("#catalog-search").fill("zzzz-no-results");
  await page.waitForTimeout(300);
  assert.ok(await page.locator(".empty-state").isVisible());
  await page.locator(".empty-state .reset-filters").click();
  assert.equal(await page.locator(".product-card").count(), 12);
  checks.push("Accent-insensitive live search, empty state and reset");
  await page.locator('details[data-facet="material"] summary').click();
  await page
    .locator('input[data-facet="material"][value="Acier galvanisé"]')
    .check();
  assert.equal(await page.locator(".product-card").count(), 2);
  await page.locator(".filter-top .reset-filters").click();
  await screenshot("catalog-desktop");
  const firstProductLink = await page
    .locator(".product-card h3 a")
    .first()
    .getAttribute("href");
  await page.locator(".product-card h3 a").first().click();
  await page.locator(".product-detail").waitFor();
  assert.ok(page.url().endsWith(firstProductLink));
  checks.push("Explicit material facet and product-card navigation");
  for (const p of data.products) {
    await go(`produit.html?id=${p.product_id}`, ".product-detail");
    assert.equal(await page.locator("h1").textContent(), p.product_name);
    assert.equal(
      await page.locator(".spec-table tr").count(),
      Object.keys(p.specifications).length,
    );
    assert.equal(
      await page.locator(".document-list a").count(),
      p.technical_documents.length,
    );
    const href = await page
      .locator(".quote-box a")
      .first()
      .getAttribute("href");
    const url = new URL(href);
    assert.equal(url.hostname, "wa.me");
    assert.ok(url.searchParams.get("text").includes(p.product_name));
    const mail = await page.locator(".quote-box a").nth(1).getAttribute("href");
    assert.ok(decodeURIComponent(mail).includes(p.product_name));
    for (const d of p.technical_documents) {
      const res = await page.request.head(`${base}/${encodeURI(d.path)}`);
      assert.equal(res.status(), 200, d.path);
    }
  }
  checks.push(
    "All 34 details pages, specifications, documentation files, WhatsApp and email messages",
  );
  await go("produit.html?id=rockwool-rockfacade", ".product-detail");
  await screenshot("product-desktop");
  await page.locator(".main-product-image").click();
  assert.ok(await page.locator("dialog").isVisible());
  await page.keyboard.press("Escape");
  assert.ok(await page.locator("dialog").isHidden());
  await go("produit.html?id=missing-product", ".empty-page");
  assert.match(await page.locator("h1").textContent(), /introuvable/);
  checks.push("Image zoom, Escape close and missing-product handling");
  await go("index.html", ".home-hero");
  await scrollAll();
  await screenshot("home-desktop", true);
  assert.equal(await page.locator(".category-card").count(), 6);
  assert.equal(await page.locator(".sector-tile").count(), 6);
  const form = page.locator("#contact-form");
  let submissions = 0;
  await page.route("https://api.sheetmonkey.io/**", async (route) => {
    submissions++;
    assert.match(route.request().postData(), /Projet de test acoustique/);
    await route.fulfill({
      status: 200,
      body: "OK",
      headers: { "access-control-allow-origin": "*" },
    });
  });
  await form.locator('button[type="submit"]').click();
  assert.equal(submissions, 0);
  await form.locator('[name="name"]').fill("Client Test");
  await form.locator('[name="email"]').fill("test@example.com");
  await form
    .locator('[name="message"]')
    .fill("Projet de test acoustique pour un bureau.");
  await form.locator('[name="consent"]').check();
  await form.locator('button[type="submit"]').click();
  await page.waitForFunction(() =>
    document.querySelector(".form-status").classList.contains("success"),
  );
  assert.equal(submissions, 1);
  assert.equal(await form.locator('[name="name"]').inputValue(), "");
  await page.unroute("https://api.sheetmonkey.io/**");
  await page.route("https://api.sheetmonkey.io/**", (route) =>
    route.fulfill({
      status: 503,
      body: "Unavailable",
      headers: { "access-control-allow-origin": "*" },
    }),
  );
  await form.locator('[name="name"]').fill("Client Test");
  await form.locator('[name="email"]').fill("test@example.com");
  await form
    .locator('[name="message"]')
    .fill("Projet de test acoustique pour un bureau.");
  await form.locator('[name="consent"]').check();
  await form.locator('button[type="submit"]').click();
  await page.waitForFunction(() =>
    document.querySelector(".form-status").classList.contains("error"),
  );
  assert.ok(await form.locator('button[type="submit"]').isEnabled());
  assert.ok(await form.locator('.form-status a[href^="mailto:"]').isVisible());
  checks.push(
    "Contact form validation, successful submission, reset, failure recovery and email fallback (mocked; no real messages sent)",
  );
  await go("blog.html", ".blog-card");
  assert.equal(await page.locator(".blog-card").count(), 4);
  await page.locator(".search-form--wide input").fill("dédouanement");
  assert.equal(await page.locator(".blog-card:visible").count(), 1);
  await go("article-isolation-phonique.html", ".article-body");
  await noOverflow("Article");
  checks.push("Existing editorial pages and resource search");
  for (const width of [1440, 1280, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 950 });
    for (const [url, selector] of [
      ["index.html", ".home-hero"],
      ["catalogue.html", "#products-grid"],
      ["produit.html?id=rockwool-rockfacade", ".product-detail"],
      ["blog.html", ".blog-card"],
      ["confidentialite.html", ".policy-content"],
    ]) {
      await go(url, selector);
      await noOverflow(`${width} ${url}`);
      if (width === 390) {
        await scrollAll();
        await screenshot(`${url.split(".")[0]}-mobile`, true);
      }
    }
  }
  checks.push("No horizontal overflow at 1440, 1280, 1024, 768, 390 and 320px");
  await page.setViewportSize({ width: 390, height: 844 });
  await go("catalogue.html", "#products-grid");
  await page.locator(".menu-toggle").click();
  assert.ok(await page.locator("#mobile-nav").isVisible());
  await page.keyboard.press("Escape");
  assert.ok(await page.locator("#mobile-nav").isHidden());
  await page.locator(".filter-toggle").click();
  assert.ok(await page.locator(".filter-panel").isVisible());
  await page
    .locator('input[data-facet="category"][value="portes-isolees"]')
    .check();
  assert.equal(await page.locator(".product-card").count(), 5);
  await screenshot("catalog-mobile-filters");
  await page.locator(".filter-toggle").click();
  assert.ok(await page.locator(".filter-panel").isHidden());
  await page.locator(".product-card h3 a").first().click();
  await page.locator(".product-detail").waitFor();
  await page.locator(".quote-box").scrollIntoViewIfNeeded();
  await noOverflow("Mobile quote area");
  await screenshot("product-mobile-quote");
  assert.ok(await page.locator(".contact-dock").isVisible());
  checks.push(
    "Mobile menu, collapsible filters, product navigation and floating contact bar",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await go("index.html", ".home-hero");
  assert.equal(await page.locator(".will-reveal:not(.revealed)").count(), 0);
  checks.push("Reduced-motion preference");
  assert.deepEqual(errors, []);
  assert.deepEqual(httpErrors, []);
  const report = {
    passed: true,
    checks,
    browserErrors: errors,
    localHttpErrors: httpErrors,
  };
  await writeFile(
    "test-results/browser-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
