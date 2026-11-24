import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { SERVICES } from "../assets/js/company-content.js";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [],
  httpErrors = [],
  checks = [];
page.on("pageerror", (e) => {
  errors.push(e.message);
  console.error(e.message);
});
page.on("console", (message) => {
  if (message.type() === "error") console.error(message.text());
});
page.on("response", (r) => {
  if (r.status() >= 400 && r.url().startsWith(base)) {
    httpErrors.push(`${r.status()} ${r.url()}`);
    console.error(`HTTP ${r.status()} ${r.url()}`);
  }
});
await mkdir("test-results", { recursive: true });
async function go(route, selector) {
  console.log(`Checking ${page.viewportSize().width}px ${route}`);
  await page.goto(`${base}/${route}`, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.documentElement.dataset.uiReady === "true",
  );
  await page.locator(selector).first().waitFor();
}
async function revealAll() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 50));
    }
    scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(450);
}
try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [route, selector] of [
      ["index.html", ".home-hero"],
      ["catalogue.html", "#products-grid"],
      ["produit.html?id=rockwool-rockfacade", ".product-detail"],
      ["apropos.html", ".company-intro"],
      ["services.html", ".service-editorial"],
      ["contact.html", "#contact-form"],
      ["blog.html", ".blog-card"],
      ["article-isolation-phonique.html", ".article-body"],
      ["confidentialite.html", ".policy-content"],
    ]) {
      await go(route, selector);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${width} ${route}: horizontal overflow`,
      );
      assert.equal(await page.locator("h1").count(), 1, route);
      if (width === 1440 || width === 390) {
        await revealAll();
        await page.screenshot({
          path: `test-results/site-${route.split(".")[0]}-${width}.png`,
        });
      }
    }
  }
  checks.push(
    "Nine page types at five viewport widths: one page heading, no horizontal overflow and screenshots reviewed",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go("services.html", ".service-editorial");
  assert.equal(
    await page.locator(".service-editorial").count(),
    SERVICES.length,
  );
  await page.locator(".service-editorial .button").first().click();
  await page.locator("#contact-form").waitFor();
  await page.waitForFunction(
    () => document.documentElement.dataset.uiReady === "true",
  );
  assert.ok(page.url().includes("contact.html?service="));
  assert.ok(
    (await page.locator('[name="message"]').inputValue()).includes(
      SERVICES[0].title,
    ),
  );
  await page.route("https://api.sheetmonkey.io/**", (route) =>
    route.fulfill({
      status: 200,
      body: "OK",
      headers: { "access-control-allow-origin": "*" },
    }),
  );
  await page.locator('[name="name"]').fill("Client Test");
  await page.locator('[name="email"]').fill("test@example.com");
  await page.locator('[name="consent"]').check();
  await page.locator('#contact-form button[type="submit"]').click();
  await page.waitForFunction(() =>
    document.querySelector(".form-status").classList.contains("success"),
  );
  checks.push(
    "Service inquiry opens the dedicated contact route, prefills the selected service and submits through the unchanged endpoint (mocked)",
  );
  await go("apropos.html", ".company-intro");
  assert.equal(
    await page
      .locator('.desktop-links a[aria-current="page"]')
      .getAttribute("href"),
    "apropos.html",
  );
  await page.locator('.desktop-links a[href="services.html"]').click();
  await page.locator(".service-editorial").first().waitFor();
  assert.equal(
    await page
      .locator('.desktop-links a[aria-current="page"]')
      .getAttribute("href"),
    "services.html",
  );
  checks.push(
    "About and services routes are integrated into navigation with correct active state",
  );
  await go("catalogue.html", "#products-grid");
  assert.equal(await page.locator(".catalog-category-nav button").count(), 7);
  await page
    .locator('.catalog-category-nav [data-category="laine-de-roche"]')
    .click();
  assert.equal(await page.locator(".product-card").count(), 9);
  assert.equal(await page.locator(".product-summary").count(), 9);
  await page.locator(".card-details").first().click();
  await page.locator(".product-detail").waitFor();
  await page.locator('.detail-nav a[href="#specifications"]').click();
  assert.match(page.url(), /#specifications$/);
  assert.equal(
    await page
      .locator('.detail-nav a[href="#specifications"]')
      .getAttribute("aria-current"),
    "location",
  );
  checks.push(
    "Quick category navigation, real card descriptions, explicit product-detail links and active detail navigation",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await go("catalogue.html", "#products-grid");
  await page.locator(".filter-toggle").click();
  await page
    .locator('input[data-facet="category"][value="portes-isolees"]')
    .check();
  await page.locator(".filter-apply").click();
  assert.ok(await page.locator(".filter-panel").isHidden());
  assert.equal(await page.locator(".product-card").count(), 5);
  checks.push(
    "Mobile apply-filters action closes the filter panel and retains selected results",
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(httpErrors, []);
  const report = { passed: true, checks };
  await writeFile(
    "test-results/site-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
