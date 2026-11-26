import React from 'react';
import { PageHero } from '../components/Editorial';

export default function CatalogHero({ cat }) {
  return <PageHero
    label="Catalogue de produits"
    title={cat?.title || <>Le showroom<br /> <em>des matériaux.</em></>}
    summary={cat?.description || 'Explorez les isolants, les panneaux acoustiques et les solutions techniques pour votre projet.'}
    items={cat ? [{ label: 'Catalogue', href: '/catalogue.html' }, { label: cat.title }] : [{ label: 'Catalogue' }]}
    image={{
      src: '/assets/images/home/architecture/bureau-parois-acoustiques.webp',
      alt: 'Espace de travail avec parois acoustiques et cloisons vitrées',
    }}
  />;
}
