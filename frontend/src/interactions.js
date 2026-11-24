// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)";
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.5)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)";
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Mobile Burger Menu Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-active");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );

    // Lock body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking the overlay (::before pseudo-element area)
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("is-open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
{
  const animatedElements = document.querySelectorAll(
    ".solution-card, .feature-card, .sector-card",
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// Solution Cards Interaction
document.querySelectorAll(".solution-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10";
  });
  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1";
  });
});

// Audio/Blog Interaction
document.querySelectorAll(".read-more-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const cardContent = this.closest(".blog-card__content");
    const hiddenText = cardContent.querySelector(".blog-card__text");

    if (hiddenText.classList.contains("hidden")) {
      hiddenText.classList.remove("hidden");
      this.textContent = "Lire moins";
      // Optional: Scroll slightly to adjust view if needed
    } else {
      hiddenText.classList.add("hidden");
      this.textContent = "Lire la suite";
    }
  });
});

// ================================================
// How It Works — Timeline Animations
// ================================================
(function initHowItWorksAnimations() {
  const section = document.querySelector(".how-it-works");
  if (!section) return;

  const trackLine = section.querySelector(".timeline-track__line");
  const steps = section.querySelectorAll(".timeline-step");

  // Observer pour la ligne de progression
  if (trackLine) {
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Déclenche l'animation avec un léger délai pour l'effet
            setTimeout(() => {
              trackLine.classList.add("is-visible");
            }, 200);
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    lineObserver.observe(section);
  }

  // Observer pour le fade-in/slide-up des étapes
  if (steps.length) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    steps.forEach((step) => stepObserver.observe(step));
  }
})();

// Console Warning
console.log("%cAttention!", "color: red; font-size: 40px; font-weight: bold;");
console.log(
  "%cCe site utilise des mesures de sécurité avancées.",
  "font-size: 16px;",
);
console.log(
  "%cToute tentative d'injection ou d'attaque sera détectée et bloquée.",
  "font-size: 14px; color: #DC143C;",
);
