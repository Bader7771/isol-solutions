import React from "react";
import {ArrowUpRight} from "lucide-react";
export default function CatalogCTA() {
  return (
    <aside className="cat-visit surface-espresso" data-reveal>
      <div>
        <h2 data-step>Un matériau à valider sur chantier ?</h2>
        <p data-step>
          Échangez avec notre équipe sur les supports, les usages et les
          conditions de pose.
        </p>
      </div>
      <a className="action" href="/contact">
        Demander une visite technique <ArrowUpRight aria-hidden="true"/>
      </a>
    </aside>
  );
}
