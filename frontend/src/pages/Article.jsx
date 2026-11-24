import React from "react";

export default function Article() {
  return (
    <>
      <main className="container">
        <header className="article-header">
          <div className="article-header__meta">
            Isolation Acoustique • 15 Février 2026
          </div>
          <h1 className="article-header__title">
            L'importance de l'isolation phonique dans les espaces de travail
            modernes
          </h1>
        </header>

        <img
          src="assets/images/slide-bureau.png"
          alt="Espace de travail isolé"
          className="article-hero-img"
        />

        <div className="article-body">
          <p>
            Dans les open-spaces modernes, le confort acoustique est souvent
            négligé au profit du design visuel. Pourtant, le bruit est cité par{" "}
            <strong>80% des collaborateurs</strong> comme la première source de
            nuisance au travail.
          </p>

          <h2>Pourquoi traiter l'acoustique de vos bureaux ?</h2>
          <p>
            Un environnement bruyant n'est pas seulement désagréable ; il a un
            impact direct sur la performance de l'entreprise. Des études
            montrent qu'une ambiance sonore non maîtrisée peut réduire la
            productivité de 66% lors de tâches nécessitant une concentration
            soutenue.
          </p>

          <p>
            Les conversations intelligibles des collègues sont la source de
            distraction la plus perturbante. À l'inverse, un espace bien traité
            favorise :
          </p>
          <ul>
            <li>Une meilleure concentration et moins de fatigue mentale.</li>
            <li>Une confidentialité accrue des échanges.</li>
            <li>Une réduction du stress lié au bruit ambiant.</li>
          </ul>

          <img
            src="assets/images/Sectors Section/sector-bureaux.png"
            alt="Exemple de bureau acoustique"
          />

          <h2>Les solutions techniques recommandées au Maroc</h2>
          <p>
            Chez Isolmaroc, nous intervenons sur deux axes complémentaires :
            l'isolation (empêcher le bruit de traverser les parois) et la
            correction (réduire l'écho à l'intérieur de la pièce).
          </p>

          <h3>1. Cloisonnement acoustique</h3>
          <p>
            L'installation de cloisons amovibles à haute performance phonique
            permet de créer des bulles de silence sans dénaturer l'espace. Nos
            solutions certifiées permettent des gains allant de 35 dB à 55 dB.
          </p>

          <h3>2. Plafonds et panneaux absorbants</h3>
          <p>
            L'utilisation de matériaux poreux ou fibreux (comme la laine de
            roche spécialisée) en plafond ou en panneaux muraux design permet de
            casser la réverbération du son.
          </p>

          <div
            className="sidebar-widget newsletter-widget"
            style={{ margin: "40px 0" }}
          >
            <h3 className="widget-title">Documentation acoustique</h3>
            <p>
              Découvrez toutes les normes et solutions pour l'acoustique
              tertiaire au Maroc.
            </p>
            <a
              href="mailto:contact@isolmaroc.ma?subject=Documentation%20acoustique"
              className="doc-download"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <polyline points="9 15 12 12 15 15"></polyline>
              </svg>
              <div>
                <strong>Demander la documentation</strong>
                <br />
                <small>Contacter notre équipe par email</small>
              </div>
            </a>
          </div>

          <h2>Réglementation et Normes</h2>
          <p>
            Au Maroc, nous nous appuyons sur la réglementation NM et les
            standards internationaux ISO 3382 pour mesurer le temps de
            réverbération optimal selon l'usage de la salle (réunion, salle de
            conférence, open-space).
          </p>

          <p>
            Vous avez un projet d'aménagement ? Nos ingénieurs acousticiens
            réalisent des mesures sur site pour vous proposer un diagnostic
            précis.
          </p>

          <div style={{ marginTop: "60px", textAlign: "center" }}>
            <a
              href="index.html#contact"
              className="btn btn--primary btn--large"
            >
              Étude technique gratuite
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
