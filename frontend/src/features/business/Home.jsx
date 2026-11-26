import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clipboard, HardHat, Layers, Pause, Play, Settings } from 'lucide-react';
import { ContactIcon } from '../../layouts/Shell';
import { whatsappURL } from '../../config';
import { useEditorialMotion } from '../../motion/useEditorialMotion';

const mediaPath = '/assets/images/home/architecture/';
const photos = {
  atrium: ['atrium-verriere', 1920, 'Atrium en béton sous une verrière, avec réseaux de ventilation apparents'],
  auditorium: ['auditorium-plafond', 1800, 'Auditorium aux gradins incurvés et au plafond éclairé par travées'],
  corridor: ['galerie-beton', 1440, 'Galerie en béton éclairée par une verrière linéaire'],
  facade: ['facade-tertiaire', 1024, 'Façade d’un bâtiment tertiaire aux baies verticales'],
  machines: ['machines-reseaux', 1920, 'Hall industriel avec machines et réseaux de tuyauterie'],
  doors: ['circulation-portes-techniques', 800, 'Circulation intérieure équipée de portes techniques'],
  hospital: ['circulation-hospitaliere', 1200, 'Couloir hospitalier aux murs clairs et aux mains courantes continues'],
  servers: ['allee-serveurs', 1200, 'Baies de serveurs dans un centre de données'],
  office: ['bureau-parois-acoustiques', 1024, 'Espace de travail doté de parois en relief et de cloisons vitrées'],
  hotel: ['reception-revetements', 800, 'Comptoir d’accueil devant un revêtement mural texturé'],
  factory: ['atelier-production', 1024, 'Atelier de production équipé de machines et de réseaux techniques'],
};
const slides = [
  ['atrium', 'Architecture & enveloppe'],
  ['auditorium', 'Confort acoustique'],
  ['machines', 'Environnements industriels'],
];
const expertise = [
  ['Isolation acoustique', 'Limiter la transmission du bruit et maîtriser la réverbération dans les espaces de travail, les lieux recevant du public et les ateliers.', 'auditorium', '/expertises/acoustique'],
  ['Isolation thermique', 'Traiter les façades, les toitures et leurs raccords pour assurer la continuité de l’isolation du bâtiment.', 'facade', '/expertises/isolation-thermique-enveloppe'],
  ['Solutions industrielles', 'Adapter l’isolation des ateliers et des équipements aux sources de bruit, aux accès et aux contraintes de maintenance.', 'machines', '/secteurs/industrie-bureaux'],
  ['Portes et revêtements techniques', 'Choisir les portes et les finitions en fonction des usages, des jonctions avec les parois et des exigences du projet.', 'doors', '/catalogue.html?cat=portes-isolees'],
];
const sectors = [
  ['Hôpitaux', 'Préparer les interventions en tenant compte des circulations, de l’hygiène et de la continuité des soins.', 'hospital'],
  ['Centres de données', 'Prendre en compte la chaleur des équipements, le bruit de la ventilation et les accès de maintenance.', 'servers'],
  ['Bureaux', 'Améliorer l’intelligibilité dans les salles de réunion et limiter la propagation du bruit entre espaces.', 'office'],
  ['Hôtels', 'Préserver le calme des chambres et traiter la réverbération dans les espaces communs.', 'hotel'],
  ['Industrie', 'Traiter les sources sonores et les besoins thermiques des ateliers selon leurs conditions d’exploitation.', 'factory'],
  ['Bâtiments professionnels', 'Coordonner les façades, les toitures et les cloisons avec les autres lots techniques.', 'facade'],
];
const strengths = [
  ['Des solutions adaptées au lieu', 'L’usage des espaces, les plans et les contraintes d’exploitation orientent la proposition.'],
  ['Des matériaux choisis pour leur fonction', 'Laines minérales, panneaux acoustiques, portes isolées et finitions techniques sont sélectionnés selon le besoin.'],
  ['Un suivi adapté au chantier', 'L’équipe organise les approvisionnements et précise le suivi technique selon le périmètre du projet.'],
];
const steps = [
  ['Analyse du besoin', 'Recueillir les plans, le cahier des charges et les usages du bâtiment.', Clipboard],
  ['Étude technique', 'Évaluer les contraintes acoustiques et thermiques et proposer un dimensionnement.', Settings],
  ['Sélection des solutions', 'Choisir les matériaux et établir une proposition détaillée.', Layers],
  ['Accompagnement du projet', 'Organiser l’approvisionnement, la livraison et le suivi prévu.', HardHat],
];

