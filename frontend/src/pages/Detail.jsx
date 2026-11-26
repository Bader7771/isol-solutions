import { useEditorialMotion } from "../motion/useEditorialMotion";
import React, { useEffect, useRef } from "react";
import {Download,Maximize2,X} from "lucide-react";
import { Breadcrumbs } from "../components/Editorial";
import { ContactIcon } from "../layouts/Shell";
import { emailURL, whatsappURL } from "../config.js";
import ProductCard from "../features/products/ProductCard";
import { productMediaClass } from "../features/products/media";
import ProductMedia from "../features/products/ProductMedia";
import QuoteDialog from "../features/products/QuoteDialog";

export default function Detail({ p, contact, related = [] }) {
  const zoom = useRef(null);
  const scope = useEditorialMotion();
  const application = p.specifications["Application"];
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
    <main id="main-content" className="cat-market cat-detail" ref={scope}>
      <div className="cat-shell">
        <Breadcrumbs items={[
          { label: "Catalogue", href: "/catalogue.html" },
          { label: p.category_name, href: "/categorie.html?cat=" + encodeURIComponent(p.category_id) },
          { label: p.product_name },
        ]} />
        <article>
          <header className="cat-detail-head">
            <button
              className={"cat-detail-image " + productMediaClass(p)} data-mask
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
              <span className="icon-button" aria-hidden="true"><Maximize2 /></span>
            </button>
            <div className="cat-detail-intro" data-reveal>
              <a
                className="cat-kicker" data-step
                href={
                  "/categorie.html?cat=" + encodeURIComponent(p.category_id)
                }
              >
                {p.category_name}
              </a>
              <h1 id="product-title" data-line>{p.product_name}</h1>
              <p data-step>{p.short_description}</p>
              <dl data-step>
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
              <div className="cat-detail-actions" data-step>
                <QuoteDialog product={p} />
                <a
                  className="action action--outline"
                  href={whatsappURL(p, contact)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ContactIcon name="WhatsApp" /> Devis via WhatsApp
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
              className="cat-close icon-button"
              aria-label="Fermer"
              onClick={() => zoom.current.close()}
            >
              <X aria-hidden="true"/>
            </button>
            <img src={"/" + p.primary_image} alt={p.product_name} loading="lazy" />
          </dialog>
          <nav className="detail-index" aria-label="Sur cette fiche"><a href="#description-produit">Description</a><a href="#specifications-produit">Caractéristiques</a>{related.length > 0 && <a href="#produits-associes">Produits associés</a>}</nav>
        </article>
      </div>
      <div className="surface-light">
          <div className="cat-shell cat-detail-sections">
            <section id="description-produit" data-reveal>
              <h2 data-step>Description</h2>
              <p data-step>{p.full_description}</p>
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
              {application && <><h3>Applications</h3><p>{application}</p></>}
              <h3>Documentation</h3>
              {p.technical_documents.length ? (
                <ul className="cat-docs">
                  {p.technical_documents.map((d) => (
                    <li key={d.path}>
                      <a href={"/" + d.path} download>
                        <Download aria-hidden="true" /> {d.label}
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
            <section id="specifications-produit" data-reveal>
              <h2 data-step>Caractéristiques techniques</h2>
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
      </div>
      {related.length > 0 && (
          <section className="cat-shell cat-related" id="produits-associes">
            <div data-reveal><p className="home-kicker" data-step>Produits associés</p><h2 data-step>Dans la même gamme</h2></div>
            <div className="cat-grid">
              {related.map((item) => (
                <ProductCard key={item.product_id} p={item} />
              ))}
            </div>
          </section>
      )}
    </main>
  );
}
