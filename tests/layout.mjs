// Visual regression checks for the client's catalog correction.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const { CONTACT } = await import("../assets/js/config.js");
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({
  viewport: { width: 1600, height: 1200 },
  deviceScaleFactor: 1,
});
const failures = [];
page.on("pageerror", (e) => failures.push(e.message));
await mkdir("test-results", { recursive: true });
const results = [];
async function go(path) {
  await page.goto(`${base}/${path}`, { waitUntil: "networkidle" });
  await page.locator(".contact-dock [data-platform]").last().waitFor();
}
async function fourContacts() {
  assert.equal(await page.locator(".contact-dock [data-platform]").count(), 4);
  for (const platform of ["whatsapp", "instagram", "facebook", "email"])
    assert.ok(
      await page
        .locator(`.contact-dock [data-platform="${platform}"]`)
        .isVisible(),
    );
  assert.equal(
    await page
      .locator(".contact-dock")
      .evaluate((el) => getComputedStyle(el).position),
    "fixed",
  );
  const before = await page.locator(".contact-dock").boundingBox();
  await page.evaluate(() =>
    scrollTo({
      top: document.documentElement.scrollHeight * 0.6,
      behavior: "instant",
    }),
  );
  await page.waitForTimeout(250);
  const after = await page.locator(".contact-dock").boundingBox();
  assert.equal(before.x, after.x);
  assert.equal(before.y, after.y);
  assert.ok(
    await page
      .locator(".site-header")
      .evaluate((el) => Math.abs(el.getBoundingClientRect().top) < 2),
  );
  assert.ok((await page.locator(".contact-dock").boundingBox()).y > 90);
}
try {
  for (const [width, columns] of [
    [1920, 4],
    [1600, 4],
    [1440, 4],
    [1280, 4],
    [1024, 3],
    [768, 2],
    [600, 2],
    [390, 2],
    [320, 1],
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    await go("catalogue.html");
    await page.locator(".products-grid .product-card").first().waitFor();
    const actual = await page
      .locator(".products-grid")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
    assert.equal(actual, columns, `${width}: grid columns`);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `${width}: overflow`,
    );
    await fourContacts();
    results.push(
      `${width}px: ${columns} columns, four fixed contact controls, sticky navigation, no overflow`,
    );
  }
  await page.setViewportSize({ width: 1600, height: 1200 });
  await go("catalogue.html");
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/corrected-catalog-desktop.png" });
  await page.locator(".products-grid").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/corrected-catalog-grid.png" });
  const cards = await page.locator(".product-card").evaluateAll((elements) =>
    elements.slice(0, 4).map((el) => ({
      y: el.getBoundingClientRect().top,
      h: el.getBoundingClientRect().height,
    })),
  );
  assert.ok(cards.every((c) => Math.abs(c.y - cards[0].y) < 1));
  assert.ok(cards.every((c) => Math.abs(c.h - cards[0].h) < 1));
  await page.locator(".nav-categories summary").click();
  assert.equal(await page.locator(".nav-category-menu a").count(), 6);
  await page.locator(".nav-category-menu a").nth(1).click();
  await page.locator("#products-grid").waitFor();
  assert.match(await page.locator("#results-count").textContent(), /9/);
  results.push(
    "Category dropdown lists the six real categories and opens the selected catalog",
  );
  for (const platform of ["instagram", "facebook"]) {
    const control = page.locator(`.contact-dock [data-platform="${platform}"]`);
    if (CONTACT[platform]) {
      assert.equal(await control.getAttribute("href"), CONTACT[platform]);
    } else {
      assert.equal(await control.getAttribute("data-unconfigured"), "true");
      assert.equal(await control.getAttribute("href"), null);
      await control.click();
      assert.ok(await page.locator("#social-status").isVisible());
      assert.match(
        await page.locator("#social-status").textContent(),
        /n’est pas disponible/,
      );
      await page.keyboard.press("Escape");
    }
  }
  results.push(
    "Unconfigured social accounts are disclosed and never route to invented profiles",
  );
  for (const width of [1600, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, path] of [
      ["home", "index.html"],
      ["catalog", "catalogue.html"],
      ["product", "produit.html?id=rockwool-rockfacade"],
    ]) {
      await go(path);
      await page.locator("h1").first().waitFor();
      await fourContacts();
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({
        path: `test-results/corrected-${name}-${width}.png`,
      });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await go("catalogue.html");
  await page.locator(".filter-toggle").click();
  assert.ok(await page.locator(".filter-panel").isVisible());
  await page
    .locator('input[data-facet="category"][value="laine-de-roche"]')
    .check();
  assert.match(await page.locator("#results-count").textContent(), /9/);
  await page.locator(".filter-toggle").click();
  assert.ok(await page.locator(".filter-panel").isHidden());
  await page.locator(".menu-toggle").click();
  assert.ok(await page.locator("#mobile-nav").isVisible());
  await page.keyboard.press("Escape");
  assert.ok(await page.locator("#mobile-nav").isHidden());
  results.push("Mobile filters and menu remain functional");
  assert.deepEqual(failures, []);
  const report = {
    passed: true,
    checks: results,
    missingOfficialURLs: ["instagram", "facebook"].filter((k) => !CONTACT[k]),
    referenceScreenshotAvailable: true,
  };
  await writeFile(
    "test-results/layout-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
