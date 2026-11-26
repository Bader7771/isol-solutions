import React,{useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Maximize2,X} from 'lucide-react';
import { PageHero, InlineLink, Notice } from '../../components/Editorial';
import {VisitLink} from '../../layouts/Shell';
import {whatsappURL} from '../../config';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ProductCard from '../products/ProductCard';
import { useEditorialMotion } from '../../motion/useEditorialMotion';
import './projects.css';

const architecture = '/assets/images/home/architecture/';
const editorialImages = {
  '/a-propos': ['galerie-beton', 'Galerie en béton sous une verrière'],
  '/expertises': ['atrium-verriere', 'Verrière et réseaux apparents dans un atrium'],
  '/secteurs': ['facade-tertiaire', 'Bâtiment tertiaire aux baies verticales'],
  '/expertises/acoustique': ['auditorium-plafond', 'Auditorium aux gradins incurvés et au plafond éclairé par travées'],
  '/expertises/isolation-thermique-enveloppe': ['facade-tertiaire', 'Façade d’un bâtiment tertiaire'],
  '/expertises/sante-radioprotection': ['circulation-hospitaliere', 'Circulation dans un établissement de soins'],
  '/expertises/btp-amenagement': ['galerie-beton', 'Galerie intérieure en béton et en verre'],
  '/secteurs/hopitaux-cliniques': ['circulation-hospitaliere', 'Circulation dans un établissement de soins'],
  '/secteurs/fournisseurs-equipements': ['circulation-hospitaliere', 'Circulation dans un établissement de soins'],
  '/secteurs/hotellerie': ['reception-revetements', 'Espace de réception et revêtement mural texturé'],
  '/secteurs/industrie-bureaux': ['atelier-production', 'Atelier de production et réseaux techniques'],
  '/secteurs/promotion-immobiliere': ['facade-tertiaire', 'Façade d’un bâtiment tertiaire'],
};

function illustration(path) {
  const image = editorialImages[path];
  return image && { src: architecture + image[0] + '.webp', alt: image[1], caption: 'Photographie d’illustration' };
}

function PageLinks({ items, base }) {
  return <div className="directory-list">
    {items.map(item => <a href={base + '/' + item.slug} key={item.slug} data-reveal>
      <div><h2 data-step>{item.title}</h2><p data-step>{item.summary}</p></div>
      <span className="icon-button" aria-hidden="true"><ArrowUpRight /></span>
    </a>)}
  </div>;
}

function ProjectMeta({ project }) {
  const fields = [project.sector, project.location, project.duration].filter(Boolean);
  return fields.length ? <p className="project-meta">{fields.join(' · ')}</p> : null;
}

function ProjectList({ projects }) {
  return <div className="project-list">
    {projects.map(project => (
      <a href={'/realisations/' + project.slug} className="project-card" key={project.slug}>
        {project.photos?.[0] && <figure className="editorial-image" data-mask><img loading="lazy" decoding="async" src={project.photos[0].url} alt={project.photos[0].alt || project.title} /></figure>}
        <div className="project-card-copy" data-reveal>
          <div data-step><ProjectMeta project={project} /><h3>{project.title}</h3></div>
          {project.context && <p data-step>{project.context}</p>}
          <span className="inline-action">Découvrir le projet <ArrowUpRight aria-hidden="true" /></span>
        </div>
      </a>
    ))}
  </div>;
}

export function Listing({ title, summary, items, base }) {
  const root = useEditorialMotion();
  const portfolio = base === '/realisations';
  return <main ref={root} id="main-content" className={portfolio ? 'portfolio-page' : 'editorial-listing'}>
    <PageHero title={title} label={portfolio ? 'Dossiers de chantier' : 'Isolation & aménagement'} items={[{label: title}]} summary={summary} image={illustration(base)} />
    {portfolio ? <section className="shell block">
      {items.length ? <ProjectList projects={items} /> : <Notice title="Références sur demande">
        <p>Notre équipe peut vous renseigner sur les références communicables dans votre secteur.</p>
        <InlineLink href="/contact?service=Demande%20de%20r%C3%A9f%C3%A9rences">Demander une référence</InlineLink>
      </Notice>}
    </section> : <section className="directory-section surface-light">
      <div className="shell block"><PageLinks items={items} base={base} /></div>
    </section>}
  </main>;
}

