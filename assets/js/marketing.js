import { SERVICES } from "./company-content.js";
import { heroMarkup } from "./hero.js";
import { optimizedImage, imageSet } from "./images.js";
import { CONTACT, emailURL } from "./config.js";
import {
  escapeHTML as esc,
  icon,
  productCard,
  quoteLink,
  materialShowcase,
} from "./components.js";
export const projectCTA = () =>
  `<section class="project-cta wrap" data-reveal><div><p class="eyebrow">Votre projet, notre point de départ</p><h2>La bonne solution<br>commence par un échange.</h2></div><div><p>Vos plans, vos contraintes, vos idées.<br>Construisons une réponse adaptée.</p>${quoteLink(null, "Parlons de votre projet", "button button-primary")}<a href="contact.html" class="text-link">Ou présentez-nous votre besoin</a></div></section>`;
export function homeMarkup(data) {
  const { categories, products } = data;
  const featured = Object.keys(categories)
    .slice(0, 4)
    .map((id) => products.find((p) => p.category_id === id));
  return `${heroMarkup()}
 <section class="category-section wrap" id="solutions" data-reveal><div class="section-heading"><div><p class="eyebrow">À chaque besoin, sa matière</p><h2>Explorez nos gammes.</h2></div><a href="catalogue.html" class="text-link">Tout le catalogue ${icon("chevron")}</a></div><div class="category-grid">${Object.values(
   categories,
 )
   .map(
     (c) =>
       `<a class="category-card" href="categorie.html?cat=${c.category_id}"><div class="category-image"><img src="${optimizedImage(c.image)}" alt="${esc(c.title)}" width="240" height="240" loading="lazy"></div><div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><span>${c.product_count} produits ${icon("chevron")}</span></div></a>`,
   )
   .join("")}</div></section>
 <section class="section featured-section wrap" data-reveal><div class="section-heading"><div><p class="eyebrow">La sélection Isolmaroc</p><h2>Des matériaux qui font<br>la différence.</h2></div><p>Acoustique, thermique, industrie.<br>Trouvez votre point de départ.</p></div><div class="featured-grid">${featured.map((p) => productCard(p, categories)).join("")}</div></section>
 <section class="expertise-section wrap" id="expertise" data-reveal><div class="expertise-heading"><p class="eyebrow">Bien plus que des matériaux</p><h2>L’expertise qui relie<br>votre besoin à sa solution.</h2><p>Des projets industriels aux espaces de vie et de travail, nous vous accompagnons dans le choix des matériaux, l’étude technique et la livraison.</p></div><div class="expertise-content"><div class="expertise-photo"><img src="${optimizedImage("assets/images/Sectors Section/sector-bureaux.png")}" alt="Traitement acoustique d’un espace de travail" width="700" height="520" loading="lazy"><span>Penser le confort. Concevoir la performance.</span></div><div class="service-stack">${SERVICES.map(
   (service) =>
     `<a class="service-item" href="services.html#${service.id}">${icon(service.icon)}<div><h3>${service.title}</h3><p>${service.description}</p></div></a>`,
 ).join(
   "",
 )}</div></div><div class="expertise-bottom"><span>${icon("check")} Accompagnement sur mesure</span><span>${icon("check")} Matériaux techniques</span><span>${icon("check")} Livraison nationale</span><a href="services.html" class="text-link">Notre accompagnement en détail</a></div></section>
 <section class="section wrap sectors-section" id="secteurs" data-reveal><div class="section-heading"><div><p class="eyebrow">Les espaces changent. L’exigence reste.</p><h2>Votre environnement,<br>notre terrain d’expertise.</h2></div></div><div class="sectors-grid">${[
   [
     "Construction",
     "sector-construction.png",
     "Bâtiments résidentiels & commerciaux",
   ],
   ["Industrie", "sector-industrie.png", "Usines & équipements"],
   ["Hôtellerie", "../slide-hotel.png", "Chambres & espaces communs"],
   ["Hôpitaux", "sector-hopitaux.png", "Environnements de soins"],
   ["Bureaux", "sector-bureaux.png", "Espaces de travail"],
   ["Data centers", "sector-datacenter.png", "Installations techniques"],
 ]
   .map(
     ([title, path, description]) =>
       `<a class="sector-tile" href="#contact"><img src="${optimizedImage(path.startsWith("../") ? `assets/images/${path.slice(3)}` : `assets/images/Sectors Section/${path}`)}" width="220" height="170" alt="${title}" loading="lazy"><div><h3>${title}</h3><p>${description}</p></div>${icon("chevron")}</a>`,
   )
   .join("")}</div></section>
 ${projectCTA()}${contactMarkup()}`;
}

export function contactMarkup({ standalone = false } = {}) {
  return `<section class="section wrap contact-section" id="contact" data-reveal><div><p class="eyebrow">Parlons de votre projet</p><${standalone ? "h1" : "h2"}>Parlons concrètement<br>de votre projet.</${standalone ? "h1" : "h2"}><p>Un besoin précis, un cahier des charges ou une question technique ? Notre équipe est à votre écoute.</p><div class="contact-information"><a href="mailto:${CONTACT.email}">${icon("email")} ${CONTACT.email}</a><a href="tel:+${CONTACT.whatsapp}">${icon("whatsapp")} +212 619 949 817</a><p>${icon("pin")} ${CONTACT.address}</p></div></div><form id="contact-form" class="project-form"><h3>Présentez-nous votre projet</h3><div class="form-row"><label>Nom complet <span>*</span><input name="name" autocomplete="name" required maxlength="100" placeholder="Votre nom"></label><label>Entreprise<input name="company" autocomplete="organization" maxlength="100" placeholder="Votre entreprise"></label></div><div class="form-row"><label>Email professionnel <span>*</span><input name="email" type="email" autocomplete="email" required maxlength="150" placeholder="vous@entreprise.ma"></label><label>Téléphone<input name="phone" type="tel" autocomplete="tel" maxlength="30" placeholder="Votre numéro"></label></div><label>Votre projet <span>*</span><textarea name="message" required minlength="10" maxlength="5000" rows="4" placeholder="Type de projet, matériaux recherchés, contraintes techniques…"></textarea></label><label class="consent-label"><input name="consent" type="checkbox" required><span>J’accepte que mes informations soient utilisées pour me recontacter concernant ma demande. <a href="confidentialite.html">Confidentialité</a></span></label><button class="button button-primary" type="submit">Envoyer ma demande</button><p class="form-status" role="status" aria-live="polite"></p><p class="form-note">Vous préférez votre messagerie ? <a href="${esc(emailURL())}">Nous écrire par email</a></p></form></section>`;
}
