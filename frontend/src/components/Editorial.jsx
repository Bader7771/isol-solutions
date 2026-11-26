import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items, en = false }) {
  return <nav className="breadcrumbs" aria-label={en ? 'Breadcrumb' : 'Fil d’Ariane'}>
    <a href="/">{en ? 'Home' : 'Accueil'}</a>
    {items.map(({ label, href }) => <React.Fragment key={label}>
      <ChevronRight aria-hidden="true" />
      {href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}
    </React.Fragment>)}
  </nav>;
}

export function PageHero({ title, label, summary, items, image, en = false, children }) {
  const aside = image || children;
  return <header className={'page-hero' + (aside ? ' page-hero--split' : '')}>
    <div className="shell page-hero-layout">
      <div className="page-hero-copy" data-reveal>
        <div data-step><Breadcrumbs items={items || [{ label }]} en={en} /></div>
        {label && <p className="home-kicker" data-step>{label}</p>}
        <h1 data-line>{title}</h1>
        {summary && <p className="page-summary" data-step>{summary}</p>}
      </div>
      {image && <figure className="editorial-image page-hero-image" data-mask>
        <img src={image.src} alt={image.alt} fetchPriority="high" decoding="async" />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>}
      {children}
    </div>
  </header>;
}

export function InlineLink({ href, children }) {
  return <a className="inline-action" href={href}>{children} <ArrowUpRight aria-hidden="true" /></a>;
}

export function Notice({ title, children }) {
  return <div className="editorial-notice" data-reveal>
    <h2 data-step>{title}</h2>
    <div data-step>{children}</div>
  </div>;
}
