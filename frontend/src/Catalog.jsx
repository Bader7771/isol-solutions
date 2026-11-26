import React, { useEffect, useMemo, useRef, useState } from "react";
import {Search, SlidersHorizontal, X, ChevronDown} from "lucide-react";
import {
  FACETS,
  facetOptions,
  filterProducts,
  sortProducts,
} from "./catalog-data";
import { Notice } from "./components/Editorial";
import CatalogHero from "./pages/CatalogHero";
import CatalogCTA from "./pages/CatalogCTA";
import QuickView from "./features/products/QuickView";
import { useEditorialMotion } from "./motion/useEditorialMotion";
import ProductCard from "./features/products/ProductCard";

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
  const drawer = useRef(null);
  const quickDialog = useRef(null);
  const [preview, setPreview] = useState(null);
  const page = useEditorialMotion();
  useEffect(() => { if (preview && !quickDialog.current.open) quickDialog.current.showModal(); }, [preview]);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) drawer.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
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
  const filterPanel = (
    <aside className="cat-filters" aria-label="Filtres du catalogue">
      <div className="cat-filter-title">
        <h2>Filtres</h2>
        <button type="button" onClick={reset} disabled={!active && !filters.q && sort === "default"}>Réinitialiser</button>
      </div>
      {FACETS.filter(f => !cat || f.key !== "category").map(f => {
        const options = facetOptions(source, f);
        if (!options.length) return null;
        const isPrimary = ["brand", "category"].includes(f.key);
        return (
          <details key={f.key} open={isPrimary || filters[f.key].length > 0} className="cat-facet">
            <summary>{f.label}{filters[f.key].length > 0 && " (" + filters[f.key].length + ")"}<ChevronDown aria-hidden="true" /></summary>
            <div className="cat-facet-options">
              {options.map(v => (
                <label key={v}>
                  <input type="checkbox" checked={filters[f.key].includes(v)} onChange={() => toggle(f.key, v)} />
                  <span>{data.categories[v]?.title || v}</span>
                </label>
              ))}
            </div>
          </details>
        );
      })}
    </aside>
  );
  return (
    <main id="main-content" className="cat-market" ref={page}>
      <CatalogHero cat={cat} />
      <div className="cat-shell showroom-results">
        <div className="cat-layout">
          {filterPanel}
          <dialog ref={drawer} className="cat-filter-drawer" aria-label="Filtres du catalogue"
            onClick={event => { if (event.target === event.currentTarget) drawer.current.close(); }}>
            <button className="cat-close icon-button" type="button" aria-label="Fermer les filtres" onClick={() => drawer.current.close()}><X aria-hidden="true" /></button>
            {filterPanel}
            <button className="action" type="button" onClick={() => drawer.current.close()}>
              Afficher {products.length} résultat{products.length === 1 ? "" : "s"}
            </button>
          </dialog>
          <div className="cat-results">
            <div className="cat-toolbar">
              <p aria-live="polite">
                <strong>{products.length}</strong> produit
                {products.length === 1 ? "" : "s"}
              </p>
              <label className="cat-search">
                <Search aria-hidden="true"/>
                <input
                  className="field-control"
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
                <select className="field-control" aria-label="Trier les produits" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">Sélection</option>
                  <option value="az">Nom A–Z</option>
                  <option value="za">Nom Z–A</option>
                  <option value="documents">Documents</option>
                </select>
                <ChevronDown aria-hidden="true" />
              </label>
              <button className="cat-toggle action action--outline" type="button" aria-haspopup="dialog" onClick={() => drawer.current.showModal()}>
                <SlidersHorizontal aria-hidden="true" /> Filtres{active ? " (" + active + ")" : ""}
              </button>
            </div>
            {products.length ? (
              <div className="cat-grid" aria-label="Résultats du catalogue">
                {products.map((p, index) => (
                  <ProductCard key={p.product_id} p={p} index={index} onPreview={setPreview} />
                ))}
              </div>
            ) : (
              <Notice title="Aucun produit correspondant.">
                <button type="button" className="action" onClick={reset}>
                  Réinitialiser les filtres
                </button>
              </Notice>
            )}
          </div>
        </div>
        <CatalogCTA />
      </div>
      <QuickView dialog={quickDialog} product={preview} onClose={() => setPreview(null)} />
    </main>
  );
}
