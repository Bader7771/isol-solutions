import { useEffect, useRef } from 'react';

let engine;
function loadMotion() {
  return engine ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
}

export function useEditorialMotion() {
  const scope = useRef(null);
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let media;
    let disposed = false;
    loadMotion().then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(root);
        select('[data-hero-reveal]').forEach(section => {
          const timeline = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } });
          timeline
            .fromTo(section.querySelector('[data-step]'), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .55 })
            .fromTo(section.querySelectorAll('[data-line]'), { yPercent: 110 }, { yPercent: 0, duration: .96, stagger: .105 }, '<.08')
            .fromTo(Array.from(section.querySelectorAll('[data-step]')).slice(1), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .12 }, '<.4');
        });
        select('[data-hero-parallax]').forEach(media => {
          gsap.fromTo(media, { opacity: .62 }, { opacity: 1, duration: 1.2, ease: 'power2.out', clearProps: 'opacity' });
        });
        select('[data-reveal]').forEach(section => {
          const targets = section.querySelectorAll('[data-line], [data-step]');
          const items = targets.length ? targets : [section];
          const homepage = root.classList.contains('premium-home');
          gsap.fromTo(items, { y:targets.length ? 24 : 14, opacity:homepage ? .62 : 0 }, {
            y:0, opacity:1, duration:.72, stagger:.085, ease:'power3.out',
            clearProps:'opacity,transform',
            scrollTrigger:{ trigger:section, start:'top 90%', once:true },
          });
        });
        select('[data-mask]').forEach(frame => {
          gsap.fromTo(frame, { clipPath:'inset(0 0 12% 0)' }, {
            clipPath:'inset(0 0 0% 0)', duration:1.08, ease:'power3.out',
            clearProps:'clipPath',
            scrollTrigger:{ trigger:frame, start:'top 92%', once:true },
          });
        });
      }, root);
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.selector(root)('[data-hero-parallax]').forEach(media => {
          gsap.to(media, {
            yPercent: 8, ease: 'none', scrollTrigger: {
              trigger: media.parentElement, start: 'top top', end: 'bottom top', scrub: .65,
            },
          });
        });
        gsap.utils.selector(root)('[data-parallax]').forEach(image => {
          gsap.fromTo(image, { yPercent:-3 }, {
            yPercent:3, ease:'none', scrollTrigger:{
              trigger:image.parentElement, start:'top bottom', end:'bottom top', scrub:.7,
            },
          });
        });
      }, root);
    }).catch(() => {});
    return () => { disposed = true; media?.revert(); };
  }, []);
  return scope;
}
