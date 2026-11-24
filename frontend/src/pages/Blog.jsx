import React from "react";

export default function Blog() {
  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero__content">
            <span className="section-label">Expertise & Innovation</span>
            <h1 className="blog-hero__title">
              Le Blog de l'Isolation Professionnelle
            </h1>
            <p className="blog-hero__description">
              Retrouvez nos analyses techniques, études de cas et conseils
              d'experts pour vos projets d'isolation au Maroc.
            </p>
          </div>
        </div>
      </section>

      <main className="blog-main container">
        <div className="blog-layout">
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h3 className="widget-title">Recherche</h3>
              <form className="search-form">
                <input type="text" placeholder="Mots-clés..." />
                <button type="submit">OK</button>
              </form>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                Catégories
              </h3>
              <ul className="widget-list widget-list--pills">
                <li className="active">
                  <a href="blog.html" data-topic="">
                    Toutes les catégories <span>4</span>
                  </a>
                </li>
                <li>
                  <a href="blog.html" data-topic="thermique">
                    Isolation Thermique
                  </a>
                </li>
                <li>
                  <a href="blog.html" data-topic="acoustique">
                    Isolation Acoustique
                  </a>
                </li>
                <li>
                  <a href="blog.html" data-topic="transport">
                    Logistique & Transport
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="blog-content">
            <div className="blog-content__search">
              <form className="search-form search-form--wide">
                <input
                  type="text"
                  placeholder="Rechercher par sujet, mot-clé ou article..."
                />
                <button type="submit">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            </div>

            <div className="blog-stats">
              <p>
                <strong>4</strong> articles disponibles
              </p>
            </div>

            <article className="blog-card blog-card--featured">
              <div className="blog-card__image">
                <img
                  src="assets/images/slide-bureau.png"
                  alt="Isolation phonique bureau"
                />
                <span className="badge badge--featured">À la une</span>
              </div>
              <div className="blog-card__content">
                <h2 className="blog-card__title">
                  L'importance de l'isolation phonique dans les espaces de
                  travail modernes
                </h2>
                <p className="blog-card__excerpt">
                  Le bruit est l'une des principales sources de distraction en
                  entreprise. Découvrez comment une bonne isolation acoustique
                  améliore la productivité et le bien-être des collaborateurs au
                  Maroc.
                </p>
                <div className="blog-card__footer">
                  <div className="blog-card__meta">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>2 min</span>
                  </div>
                  <a
                    href="article-isolation-phonique.html"
                    className="blog-card__link"
                  >
                    Lire l'article
                    <span>→</span>
                  </a>
                </div>
              </div>
            </article>

            <div className="blog-grid blog-grid--refined">
              <article className="blog-card">
                <div className="blog-card__image">
                  <img
                    src="assets/images/solution-images/panneaux-acoustiques.png"
                    alt="Isolation vs Correction acoustique"
                  />
                </div>
                <div className="blog-card__content">
                  <h2 className="blog-card__title">
                    Isolation vs Correction Acoustique : Quelle différence ?
                  </h2>
                  <p className="blog-card__excerpt">
                    Comprendre la différence entre isolation et correction est
                    crucial pour la réussite de vos projets acoustiques.
                  </p>
                  <div className="blog-card__footer">
                    <div className="blog-card__meta">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>2 min</span>
                    </div>
                    <a href="contact.html" className="blog-card__link">
                      Lire <span>→</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="blog-card">
                <div className="blog-card__image">
                  <img
                    src="assets/images/Sectors Section/sector-industrie.png"
                    alt="Isolation thermique industrielle"
                  />
                </div>
                <div className="blog-card__content">
                  <h2 className="blog-card__title">
                    Structurer l'isolation vers une croissance durable
                  </h2>
                  <p className="blog-card__excerpt">
                    Comment la laine de roche haute performance réduit vos coûts
                    opérationnels et votre empreinte carbone.
                  </p>
                  <div className="blog-card__footer">
                    <div className="blog-card__meta">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>2 min</span>
                    </div>
                    <a href="contact.html" className="blog-card__link">
                      Lire <span>→</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className="blog-card">
                <div className="blog-card__image">
                  <img
                    src="assets/images/Sectors Section/sector-industrie.png"
                    alt="Logistique"
                  />
                </div>
                <div className="blog-card__content">
                  <h2 className="blog-card__title">
                    Transport et dédouanement : facteur clé de performance
                  </h2>
                  <p className="blog-card__excerpt">
                    Le transport international et le dédouanement sont des
                    étapes clés de l'importation de matériaux d'isolation.
                  </p>
                  <div className="blog-card__footer">
                    <div className="blog-card__meta">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>2 min</span>
                    </div>
                    <a href="contact.html" className="blog-card__link">
                      Lire <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
