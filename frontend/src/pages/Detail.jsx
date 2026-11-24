import React from "react";
import { ProductCard } from "../Catalog.jsx";
import { emailURL } from "../config.js";
export default function Detail({
  p,
  contact,
  related,
  open,
  setOpen,
  close,
  sent,
  send,
}) {
  const zoom = React.useRef(null);
  React.useEffect(() => {
    const description = document.createElement("meta");
    description.name = "description";
    description.content = p.short_description;
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = new URL(
      "produit.html?id=" + encodeURIComponent(p.product_id),
      location.href,
    ).href;
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.product_name,
      description: p.full_description,
      image: p.primary_image,
      brand: { "@type": "Brand", name: p.brand },
      category: p.category_name,
      sku: p.specifications["Référence"],
    });
    document.head.append(description, canonical, schema);
    return () => {
      description.remove();
      canonical.remove();
      schema.remove();
    };
  }, [p]);
  return (
    <>
      <section className="product-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <a href="index.html">Accueil</a>
            <span className="breadcrumb__sep">›</span>
            <a href="index.html#solutions">Solutions</a>
            <span className="breadcrumb__sep">›</span>
            <a
              id="breadcrumb-cat-link"
              href={"categorie.html?cat=" + p.category_id}
            >
              <span id="breadcrumb-category">{p.category_name}</span>
            </a>
            <span className="breadcrumb__sep">›</span>
            <span id="breadcrumb-product" className="breadcrumb__current">
              {p.product_name}
            </span>
          </nav>
        </div>
      </section>

      <section className="product-content">
        <div className="container">
          <div className="product-layout">
            <div className="product-image-wrapper">
              <div className="product-image-card">
                <span className="product-image__badge" id="product-badge">
                  {p.badge}
                </span>
                <button
                  type="button"
                  className="product-zoom"
                  aria-label="Agrandir l’image"
                  onClick={() => zoom.current.showModal()}
                >
                  <img
                    id="product-image"
                    src={p.primary_image}
                    alt={p.product_name}
                    className="product-image__img"
                  />
                </button>
                <dialog ref={zoom} className="zoom-dialog">
                  <button onClick={() => zoom.current.close()}>Fermer</button>
                  <img src={p.primary_image} alt={p.product_name} />
                </dialog>
              </div>
            </div>

            <div className="product-info">
              <span
                className="product-info__category"
                id="product-category-label"
              >
                {p.category_name}
              </span>
              <h1 className="product-info__title" id="product-title">
                {p.product_name}
              </h1>
              <p className="product-info__desc" id="product-description">
                {p.full_description}
              </p>

              <div className="product-specs" id="product-specs">
                <h3 className="product-specs__title">
                  Caractéristiques Techniques
                </h3>
                <table className="product-specs__table" id="specs-table">
                  <tbody>
                    {Object.entries(p.specifications).map(([k, v]) => (
                      <tr key={k}>
                        <td className="spec-label">{k}</td>
                        <td className="spec-value">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="product-cta-buttons">
                {!p.technical_documents.length && (
                  <a
                    className="btn btn--primary btn--large"
                    href="contact.html"
                  >
                    Demander la fiche technique
                  </a>
                )}
                {p.technical_documents.map((d) => (
                  <a
                    key={d.path}
                    className="btn btn--primary btn--large"
                    href={d.path}
                    download
                  >
                    {d.label}
                  </a>
                ))}
                <button
                  className="btn btn--accent btn--large"
                  id="btn-devis"
                  onClick={() => setOpen(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6L12 13L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Demandez un devis
                </button>
                <a className="btn" href={emailURL(p, contact)}>
                  Devis par email
                </a>
              </div>

              <div
                id="product-datasheets"
                style={{ display: "none", marginTop: "1rem" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-advantages">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Points Forts</span>
            <h2 className="section-title">Avantages du Produit</h2>
          </div>
          <div className="advantages-grid" id="advantages-grid">
            {p.advantages.map((a) => (
              <div key={a} className="advantage-card">
                <div className="advantage-card__icon">✓</div>
                <p className="advantage-card__text">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="related-products">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Produits Associés</span>
            <h2 className="section-title">Découvrez aussi</h2>
          </div>
          <div
            className="products-grid products-grid--related"
            id="related-grid"
          >
            {related.map((item) => (
              <ProductCard key={item.product_id} p={item} />
            ))}
          </div>
        </div>
      </section>

      <div
        className={"quote-modal" + (open ? " is-open" : "")}
        id="quote-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="quote-modal__backdrop" onClick={close}></div>
        <div className="quote-modal__dialog">
          <button
            className="quote-modal__close"
            onClick={close}
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="quote-modal__header">
            <h2 id="modal-title" className="quote-modal__title">
              Demandez un Devis
            </h2>
            <p className="quote-modal__subtitle">
              Produit :{" "}
              <strong id="modal-product-name">{p.product_name}</strong>
            </p>
          </div>
          <form
            className="quote-form"
            id="quote-form"
            onSubmit={send}
            hidden={sent}
          >
            <div className="quote-form__row">
              <div className="quote-form__group">
                <label htmlFor="devis-nom">Nom complet *</label>
                <input
                  type="text"
                  id="devis-nom"
                  name="nom"
                  required
                  maxLength="100"
                  autoComplete="name"
                  placeholder="Votre nom complet"
                />
                <span className="quote-form__error" id="devis-nom-error"></span>
              </div>
              <div className="quote-form__group">
                <label htmlFor="devis-email">Email *</label>
                <input
                  type="email"
                  id="devis-email"
                  name="email"
                  required
                  maxLength="100"
                  autoComplete="email"
                  placeholder="votre@email.com"
                />
                <span
                  className="quote-form__error"
                  id="devis-email-error"
                ></span>
              </div>
            </div>
            <div className="quote-form__row">
              <div className="quote-form__group">
                <label htmlFor="devis-telephone">Téléphone</label>
                <input
                  type="tel"
                  id="devis-telephone"
                  name="telephone"
                  maxLength="20"
                  autoComplete="tel"
                  placeholder="+212 6XX-XXXXXX"
                />
                <span
                  className="quote-form__error"
                  id="devis-telephone-error"
                ></span>
              </div>
              <div className="quote-form__group">
                <label htmlFor="devis-entreprise">Entreprise</label>
                <input
                  type="text"
                  id="devis-entreprise"
                  name="entreprise"
                  maxLength="100"
                  autoComplete="organization"
                  placeholder="Nom de votre entreprise"
                />
                <span
                  className="quote-form__error"
                  id="devis-entreprise-error"
                ></span>
              </div>
            </div>
            <div className="quote-form__group quote-form__group--full">
              <label htmlFor="devis-message">Message *</label>
              <textarea
                id="devis-message"
                name="message"
                rows="4"
                required
                maxLength="1000"
                placeholder="Décrivez votre besoin, quantités souhaitées, contraintes particulières..."
              ></textarea>
              <span
                className="quote-form__error"
                id="devis-message-error"
              ></span>
            </div>
            <div className="quote-form__actions">
              <button
                type="submit"
                className="btn btn--primary btn--large"
                id="devis-submit-btn"
              >
                <span>Envoyer la demande</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="quote-form__notice">
                * Champs obligatoires. Vos données sont protégées conformément
                au RGPD.
              </p>
            </div>
          </form>

          <div
            className="quote-form__success"
            id="quote-success"
            style={{ display: sent ? "flex" : "none" }}
          >
            <div className="quote-form__success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Demande envoyée avec succès !</h3>
            <p>
              Votre demande de devis a été envoyée avec succès. Notre équipe
              vous contactera dans les plus brefs délais.
            </p>
            <button className="btn btn--primary" onClick={close}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
