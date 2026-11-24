import { normalize } from "./catalog-data.js";
const cards = [...document.querySelectorAll(".blog-card")];
function search(q) {
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    const show = terms.every((t) => normalize(card.textContent).includes(t));
    card.hidden = !show;
    if (show) count++;
  }
  document.querySelector(".blog-stats p").textContent =
    `${count} ressource${count > 1 ? "s" : ""}`;
}
for (const form of document.querySelectorAll(".search-form")) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search(form.querySelector("input").value);
  });
  form
    .querySelector("input")
    .addEventListener("input", (e) => search(e.target.value));
  form
    .querySelector("button")
    .setAttribute("aria-label", "Rechercher des ressources");
}
document.querySelectorAll("[data-topic]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    search(a.dataset.topic);
    document
      .querySelectorAll("[data-topic]")
      .forEach((el) => el.classList.toggle("active", el === a));
  }),
);
