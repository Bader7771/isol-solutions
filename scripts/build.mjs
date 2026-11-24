import { mkdir, cp, readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
const dataPath = "data/processed/products_clean.json";
const original = await readFile(dataPath);
const data = JSON.parse(original);
const mediaSources = JSON.parse(
  await readFile("assets/image-sources.json", "utf8"),
);
for (const p of data.products)
  p.image_kind = mediaSources[p.primary_image]?.kind || "product-photo";
if (data.products.length !== data.metadata.total_products)
  throw new Error("Product count mismatch");
if (
  new Set(data.products.map((p) => p.product_id)).size !== data.products.length
)
  throw new Error("Duplicate IDs");
for (const product of data.products) {
  if (!data.categories[product.category_id])
    throw new Error(`Invalid category: ${product.product_id}`);
  for (const path of [
    ...product.images,
    ...product.technical_documents.map((d) => d.path),
  ])
    await stat(path);
}
for (const name of [
  "app",
  "components",
  "config",
  "catalog-data",
  "resources",
  "images",
  "marketing",
  "hero",
  "catalog-view",
  "company-content",
  "company-pages",
]) {
  const check = spawnSync(
    process.execPath,
    ["--check", `assets/js/${name}.js`],
    { encoding: "utf8" },
  );
  if (check.status !== 0) throw new Error(check.stderr);
}
const { HERO_SLIDES } = await import("../assets/js/hero.js");
const { optimizedImage } = await import("../assets/js/images.js");
for (const slide of HERO_SLIDES) {
  await stat(slide.image);
  await stat(optimizedImage(slide.image));
}
await mkdir("dist/data/processed", { recursive: true });
const pages = [
  "index.html",
  "catalogue.html",
  "categorie.html",
  "produit.html",
  "blog.html",
  "article-isolation-phonique.html",
  "confidentialite.html",
  "diagnostic.html",
  "apropos.html",
  "services.html",
  "contact.html",
];
for (const path of [...pages, "assets", "data_produits"])
  await cp(path, `dist/${path}`, { recursive: true });
await cp(dataPath, `dist/${dataPath}`);
// Add useful indexable content to the generated static pages, before JS enhances it.
const { productCard, escapeHTML: esc } =
  await import("../assets/js/components.js");
const { catalogMarkup } = await import("../assets/js/catalog-view.js");
const catalogIntro = catalogMarkup(data);
for (const name of ["catalogue.html", "categorie.html"]) {
  const source = await readFile(`dist/${name}`, "utf8");
  await writeFile(
    `dist/${name}`,
    source.replace(
      /<main[^>]*>.*?<\/main>/s,
      `<main id="main-content" tabindex="-1">${catalogIntro}</main>`,
    ),
  );
}
const { homeMarkup } = await import("../assets/js/marketing.js");
const homepage = await readFile("dist/index.html", "utf8");
await writeFile(
  "dist/index.html",
  homepage.replace(
    /<main[^>]*>.*?<\/main>/s,
    `<main id="main-content" tabindex="-1">${homeMarkup(data)}</main>`,
  ),
);
const { companyPageMarkup } = await import("../assets/js/company-pages.js");
for (const [file, page] of [
  ["apropos.html", "about"],
  ["services.html", "services"],
  ["contact.html", "contact"],
]) {
  const source = await readFile(`dist/${file}`, "utf8");
  await writeFile(
    `dist/${file}`,
    source.replace(
      /<main[^>]*>.*?<\/main>/s,
      `<main id="main-content" tabindex="-1">${companyPageMarkup(page, data)}</main>`,
    ),
  );
}
const hash = createHash("sha256").update(original).digest("hex");
await writeFile(
  "dist/build-info.json",
  JSON.stringify(
    {
      products: data.products.length,
      categories: Object.keys(data.categories).length,
      dataset_sha256: hash,
    },
    null,
    2,
  ),
);
console.log(
  `Production build complete: dist/ — ${data.products.length} products, ${Object.keys(data.categories).length} categories. Dataset SHA-256 ${hash}`,
);
