import React, { useEffect, useRef } from "react";
import { emailURL, whatsappURL } from "../config.js";
import ProductCard from "../features/products/ProductCard";
import ProductMedia from "../features/products/ProductMedia";
import QuoteDialog from "../features/products/QuoteDialog";
import "../features/products/catalog.css";

export default function Detail({ p, contact, related = [] }) {
  const zoom = useRef(null);
  useEffect(() => {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.product_name,
      description: p.full_description,
      image: new URL("/" + p.primary_image, location.origin).href,
      brand: { "@type": "Brand", name: p.brand },
      category: p.category_name,
      sku: p.specifications["Référence"],
    });
    document.head.append(schema);
    return () => schema.remove();
  }, [p]);
  return (
    <main className="cat-market cat-detail">
      <div className="cat-shell">
        <nav aria-label="Fil d’Ariane" className="cat-crumb">
          <a href="/">Accueil</a>
          <span>/</span>
          <a href="/catalogue.html">Catalogue</a>
          <span>/</span>
          <a href={"/categorie.html?cat=" + encodeURIComponent(p.category_id)}>
            {p.category_name}
          </a>
        </nav>
        <article>
          <header className="cat-detail-head">
            <button
              className="cat-detail-image"
              onClick={() => zoom.current.showModal()}
              aria-label={"Agrandir l’image de " + p.product_name}
            >
              <ProductMedia
                path={p.primary_image}
                id="product-image"
                alt={p.product_name}
                sizes="(min-width:900px) 46vw, 94vw"
                eager
              />
              <span aria-hidden="true">⤢</span>
            </button>
            <div className="cat-detail-intro">
              <a
                className="cat-kicker"
                href={
                  "/categorie.html?cat=" + encodeURIComponent(p.category_id)
                }
              >
                {p.category_name}
              </a>
              <h1 id="product-title">{p.product_name}</h1>
              <p>{p.short_description}</p>
              <dl>
                <div>
                  <dt>Marque</dt>
                  <dd>{p.brand}</dd>
                </div>
                {p.specifications["Référence"] && (
                  <div>
                    <dt>Référence</dt>
                    <dd>{p.specifications["Référence"]}</dd>
                  </div>
                )}
              </dl>
              <div className="cat-detail-actions">
                <QuoteDialog product={p} />
                <a
                  className="cat-action cat-action-light"
                  href={whatsappURL(p, contact)}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
              <a className="cat-email" href={emailURL(p, contact)}>
                Devis par email
              </a>
            </div>
          </header>
          <dialog
            ref={zoom}
            className="cat-dialog cat-zoom"
            aria-label={p.product_name}
          >
            <button
              className="cat-close"
              aria-label="Fermer"
              onClick={() => zoom.current.close()}
            >
              ×
            </button>
            <img src={"/" + p.primary_image} alt={p.product_name} />
          </dialog>
          <div className="cat-detail-sections">
            <section>
              <h2>Description</h2>
              <p>{p.full_description}</p>
              {p.advantages.length > 0 && (
                <>
                  <h3>Avantages</h3>
                  <ul>
                    {p.advantages.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </>
              )}
              <h3>Documentation</h3>
              {p.technical_documents.length ? (
                <ul className="cat-docs">
                  {p.technical_documents.map((d) => (
                    <li key={d.path}>
                      <a href={"/" + d.path} download>
                        <span aria-hidden="true">↓</span> {d.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <a className="cat-email" href={emailURL(p, contact)}>
                  Demander la fiche technique
                </a>
              )}
            </section>
            <section>
              <h2>Caractéristiques techniques</h2>
              <table id="specs-table" aria-label="Caractéristiques techniques">
                <tbody>
                  {Object.entries(p.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </article>
        {related.length > 0 && (
          <section className="cat-related">
            <h2>Dans la même gamme</h2>
            <div className="cat-grid">
              {related.map((item) => (
                <ProductCard key={item.product_id} p={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
