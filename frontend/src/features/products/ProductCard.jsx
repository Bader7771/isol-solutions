import React from "react";
import ProductMedia from "./ProductMedia";
export default function ProductCard({ p }) {
  return (
    <a
      className="cat-card"
      href={"/produits/" + encodeURIComponent(p.slug || p.product_id)}
    >
      <div className="cat-card-photo">
        <ProductMedia
          path={p.primary_image}
          alt={p.product_name}
          sizes="(min-width: 1280px) 19vw, (min-width: 900px) 23vw, 45vw"
        />
      </div>
      <div className="cat-card-copy">
        <span>{p.brand}</span>
        <h3>{p.product_name}</h3>
        <div className="cat-card-meta">
          <small>{p.category_name}</small>
          <i aria-hidden="true">↗</i>
        </div>
      </div>
    </a>
  );
}
