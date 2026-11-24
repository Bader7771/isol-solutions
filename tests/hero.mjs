import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { HERO_SLIDES } from "../assets/js/hero.js";
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
const checks = [],
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("test-results", { recursive: true });
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.locator('.home-hero[data-active-slide="0"]').waitFor();
  const initial = await page.evaluate(() => ({
    hero: document.querySelector(".home-hero").getBoundingClientRect().toJSON(),
    header: document
      .getElementById("site-header")
      .getBoundingClientRect()
      .toJSON(),
    body: getComputedStyle(document.body).backgroundColor,
    frame: document.querySelector(".site-canvas"),
    button: getComputedStyle(
      document.querySelector(".hero-actions .button-primary"),
    ).backgroundColor,
    buttonColor: getComputedStyle(
      document.querySelector(".hero-actions .button-primary"),
    ).color,
    footer: document
      .querySelector(".site-footer")
      .getBoundingClientRect()
      .toJSON(),
  }));
  assert.equal(initial.hero.x, 0);
  assert.equal(initial.hero.width, 1440);
  assert.equal(initial.header.y, 0);
  assert.equal(initial.header.width, 1440);
  assert.equal(initial.footer.width, 1440);
  assert.equal(initial.body, "rgb(255, 255, 255)");
  assert.equal(initial.frame, null);
  assert.equal(initial.button, "rgb(236, 128, 45)");
  assert.equal(initial.buttonColor, "rgb(23, 23, 23)");
  checks.push(
    "No outer frame or margins; edge-to-edge hero/header/footer; requested white, black and orange colors",
  );
  const heroHandle = await page.locator(".home-hero").elementHandle();
  await page.screenshot({ path: "test-results/fullwidth-home-desktop.png" });
  await page.waitForFunction(
    () => document.querySelector(".home-hero").dataset.activeSlide === "1",
    {},
    { timeout: 9000 },
  );
  await page.waitForTimeout(300);
  const partial = await page
    .locator(".hero-slide.is-active")
    .evaluate((el) => ({
      opacity: Number(getComputedStyle(el).opacity),
      duration: getComputedStyle(el).transitionDuration,
      size: getComputedStyle(el).backgroundSize,
    }));
  assert.ok(
    partial.opacity > 0 && partial.opacity < 1,
    JSON.stringify(partial),
  );
  assert.equal(partial.duration, "1.2s");
  assert.equal(partial.size, "cover");
  await page.waitForTimeout(1200);
  assert.equal(
    await page
      .locator(".hero-slide.is-active")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  assert.ok(
    await heroHandle.evaluate(
      (el) => el === document.querySelector(".home-hero"),
    ),
  );
  await page.screenshot({
    path: "test-results/fullwidth-home-second-slide.png",
  });
  checks.push(
    "Automatic six-second advance, measurable crossfade, cover sizing and stable hero DOM",
  );
  await page.locator(".hero-play").click();
  assert.equal(
    await page.locator(".hero-play").getAttribute("aria-pressed"),
    "true",
  );
  const paused = await page
    .locator(".home-hero")
    .getAttribute("data-active-slide");
  await page.waitForTimeout(6200);
  assert.equal(
    await page.locator(".home-hero").getAttribute("data-active-slide"),
    paused,
  );
  for (let i = 0; i < HERO_SLIDES.length; i++) {
    await page.locator(`.hero-dot[data-slide="${i}"]`).click();
    await page.waitForFunction(
      (index) =>
        document.querySelector(".home-hero").dataset.activeSlide ===
        String(index),
      i,
    );
    await page.waitForTimeout(1300);
    const src = await page
      .locator(".hero-slide.is-active")
      .evaluate(
        (el) => el.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1],
      );
    assert.equal(
      (await page.request.get(new URL(src, base).href)).status(),
      200,
    );
    await page.screenshot({ path: `test-results/hero-slide-${i}.png` });
  }
  checks.push(
    "Pause remains stable; all five manual image selections and local assets work",
  );
  await page.locator(".hero-play").click();
  assert.equal(
    await page.locator(".hero-play").getAttribute("aria-pressed"),
    "false",
  );
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const offscreen = await page
    .locator(".home-hero")
    .getAttribute("data-active-slide");
  await page.waitForTimeout(6200);
  assert.equal(
    await page.locator(".home-hero").getAttribute("data-active-slide"),
    offscreen,
  );
  checks.push("Autoplay pauses while the hero is outside the viewport");
  for (const width of [1920, 1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.locator(".hero-play").click();
    const geometry = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      w: innerWidth,
      hero: document
        .querySelector(".home-hero")
        .getBoundingClientRect()
        .toJSON(),
      header: document
        .querySelector(".site-header")
        .getBoundingClientRect()
        .toJSON(),
    }));
    assert.ok(geometry.page <= width + 1, `${width} overflow ${geometry.page}`);
    assert.equal(geometry.hero.x, 0);
    assert.equal(geometry.hero.width, width);
    assert.equal(geometry.header.y, 0);
    assert.equal(geometry.header.width, width);
    if (width === 390)
      await page.screenshot({ path: "test-results/fullwidth-home-mobile.png" });
  }
  checks.push(
    "Full-width geometry and no horizontal overflow at 320, 390, 768, 1024, 1440 and 1920px",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  assert.ok(await page.locator(".hero-play").isHidden());
  const reduced = await page
    .locator(".home-hero")
    .getAttribute("data-active-slide");
  await page.waitForTimeout(6500);
  assert.equal(
    await page.locator(".home-hero").getAttribute("data-active-slide"),
    reduced,
  );
  assert.equal(
    await page
      .locator(".hero-slide.is-active")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
    "0s",
  );
  await page.locator('.hero-dot[data-slide="2"]').click();
  await page.waitForFunction(
    () => document.querySelector(".home-hero").dataset.activeSlide === "2",
  );
  checks.push(
    "Reduced motion disables autoplay and fading while preserving manual controls",
  );
  assert.deepEqual(errors, []);
  const result = { passed: true, checks };
  await writeFile(
    "test-results/hero-report.json",
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
