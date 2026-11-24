import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { filterProducts, sortProducts } from "../src/catalog-data.js";
import { emailURL, whatsappURL } from "../src/config.js";

const file = readFileSync(
  new URL("../../data/processed/products_clean.json", import.meta.url),
);
const { products, categories } = JSON.parse(file);
const { contact } = JSON.parse(
  readFileSync(
    new URL("../../backend/src/main/resources/company.json", import.meta.url),
  ),
);
test("catalog source and product relationships", () => {
  assert.equal(
    createHash("sha256").update(file).digest("hex"),
    "084528815c8171f91642cc139987644214f1ac37042dccbafc5c9f65f2714e1f",
  );
  assert.equal(products.length, 34);
  assert.equal(Object.keys(categories).length, 6);
  for (const c of Object.values(categories))
    assert.equal(
      c.product_count,
      products.filter((p) => p.category_id === c.category_id).length,
    );
});
test("accent-insensitive search, combined facets and stable sorting", () => {
  assert.equal(
    filterProducts(products, { q: "rockfacade" })[0].product_id,
    "rockwool-rockfacade",
  );
  assert.equal(
    filterProducts(products, {
      category: ["laine-de-roche"],
      brand: ["Rockwool", "Volcalis"],
    }).length,
    7,
  );
  assert.deepEqual(
    sortProducts(products, "az"),
    sortProducts(products, "za").reverse(),
  );
  const docs = sortProducts(products, "documents").map(
    (p) => p.technical_documents.length,
  );
  assert.deepEqual(
    docs,
    [...docs].sort((a, b) => b - a),
  );
});
test("quotation links include product name and available reference", () => {
  for (const p of products) {
    for (const body of [
      new URL(emailURL(p, contact)).searchParams.get("body"),
      new URL(whatsappURL(p, contact)).searchParams.get("text"),
    ]) {
      assert.ok(body.includes(p.product_name));
      assert.ok(body.includes(p.specifications["Référence"] || ""));
    }
  }
});
