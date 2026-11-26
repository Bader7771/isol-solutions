import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { whatsappURL } from '../config';

const quotePath = '/contact?service=Demande%20de%20devis';
const siteLinks = [
  ['/expertises', 'Expertises', '#expertises'],
  ['/secteurs', 'Secteurs', '#secteurs'],
  ['/catalogue.html', 'Produits'],
  ['/realisations', 'Projets'],
  ['/a-propos', 'À propos'],
  ['/contact', 'Contact'],
];

export function VisitLink({ en = false }) {
  return <a className="action" href="/contact">{en ? 'Request a technical visit' : 'Demander une visite technique'} <ArrowUpRight aria-hidden="true" /></a>;
}

function Brand({ transparent = false }) {
  const logo = transparent
    ? { src: '/assets/images/logo-transparent.png', width: 1743, height: 706 }
    : { src: '/assets/images/site-logo.png', width: 348, height: 127 };
  return <a className="site-brand" href="/" aria-label="ISOL SOLUTIONS — Accueil">
    <img className="brand-logo" src={logo.src} alt="ISOL SOLUTIONS" width={logo.width} height={logo.height} />
  </a>;
}

export function Header({ route }) {
  const home = route.view === 'home';
  const [menu, setMenu] = useState(false);
  const [section, setSection] = useState(location.hash);
  const toggle = useRef(null);
  const activePath = route.view === 'detail' ? '/catalogue.html' : route.base || route.path.split('?')[0];

  useEffect(() => {
    if (!home) return;
    const update = () => setSection(location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [home]);

  function closeMenu(event) {
    if (event.key !== 'Escape' || !menu) return;
    setMenu(false);
    toggle.current.focus();
  }

  return <header className="sitehead" onKeyDown={closeMenu}>
    <div className="head-inner shell">
      <Brand transparent />
      <button ref={toggle} type="button" className="menu-toggle" onClick={() => setMenu(value => !value)}
        aria-expanded={menu} aria-controls="navigation" aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}>
        {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span>{menu ? 'Fermer' : 'Menu'}</span>
      </button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Navigation principale">
        {siteLinks.map(([href, label, anchor]) => (
          <a key={href} href={home && anchor ? anchor : href}
            aria-current={home && section === anchor ? 'location' : activePath === href ? 'page' : undefined}
            onClick={() => setMenu(false)}>{label}</a>
        ))}
      </nav>
      <a className="head-contact" href={quotePath}>Demander un devis <ArrowUpRight aria-hidden="true" /></a>
    </div>
  </header>;
}

export function ContactIcon({ name }) {
  const Icon = { WhatsApp: SiWhatsapp, Instagram: SiInstagram, Facebook: SiFacebook, Email: Mail }[name];
  return <Icon aria-hidden="true" focusable="false" />;
}

export function ContactButtons({ contact, projectName = '', product = null, id }) {
  const rows = [
    ['WhatsApp', whatsappURL(product, contact, projectName)],
    ['Instagram', contact.instagram, 'Profil Instagram ISOL SOLUTIONS'],
    ['Facebook', contact.facebook, 'Page Facebook ISOL SOLUTIONS'],
    ['Email', 'mailto:' + contact.email],
  ];
  return <div className="contact-icons" id={id} aria-label="Réseaux sociaux et contact">
    {rows.map(([label, url, subject]) => {
      const external = url?.startsWith('https:');
      return <a key={label} href={url || 'mailto:' + contact.email + '?subject=' + encodeURIComponent(subject)}
        aria-label={url ? label : `${label} — demander le lien officiel par email`}
        title={url ? `${label} · contacter ISOL SOLUTIONS` : `${label} · profil non renseigné, écrire à ISOL SOLUTIONS`}
        target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        <ContactIcon name={label} /><span className="contact-tooltip">{url ? label : `${label} · contacter par email`}</span>
      </a>;
    })}
  </div>;
}

export function Footer({ contact, content }) {
  return <footer className="sitefoot site-footer">
    <div className="shell">
      <div className="site-footer-grid">
        <div className="site-footer-identity"><Brand transparent /><p>ISOL SOLUTIONS · Isolation et aménagement technique au Maroc.</p><ContactButtons contact={contact} /></div>
        <nav aria-label="Navigation de pied de page"><strong>ISOL SOLUTIONS</strong>
          {[['/a-propos', 'À propos'], ['/realisations', 'Réalisations'], ['/methode', 'Méthode et qualité'], ['/guides', 'Guides techniques'], ['/en', 'Fournisseurs internationaux']].map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <nav aria-label="Solutions"><strong>Solutions</strong>{content.services.map(service => <a key={service.slug} href={'/expertises/' + service.slug}>{service.title}</a>)}<a href="/catalogue.html">Catalogue de produits</a></nav>
        <div className="site-footer-contact"><strong>Contact</strong><span>{contact.address}</span><a href={'mailto:' + contact.email}>{contact.email}</a><a href={whatsappURL(null, contact)}>WhatsApp +{contact.whatsapp}</a><a href="/contact">Demander une visite technique</a></div>
      </div>
      <div className="site-footer-bottom"><p>© {new Date().getFullYear()} ISOL SOLUTIONS</p><a href="/confidentialite.html">Confidentialité</a></div>
    </div>
  </footer>;
}

export function Dock({ contact, product, projectName }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useRef(null);

  return <aside className="dock site-dock" aria-label="Contacts rapides" data-expanded={expanded}
    onKeyDown={event => {
      if (event.key === 'Escape' && expanded) {
        setExpanded(false);
        toggle.current.focus();
      }
    }}>
    <button className="dock-toggle icon-button" type="button" onClick={() => setExpanded(value => !value)}
      ref={toggle} aria-controls="quick-contact-links" aria-expanded={expanded}
      aria-label={expanded ? 'Fermer les contacts rapides' : 'Afficher les contacts rapides'}>
      {expanded ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
    </button>
    <ContactButtons contact={contact} product={product} projectName={projectName} id="quick-contact-links" />
  </aside>;
}

export function SiteLayout({ route, contact, content, product, children }) {
  return <>
    <a className="skip" href="#route-content">Aller au contenu</a>
    <Header route={route} />
    <div id="route-content" className={route.view === 'home' ? undefined : 'route-body'} tabIndex="-1">{children}</div>
    {contact && <>
      <Footer contact={contact} content={content} />
      <Dock contact={contact} product={product} projectName={route.view === 'project' ? route.page.title : ''} />
    </>}
  </>;
}
