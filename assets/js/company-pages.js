import { CONTACT, whatsappURL, emailURL } from "./config.js";
import { optimizedImage } from "./images.js";
import { escapeHTML as esc, icon, quoteLink } from "./components.js";
import { contactMarkup, projectCTA } from "./marketing.js";
import { SERVICES } from "./company-content.js";
const crumbs = (label) =>
  `<nav class="breadcrumb wrap" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a><span>/</span><span aria-current="page">${label}</span></nav>`;
export function aboutMarkup(data) {
  return `${crumbs("Notre expertise")}<section class="company-intro wrap"><div><p class="eyebrow">Isolmaroc · Isolsolutions</p><h1>Le bon matériau.<br>Le bon conseil.</h1><p class="company-lead">Des solutions acoustiques et thermiques pensées pour les professionnels, les bâtiments et les équipements.</p><a href="services.html" class="button button-primary">Découvrir nos services</a></div><figure><img src="${optimizedImage("assets/images/Sectors Section/sector-industrie.png")}" alt="Environnement industriel et installations techniques" width="1000" height="900" fetchpriority="high"><figcaption>Des exigences techniques. Une réponse adaptée.</figcaption></figure></section><section class="company-story wrap" data-reveal><p class="eyebrow">Notre rôle</p><div><h2>Comprendre votre projet.<br>Construire sa solution.</h2><p>Isolmaroc / Isolsolutions accompagne les professionnels dans leurs projets d’isolation acoustique et thermique au Maroc et à l’international. Notre approche associe l’étude du besoin, la sélection des matériaux et l’accompagnement technique.</p><p>Du confort d’un espace de travail à la maîtrise du bruit industriel, nous étudions les contraintes de votre environnement pour proposer une réponse adaptée.</p></div><dl class="company-facts"><div><dt>Solutions au catalogue</dt><dd>${data.products.length}</dd></div><div><dt>Gammes de produits</dt><dd>${Object.keys(data.categories).length}</dd></div><div><dt>Notre point de contact</dt><dd class="fact-place">${CONTACT.address}</dd></div></dl></section><section class="section wrap" data-reveal><div class="section-heading"><div><p class="eyebrow">Une expertise, plusieurs terrains</p><h2>Du bâtiment à l’industrie.</h2></div><a class="text-link" href="catalogue.html">Parcourir les matériaux ${icon("chevron")}</a></div><div class="company-pillars">${SERVICES.map((s) => `<a href="services.html#${s.id}">${icon(s.icon)}<h3>${s.title}</h3><p>${s.description}</p><span>Explorer ce service ${icon("chevron")}</span></a>`).join("")}</div></section>${projectCTA()}`;
}
export function servicesMarkup() {
  return `${crumbs("Nos services")}<section class="services-intro wrap"><p class="eyebrow">Un accompagnement technique complet</p><h1>De la première question<br>au dernier matériau.</h1><p>Étude, conseil et approvisionnement : un parcours clair pour vos projets d’isolation acoustique et thermique.</p><nav class="service-shortcuts" aria-label="Nos services">${SERVICES.map((s) => `<a href="#${s.id}">${icon(s.icon)}${s.title}</a>`).join("")}</nav></section><div class="service-editorials wrap">${SERVICES.map((s, i) => `<section class="service-editorial ${i % 2 ? "is-reversed" : ""}" id="${s.id}" data-reveal><div class="service-editorial-image"><img src="${optimizedImage(s.image)}" alt="${esc(s.title)}" width="900" height="700" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div><div><span class="service-icon">${icon(s.icon)}</span><h2>${s.title}</h2><p>${s.body}</p><ul>${s.points.map((point) => `<li>${icon("check")}${point}</li>`).join("")}</ul><a class="button button-primary" href="contact.html?service=${encodeURIComponent(s.title)}">Parlons de votre besoin</a></div></section>`).join("")}</div>${projectCTA()}`;
}
export function contactPageMarkup() {
  return `${crumbs("Votre projet")}<div class="contact-page">${contactMarkup({ standalone: true })}</div><section class="contact-paths wrap"><a href="${esc(whatsappURL())}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<div><h2>Un échange direct</h2><p>Présentez votre besoin à notre équipe sur WhatsApp.</p></div>${icon("chevron")}</a><a href="${esc(emailURL())}">${icon("email")}<div><h2>Un cahier des charges à partager</h2><p>${CONTACT.email}</p></div>${icon("chevron")}</a></section>`;
}
export function companyPageMarkup(page, data) {
  return {
    about: () => aboutMarkup(data),
    services: servicesMarkup,
    contact: contactPageMarkup,
  }[page]();
}
