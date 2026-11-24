import React, { useEffect, useMemo, useState } from "react";
import {
  FACETS,
  facetOptions,
  filterProducts,
  sortProducts,
} from "./catalog-data";
import CatalogHero from "./pages/CatalogHero";
import CatalogCTA from "./pages/CatalogCTA";
import ProductCard from "./features/products/ProductCard";
import "./features/products/catalog.css";

function readFilters(params) {
  return Object.fromEntries([
    ["q", params.get("q") || ""],
    ...FACETS.map((f) => [f.key, params.getAll(f.key)]),
  ]);
}

export default function Catalog({
  data,
  params = new URLSearchParams(location.search),
}) {
  const cat = data.categories[params.get("cat")];
  const source = useMemo(
    () =>
      cat
        ? data.products.filter((p) => p.category_id === cat.category_id)
        : data.products,
    [cat, data.products],
  );
  const [filters, setFilters] = useState(() => readFilters(params));
  const [sort, setSort] = useState(() => params.get("sort") || "default");
  const [expanded, setExpanded] = useState(false);
  const products = useMemo(
    () => sortProducts(filterProducts(source, filters), sort),
    [source, filters, sort],
  );
  const active = FACETS.reduce((count, f) => count + filters[f.key].length, 0);
  function reset() {
    setFilters(readFilters(new URLSearchParams()));
    setSort("default");
  }
  function toggle(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  }
  useEffect(() => {
    const url = new URL(location.href);
    for (const key of ["q", "sort", ...FACETS.map((f) => f.key)])
      url.searchParams.delete(key);
    if (filters.q) url.searchParams.set("q", filters.q);
    if (sort !== "default") url.searchParams.set("sort", sort);
    for (const f of FACETS)
      for (const v of filters[f.key]) url.searchParams.append(f.key, v);
    history.replaceState(null, "", url);
  }, [filters, sort]);
  return (
    <main className="cat-market">
      <div className="cat-shell">
        <CatalogHero cat={cat} products={source} />
        <div className="cat-layout">
          <aside
            className={"cat-filters" + (expanded ? " is-expanded" : "")}
            aria-label="Filtres du catalogue"
          >
            <div className="cat-filter-title">
              <h2>Filtres</h2>
              <button
                type="button"
                onClick={reset}
                disabled={!active && !filters.q && sort === "default"}
              >
                Réinitialiser
              </button>
            </div>
            <button
              className="cat-toggle"
              type="button"
              aria-expanded={expanded}
              aria-controls="catalog-facets"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Masquer les filtres" : "Afficher les filtres"}{" "}
              {active ? "(" + active + ")" : ""}
              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <div id="catalog-facets" className="cat-facets">
              {FACETS.filter((f) => !cat || f.key !== "category").map((f) => {
                const options = facetOptions(source, f);
                if (!options.length) return null;
                return (
                  <details
                    key={f.key}
                    open={
                      f.key === "category" ||
                      f.key === "brand" ||
                      filters[f.key].length > 0
                    }
                    className="cat-facet"
                  >
                    <summary>{f.label}</summary>
                    <div className="cat-facet-options">
                      {options.map((v) => (
                        <label key={v}>
                          <input
                            type="checkbox"
                            checked={filters[f.key].includes(v)}
                            onChange={() => toggle(f.key, v)}
                          />
                          <span>{data.categories[v]?.title || v}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          </aside>
          <div className="cat-results">
            <div className="cat-toolbar">
              <p aria-live="polite">
                <strong>{products.length}</strong> produit
                {products.length === 1 ? "" : "s"}
              </p>
              <label className="cat-search">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  aria-label="Rechercher des produits"
                  placeholder="Rechercher un produit"
                  value={filters.q}
                  onChange={(e) =>
                    setFilters({ ...filters, q: e.target.value })
                  }
                />
              </label>
              <label className="cat-sort">
                Trier par{" "}
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">Sélection</option>
                  <option value="az">Nom A–Z</option>
                  <option value="za">Nom Z–A</option>
                  <option value="documents">Documents</option>
                </select>
              </label>
            </div>
            {products.length ? (
              <div className="cat-grid">
                {products.map((p) => (
                  <ProductCard key={p.product_id} p={p} />
                ))}
              </div>
            ) : (
              <div className="cat-empty">
                <h2>Aucun produit correspondant.</h2>
                <button type="button" className="cat-action" onClick={reset}>
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
        <CatalogCTA />
      </div>
    </main>
  );
}
