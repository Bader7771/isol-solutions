import React from "react";

export default function Header() {
  return (
    <>
      <header className="header" id="site-header">
        <nav className="nav container">
          <div className="nav__logo">
            <a href="index.html">
              <img src="assets/images/LOGO.png" alt="Isolmaroc" width="200" />
            </a>
          </div>
          <button
            className="nav__toggle"
            id="nav-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded="false"
          >
            <span className="nav__toggle-bar"></span>
            <span className="nav__toggle-bar"></span>
            <span className="nav__toggle-bar"></span>
          </button>
          <ul className="nav__menu" id="nav-menu">
            <li>
              <a href="index.html#solutions" className="nav__link">
                Solutions
              </a>
            </li>
            <li>
              <a href="index.html#about" className="nav__link">
                Pourquoi nous
              </a>
            </li>
            <li>
              <a href="index.html#secteurs" className="nav__link">
                Secteurs
              </a>
            </li>
            <li>
              <a href="catalogue.html" className="nav__link">
                Catalogue
              </a>
            </li>
            <li>
              <a href="blog.html" className="nav__link">
                Blog
              </a>
            </li>
            <li>
              <a href="index.html#contact" className="nav__link nav__link--cta">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
