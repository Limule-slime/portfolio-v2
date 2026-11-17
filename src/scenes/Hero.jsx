import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../lib/gsap'
import { useRotatingIndex } from '../hooks/useRotatingIndex'
import { cvUrl } from '../data/contact'

export default function Hero() {
  const { t, i18n } = useTranslation()
  const ref = useRef(null)
  const words = t('hero.words', { returnObjects: true }) // renvoie le tableau, pas une chaîne
  const index = useRotatingIndex(words.length)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Animation créée seulement si le visiteur n'a pas demandé moins d'animations
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',  // quand le haut du hero touche le haut de l'écran…
            end: '+=100%',     // …et pendant une hauteur d'écran de défilement
            pin: true,         // le hero reste fixe pendant ce temps
            scrub: true,       // l'animation suit exactement la molette
          },
        }).to('.hero-content', { scale: 1.9, filter: 'blur(14px)', opacity: 0, ease: 'none' })
      })
      return () => mm.revert()
    },
    { scope: ref } // '.hero-content' n'est cherché qu'à l'intérieur de ce composant
  )

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="flex h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="hero-content mx-auto flex max-w-7xl flex-col items-center text-center will-change-transform">
        <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]">
          <span aria-hidden="true" className="size-[7px] rounded-full bg-success" />
          {t('hero.badge')}
        </p>

        {/* Titre lu par Google et les lecteurs d'écran : une phrase simple et stable */}
        <h1 id="hero-title" className="sr-only">
          {t('hero.title')} {words[0]}
        </h1>

        {/* Version visuelle animée (mot qui change), ignorée par les robots et lecteurs d'écran */}
        <p
          aria-hidden="true"
          className="mt-8 text-[clamp(40px,6.4vw,92px)] font-semibold leading-[1.04] tracking-[-0.055em]"
        >
          {t('hero.title')}
          <br />
          {/* Fenêtre d'une ligne de haut ; la colonne de mots glisse dedans */}
          <span className="inline-block h-[1.12em] overflow-hidden px-[0.1em] align-top">
            <span
              className="block transition-transform duration-700 ease-[cubic-bezier(.75,0,.2,1)]"
              style={{ transform: `translateY(-${index * 1.12}em)` }}
            >
              {words.map((w) => (
                <span key={w} className="accent block h-[1.12em] leading-[1.12em]">{w}</span>
              ))}
            </span>
          </span>
        </p>

        <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">{t('hero.intro')}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#work" className="inline-flex h-13 items-center gap-2 rounded-full bg-fg px-7 font-medium text-ink transition hover:-translate-y-0.5">
            {t('hero.ctaWork')} <span aria-hidden="true">→</span>
          </a>
          <a href={cvUrl(i18n.resolvedLanguage)} target="_blank" rel="noopener noreferrer" className="glass inline-flex h-13 items-center gap-2 rounded-full px-7 font-medium transition hover:-translate-y-0.5">
            {t('hero.ctaCv')} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}