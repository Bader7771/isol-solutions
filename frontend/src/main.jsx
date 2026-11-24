import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  fetchCatalog,
  fetchCompany,
  fetchProduct,
  submitQuote,
  submitContact,
} from "./api";
import { whatsappURL } from "./config";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Announcement from "./pages/Announcement";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Catalog from "./Catalog";
import "./styles.css";
import "./controls.css";

const route =
  location.pathname.split("/").pop().replace(".html", "") || "index";
const params = new URLSearchParams(location.search);
function Site({ data, company, p }) {
  const [open, setOpen] = useState(false),
    [sent, setSent] = useState(false);
  const contact = company.contact;
  useEffect(() => {
    import("./interactions");
    if (route === "blog") import("./resources");
    document.title =
      (p?.product_name ||
        data.categories[params.get("cat")]?.title ||
        {
          index: "Isolation acoustique et thermique",
          catalogue: "Catalogue",
          apropos: "À propos",
          services: "Nos services",
          blog: "Ressources",
          contact: "Contact",
          confidentialite: "Confidentialité",
          "article-isolation-phonique": "Isolation phonique",
        }[route] ||
        "Isolmaroc") + " | Isolmaroc";
    document
      .getElementById(decodeURIComponent(location.hash.slice(1)))
      ?.scrollIntoView();
  }, []);
  async function send(e, quote = false) {
    e.preventDefault();
    const form = e.currentTarget,
      button = form.querySelector("[type=submit]");
    if (button.disabled || !form.reportValidity()) return;
    button.disabled = true;
    const v = Object.fromEntries(new FormData(form));
    try {
      if (quote) {
        await submitQuote({ ...v, produit: p.product_name });
        setSent(true);
      } else {
        await submitContact({
          nom: v.name,
          email: v.email,
          telephone: v.phone,
          entreprise: v.company,
          message: v.message,
        });
        alert("Votre demande a été envoyée.");
      }
      form.reset();
    } catch (error) {
      alert(error.message);
    } finally {
      button.disabled = false;
    }
  }
  let page;
  switch (route) {
    case "index":
      page = (
        <Home
          categoryBenefits={company.categoryHighlights}
          contact={contact}
          categories={data.categories}
          sendContact={send}
        />
      );
      break;
    case "categorie":
    case "catalogue":
      page = <Catalog data={data} params={params} />;
      break;
    case "produit":
      page = (
        <Detail
          {...{ p, contact, open, setOpen, sent }}
          related={data.products
            .filter(
              (v) =>
                v.category_id === p.category_id &&
                v.product_id !== p.product_id,
            )
            .slice(0, 3)}
          send={(e) => send(e, true)}
          close={() => {
            setOpen(false);
            setSent(false);
          }}
        />
      );
      break;
    case "blog":
      page = <Blog />;
      break;
    case "article-isolation-phonique":
      page = <Article />;
      break;
    case "confidentialite":
      page = <Privacy />;
      break;
    case "contact":
    case "diagnostic":
      page = (
        <Contact
          contact={contact}
          service={params.get("service") || ""}
          sendContact={send}
        />
      );
      break;
    case "apropos":
    case "services":
      page = (
        <section className="solutions">
          <div className="container">
            <h1 className="section-title">
              {route === "services" ? "Nos services" : "Notre expertise"}
            </h1>
            <p>
              Isolmaroc / Isolsolutions accompagne les professionnels dans leurs
              projets d’isolation acoustique et thermique au Maroc et à
              l’international.
            </p>
            {company.services.map((s) => (
              <article id={s.id} key={s.id} className="solution-card">
                <div className="solution-card__image">
                  <img src={s.image} alt="" />
                </div>
                <div className="solution-card__content">
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                  <ul>
                    {s.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a
                    href={"contact.html?service=" + encodeURIComponent(s.title)}
                  >
                    Parlons de votre besoin
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
      break;
    default:
      page = <p>Page introuvable.</p>;
  }
  return (
    <>
      {route === "index" && <Announcement />}
      <Header />
      {page}
      <Footer contact={contact} categories={data.categories} />
      <a
        href={whatsappURL(p, contact)}
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <img
          src="assets/images/whatsapp.PNG"
          alt="WhatsApp"
          width="60"
          height="60"
        />
      </a>
    </>
  );
}
function App() {
  const [result, setResult] = useState(),
    [error, setError] = useState();
  useEffect(() => {
    Promise.all([
      fetchCatalog(),
      fetchCompany(),
      route === "produit" ? fetchProduct(params.get("id") || "missing") : null,
    ])
      .then(setResult)
      .catch(setError);
  }, []);
  if (error)
    return (
      <main role="alert">
        {error.message}{" "}
        <button onClick={() => location.reload()}>Réessayer</button>{" "}
        <a href="index.html">Accueil</a>
      </main>
    );
  return result ? (
    <Site data={result[0]} company={result[1]} p={result[2]} />
  ) : (
    <p role="status">Chargement…</p>
  );
}
createRoot(document.getElementById("root")).render(<App />);
