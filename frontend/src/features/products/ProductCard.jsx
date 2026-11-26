import React from "react";
import { ArrowUpRight, ScanEye } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ProductMedia from "./ProductMedia";
import { productMediaClass } from "./media";

export default function ProductCard({ p, index = 0, onPreview }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className="cat-card-frame"
      initial={reducedMotion ? false : { opacity: .65, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.36, delay: (index % 3) * 0.045 }}
    >
      <a className="cat-card" href={"/produits/" + encodeURIComponent(p.slug || p.product_id)}>
      <div className={"cat-card-photo " + productMediaClass(p)}>
        <ProductMedia path={p.primary_image} alt={p.product_name}
          sizes="(min-width: 1120px) 24vw, (min-width: 650px) 43vw, 92vw" />
      </div>
      <div className="cat-card-copy">
        <span className="cat-card-brand">{p.brand}</span>
        <h3>{p.product_name}</h3>
        <p className="cat-card-description">{p.short_description}</p>
        <span className="cat-card-meta">{p.category_name}</span>
        <span className="cat-card-link inline-action">Découvrir le produit <ArrowUpRight aria-hidden="true" /></span>
      </div>
      </a>
      {onPreview && <button className="icon-button cat-preview" type="button" onClick={() => onPreview(p)} aria-label={"Aperçu · " + p.product_name}><ScanEye aria-hidden="true" /></button>}
    </motion.div>
  );
}