function HomeImage({ name, sizes, hero = false, priority = false, onLoad }) {
  const [file, width, alt] = photos[name];
  const medium = name === 'atrium' ? ', ' + mediaPath + file + '-1200.webp 1200w' : '';
  return <img
    src={mediaPath + file + '.webp'}
    srcSet={mediaPath + file + '-640.webp 640w' + medium + ', ' + mediaPath + file + '.webp ' + width + 'w'}
    sizes={sizes}
    alt={alt}
    loading={hero ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : hero ? 'low' : undefined}
    decoding="async"
    onLoad={onLoad}
  />;
}

function Eyebrow({ children }) {
  return <p className="home-kicker" data-step>{children}</p>;
}

function HomeLink({ href, children, variant = 'text', icon: Icon = ArrowUpRight }) {
  const reduced = useReducedMotion();
  return <motion.a className={'home-link home-link--' + variant} href={href}
    whileTap={reduced || variant === 'text' ? undefined : { scale: .985 }}>
    {children}
    <Icon aria-hidden="true" />
  </motion.a>;
}

function Hero() {
  const section = useRef(null);
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState(0);
  const [mounted, setMounted] = useState([0]);
  const [ready, setReady] = useState([0]);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduced || requested !== active) return;
    const timer = window.setTimeout(() => setRequested((active + 1) % slides.length), 8000);
    return () => window.clearTimeout(timer);
  }, [active, inView, paused, reduced, requested]);

  useEffect(() => {
    setMounted(current => current.includes(requested) ? current : [...current, requested]);
    if (ready.includes(requested)) setActive(requested);
  }, [ready, requested]);

  const go = direction => setRequested(current => (current + direction + slides.length) % slides.length);

  return <section ref={section} className="home-hero" aria-labelledby="homepage-heading">
    <div className="home-hero-media" data-hero-parallax>
      {slides.map(([photo], index) => mounted.includes(index) && (
        <motion.div
          key={photo}
          className="home-hero-slide"
          initial={index === 0 ? false : { opacity: 0 }}
          animate={{ opacity: index === active ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 1.1, ease: 'easeInOut' }}
          aria-hidden={index !== active}
        >
          <div className="home-hero-zoom" data-active={index === active}>
            <HomeImage name={photo} sizes="100vw" hero priority={index === 0}
              onLoad={() => setReady(current => current.includes(index) ? current : [...current, index])} />
          </div>
        </motion.div>
      ))}
    </div>
    <div className="home-shell home-hero-inner">
      <div className="home-hero-copy" data-hero-reveal>
        <Eyebrow>Solutions d’isolation & ingénierie</Eyebrow>
        <h1 id="homepage-heading">
          <span><span data-line>Le confort acoustique.</span></span>
          <span><span data-line>La maîtrise thermique.</span></span>
          <span><em data-line>L’excellence technique.</em></span>
        </h1>
        <p className="home-hero-lede" data-step>Isolmaroc accompagne les professionnels dans la conception et la réalisation de solutions d’isolation acoustique et thermique adaptées à chaque environnement.</p>
        <div className="home-actions" data-step>
          <HomeLink href="#expertises" variant="solid" icon={ArrowDown}>Découvrir nos solutions</HomeLink>
          <HomeLink href="/contact" variant="outline">Parlons de votre projet</HomeLink>
        </div>
      </div>
      <div className="home-hero-bottom">
        <a className="home-scroll" href="#entreprise"><ArrowDown aria-hidden="true" /> <span>Découvrir Isolmaroc</span></a>
        <div className="home-slide-controls" role="group" aria-label="Diaporama d’architecture">
          <p className="home-slide-caption" aria-live={paused || reduced ? 'polite' : 'off'}><span>0{active + 1} / 0{slides.length}</span><span>Illustration · {slides[active][1]}</span></p>
          <motion.button whileTap={reduced ? undefined : { scale: .9 }} type="button" onClick={() => go(-1)} aria-label="Image précédente"><ArrowLeft aria-hidden="true" /></motion.button>
          <motion.button whileTap={reduced ? undefined : { scale: .9 }} type="button" onClick={() => go(1)} aria-label="Image suivante"><ArrowRight aria-hidden="true" /></motion.button>
          {!reduced && <button type="button" onClick={() => setPaused(current => !current)} aria-label={paused ? 'Reprendre le diaporama' : 'Mettre le diaporama en pause'}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button>}
        </div>
      </div>
    </div>
  </section>;
}

