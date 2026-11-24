import React from "react";
export default function CatalogCTA() {
  return (
    <aside className="cat-visit">
      <div>
        <h2>Un matériau à valider sur chantier ?</h2>
        <p>
          Échangez avec notre équipe sur les supports, les usages et les
          conditions de pose.
        </p>
      </div>
      <a className="cat-action" href="/contact">
        Demander une visite technique <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
