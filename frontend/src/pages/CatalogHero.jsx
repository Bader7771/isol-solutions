import React from "react";
import ProductMedia from "../features/products/ProductMedia";
export default function CatalogHero({ cat, products }) {
  const shown = new Set();
  const samples = products
    .filter((p) => {
      if (shown.has(p.primary_image)) return false;
      shown.add(p.primary_image);
      return true;
    })
    .slice(0, 3);
  return (
    <header className="cat-hero">
      <div>
        <nav className="cat-crumb" aria-label="Fil d’Ariane">
          <a href="/">Accueil</a>
          <span>/</span>
          {cat ? (
            <>
              <a href="/catalogue.html">Catalogue</a>
              <span>/</span>
              {cat.title}
            </>
          ) : (
            "Catalogue"
          )}
        </nav>
        <h1>{cat?.title || "Catalogue technique"}</h1>
        <p>
          {cat?.description ||
            "Matériaux d’isolation, solutions acoustiques et composants pour vos travaux d’aménagement."}
        </p>
      </div>
      <div className="cat-hero-samples" aria-hidden="true">
        {samples.map((p) => (
          <div key={p.product_id}>
            <ProductMedia path={p.primary_image} alt="" sizes="140px" eager />
          </div>
        ))}
      </div>
    </header>
  );
}
