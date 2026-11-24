import { fetchCatalog } from "./api.js";
// The cleaned JSON is the single runtime source of truth. No copied product records.
let request;
export function loadCatalog() {
  return (request ||= fetchCatalog()
    .then(async (data) => {
      if (!Array.isArray(data.products) || !data.categories)
        throw new Error("Format de catalogue invalide.");
      const response = await fetch(
        new URL("../image-sources.json", import.meta.url),
      );
      if (!response.ok)
        throw new Error(
          "Les visuels du catalogue ne peuvent pas être chargés.",
        );
      const mediaSources = await response.json();
      return {
        ...data,
        products: data.products.map((p) => ({
          ...p,
          image_kind: mediaSources[p.primary_image]?.kind || "product-photo",
        })),
      };
    }));
}
export const normalize = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
export const FACETS = [
  { key: "category", label: "Catégorie", values: (p) => [p.category_id] },
  { key: "brand", label: "Marque", values: (p) => [p.brand] },
  {
    key: "material",
    label: "Matière",
    values: (p) => [p.specifications["Matière"]].filter(Boolean),
  },
  {
    key: "application",
    label: "Application",
    values: (p) => [p.specifications["Application"]].filter(Boolean),
  },
  {
    key: "fire",
    label: "Classement au feu",
    values: (p) => [p.specifications["Classement au feu"]].filter(Boolean),
  },
  {
    key: "thickness",
    label: "Épaisseur",
    values: (p) =>
      [
        p.specifications["Épaisseur"] ||
          p.specifications["Épaisseurs disponibles"],
      ].filter(Boolean),
  },
];
export function searchProducts(products, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    const text = normalize(
      [
        p.product_name,
        p.brand,
        p.category_name,
        p.short_description,
        p.full_description,
        ...Object.entries(p.specifications).flat(),
      ].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
export function filterProducts(products, state, omit) {
  return searchProducts(products, state.q || "").filter((p) =>
    FACETS.every(
      (f) =>
        f.key === omit ||
        !state[f.key]?.length ||
        f.values(p).some((value) => state[f.key].includes(value)),
    ),
  );
}
export function sortProducts(products, order = "default") {
  const result = [...products];
  if (order === "az")
    result.sort((a, b) =>
      a.product_name.localeCompare(b.product_name, "fr", { numeric: true }),
    );
  if (order === "za")
    result.sort((a, b) =>
      b.product_name.localeCompare(a.product_name, "fr", { numeric: true }),
    );
  if (order === "documents")
    result.sort(
      (a, b) => b.technical_documents.length - a.technical_documents.length,
    );
  return result;
}
export function facetOptions(products, facet) {
  return [...new Set(products.flatMap(facet.values))].sort((a, b) =>
    a.localeCompare(b, "fr", { numeric: true }),
  );
}