export function Project({ project, projects = [], contact }) {
  const scope = useEditorialMotion();
  const [index, setIndex] = useState(0);
  const dialog = useRef(null);
  const touch = useRef(null);
  const reducedMotion = useReducedMotion();
  const images = project.photos || [];
  const uses = project.productUses || [];
  const advantages = [...new Set(uses.flatMap(({product}) => product.advantages || []))];
  const applications = [...new Set(uses.map(({product}) => product.specifications?.Application).filter(Boolean))];
  const cover = images[0];
  const active = images[index];
  const related = projects.filter(item => item.slug !== project.slug)
    .sort((a, b) => Number(b.sector === project.sector) - Number(a.sector === project.sector)).slice(0, 3);
  const stages = images.slice(1).reduce((groups, photo) => {
    const stage = photo.stage || 'Galerie du projet';
    (groups[stage] ??= []).push(photo);
    return groups;
  }, Object.create(null));

  function open(photo) {
    setIndex(images.indexOf(photo));
    dialog.current.showModal();
  }
  function step(direction) {
    setIndex(current => (current + direction + images.length) % images.length);
  }
  function photoButton(photo, eager = false) {
    return (
      <button type="button" onClick={() => open(photo)} aria-label={`Agrandir · ${photo.alt || project.title}`}>
        <img src={photo.url} alt={photo.alt || project.title} decoding="async" loading={eager ? 'eager' : 'lazy'} />
        <span className="icon-button" aria-hidden="true"><Maximize2 /></span>
      </button>
    );
  }

  return (
    <main ref={scope} id="main-content" className="project-page">
      <PageHero title={project.title} label="Réalisation"
        items={[{label: 'Réalisations', href: '/realisations'}, {label: project.title}]} summary={project.context} />
      <article className="shell project-story">
        <ProjectMeta project={project} />
        {cover && <figure className="project-cover" data-mask>{photoButton(cover, true)}{cover.stage && <figcaption>{cover.stage}</figcaption>}</figure>}
        {Object.entries(stages).map(([stage, photos]) => (
          <section className="project-section" key={stage} data-reveal>
            <h2 data-step>{stage}</h2>
            <div className="project-photo-grid">{photos.map(photo => <figure key={photo.url} data-mask>{photoButton(photo)}</figure>)}</div>
          </section>
        ))}
        {uses.length > 0 && (
          <section className="project-section" data-reveal>
            <h2 data-step>Produits utilisés</h2>
            <div className="project-use-grid">
              {uses.map((use, position) => (
                <div className="project-use" key={use.product.product_id}>
                  <ProductCard p={use.product} index={position} />
                  <div><p>{use.explanation}</p>{use.technicalDetails && <p>{use.technicalDetails}</p>}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        {[
          ['Contraintes techniques', project.constraints],
          ['Solutions réalisées', project.solutions],
          ['Avantages des produits utilisés', advantages],
          ['Applications des produits utilisés', applications],
        ].map(([label, items]) => items?.length > 0 && (
          <section className="project-section project-text" key={label} data-reveal>
            <h2 data-step>{label}</h2>
            <ul data-step>{items.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
        ))}
        {project.documents?.length > 0 && (
          <section className="project-section project-text" data-reveal>
            <h2 data-step>Documents du projet</h2>
            <ul>{project.documents.map(doc => <li key={doc.url}><a href={doc.url} download>{doc.label} (PDF)</a></li>)}</ul>
          </section>
        )}
        <div className="project-actions">
          <VisitLink />
          {contact && <a className="action action--outline" href={whatsappURL(null, contact, project.title)}>Question sur ce projet via WhatsApp</a>}
        </div>
        {related.length > 0 && <section className="project-section"><h2>Autres réalisations</h2><ProjectList projects={related} /></section>}
      </article>
      {active && (
        <dialog ref={dialog} className="project-lightbox" aria-label={`Galerie · ${project.title}`}
          onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}
          onKeyDown={event => {
            if (event.key === 'ArrowRight') step(1);
            if (event.key === 'ArrowLeft') step(-1);
          }}
        >
          <div className="project-lightbox-controls">
            <span aria-live="polite">{index + 1} / {images.length}</span>
            <button className="icon-button" type="button" onClick={() => dialog.current.close()} aria-label="Fermer la galerie"><X aria-hidden="true" /></button>
          </div>
          <div className="project-lightbox-stage"
            onTouchStart={event => { touch.current = event.touches[0].clientX; }}
            onTouchEnd={event => {
              const distance = event.changedTouches[0].clientX - touch.current;
              if (touch.current !== null && Math.abs(distance) > 40) step(distance > 0 ? -1 : 1);
              touch.current = null;
            }}
          >
            {images.length > 1 && <button className="icon-button project-prev" type="button" onClick={() => step(-1)} aria-label="Photo précédente"><ArrowLeft aria-hidden="true" /></button>}
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={active.url} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: reducedMotion ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : .16 }}>
                <img src={active.url} alt={active.alt} />
                <figcaption>{[active.stage, active.alt].filter(Boolean).join(' · ')}</figcaption>
              </motion.figure>
            </AnimatePresence>
            {images.length > 1 && <button className="icon-button project-next" type="button" onClick={() => step(1)} aria-label="Photo suivante"><ArrowRight aria-hidden="true" /></button>}
          </div>
        </dialog>
      )}
    </main>
  );
}
export function Editorial({ page, type, en = false, base, path }) {
  const scope = useEditorialMotion();
  const items = base ? [{ label: type, href: base }, { label: page.title }] : [{ label: type }];
  return <main ref={scope} id="main-content" lang={en ? 'en' : 'fr'} className="editorial-page">
    <PageHero label={base ? type : undefined} items={items} title={page.title} summary={page.summary} en={en} image={illustration(path)} />
    <div className="surface-light">
      <div className="shell editorial-article">
        <aside className="editorial-index">
          <strong>{en ? 'On this page' : 'Sur cette page'}</strong>
          {page.sections.map((section, index) => <a key={section.title} href={'#section-' + index}>{section.title}</a>)}
          {base && <InlineLink href={base}>{type}</InlineLink>}
        </aside>
        <article>
          {page.sections.map((section, index) => (
            <section key={section.title} id={'section-' + index} className="editorial-chapter" data-reveal>
              <span aria-hidden="true" data-step>{String(index + 1).padStart(2, '0')}</span>
              <div><h2 data-line>{section.title}</h2><p data-step>{section.text}</p></div>
            </section>
          ))}
          {page.items?.length > 0 && <ul className="item-list">{page.items.map(item => <li key={item}>{item}</li>)}</ul>}
          <VisitLink en={en} />
        </article>
      </div>
    </div>
  </main>;
}

export function Privacy({ contact }) {
  const scope = useEditorialMotion();
  return <main id="main-content" ref={scope}>
    <PageHero label="Confidentialité" title="Vos informations de projet" />
    <div className="surface-light">
      <article className="shell privacy-reading">
        <section data-reveal><h2 data-step>Demandes de visite et devis</h2>
          <p data-step>Les coordonnées, les informations de chantier et le document facultatif que vous transmettez servent à étudier votre demande et à organiser un échange technique. Votre demande est conservée par ISOL SOLUTIONS. Une notification peut être envoyée à l’équipe par email.</p>
          <p data-step>Pour un projet de santé, transmettez uniquement les documents techniques nécessaires, sans données de patients.</p>
        </section>
        <section data-reveal><h2 data-step>Messagerie</h2><p data-step>Les liens WhatsApp et email ouvrent votre application de messagerie. Vous pouvez modifier le message avant de l’envoyer.</p></section>
        <section data-reveal><h2 data-step>Vos coordonnées</h2><p data-step>Pour une question, une rectification ou une demande de suppression, écrivez à <a href={'mailto:' + contact.email}>{contact.email}</a>.</p></section>
      </article>
    </div>
  </main>;
}
