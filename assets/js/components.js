import { optimizedImage, imageSet } from "./images.js";
import { CONTACT, whatsappURL, emailURL } from "./config.js";
export const escapeHTML = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
const paths = {
  search: '<circle cx="10.8" cy="10.8" r="7.3"/><path d="m16.2 16.2 4.3 4.3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  filter:
    '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor"/><circle cx="15" cy="17" r="2" fill="currentColor"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  email:
    '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  sound:
    '<path d="m11 4-6 5H2v6h3l6 5V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  shield:
    '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
  plan: '<rect x="4" y="3" width="16" height="19" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  truck:
    '<path d="M3 6h11v11H3V6Zm11 4h4l3 4v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  whatsapp:
    '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.3L3 20.3l1.4-4.7a8.5 8.5 0 1 1 16.1-4Z"/><path d="M8.3 7.2c-.5 0-1.1.7-1 1.8.2 2.8 3.6 6 6.6 6.3 1 .1 1.9-.6 1.9-1.1l-2.2-1.3-1 1c-1.6-.7-2.9-1.9-3.5-3.4l.9-1-1.2-2.3Z"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>',
  facebook:
    '<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>',
};
export const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.layers}</svg>`;
export const productURL = (p) =>
  `produit.html?id=${encodeURIComponent(p.product_id)}`;
export function quoteLink(
  product,
  label = "Demander un devis",
  cls = "button button-primary",
) {
  return `<a class="${cls}" href="${escapeHTML(whatsappURL(product))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(`${label}${product ? ` : ${product.product_name}` : ""} sur WhatsApp`)}">${icon("whatsapp")}${label}</a>`;
}
export function productCard(p, categories) {
  const technical = Object.entries(p.specifications).find(([key]) =>
    /Épaisseur|Conductivité|absorption|affaiblissement|Matière|Température/.test(
      key,
    ),
  );
  return `<article class="product-card"><a class="product-card-image" href="${productURL(p)}" tabindex="-1"><img src="${optimizedImage(p.primary_image)}" srcset="${imageSet(p.primary_image)}" sizes="(max-width:600px) 43vw, (max-width:1000px) 30vw, 23vw" alt="${escapeHTML(p.image_kind === "manufacturer-logo" ? `Logo du fabricant ${p.brand}` : p.product_name)}" width="560" height="440" loading="lazy" decoding="async">${p.image_kind === "manufacturer-logo" ? '<span class="media-caption">Logo du fabricant</span>' : ""}</a><div class="product-card-body"><p class="card-category">${escapeHTML(categories[p.category_id].title)}</p><h3><a href="${productURL(p)}">${escapeHTML(p.product_name)}</a></h3><p class="product-summary">${escapeHTML(p.short_description)}</p>${technical ? `<div class="card-metric"><span>${escapeHTML(technical[0])}</span><strong>${escapeHTML(technical[1])}</strong></div>` : ""}<div class="card-bottom"><a class="card-details" href="${productURL(p)}">Voir la fiche ${icon("chevron")}</a><a class="quote-small" href="${escapeHTML(whatsappURL(p))}" target="_blank" rel="noopener noreferrer" aria-label="Demander un devis : ${escapeHTML(p.product_name)} sur WhatsApp" data-tooltip="Demander un devis">${icon("whatsapp")}</a></div></div></article>`;
}
export function materialShowcase(products, categories) {
  const eligible = products.filter((p) => p.image_kind !== "manufacturer-logo");
  const technical = eligible.filter(
    (p) =>
      p.specifications["Conductivité thermique λ"] &&
      p.technical_documents.length,
  );
  const selected = (technical.length >= 2 ? technical : eligible).slice(-3);
  const featured = selected[0];
  return `<div class="material-showcase">${selected.map((p, i) => `<a class="material-cutout cutout-${i}" href="${productURL(p)}" tabindex="-1" aria-hidden="true"><img src="${optimizedImage(p.primary_image)}" alt="" width="500" height="400" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></a>`).join("")}${featured ? `<a class="material-feature" href="${productURL(featured)}"><img src="${optimizedImage(featured.primary_image)}" width="80" height="80" alt=""><span><strong>${escapeHTML(featured.product_name)}</strong><small>${escapeHTML(categories[featured.category_id].title)}</small></span><span class="feature-action">${icon("chevron")}</span></a>` : ""}</div>`;
}
function socialLinks(cls) {
  return ["instagram", "facebook"]
    .map((key) => {
      const name = key === "instagram" ? "Instagram" : "Facebook";
      const tooltip = CONTACT[key] ? name : `${name} · lien indisponible`;
      return CONTACT[key]
        ? `<a class="${cls}" href="${escapeHTML(CONTACT[key])}" target="_blank" rel="noopener noreferrer" aria-label="${name}" data-platform="${key}" data-tooltip="${name}">${icon(key)}<span class="sr-only">${name}</span></a>`
        : `<button type="button" class="${cls} social-unconfigured" data-platform="${key}" data-tooltip="${tooltip}" aria-label="${tooltip}" data-unconfigured="true">${icon(key)}<span class="sr-only">${tooltip}</span></button>`;
    })
    .join("");
}
export function renderShell(page) {
  document.getElementById("site-header").innerHTML =
    `<header class="site-header"><nav class="navigation wrap" aria-label="Navigation principale"><a class="nav-search" href="catalogue.html#catalog-search" aria-label="Rechercher un produit">${icon("search")}</a><a class="brand" href="index.html" aria-label="Isolsolutions — Accueil"><img src="assets/images/LOGO.png" width="512" height="512" alt="Isolsolutions — Sound & Thermal Insulation"></a><div class="desktop-links"><a href="index.html" ${page === "home" ? 'aria-current="page"' : ""}>Accueil</a><a href="catalogue.html" ${["catalog", "product"].includes(page) ? 'aria-current="page"' : ""}>Produits</a><details class="nav-categories"><summary>Nos gammes ${icon("chevron")}</summary><div class="nav-category-menu" id="nav-category-menu"><a href="index.html#solutions">Toutes les gammes</a></div></details><a href="apropos.html" ${page === "about" ? 'aria-current="page"' : ""}>L’expertise</a><a href="services.html" ${page === "services" ? 'aria-current="page"' : ""}>Services</a></div><div class="nav-actions"><a class="nav-quote" href="contact.html">Votre projet <span>${icon("whatsapp")}</span></a><button class="icon-button menu-toggle" aria-label="Ouvrir le menu" aria-controls="mobile-nav" aria-expanded="false">${icon("menu")}</button></div></nav><div id="mobile-nav" class="mobile-nav" hidden><a href="index.html">Accueil</a><a href="catalogue.html">Produits</a><a href="index.html#solutions">Nos gammes</a><a href="apropos.html" ${page === "about" ? 'aria-current="page"' : ""}>L’expertise</a><a href="services.html" ${page === "services" ? 'aria-current="page"' : ""}>Services</a><a href="blog.html">Ressources</a><a href="contact.html">Parlons de votre projet</a></div></header>`;
  document.getElementById("site-footer").innerHTML =
    `<footer class="site-footer"><div class="footer-top wrap"><div><p class="eyebrow">Isolmaroc · Isolsolutions</p><h2>La bonne matière.<br>Le bon accompagnement.</h2><p>Isolation acoustique et thermique pour les professionnels au Maroc et à l’international.</p></div><div class="footer-links"><div><h3>Explorer</h3><a href="catalogue.html">Le catalogue</a><a href="index.html#solutions">Nos gammes</a><a href="apropos.html">Notre expertise</a><a href="services.html">Nos services</a><a href="contact.html">Votre projet</a><a href="blog.html">Conseils & ressources</a></div><div><h3>Parlons de votre projet</h3><a href="mailto:${CONTACT.email}">${CONTACT.email}</a><a href="tel:+${CONTACT.whatsapp}">+212 619 949 817</a><span>${CONTACT.address}</span><div class="footer-socials">${quoteLink(null, "WhatsApp", "social-text")}${socialLinks("social-icon")}<a class="social-icon" href="mailto:${CONTACT.email}" aria-label="Email">${icon("email")}</a></div></div></div></div><div class="footer-bottom wrap"><a class="brand" href="index.html"><img src="assets/images/LOGO.png" width="512" height="512" alt="Isolsolutions"></a><span>© ${new Date().getFullYear()} Isolmaroc · Isolsolutions</span><a href="confidentialite.html">Confidentialité</a></div></footer>`;
  document.getElementById("contact-dock").innerHTML =
    `<aside class="contact-dock" aria-label="Contact et réseaux sociaux"><a class="dock-primary" data-platform="whatsapp" data-tooltip="WhatsApp" href="${escapeHTML(whatsappURL())}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${icon("whatsapp")}<span class="sr-only">WhatsApp</span></a>${socialLinks("dock-icon")}<a class="dock-icon" data-platform="email" data-tooltip="Email" href="mailto:${CONTACT.email}" aria-label="Email">${icon("email")}<span class="sr-only">Email</span></a></aside><div id="social-status" role="status" class="social-status" hidden></div>`;
  document.querySelectorAll(".social-unconfigured").forEach((button) =>
    button.addEventListener("click", () => {
      const status = document.getElementById("social-status");
      status.textContent = `Le lien ${button.dataset.platform === "instagram" ? "Instagram" : "Facebook"} n’est pas disponible. Notre équipe est joignable sur WhatsApp ou par email.`;
      status.hidden = false;
      clearTimeout(window.socialNoticeTimer);
      window.socialNoticeTimer = setTimeout(() => {
        status.hidden = true;
      }, 6500);
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelector(".nav-categories").open = false;
      document.getElementById("social-status").hidden = true;
    }
  });
  const toggle = document.querySelector(".menu-toggle"),
    mobile = document.getElementById("mobile-nav");
  const closeMenu = () => {
    mobile.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    toggle.innerHTML = icon("menu");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    mobile.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu",
    );
    toggle.innerHTML = icon(open ? "close" : "menu");
  });
  mobile.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (e) => {
    if (!e.composedPath().includes(document.querySelector(".site-header")))
      closeMenu();
    if (!e.composedPath().includes(document.querySelector(".nav-categories")))
      document.querySelector(".nav-categories").open = false;
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) closeMenu();
  });
  const onScroll = () =>
    document
      .querySelector(".site-header")
      .classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
export function reveal() {
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.06 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.classList.add("will-reveal");
    observer.observe(el);
  });
}
export function setMetadata(title, description) {
  document.title = `${title} | Isolmaroc · Isolsolutions`;
  for (const [selector, value] of [
    ['meta[name="description"]', description],
    ['meta[property="og:title"]', document.title],
    ['meta[property="og:description"]', description],
  ])
    document.querySelector(selector)?.setAttribute("content", value);
}

export function renderCategoryNavigation(categories) {
  const target = document.getElementById("nav-category-menu");
  if (target)
    target.innerHTML = Object.values(categories)
      .map(
        (c) =>
          `<a href="categorie.html?cat=${encodeURIComponent(c.category_id)}">${escapeHTML(c.title)}</a>`,
      )
      .join("");
}
