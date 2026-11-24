import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE)
    : "playwright"
);
const base = process.env.TEST_BASE_URL;
if (
  !base ||
  !["localhost", "127.0.0.1"].includes(new URL(base).hostname) ||
  process.env.ISOL_TEST_DATABASE !== "temporary"
)
  throw Error(
    "Start an isolated local server with temporary quote storage and a loopback contact receiver.",
  );
const source = JSON.parse(
  await readFile(
    new URL("../../data/processed/products_clean.json", import.meta.url),
  ),
);
const requests = [];
const receiver = createServer(async (req, res) => {
  let body = "";
  for await (const chunk of req) body += chunk;
  requests.push(body);
  res.end("ok");
});
await new Promise((resolve) => receiver.listen(18533, "127.0.0.1", resolve));
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(base) && r.status() >= 400)
      errors.push(r.status() + " " + r.url());
  });
  page.on("dialog", (d) => d.accept());
  await page.route("https://fonts.**", (r) => r.abort());
  const goto = async (route) => {
    await page.goto(base + "/" + route);
    await page.locator("footer").waitFor();
  };
  for (const route of [
    "index.html",
    "apropos.html",
    "services.html",
    "blog.html",
    "article-isolation-phonique.html",
    "confidentialite.html",
    "diagnostic.html",
    "contact.html",
  ])
    await goto(route);
  await page.locator("#name").fill("Test Local");
  await page.locator("#email").fill("qa@example.invalid");
  await page.locator("#company").fill("Test");
  await page.locator("#phone").fill("0600000000");
  await page.locator("#message").fill("Demande de test locale");
  await page.locator("#consent").check();
  await Promise.all([
    page.waitForResponse(
      (r) => r.url().endsWith("/api/contact") && r.status() === 200,
    ),
    page.locator("#submit-btn").click(),
  ]);
  assert.match(requests[0], /Test\+Local/);
  for (const c of Object.values(source.categories)) {
    await goto("categorie.html?cat=" + c.category_id);
    assert.equal(
      await page.locator(".product-mini-card").count(),
      c.product_count,
    );
  }
  await goto("catalogue.html");
  await page.getByRole("searchbox").fill("ROCKFACADE");
  assert.equal(await page.locator(".product-mini-card").count(), 1);
  await page.getByRole("searchbox").fill("zzzzz");
  await page.getByText("Aucun produit correspondant.").waitFor();
  for (const p of source.products) {
    await goto("produit.html?id=" + p.product_id);
    assert.equal(
      await page.locator("#product-title").textContent(),
      p.product_name,
    );
    assert.equal(
      await page.locator("#specs-table tbody tr").count(),
      Object.keys(p.specifications).length,
    );
    assert.equal(
      await page.locator("#product-image").getAttribute("src"),
      p.primary_image,
    );
    assert.ok((await page.request.get(base + "/" + p.primary_image)).ok());
    for (const d of p.technical_documents)
      assert.ok((await page.request.get(base + "/" + d.path)).ok());
    const message = new URL(
      await page.locator(".whatsapp-float").getAttribute("href"),
    ).searchParams.get("text");
    assert.ok(message.includes(p.product_name));
    assert.ok(message.includes(p.specifications["Référence"] || ""));
    assert.ok(
      decodeURIComponent(
        await page.getByText("Devis par email").getAttribute("href"),
      ).includes(p.product_name),
    );
  }
  await page.locator("#btn-devis").click();
  await page.locator("#devis-nom").fill("Test Local");
  await page.locator("#devis-email").fill("qa@example.invalid");
  await page.locator("#devis-message").fill("Test local");
  await page.locator("#devis-submit-btn").click();
  await page.locator("#quote-success").waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await goto("index.html");
  await page.locator("#nav-toggle").click();
  await page.locator("#nav-menu.is-open").waitFor();
  assert.deepEqual(errors, []);
  console.log(
    "Verified pages, mobile navigation, catalog, asset URLs, specifications, quote links, local contact delivery and quote submission.",
  );
} finally {
  await browser.close();
  receiver.close();
}
