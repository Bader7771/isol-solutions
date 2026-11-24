import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import {
  FACETS,
  facetOptions,
  filterProducts,
  searchProducts,
  sortProducts,
} from "../assets/js/catalog-data.js";
import {
  CONTACT,
  whatsappURL,
  emailURL,
  quoteMessage,
} from "../assets/js/config.js";
import { optimizedImage } from "../assets/js/images.js";
import { productCard } from "../assets/js/components.js";
const data = JSON.parse(
  readFileSync(
    new URL("../data/processed/products_clean.json", import.meta.url),
  ),
);
const { products, categories } = data;
test("All cleaned records and asset relationships remain intact", () => {
  assert.equal(
    createHash("sha256")
      .update(readFileSync("data/processed/products_clean.json"))
      .digest("hex"),
    "084528815c8171f91642cc139987644214f1ac37042dccbafc5c9f65f2714e1f",
  );
  assert.equal(products.length, 34);
  assert.equal(Object.keys(categories).length, 6);
  assert.equal(new Set(products.map((p) => p.product_id)).size, 34);
  for (const p of products) {
    assert.ok(categories[p.category_id]);
    for (const path of [
      ...p.images,
      ...p.technical_documents.map((d) => d.path),
    ])
      assert.ok(existsSync(path), path);
  }
});
test("Search is case/accent insensitive and finds technical terms", () => {
  assert.equal(
    searchProducts(products, "ROCKFACADE")[0].product_id,
    "rockwool-rockfacade",
  );
  assert.ok(searchProducts(products, "0,035").length > 0);
  assert.equal(searchProducts(products, "not-a-real-product").length, 0);
  assert.ok(searchProducts(products, "laine roche").length > 0);
});
test("Combined filters use OR within a facet and AND between facets", () => {
  const state = {
    category: ["laine-de-roche"],
    brand: ["Rockwool", "Volcalis"],
  };
  const result = filterProducts(products, state);
  assert.equal(result.length, 7);
  assert.ok(result.every((p) => p.category_id === "laine-de-roche"));
  assert.equal(
    filterProducts(products, {
      category: ["portes-isolees"],
      brand: ["Rockwool"],
    }).length,
    0,
  );
  assert.equal(
    filterProducts(
      products,
      { category: ["portes-isolees"], brand: ["Rockwool"] },
      "brand",
    ).length,
    5,
  );
});
test("All facet options originate from explicit cleaned values", () => {
  for (const f of FACETS)
    for (const value of facetOptions(products, f))
      assert.ok(products.some((p) => f.values(p).includes(value)));
  const material = FACETS.find((f) => f.key === "material");
  assert.ok(facetOptions(products, material).includes("Acier galvanisé"));
  assert.equal(
    filterProducts(products, { application: ["Surfaces métalliques"] })[0]
      .product_id,
    "revetement-bitumineux",
  );
});
test("Sorting is deterministic without altering the dataset", () => {
  const original = products.map((p) => p.product_id);
  const asc = sortProducts(products, "az"),
    desc = sortProducts(products, "za");
  assert.deepEqual(
    asc.map((p) => p.product_id),
    desc.reverse().map((p) => p.product_id),
  );
  const docs = sortProducts(products, "documents");
  assert.ok(
    docs[0].technical_documents.length >=
      docs.at(-1).technical_documents.length,
  );
  assert.deepEqual(
    products.map((p) => p.product_id),
    original,
  );
});
test("WhatsApp and email links include the actual product and reference when present", () => {
  for (const p of products) {
    const url = new URL(whatsappURL(p));
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, `/${CONTACT.whatsapp}`);
    assert.ok(url.searchParams.get("text").includes(p.product_name));
    const ref = p.specifications["Référence"];
    if (ref) assert.ok(url.searchParams.get("text").includes(ref));
    assert.ok(decodeURIComponent(emailURL(p)).includes(p.product_name));
  }
  assert.ok(quoteMessage().includes("projet"));
});
test("Reusable cards render real fields and quotation actions without prices", () => {
  for (const p of products) {
    const card = productCard(p, categories);
    assert.ok(card.includes(p.product_id));
    assert.ok(card.includes("wa.me"));
    assert.ok(card.includes(optimizedImage(p.primary_image)));
    assert.ok(existsSync(optimizedImage(p.primary_image)));
    assert.ok(!card.includes("Ajouter au panier"));
  }
});

test("Replacement media is traced to each product’s own supplied document", () => {
  const sources = JSON.parse(readFileSync("assets/image-sources.json", "utf8"));
  assert.equal(Object.keys(sources).length, 9);
  for (const [image, source] of Object.entries(sources)) {
    const product = products.find((p) => p.primary_image === image);
    assert.ok(product);
    assert.ok(
      product.technical_documents.some((doc) => doc.path === source.document),
    );
    assert.ok(
      ["product-photo", "application-photo", "manufacturer-logo"].includes(
        source.kind,
      ),
    );
    assert.ok(existsSync(optimizedImage(image)));
  }
});

test("Client-approved palette is applied and the original logo is preserved", async () => {
  const { execFileSync } = await import("node:child_process");
  const current = readFileSync("assets/brand.css", "utf8");
  for (const [token, value] of Object.entries({
    primary: "#ec802d",
    black: "#171717",
    white: "#ffffff",
    "gray-100": "#f5f5f5",
    "gray-600": "#777777",
    "gray-800": "#303030",
  }))
    assert.ok(current.toLowerCase().includes(`--color-${token}: ${value}`));
  assert.ok(
    !/#0047ab|#003380|#1a5bc4/i.test(
      current + readFileSync("assets/ui.css", "utf8"),
    ),
  );
  const logo = execFileSync("git", ["show", "HEAD:assets/images/LOGO.png"]);
  assert.equal(
    createHash("sha256").update(logo).digest("hex"),
    createHash("sha256")
      .update(readFileSync("assets/images/LOGO.png"))
      .digest("hex"),
  );
});
