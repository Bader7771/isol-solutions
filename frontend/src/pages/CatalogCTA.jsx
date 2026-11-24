import React from "react";

export default function CatalogCTA() {
  return (
    <>
      <section className="category-cta">
        <div className="container">
          <div className="category-cta__wrapper">
            <div className="category-cta__text">
              <h2>Vous ne trouvez pas le produit qu'il vous faut ?</h2>
              <p>
                Notre équipe technique peut vous proposer une solution sur
                mesure adaptée à vos contraintes.
              </p>
            </div>
            <a
              href="index.html#contact"
              className="btn btn--primary btn--large"
            >
              Contactez nos experts
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
