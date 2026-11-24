import React from "react";

export default function CatalogHero({ cat, title }) {
  return (
    <>
      <section className="category-hero" id="category-hero">
        <div className="category-hero__bg">
          <img
            id="category-hero-img"
            src={cat?.image || "assets/images/slide-bureau.png"}
            alt={title}
            loading="eager"
          />
          <div className="category-hero__overlay"></div>
        </div>
        <div className="container category-hero__content">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <a href="index.html">Accueil</a>
            <span className="breadcrumb__sep">›</span>
            <a href="index.html#solutions">Solutions</a>
            <span className="breadcrumb__sep">›</span>
            <span id="breadcrumb-category" className="breadcrumb__current">
              {title}
            </span>
          </nav>
          <div className="category-hero__badge" id="category-badge">
            {cat?.badge}
          </div>
          <h1 id="category-title" className="category-hero__title">
            {title}
          </h1>
          <p id="category-description" className="category-hero__desc">
            {cat?.description}
          </p>
        </div>
      </section>
    </>
  );
}
