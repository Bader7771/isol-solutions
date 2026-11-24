import React from "react";

export default function Footer({ contact, categories }) {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__section">
              <div className="footer__logo-wrapper">
                <svg
                  className="footer__logo-icon"
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 15 Q 12.5 10, 20 15 T 35 15 T 45 15"
                    stroke="url(#blueGradFooter)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 25 Q 12.5 20, 20 25 T 35 25 T 45 25"
                    stroke="url(#redGradFooter)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 35 Q 12.5 30, 20 35 T 35 35 T 45 35"
                    stroke="url(#blueGradFooter)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="blueGradFooter"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#0047AB", stopOpacity: "1" }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#1a5bc4", stopOpacity: "1" }}
                      />
                    </linearGradient>
                    <linearGradient
                      id="redGradFooter"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#DC143C", stopOpacity: "1" }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#E63956", stopOpacity: "1" }}
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <h3 className="footer__logo">ISOLMAROC</h3>
              </div>
              <p className="footer__description">
                Solutions d'isolation acoustique et thermique de haute
                performance pour professionnels exigeants.
              </p>
              {["instagram", "facebook"]
                .filter((k) => contact[k])
                .map((k) => (
                  <a key={k} href={contact[k]}>
                    {k}
                  </a>
                ))}
            </div>

            <div className="footer__section">
              <h4 className="footer__title">Liens Rapides</h4>
              <ul className="footer__links">
                <li>
                  <a href="index.html#solutions">Nos Solutions</a>
                </li>
                <li>
                  <a href="index.html#about">Pourquoi nous</a>
                </li>
                <li>
                  <a href="index.html#secteurs">Secteurs</a>
                </li>
                <li>
                  <a href="index.html#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4 className="footer__title">Solutions</h4>
              <ul className="footer__links">
                {Object.values(categories).map((c) => (
                  <li key={c.category_id}>
                    <a href={"categorie.html?cat=" + c.category_id}>
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__section">
              <h4 className="footer__title">Certifications</h4>
              <ul className="footer__certifications">
                <li>ISO 9001:2015</li>
                <li>CE Conformité</li>
                <li>Normes EN</li>
                <li>RGPD Compliant</li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <p>&copy; 2026 Isolmaroc. Tous droits réservés.</p>
            <div className="footer__legal">
              <a href="apropos.html">À propos</a> ·{" "}
              <a href="services.html">Services</a> ·{" "}
              <a href="confidentialite.html">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
