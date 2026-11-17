import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)        // la section
  const viewportRef = useRef(null) // la "fenêtre" qui laisse voir une partie de la piste
  const trackRef = useRef(null)   // la piste qui glisse
  const counterRef = useRef(null) // le "01" du compteur

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Seulement sur grand écran ET si les animations sont autorisées (sinon : carrousel au doigt)
      mm.add(DESKTOP, () => {
        const track = trackRef.current
        const viewport = viewportRef.current

        // Distance à parcourir = largeur de la piste − largeur visible
        const distance = () => track.scrollWidth - viewport.clientWidth

        // On coupe le défilement natif : c'est GSAP qui pilote (annulé par mm.revert)
        gsap.set(viewport, { overflow: 'hidden' })

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`, // on défile autant verticalement qu'horizontalement
            pin: true,
            scrub: 1,                     // 1 = léger lissage d'une seconde
            invalidateOnRefresh: true,    // recalcule si la fenêtre est redimensionnée
            onUpdate: (self) => {
              const n = Math.min(PROJECTS.length, Math.floor(self.progress * PROJECTS.length) + 1)
              // Modification directe du DOM : pas de re-rendu React à chaque frame
              counterRef.current.textContent = String(n).padStart(2, '0')
            },
          },
        })
      })

      // Mobile : les projets sont listés à la verticale ; chaque carte monte en fondu en entrant
      mm.add(MOBILE, () => {
        ref.current.querySelectorAll('.project-card').forEach((card) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      aria-labelledby="work-title"
      className="flex min-h-svh flex-col justify-center overflow-hidden py-24 lg:h-screen"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 px-6 md:px-[clamp(24px,6vw,120px)] lg:pr-48">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t('work.label')}</p>
          <h2
            id="work-title"
            className="mt-4 text-[clamp(38px,5.4vw,80px)] font-semibold leading-none tracking-[-0.05em]"
          >
            {t('work.title')} <span className="accent">{t('work.titleAccent')}</span>
          </h2>
        </div>
        <p aria-hidden="true" className="hidden font-mono text-sm text-muted lg:block">
          <span ref={counterRef}>01</span> / {String(PROJECTS.length).padStart(2, '0')}
        </p>
      </div>

      {/* Mobile / tablette : liste verticale. Grand écran : piste horizontale pilotée par GSAP
          (ou défilement horizontal natif si les animations sont réduites) */}
      <div
        ref={viewportRef}
        className="no-scrollbar mt-10 lg:mr-44 lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:[mask-image:linear-gradient(to_right,black_88%,transparent)]"
      >
        <ul
          ref={trackRef}
          className="grid gap-6 px-6 sm:grid-cols-2 md:px-[clamp(24px,6vw,120px)] lg:flex lg:w-max"
        >
          {PROJECTS.map((p, i) => (
            <li key={p.id} className="project-card lg:w-[min(440px,78vw)] lg:shrink-0 lg:snap-start">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group block rounded-[22px] p-2 transition duration-500 hover:-translate-y-2"
              >
                {/* Barre de navigateur */}
                <div aria-hidden="true" className="flex items-center gap-1.5 px-2 pb-2.5 pt-1.5">
                  <span className="size-2 rounded-full bg-glass-stroke" />
                  <span className="size-2 rounded-full bg-glass-stroke" />
                  <span className="size-2 rounded-full bg-glass-stroke" />
                  <span className="ml-2 flex-1 truncate rounded-full border border-glass-stroke px-3 py-1 text-center font-mono text-[11px] text-muted">
                    {p.url.replace('https://', '')}
                  </span>
                </div>

                {/* Capture du site, ou emplacement provisoire si l'image manque */}
                {p.image ? (
                  <div className="h-[clamp(180px,30vh,270px)] overflow-hidden rounded-[14px] bg-glass-strong">
                    <img
                      src={p.image}
                      alt={t('work.screenshotAlt', { name: p.name })} // aussi utile au référencement des images
                      width="1600"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <div className="flex h-[clamp(180px,30vh,270px)] flex-col justify-between rounded-[14px] bg-glass-strong p-4 font-mono text-xs text-muted">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>[{t('work.screenshot')}]</span>
                  </div>
                )}

                <div className="px-3 pb-3 pt-5">
                  <h3 className="text-[26px] font-semibold tracking-[-0.04em]">{p.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{t(`work.items.${p.id}`)}</p>
                  <p className="mt-3 flex items-center justify-between font-mono text-xs text-muted">
                    <span>{p.meta}</span>
                    <span className="transition group-hover:text-accent">
                      {t('work.visit')} <span aria-hidden="true">↗</span>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}