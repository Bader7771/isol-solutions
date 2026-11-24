import React, { useEffect, useState } from "react";
import {
  FACETS,
  facetOptions,
  filterProducts,
  sortProducts,
} from "./catalog-data";
import CatalogHero from "./pages/CatalogHero";
import CatalogCTA from "./pages/CatalogCTA";

export function Categories({ categories, categoryBenefits }) {
  return (
    <div className="solutions__grid">
      {Object.values(categories).map((c) => (
        <article className="solution-card" key={c.category_id}>
          <div className="solution-card__image">
            <img src={c.image} alt={c.title} />
            <div className="solution-card__badge">{c.badge}</div>
          </div>
          <div className="solution-card__content">
            <h3 className="solution-card__title">{c.title}</h3>
            <p className="solution-card__description">{c.description}</p>
            <ul className="solution-card__benefits">
              {categoryBenefits[c.category_id]?.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <a
              className="solution-card__cta"
              href={"categorie.html?cat=" + c.category_id}
            >
              Voir les produits →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProductCard({ p }) {
  return (
    <a
      className="product-mini-card"
      href={"produit.html?id=" + encodeURIComponent(p.product_id)}
    >
      <div className="product-mini-card__image">
        <img src={p.primary_image} alt={p.product_name} loading="lazy" />
        <span className="product-mini-card__badge">{p.badge}</span>
      </div>
      <div className="product-mini-card__content">
        <h3 className="product-mini-card__title">{p.product_name}</h3>
        <p className="product-mini-card__desc">{p.short_description}</p>
        <span className="product-mini-card__cta">Voir le produit →</span>
      </div>
    </a>
  );
}

export default function Catalog({ data, params }) {
  const cat = data.categories[params.get("cat")];
  const [filters, setFilters] = useState(() =>
    Object.fromEntries([
      ["q", params.get("q") || ""],
      ...FACETS.map((f) => [f.key, params.getAll(f.key)]),
    ]),
  );
  const [sort, setSort] = useState(params.get("sort") || "default");
  useEffect(() => {
    const url = new URL(location.href);
    for (const key of ["q", "sort", ...FACETS.map((f) => f.key)])
      url.searchParams.delete(key);
    if (filters.q) url.searchParams.set("q", filters.q);
    if (sort !== "default") url.searchParams.set("sort", sort);
    for (const facet of FACETS)
      for (const value of filters[facet.key])
        url.searchParams.append(facet.key, value);
    history.replaceState(null, "", url);
  }, [filters, sort]);
  const source = cat
    ? data.products.filter((p) => p.category_id === cat.category_id)
    : data.products;
  const products = sortProducts(filterProducts(source, filters), sort);
  return (
    <>
      <CatalogHero cat={cat} title={cat?.title || "Catalogue"} />
      <section className="products-section">
        <div className="container">
          <div className="products-section__header">
            <h2 className="products-section__title">Nos Produits</h2>
            <p>{products.length} produits disponibles</p>
          </div>
          <form
            className="catalog-controls"
            onSubmit={(e) => e.preventDefault()}
          >
            <label>
              Rechercher{" "}
              <input
                type="search"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
            </label>
            {FACETS.filter((f) => !cat || f.key !== "category").map((f) => (
              <details key={f.key}>
                <summary>{f.label}</summary>
                {facetOptions(source, f).map((value) => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      checked={filters[f.key].includes(value)}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          [f.key]: e.target.checked
                            ? [...filters[f.key], value]
                            : filters[f.key].filter((x) => x !== value),
                        })
                      }
                    />
                    {data.categories[value]?.title || value}
                  </label>
                ))}
              </details>
            ))}
            <label>
              Trier{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Par défaut</option>
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
                <option value="documents">Fiches techniques</option>
              </select>
            </label>
          </form>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.product_id} p={p} />
            ))}
          </div>
          {!products.length && <p>Aucun produit correspondant.</p>}
        </div>
      </section>
      <CatalogCTA />
    </>
  );
}
