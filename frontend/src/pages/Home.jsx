import React from "react";
import { Categories } from "../Catalog.jsx";
import Contact from "./Contact.jsx";
export default function Home({
  categories,
  categoryBenefits,
  sendContact,
  contact,
}) {
  return (
    <>
      <section className="hero-slider" id="hero">
        <div className="slider">
          <div className="slide">
            <img
              src="assets/images/slide-hotel.png"
              alt="Isolation phonique hôtel"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="slide">
            <img
              src="assets/images/slide-bureau.png"
              alt="Acoustique espace bureau"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="slide">
            <img
              src="assets/images/slide-usine.png"
              alt="Isolation thermique et acoustique usine"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="slide">
            <img
              src="assets/images/slide-maison.png"
              alt="Maison durable isolée"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-text container">
          <div className="hero-text__inner">
            <h1>Ingénierie acoustique et lutte contre la pollution sonore</h1>
            <p>
              Solutions d'isolation phonique et thermique haute performance —
              conformes aux normes internationales ISO, EN & NM — pour vos
              projets industriels et commerciaux.
            </p>
            <div className="hero-buttons">
              <a href="diagnostic.html" className="btn btn--primary">
                Demandez un devis
              </a>
              <a href="#solutions" className="btn btn--outline">
                Découvrez nos solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions" id="solutions">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nos Expertises</span>
            <h2 className="section-title">
              Solutions d'Isolation de Haute Performance
            </h2>
            <p className="section-description">
              Des produits techniques de pointe pour répondre aux demandes les
              plus strictes
            </p>
          </div>

          <Categories
            categoryBenefits={categoryBenefits}
            categories={categories}
          />
        </div>
      </section>

      <section
        className="how-it-works"
        id="comment-ca-marche"
        aria-label="Notre processus d'isolation"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">Notre Processus</span>
            <h2 className="section-title">Comment ça marche ?</h2>
            <p className="section-description">
              Un processus structuré pour garantir performance, qualité et
              respect des délais — pour vos projets d'isolation acoustique et
              thermique au Maroc.
            </p>
          </div>

          <div className="how-it-works__timeline">
            <div className="timeline-track" aria-hidden="true">
              <div className="timeline-track__line"></div>
            </div>

            <div className="timeline-step" data-step="01">
              <div className="timeline-step__bullet">
                <span className="timeline-step__number">01</span>
                <div className="timeline-step__ring"></div>
              </div>
              <div className="timeline-step__card">
                <div className="timeline-step__icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 5.55228 9.44772 6 10 6H14C14.5523 6 15 5.55228 15 5M9 5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="timeline-step__tag">Analyse initiale</span>
                <h3 className="timeline-step__title">
                  Analyse &amp; Étude du Projet
                </h3>
                <p className="timeline-step__description">
                  Le client nous transmet son besoin (plans, cahier des charges,
                  description du chantier). Notre équipe technique analyse les
                  contraintes thermiques et acoustiques, évalue les normes
                  requises — ISO, EN, NM — et définit la solution optimale
                  adaptée à chaque environnement industriel, hôtelier ou
                  tertiaire.
                </p>
                <ul className="timeline-step__checklist">
                  <li>Analyse du cahier des charges</li>
                  <li>Diagnostic acoustique sur site</li>
                  <li>Évaluation normative &amp; réglementaire</li>
                </ul>
              </div>
            </div>

            <div className="timeline-step" data-step="02">
              <div className="timeline-step__bullet">
                <span className="timeline-step__number">02</span>
                <div className="timeline-step__ring"></div>
              </div>
              <div className="timeline-step__card">
                <div
                  className="timeline-step__icon timeline-step__icon--accent"
                  aria-hidden="true"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12L11 14L15 10M20.618 5.984C18.341 5.424 16.342 4.138 14.83 2.373C13.68 4.101 11.845 5.382 9.645 5.914C7.445 6.445 5.165 6.072 3.382 4.887C3.13 5.894 3 6.953 3 8.055C3 13.927 6.907 18.933 12 20.622C17.093 18.933 21 13.927 21 8.055C21 7.01 20.866 5.998 20.618 5.984Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="timeline-step__tag">
                  Proposition technique
                </span>
                <h3 className="timeline-step__title">
                  Proposition Technique &amp; Validation
                </h3>
                <p className="timeline-step__description">
                  Nous élaborons une solution complète intégrant le choix des
                  matériaux (laine de roche haute densité, panneaux acoustiques,
                  systèmes d'isolation composites), le dimensionnement et
                  l'optimisation des coûts. Un devis détaillé est transmis au
                  client. Après validation, nous planifions l'approvisionnement
                  et l'intervention.
                </p>
                <ul className="timeline-step__checklist">
                  <li>Sélection des matériaux certifiés</li>
                  <li>Devis transparent et détaillé</li>
                  <li>Planification et approvisionnement</li>
                </ul>
              </div>
            </div>

            <div className="timeline-step" data-step="03">
              <div className="timeline-step__bullet">
                <span className="timeline-step__number">03</span>
                <div className="timeline-step__ring"></div>
              </div>
              <div className="timeline-step__card">
                <div className="timeline-step__icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span className="timeline-step__tag">Livraison finale</span>
                <h3 className="timeline-step__title">
                  Mise en Œuvre &amp; Livraison
                </h3>
                <p className="timeline-step__description">
                  Nous assurons la coordination logistique, la livraison des
                  matériaux sur site et, si requis, le suivi technique complet
                  du chantier. L'objectif : garantir performance thermique
                  optimale, correction acoustique mesurable et respect strict
                  des délais — partout au Maroc.
                </p>
                <ul className="timeline-step__checklist">
                  <li>Coordination logistique nationale</li>
                  <li>Suivi technique de chantier</li>
                  <li>Réception &amp; garantie de performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-us" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Notre Différence</span>
            <h2 className="section-title">Pourquoi Choisir Isolmaroc ?</h2>
            <p className="section-description">
              Un partenaire de confiance qui allie expertise technique, produits
              certifiés et accompagnement personnalisé pour chaque projet.
            </p>
          </div>

          <div className="why-us__stats">
            <div className="stat-item">
              <span className="stat-number">
                15<span className="stat-plus">+</span>
              </span>
              <span className="stat-label">Années d'expertise</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                500<span className="stat-plus">+</span>
              </span>
              <span className="stat-label">Projets réalisés</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                98<span className="stat-plus">%</span>
              </span>
              <span className="stat-label">Clients satisfaits</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">ISO</span>
              <span className="stat-label">Certifié 9001:2015</span>
            </div>
          </div>

          <div className="why-us__grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">Expertise Technique</h3>
                <p className="feature-card__description">
                  Plus de 5 ans d'expérience en isolation acoustique et
                  thermique pour projets industriels et commerciaux les plus
                  exigeants au Maroc et à l'international.
                </p>
                <ul className="feature-card__list">
                  <li>Ingénieurs acousticiens certifiés</li>
                  <li>Études et mesures sur site</li>
                  <li>Conseil personnalisé gratuit</li>
                </ul>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--accent">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20M16 13H8M16 17H8M10 9H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">Solutions Sur Mesure</h3>
                <p className="feature-card__description">
                  Chaque projet est unique. Nous concevons des solutions
                  personnalisées, de l'analyse acoustique initiale jusqu'à la
                  livraison clé en main, adaptées à vos contraintes.
                </p>
                <ul className="feature-card__list">
                  <li>Audit acoustique & thermique</li>
                  <li>Plans et simulations 3D</li>
                  <li>Installation par nos équipes</li>
                </ul>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">
                  Conformité Internationale
                </h3>
                <p className="feature-card__description">
                  Nos produits respectent strictement les normes ISO, CE et les
                  réglementations environnementales. Vous bénéficiez de
                  garanties solides sur chaque solution installée.
                </p>
                <ul className="feature-card__list">
                  <li>Certifications ISO 9001:2015</li>
                  <li>Produits marquage CE</li>
                  <li>Normes EN & réglementation NM</li>
                </ul>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--accent">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">Accompagnement Complet</h3>
                <p className="feature-card__description">
                  Une équipe dédiée vous accompagne de la première consultation
                  à la réception des travaux, avec un suivi post-installation et
                  un support technique réactif.
                </p>
                <ul className="feature-card__list">
                  <li>Interlocuteur unique dédié</li>
                  <li>Suivi de chantier en temps réel</li>
                  <li>SAV & maintenance inclus</li>
                </ul>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">Délais Maîtrisés</h3>
                <p className="feature-card__description">
                  Nous respectons vos délais grâce à une organisation rigoureuse
                  et un stock local permanent. Livraison rapide pour ne jamais
                  bloquer votre planning de chantier.
                </p>
                <ul className="feature-card__list">
                  <li>Stock disponible immédiatement</li>
                  <li>Livraison sur toute l'étendue nationale</li>
                  <li>Planning respecté à 98%</li>
                </ul>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--accent">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12H22M12 2C9.33 6.67 8 9.33 8 12C8 14.67 9.33 17.33 12 22C14.67 17.33 16 14.67 16 12C16 9.33 14.67 6.67 12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">
                  Partenariats Internationaux
                </h3>
                <p className="feature-card__description">
                  Grâce à nos partenariats avec les plus grands fabricants
                  mondiaux, nous importons des matériaux de haute technologie
                  inaccessibles sur le marché local.
                </p>
                <ul className="feature-card__list">
                  <li>Fournisseurs européens certifiés</li>
                  <li>Produits exclusifs au Maroc</li>
                  <li>Rapport qualité/prix imbattable</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="why-us__reassurance">
            <p className="why-us__reassurance-text">
              Rejoignez les <strong>500+ entreprises et industries</strong> qui
              font confiance à Isolmaroc pour leurs projets d'isolation au
              Maroc.
            </p>
            <a href="#contact" className="btn btn--primary">
              Obtenir un devis gratuit
            </a>
          </div>
        </div>
      </section>

      <section className="sectors" id="secteurs">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nos Marchés</span>
            <h2 className="section-title">Secteurs d'Intervention</h2>
            <p className="section-description">
              Des solutions adaptées à chaque environnement professionnel
            </p>
          </div>

          <div className="sectors__grid">
            <div className="sector-card">
              <img
                src="assets/images/Sectors Section/sector-construction.png"
                alt="Construction"
                loading="lazy"
              />
              <div className="sector-card__overlay">
                <h3>Construction</h3>
                <p>
                  Bâtiments résidentiels et commerciaux de haute performance
                </p>
              </div>
            </div>

            <div className="sector-card">
              <img
                src="assets/images/Sectors Section/sector-industrie.png"
                alt="Industrie"
                loading="lazy"
              />
              <div className="sector-card__overlay">
                <h3>Industrie</h3>
                <p>Usines, ateliers et installations de production</p>
              </div>
            </div>

            <div className="sector-card">
              <img
                src="assets/images/Sectors Section/sector-bureaux.png"
                alt="Bureaux"
                loading="lazy"
              />
              <div className="sector-card__overlay">
                <h3>Bureaux</h3>
                <p>Espaces de travail modernes et confortables</p>
              </div>
            </div>

            <div className="sector-card">
              <img
                src="assets/images/Sectors Section/sector-conference.png"
                alt="Salles de conférence"
                loading="lazy"
              />
              <div className="sector-card__overlay">
                <h3>Salles de Conférence</h3>
                <p>Acoustique optimale pour communications professionnelles</p>
              </div>
            </div>

            <div className="sector-card">
              <img
                src="assets/images/Sectors Section/sector-hopitaux.png"
                alt="Hôpitaux"
                loading="lazy"
              />
              <div className="sector-card__overlay">
                <h3>Hôpitaux</h3>
                <p>Environnements médicaux calmes et sécurisés</p>
              </div>
            </div>

            <div className="sector-card">
              <img
                src="assets/images/Sectors Section/sector-datacenter.png"
                alt="Data Centers"
                loading="lazy"
              />
              <div className="sector-card__overlay">
                <h3>Data Centers</h3>
                <p>Contrôle thermique et acoustique de précision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Actualités & Conseils</span>
            <h2 className="section-title">Le Blog de l'Isolation</h2>
            <p className="section-description">
              Découvrez nos derniers articles sur l'isolation phonique et
              thermique.
            </p>
          </div>

          <div className="blog__grid">
            <article className="blog-card">
              <div className="blog-card__image">
                <img
                  src="assets/images/slide-bureau.png"
                  alt="Isolation phonique bureau"
                  loading="lazy"
                />
                <div className="blog-card__category">Bureaux</div>
              </div>
              <div className="blog-card__content">
                <div className="blog-card__meta">
                  <span className="blog-card__date">15 Février 2026</span>
                  <span className="blog-card__author">
                    Par Expert Acoustique
                  </span>
                </div>
                <h3 className="blog-card__title">
                  L'importance de l'isolation phonique dans les espaces de
                  travail modernes
                </h3>
                <p className="blog-card__excerpt">
                  Le bruit est l'une des principales sources de distraction en
                  entreprise. Découvrez comment une bonne isolation acoustique
                  améliore la productivité et le bien-être des collaborateurs.
                </p>
                <div className="blog-card__text hidden">
                  <p>
                    Dans les open-spaces modernes, le confort acoustique est
                    souvent négligé. Pourtant, des études montrent qu'un
                    environnement bruyant peut réduire la productivité de 66%.
                    Les conversations intelligibles sont les plus perturbantes.
                  </p>
                  <h4>Les solutions efficaces</h4>
                  <p>
                    L'installation de panneaux acoustiques muraux et de plafonds
                    absorbants permet de réduire significativement la
                    réverbération. Le cloisonnement acoustique vitré offre
                    également un compromis idéal entre luminosité et calme.
                  </p>
                  <h4>Réglementation</h4>
                  <p>
                    Au Maroc comme à l'international, des normes régissent les
                    niveaux sonores acceptables. Pour un bureau, le niveau
                    recommandé se situe entre 35 et 45 dB(A).
                  </p>
                </div>
                <button className="btn-text read-more-btn">
                  Lire la suite
                </button>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-card__image">
                <img
                  src="assets/images/solution-images/panneaux-acoustiques.png"
                  alt="Isolation vs Correction acoustique"
                  loading="lazy"
                />
                <div className="blog-card__category">Technique</div>
              </div>
              <div className="blog-card__content">
                <div className="blog-card__meta">
                  <span className="blog-card__date">10 Février 2026</span>
                  <span className="blog-card__author">
                    Par Ingénieur Isolmaroc
                  </span>
                </div>
                <h3 className="blog-card__title">
                  Isolation vs Correction Acoustique : Quelle différence ?
                </h3>
                <p className="blog-card__excerpt">
                  On confond souvent isolation et correction acoustique.
                  Pourtant, ces deux traitements répondent à des problématiques
                  très différentes. Explications de nos experts.
                </p>
                <div className="blog-card__text hidden">
                  <p>
                    Il est crucial de bien identifier votre besoin avant
                    d'entamer des travaux.
                  </p>
                  <h4>L'Isolation Acoustique (Phonique)</h4>
                  <p>
                    Elle vise à{" "}
                    <strong>empêcher le bruit d'entrer ou de sortir</strong>{" "}
                    d'une pièce. Elle traite la transmission du son à travers
                    les parois (murs, fenêtres, portes). C'est la solution pour
                    ne pas entendre ses voisins ou les bruits extérieurs.
                  </p>
                  <h4>La Correction Acoustique</h4>
                  <p>
                    Elle vise à{" "}
                    <strong>améliorer la qualité sonore à l'intérieur</strong>{" "}
                    d'une pièce en réduisant l'écho et la réverbération. Elle
                    utilise des matériaux absorbants pour rendre le son plus
                    clair et l'ambiance plus feutrée.
                  </p>
                </div>
                <button className="btn-text read-more-btn">
                  Lire la suite
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Contact contact={contact} sendContact={sendContact} />
    </>
  );
}