function Introduction() {
  return <section id="entreprise" className="home-introduction home-section">
    <div className="home-shell home-intro-layout">
      <div className="home-intro-copy" data-reveal>
        <Eyebrow>Isolmaroc · Casablanca, Maroc</Eyebrow>
        <h2 data-step>L’isolation pensée pour les <em>environnements exigeants.</em></h2>
        <p data-step>Une salle de réunion, un atelier et un établissement de soins posent des contraintes différentes. Nous étudions les usages, le bâti et les conditions d’exploitation pour définir une réponse acoustique, thermique ou d’aménagement technique.</p>
        <HomeLink href="/a-propos">Découvrir Isolmaroc</HomeLink>
      </div>
      <figure className="home-intro-figure">
        <div className="home-image" data-mask>
          <div data-parallax><HomeImage name="corridor" sizes="(max-width: 720px) 92vw, 42vw" /></div>
        </div>
        <figcaption>Architecture intérieure · Photographie d’illustration</figcaption>
      </figure>
    </div>
  </section>;
}

function Expertise() {
  return <section id="expertises" className="home-expertise home-section">
    <div className="home-shell">
      <div className="home-section-heading" data-reveal>
        <div><Eyebrow>Nos expertises</Eyebrow><h2 data-step>Du bâtiment<br /> <em>à l’équipement.</em></h2></div>
        <HomeLink href="/expertises">Toutes nos expertises</HomeLink>
      </div>
      <div className="home-expertise-grid">
        {expertise.map(([title, description, photo, href]) => <article className="home-expertise-item" key={title}>
          <a className="home-image home-expertise-image" href={href} aria-label={'Découvrir · ' + title} data-mask>
            <HomeImage name={photo} sizes="(max-width: 720px) 92vw, 48vw" />
            <span className="home-image-arrow"><ArrowUpRight aria-hidden="true" /></span>
          </a>
          <div className="home-expertise-copy" data-reveal>
            <h3 data-step>{title}</h3>
            <p data-step>{description}</p>
            <HomeLink href={href}>En savoir plus<span className="home-visually-hidden"> sur {title.toLowerCase()}</span></HomeLink>
          </div>
        </article>)}
      </div>
      <div className="home-catalog-link">
        <p>Matériaux, caractéristiques et fiches techniques</p>
        <HomeLink href="/catalogue.html">Consulter le catalogue</HomeLink>
      </div>
    </div>
  </section>;
}

function Sectors() {
  return <section id="secteurs" className="home-sectors home-section">
    <div className="home-shell">
      <div className="home-section-heading" data-reveal>
        <div><Eyebrow>Secteurs d’application</Eyebrow><h2 data-step>À chaque lieu, <em>ses exigences.</em></h2></div>
        <HomeLink href="/secteurs">Explorer les secteurs</HomeLink>
      </div>
      <div className="home-sector-grid">
        {sectors.map(([title, description, photo]) => <article className="home-sector" key={title}>
          <div className="home-image" data-mask><HomeImage name={photo} sizes="(max-width: 530px) 92vw, (max-width: 900px) 45vw, 31vw" /></div>
          <div className="home-sector-copy"><h3>{title}</h3><p>{description}</p></div>
        </article>)}
      </div>
      <p className="home-photo-note">Photographies d’illustration</p>
    </div>
  </section>;
}

