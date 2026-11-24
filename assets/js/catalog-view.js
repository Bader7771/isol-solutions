import {
  escapeHTML as esc,
  icon,
  productCard,
  materialShowcase,
} from "./components.js";
import { FACETS, facetOptions, filterProducts } from "./catalog-data.js";
export function filterMarkup(data, state, opened = ["category", "brand"]) {
  return FACETS.map((f) => {
    const available = filterProducts(data.products, state, f.key);
    return `<details class="filter-group" data-facet="${f.key}" ${opened.includes(f.key) ? "open" : ""}><summary>${f.label}${state[f.key]?.length ? `<span class="filter-number">${state[f.key].length}</span>` : ""}${icon("chevron")}</summary><div class="filter-options">${facetOptions(
      data.products,
      f,
    )
      .map((v) => {
        const count = available.filter((p) => f.values(p).includes(v)).length;
        return `<label class="filter-option"><input type="checkbox" data-facet="${f.key}" value="${esc(v)}" ${state[f.key]?.includes(v) ? "checked" : ""} ${!count && !state[f.key]?.includes(v) ? "disabled" : ""}><span>${esc(f.key === "category" ? data.categories[v].title : v)}</span><small>${count}</small></label>`;
      })
      .join("")}</div></details>`;
  }).join("");
}
export function catalogMarkup(data, state = {}) {
  const category =
    state.category?.length === 1 ? data.categories[state.category[0]] : null;
  const candidates = category
    ? data.products.filter((p) => p.category_id === category.category_id)
    : data.products;
  return `<section class="catalog-intro wrap"><div class="intro-copy"><nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a><span>/</span><span>Produits</span></nav><h1 id="catalog-title">${esc(category?.title || "Solutions d’isolation")}</h1><p id="catalog-description">${esc(category?.description || "Des matières techniques pour mieux isoler, maîtriser le bruit et améliorer le confort de vos espaces.")}</p></div><div id="catalog-art">${materialShowcase(candidates, data.categories)}</div></section>
 <nav class="catalog-category-nav wrap" aria-label="Choisir une gamme"><button type="button" data-category="" class="category-tab" aria-pressed="true">Tous les produits <span>${data.products.length}</span></button>${Object.values(
   data.categories,
 )
   .map(
     (c) =>
       `<button type="button" data-category="${c.category_id}" class="category-tab" aria-pressed="false">${esc(c.title)} <span>${c.product_count}</span></button>`,
   )
   .join("")}</nav>
 <section class="catalog-section wrap" aria-label="Catalogue de produits"><div class="catalog-layout"><aside class="filter-panel" aria-label="Filtres du catalogue"><div class="filter-top"><h2>Filtres</h2><button class="reset-filters" type="button">Effacer</button></div><div id="facet-groups">${filterMarkup(data, state)}</div><button class="filter-apply button button-primary" type="button">Voir les produits</button><a class="filter-contact" href="contact.html">Besoin d’un conseil ? ${icon("chevron")}</a></aside><div class="catalog-results"><div class="results-toolbar"><p id="results-count" role="status" aria-live="polite">${data.products.length} produits</p><form class="catalog-search" role="search">${icon("search")}<label class="sr-only" for="catalog-search">Rechercher dans les produits</label><input id="catalog-search" type="search" name="q" value="${esc(state.q || "")}" placeholder="Rechercher un produit…" autocomplete="off"><button class="search-clear icon-button" type="button" aria-label="Effacer la recherche" ${state.q ? "" : "hidden"}>${icon("close")}</button><button class="sr-only" type="submit">Rechercher</button></form><div class="toolbar-controls"><button class="filter-toggle" type="button" aria-expanded="false" aria-controls="facet-groups">${icon("filter")} Filtres</button><label class="sort-label"><span>Trier par</span><select id="catalog-sort"><option value="default">Sélection</option><option value="az">Nom : A à Z</option><option value="za">Nom : Z à A</option><option value="documents">Documentation</option></select></label></div></div><div id="active-filters" class="active-filters"></div><div id="products-grid" class="products-grid">${data.products
   .slice(0, 12)
   .map((p) => productCard(p, data.categories))
   .join(
     "",
   )}</div><div class="load-more-wrap"><p id="shown-count"></p><button class="button button-outline" id="load-more" type="button">Voir plus de produits</button></div></div></div></section>`;
}
