import { companyPageMarkup } from "./company-pages.js";
import { SERVICES } from "./company-content.js";
import { initHero } from "./hero.js";
import { catalogMarkup, filterMarkup } from "./catalog-view.js";
import { homeMarkup, projectCTA as cta } from "./marketing.js";
import { optimizedImage, imageSet } from "./images.js";
import {
  loadCatalog,
  FACETS,
  facetOptions,
  filterProducts,
  sortProducts,
} from "./catalog-data.js";
import { CONTACT, emailURL } from "./config.js";
import {
  escapeHTML as esc,
  icon,
  productCard,
  materialShowcase,
  quoteLink,
  renderShell,
  renderCategoryNavigation,
  reveal,
  setMetadata,
} from "./components.js";
const main = document.getElementById("main-content");
const page = document.body.dataset.page;
renderShell(page);
const breadcrumb = (items) =>
  `<nav class="breadcrumb wrap" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a>${items.map(([label, url]) => `${icon("chevron")}${url ? `<a href="${url}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`}`).join("")}</nav>`;
function home(data) {
  main.innerHTML = homeMarkup(data);
  bindContactForm();
  initHero();
}
function bindContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]'),
      status = form.querySelector(".form-status");
    button.disabled = true;
    button.textContent = "Envoi en cours…";
    status.textContent = "";
    const values = new FormData(form),
      payload = new FormData();
    for (const [key, label] of Object.entries({
      name: "Nom complet",
      company: "Entreprise",
      email: "Email",
      phone: "Téléphone",
      message: "Message",
    }))
      payload.append(label, values.get(key) || "");
    payload.append("Date", new Date().toLocaleString("fr-FR"));
    try {
      const response = await fetch(CONTACT.contactEndpoint, {
        method: "POST",
        body: payload,
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error();
      status.textContent =
        "Merci, votre demande a bien été envoyée. Notre équipe reviendra vers vous.";
      status.className = "form-status success";
      form.reset();
    } catch {
      status.innerHTML = `L’envoi n’a pas pu être confirmé. Réessayez ou <a href="${esc(emailURL())}">contactez-nous par email</a>.`;
      status.className = "form-status error";
    } finally {
      button.disabled = false;
      button.textContent = "Envoyer ma demande";
    }
  });
}
function catalog(data) {
  const { products, categories } = data;
  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get("q") || "",
    sort: params.get("sort") || "default",
  };
  for (const facet of FACETS)
    state[facet.key] = params
      .getAll(facet.key)
      .filter((v) => facetOptions(products, facet).includes(v));
  if (params.get("cat") && categories[params.get("cat")])
    state.category = [params.get("cat")];
  let limit = 12;
  const selectedCategory = () =>
    state.category.length === 1 ? categories[state.category[0]] : null;
  main.innerHTML = catalogMarkup(data, state);
  const grid = document.getElementById("products-grid"),
    search = document.getElementById("catalog-search"),
    sort = document.getElementById("catalog-sort");
  if (!["default", "az", "za", "documents"].includes(state.sort))
    state.sort = "default";
  sort.value = state.sort;
  const saveURL = () => {
    const url = new URL("catalogue.html", location.href);
    if (state.q) url.searchParams.set("q", state.q);
    for (const f of FACETS)
      for (const v of state[f.key]) url.searchParams.append(f.key, v);
    if (state.sort !== "default") url.searchParams.set("sort", state.sort);
    history.replaceState(null, "", url);
  };
  function update(save = true, focusKey) {
    const category = selectedCategory();
    document.getElementById("catalog-title").textContent = category
      ? category.title
      : "Solutions d’isolation";
    document.getElementById("catalog-description").textContent = category
      ? category.description
      : `Trouvez la solution acoustique ou thermique adaptée à votre projet, parmi nos ${products.length} produits professionnels.`;
    document.getElementById("catalog-art").innerHTML = materialShowcase(
      category
        ? products.filter((p) => p.category_id === category.category_id)
        : products,
      categories,
    );
    setMetadata(
      category ? category.title : "Catalogue de produits d’isolation",
      category
        ? category.description
        : "Découvrez les solutions acoustiques et thermiques Isolmaroc. Recherchez, filtrez et demandez un devis personnalisé.",
    );
    const result = sortProducts(filterProducts(products, state), state.sort);
    grid.innerHTML = result.length
      ? result
          .slice(0, limit)
          .map((p) => productCard(p, categories))
          .join("")
      : `<div class="empty-state">${icon("search")}<h2>Aucun produit ne correspond.</h2><p>Essayez un autre terme ou élargissez vos filtres.</p><button class="button button-primary reset-filters" type="button">Effacer tous les filtres</button></div>`;
    document.getElementById("results-count").innerHTML =
      `<strong>${result.length}</strong> produit${result.length > 1 ? "s" : ""}${state.q ? ` pour « ${esc(state.q)} »` : ""}`;
    document.getElementById("shown-count").textContent = result.length
      ? `${Math.min(limit, result.length)} sur ${result.length} produits`
      : "";
    document.getElementById("load-more").hidden = limit >= result.length;
    document.querySelector(".filter-apply").textContent =
      `Afficher ${result.length} produit${result.length > 1 ? "s" : ""}`;
    document.querySelector(".search-clear").hidden = !state.q;
    const opened = [
      ...document.querySelectorAll("#facet-groups details[open]"),
    ].map((el) => el.dataset.facet);
    const initial = !document.querySelector("#facet-groups details");
    document.getElementById("facet-groups").innerHTML = filterMarkup(
      data,
      state,
      initial ? ["category", "brand"] : opened,
    );
    document.getElementById("active-filters").innerHTML = FACETS.flatMap((f) =>
      state[f.key].map(
        (v) =>
          `<button class="filter-chip" data-remove="${f.key}" data-value="${esc(v)}">${esc(f.key === "category" ? categories[v].title : v)}${icon("close")}<span class="sr-only">Retirer ce filtre</span></button>`,
      ),
    ).join("");
    document.querySelectorAll("[data-category]").forEach((tab) => {
      const active = tab.dataset.category
        ? state.category.length === 1 &&
          state.category[0] === tab.dataset.category
        : !state.category.length;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
      if (active) tab.setAttribute("aria-current", "true");
      else tab.removeAttribute("aria-current");
    });
    if (focusKey) {
      const input = [...document.querySelectorAll("#facet-groups input")].find(
        (el) =>
          el.dataset.facet === focusKey.key && el.value === focusKey.value,
      );
      input?.focus({ preventScroll: true });
    }
    if (save) saveURL();
  }
  const reset = () => {
    for (const f of FACETS) state[f.key] = [];
    state.q = "";
    search.value = "";
    limit = 12;
    update();
  };
  main.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-category]"),
      remove = e.target.closest("[data-remove]");
    if (tab) {
      e.preventDefault();
      state.category = tab.dataset.category ? [tab.dataset.category] : [];
      limit = 12;
      update();
    }
    if (remove) {
      state[remove.dataset.remove] = state[remove.dataset.remove].filter(
        (v) => v !== remove.dataset.value,
      );
      limit = 12;
      update();
    }
    if (e.target.closest(".reset-filters")) reset();
  });
  document.getElementById("facet-groups").addEventListener("change", (e) => {
    const input = e.target;
    if (!input.matches("input[data-facet]")) return;
    state[input.dataset.facet] = [
      ...document.querySelectorAll(
        `input[data-facet="${input.dataset.facet}"]:checked`,
      ),
    ].map((el) => el.value);
    limit = 12;
    update(true, { key: input.dataset.facet, value: input.value });
  });
  let timer;
  search.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.q = search.value.trim();
      limit = 12;
      update();
    }, 180);
  });
  document.querySelector(".catalog-search").addEventListener("submit", (e) => {
    e.preventDefault();
    clearTimeout(timer);
    state.q = search.value.trim();
    limit = 12;
    update();
  });
  document.querySelector(".search-clear").addEventListener("click", () => {
    clearTimeout(timer);
    search.value = "";
    state.q = "";
    limit = 12;
    update();
    search.focus();
  });
  sort.addEventListener("change", () => {
    state.sort = sort.value;
    update();
  });
  document.getElementById("load-more").addEventListener("click", () => {
    limit += 12;
    const old = grid.children.length;
    update();
    grid.children[old]?.querySelector("h3 a")?.focus({ preventScroll: true });
  });
  const toggle = document.querySelector(".filter-toggle");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    document
      .querySelector(".catalog-layout")
      .classList.toggle("filters-open", open);
  });
  document.querySelector(".filter-apply").addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    document.querySelector(".catalog-layout").classList.remove("filters-open");
    document
      .querySelector(".results-toolbar")
      .scrollIntoView({ behavior: "smooth", block: "start" });
    toggle.focus({ preventScroll: true });
  });
  update(false);
}
function product(data) {
  const id = new URLSearchParams(location.search).get("id"),
    p = data.products.find((p) => p.product_id === id);
  if (!p) {
    setMetadata(
      "Produit introuvable",
      "Retrouvez toutes nos solutions dans le catalogue Isolmaroc.",
    );
    main.innerHTML = `${breadcrumb([["Catalogue", "catalogue.html"], ["Produit introuvable"]])}<section class="wrap empty-page"><p class="eyebrow">Catalogue Isolmaroc</p><h1>Ce produit est introuvable.</h1><p>Retrouvez nos matériaux et solutions dans le catalogue.</p><a class="button button-primary" href="catalogue.html">Explorer le catalogue</a></section>`;
    return;
  }
  const c = data.categories[p.category_id],
    specs = Object.entries(p.specifications),
    imgs = p.images?.length ? p.images : [p.primary_image];
  setMetadata(p.product_name, p.short_description);
  const related = data.products
    .filter(
      (other) => other.category_id === p.category_id && other.product_id !== id,
    )
    .slice(0, 4);
  main.innerHTML = `${breadcrumb([["Catalogue", "catalogue.html"], [c.title, `categorie.html?cat=${c.category_id}`], [p.product_name]])}<section class="wrap product-detail product-surface"><div class="product-gallery"><button class="main-product-image" type="button" aria-label="Agrandir l’image : ${esc(p.product_name)}"><img id="main-product-image" src="${optimizedImage(imgs[0])}" alt="${esc(p.product_name)}" width="900" height="800" fetchpriority="high"><span>${icon("search")} Agrandir l’image</span></button>${imgs.length > 1 ? `<div class="gallery-thumbnails">${imgs.map((img, i) => `<button class="thumbnail ${!i ? "active" : ""}" data-img="${esc(img)}" aria-label="Voir l’image ${i + 1}"><img src="${esc(img)}" alt="${esc(p.product_name)} — vue ${i + 1}" width="90" height="90"></button>`).join("")}</div>` : ""}<div class="gallery-note">${icon("layers")} ${p.image_kind === "manufacturer-logo" ? "Logo du fabricant · photo produit sur demande" : p.image_kind === "application-photo" ? "Visuel d’application · fiche fabricant" : esc(c.title)}<span>Marque : ${esc(p.brand)}</span></div></div><div class="product-overview"><div class="product-brandline"><span>${esc(p.brand)}</span>${p.specifications["Référence"] ? `<span>Réf. ${esc(p.specifications["Référence"])}</span>` : ""}</div><a class="eyebrow category-back" href="categorie.html?cat=${c.category_id}">${esc(c.title)}</a><h1>${esc(p.product_name)}</h1><p class="product-lead">${esc(p.short_description)}</p><dl class="key-specs">${specs
    .slice(0, 4)
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
    .join(
      "",
    )}</dl><div class="quote-box"><p class="quote-kicker">Votre projet commence ici.</p>${quoteLink(p, "Demander un devis")}<a class="button button-outline" href="${esc(emailURL(p))}">${icon("email")} Demander un devis par email</a><span class="quote-note">Un échange direct avec notre équipe technique.</span></div></div></section>
 <section class="wrap product-information"><nav class="detail-nav" aria-label="Informations produit"><a href="#description">Présentation</a><a href="#specifications">Caractéristiques techniques</a><a href="#applications">Applications & avantages</a><a href="#documentation">Documentation</a></nav><div class="detail-body"><div><section id="description" class="detail-section"><p class="eyebrow">Le produit en détail</p><h2>Conçu pour vos exigences.</h2><p>${esc(p.full_description)}</p></section><section id="specifications" class="detail-section"><h2>Caractéristiques techniques</h2><div class="spec-table"><table><caption class="sr-only">Caractéristiques de ${esc(p.product_name)}</caption><tbody>${specs.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table></div></section><section id="applications" class="detail-section"><h2>Applications & avantages</h2>${p.specifications.Application ? `<p class="application-value"><strong>Application :</strong> ${esc(p.specifications.Application)}</p>` : ""}<ul class="advantages-list">${p.advantages.map((a) => `<li>${icon("check")}<span>${esc(a)}</span></li>`).join("")}</ul></section><section id="documentation" class="detail-section"><h2>Documentation technique</h2>${p.technical_documents.length ? `<div class="document-list">${p.technical_documents.map((d) => `<a href="${esc(d.path)}" target="_blank" rel="noopener noreferrer">${icon("download")}<span>${esc(d.label)}<small>Document PDF · Ouvrir dans un nouvel onglet</small></span>${icon("chevron")}</a>`).join("")}</div>` : `<div class="document-request"><p>Aucun document n’est joint à cette fiche. Notre équipe peut vous renseigner sur la documentation de ce produit.</p><a class="text-link" href="${esc(emailURL(p))}">${icon("email")} Demander des informations techniques</a></div>`}</section></div></div></section>
 ${related.length ? `<section class="section related-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Dans la même gamme</p><h2>Complétez votre sélection.</h2></div><a class="text-link" href="categorie.html?cat=${c.category_id}">Toute la gamme ${icon("chevron")}</a></div><div class="related-grid">${related.map((p) => productCard(p, data.categories)).join("")}</div></div></section>` : ""}${cta()}<dialog class="image-dialog" aria-label="Image agrandie du produit"><button class="icon-button dialog-close" aria-label="Fermer l’image">${icon("close")}</button><img src="${optimizedImage(imgs[0])}" alt="${esc(p.product_name)}" width="1200" height="1000"></dialog>`;
  const dialog = document.querySelector(".image-dialog");
  document
    .querySelector(".main-product-image")
    .addEventListener("click", () => {
      dialog.querySelector("img").src =
        document.getElementById("main-product-image").src;
      dialog.showModal();
    });
  document
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.querySelectorAll(".thumbnail").forEach((button) =>
    button.addEventListener("click", () => {
      document.getElementById("main-product-image").src = button.dataset.img;
      document
        .querySelectorAll(".thumbnail")
        .forEach((el) => el.classList.toggle("active", el === button));
    }),
  );
  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.product_name,
    description: p.short_description,
    image: imgs.map((img) => new URL(optimizedImage(img), location.href).href),
    brand: { "@type": "Brand", name: p.brand },
    category: c.title,
    additionalProperty: specs.map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  });
  document.head.append(schema);
  const detailLinks = [...document.querySelectorAll(".detail-nav a")];
  const mark = (id) =>
    detailLinks.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  mark("description");
  window.addEventListener("hashchange", () => {
    if (detailLinks.some((link) => link.hash === location.hash))
      mark(location.hash.slice(1));
  });
  detailLinks.forEach((link) =>
    link.addEventListener("click", () => mark(link.hash.slice(1))),
  );
}
async function init() {
  try {
    if (
      ["home", "catalog", "product", "about", "services", "contact"].includes(
        page,
      )
    ) {
      const data = await loadCatalog();
      renderCategoryNavigation(data.categories);
      if (["about", "services", "contact"].includes(page)) {
        main.innerHTML = companyPageMarkup(page, data);
        const metadata = {
          about: [
            "Notre expertise",
            "L’accompagnement Isolmaroc pour vos projets acoustiques et thermiques.",
          ],
          services: [
            "Nos services",
            "Étude, conseil en matériaux, approvisionnement et accompagnement technique.",
          ],
          contact: [
            "Parlons de votre projet",
            "Contactez Isolmaroc pour une proposition adaptée à votre projet.",
          ],
        };
        setMetadata(...metadata[page]);
        if (page === "contact") {
          bindContactForm();
          const requested = new URLSearchParams(location.search).get("service");
          if (SERVICES.some((service) => service.title === requested))
            document.querySelector('[name="message"]').value =
              `Bonjour Isolmaroc, je souhaite échanger avec votre équipe concernant le service « ${requested} » pour mon projet.`;
        }
      } else ({ home, catalog, product })[page](data);
    }
    if (
      !["home", "catalog", "product", "about", "services", "contact"].includes(
        page,
      )
    )
      loadCatalog()
        .then((data) => renderCategoryNavigation(data.categories))
        .catch(console.error);
    reveal();
    document.documentElement.dataset.uiReady = "true";
    // Dynamic sections are inserted after the browser's initial fragment navigation.
    if (location.hash) {
      const target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      target?.scrollIntoView({ behavior: "instant" });
      if (target?.matches("input")) target.focus({ preventScroll: true });
    }
  } catch (error) {
    document.documentElement.dataset.uiError = "true";
    console.error(error);
    main.innerHTML = `<section class="wrap empty-page"><h1>Le catalogue est momentanément inaccessible.</h1><p>Vous pouvez réessayer ou joindre notre équipe.</p><button class="button button-primary" onclick="location.reload()">Réessayer</button> ${quoteLink(null, "Nous contacter")}</section>`;
  }
}
init();