function Strengths() {
  return <section className="home-strengths home-section">
    <div className="home-shell home-strengths-layout">
      <div className="home-strengths-heading" data-reveal>
        <Eyebrow>Pourquoi Isolmaroc</Eyebrow>
        <h2 data-step>Partir des contraintes <em>du chantier.</em></h2>
      </div>
      <div className="home-strength-list" data-reveal>
        {strengths.map(([title, description]) => <article key={title} data-step>
          <h3>{title}</h3><p>{description}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

const prioritySector = /santé|hôpit|clinique|data|données|industri|commercial|tertiaire|enveloppe/i;

function Projects({ projects }) {
  const featured = projects
    .filter(project => project.photos?.some(photo => photo.url))
    .sort((first, second) => Number(prioritySector.test(second.sector)) - Number(prioritySector.test(first.sector)))
    .slice(0, 4);
  return <section className="home-projects home-section">
    <div className="home-shell">
      <div className="home-section-heading" data-reveal>
        <h2 data-step>Réalisations</h2>
        <HomeLink href="/realisations">Voir les réalisations</HomeLink>
      </div>
      {featured.length ? <div className="home-project-grid">
        {featured.map(project => {
          const photo = project.photos.find(item => item.url);
          return <a className="home-project-tile" href={'/realisations/' + project.slug} key={project.slug} data-mask>
            <div className="home-image"><img src={photo.url} alt={photo.alt || project.title} loading="lazy" decoding="async" /></div>
            <div className="home-project-caption">
              {project.sector && <p>{project.sector}</p>}
              <h3>{project.title}</h3>
              <span className="home-image-arrow"><ArrowUpRight aria-hidden="true" /></span>
            </div>
          </a>;
        })}
      </div> : <div className="home-project-empty" data-reveal>
        <h3 data-step>Références sur demande</h3>
        <div><p>Échangeons sur les références communicables dans votre secteur et sur les contraintes de votre projet.</p><HomeLink href="/contact?service=Demande%20de%20r%C3%A9f%C3%A9rences">Demander des références</HomeLink></div>
      </div>}
    </div>
  </section>;
}

function Approach() {
  return <section className="home-approach home-section">
    <div className="home-shell">
      <div className="home-section-heading" data-reveal>
        <div><Eyebrow>Notre approche</Eyebrow><h2 data-step>De l’analyse <em>au chantier.</em></h2></div>
        <HomeLink href="/methode">Méthode et qualité</HomeLink>
      </div>
      <ol className="home-process" data-reveal>
        {steps.map(([title, description, Icon], index) => <li key={title} data-step>
          {index > 0 && <span className="home-process-rail" aria-hidden="true" />}
          <span className="home-process-head" aria-hidden="true">
            <span className="home-process-number">0{index + 1}</span>
            <span className="home-process-icon"><Icon strokeWidth={1.8} /></span>
          </span>
          <h3>{title}</h3><p>{description}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}

function Closing({ contact }) {
  return <section className="home-closing home-section">
    <div className="home-shell home-closing-inner" data-reveal>
      <Eyebrow>Votre projet</Eyebrow>
      <h2 data-step>Votre prochain projet mérite <em>une solution adaptée.</em></h2>
      <p data-step>Échangeons sur vos besoins en isolation acoustique et thermique.</p>
      <div className="home-actions" data-step>
        <HomeLink href="/contact?service=Demande%20de%20devis" variant="solid">Demander un devis</HomeLink>
        <HomeLink href={'mailto:' + contact.email} variant="outline">Contacter notre équipe</HomeLink>
      </div>
      <a className="home-whatsapp" href={whatsappURL(null, contact)} target="_blank" rel="noreferrer"><ContactIcon name="WhatsApp" /> Échanger sur WhatsApp</a>
    </div>
  </section>;
}

export default function Home({ content, contact }) {
  const scope = useEditorialMotion();
  return <main ref={scope} id="main-content" className="premium-home">
    <Hero />
    <Introduction />
    <Expertise />
    <Sectors />
    <Strengths />
    <Projects projects={content.projects} />
    <Approach />
    <Closing contact={contact} />
  </main>;
}
