import { optimizedImage } from "./images.js";
import { escapeHTML as esc, icon } from "./components.js";
export const HERO_SLIDES = Object.freeze([
  {
    image:
      "data_produits/Panneaux sandwish/WhatsApp Image 2026-07-10 at 11.33.15 AM.jpeg",
    label: "Panneaux sandwich isolants",
    position: "center center",
  },
  {
    image:
      "assets/images/products/laine-de-roche/rockwool-rocksono-base/main.png",
    label: "Isolation en laine de roche",
    position: "center center",
  },
  {
    image: "assets/images/solution-images/panneaux-acoustiques.png",
    label: "Traitement acoustique des espaces",
    position: "center center",
  },
  {
    image: "assets/images/Sectors Section/sector-industrie.png",
    label: "Applications industrielles",
    position: "center 58%",
  },
  {
    image: "assets/images/Sectors Section/sector-construction.png",
    label: "Isolation des bâtiments",
    position: "center center",
  },
]);
const pauseIcon =
  '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" rx="1"/><rect x="14" y="5" width="3" height="14" rx="1"/></svg>';
const playIcon =
  '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z"/></svg>';
export function heroMarkup() {
  return `<section class="home-hero" aria-label="Solutions d’isolation Isolmaroc"><div class="hero-backgrounds" aria-hidden="true">${HERO_SLIDES.map((slide, i) => `<div class="hero-slide ${i === 0 ? "is-active" : ""}" data-image="${optimizedImage(slide.image)}" style="background-position:${slide.position};${i === 0 ? `background-image:url('${optimizedImage(slide.image)}')` : ""}"></div>`).join("")}</div><div class="hero-overlay" aria-hidden="true"></div><div class="hero-content wrap"><div class="home-intro"><p class="eyebrow">Isolmaroc · Sound & Thermal Insulation</p><h1>Le confort,<br>par la matière<span>.</span></h1><p class="hero-description">Moins de bruit. Plus de performance. Découvrez nos solutions acoustiques et thermiques adaptées à vos bâtiments et équipements.</p><div class="hero-actions"><a href="catalogue.html" class="button button-primary">Explorer le catalogue</a><a href="#expertise" class="text-link">Découvrir notre expertise</a></div><div class="hero-note">${icon("pin")} Casablanca · Livraison partout au Maroc</div></div></div><div class="hero-bottom wrap"><p class="hero-image-label">${esc(HERO_SLIDES[0].label)}</p><div class="hero-controls"><div class="hero-dots" role="group" aria-label="Choisir un visuel">${HERO_SLIDES.map((slide, i) => `<button type="button" class="hero-dot" data-slide="${i}" aria-label="Afficher : ${esc(slide.label)}" aria-pressed="${i === 0}"><span></span></button>`).join("")}</div><button type="button" class="hero-play" aria-label="Mettre le diaporama en pause" aria-pressed="false">${pauseIcon}</button></div></div></section>`;
}
export function initHero() {
  const hero = document.querySelector(".home-hero");
  if (!hero) return;
  const layers = [...hero.querySelectorAll(".hero-slide")],
    dots = [...hero.querySelectorAll(".hero-dot")],
    control = hero.querySelector(".hero-play"),
    label = hero.querySelector(".hero-image-label");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0,
    timer,
    paused = false,
    inView = true,
    navigation = 0;
  const loaded = new Map();
  function preload(i) {
    if (!loaded.has(i))
      loaded.set(
        i,
        new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve(true);
          image.onerror = () => resolve(false);
          image.src = layers[i].dataset.image;
        }),
      );
    return loaded.get(i);
  }
  function stop() {
    clearTimeout(timer);
    timer = undefined;
  }
  function schedule() {
    stop();
    if (!paused && !motion.matches && !document.hidden && inView)
      timer = setTimeout(() => select((index + 1) % layers.length), 6000);
  }
  async function select(next) {
    stop();
    const token = ++navigation;
    if (!(await preload(next))) {
      schedule();
      return;
    }
    if (token !== navigation) return;
    layers[next].style.backgroundImage = `url('${layers[next].dataset.image}')`;
    index = next;
    layers.forEach((layer, i) =>
      layer.classList.toggle("is-active", i === index),
    );
    dots.forEach((dot, i) =>
      dot.setAttribute("aria-pressed", String(i === index)),
    );
    label.textContent = HERO_SLIDES[index].label;
    hero.dataset.activeSlide = String(index);
    preload((index + 1) % layers.length);
    schedule();
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => select(i)));
  control.addEventListener("click", () => {
    paused = !paused;
    control.setAttribute("aria-pressed", String(paused));
    control.setAttribute(
      "aria-label",
      paused ? "Reprendre le diaporama" : "Mettre le diaporama en pause",
    );
    control.innerHTML = paused ? playIcon : pauseIcon;
    schedule();
  });
  const visibility = () => {
    if (document.hidden) stop();
    else schedule();
  };
  const preference = () => {
    control.hidden = motion.matches;
    schedule();
  };
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", preference);
  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      if (inView) schedule();
      else stop();
    },
    { threshold: 0.05 },
  );
  observer.observe(hero);
  hero.dataset.activeSlide = "0";
  preference();
  if (!motion.matches) preload(1);
  return () => {
    stop();
    navigation++;
    observer.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", preference);
  };
}
