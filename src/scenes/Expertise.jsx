import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, ScrollTrigger, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'

export default function Expertise() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const rows = t('expertise.rows', { returnObjects: true })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Grand écran : section épinglée, les lignes entrent tour à tour
      mm.add(DESKTOP, () => {
        const titles = ref.current.querySelectorAll('.skill-title')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: true,
            // La ligne "active" (selon l'avancement) passe en orange
            onUpdate: (self) => {
              const active = Math.min(titles.length - 1, Math.floor(self.progress * titles.length))
              titles.forEach((el, i) => el.classList.toggle('text-accent', i === active))
            },
          },
        })

        // Une ligne sur deux arrive de la gauche, l'autre de la droite
        tl.from('.skill-row', {
          xPercent: (i) => (i % 2 === 0 ? -30 : 30),
          opacity: 0,
          filter: 'blur(8px)',
          stagger: 0.5,
          ease: 'power2.out',
        })

        // Nettoyage : on retire les classes ajoutées à la main
        return () => titles.forEach((el) => el.classList.remove('text-accent'))
      })

      // Mobile : chaque ligne glisse en entrant à l'écran, et passe en orange
      // quand elle traverse le milieu de l'écran
      mm.add(MOBILE, () => {
        ref.current.querySelectorAll('.skill-row').forEach((row, i) => {
          gsap.from(row, {
            xPercent: i % 2 === 0 ? -15 : 15,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          })
          ScrollTrigger.create({
            trigger: row,
            start: 'top 55%',
            end: 'bottom 55%',
            toggleClass: { targets: row.querySelector('.skill-title'), className: 'text-accent' },
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
      aria-labelledby="expertise-title"
      className="flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 md:px-[clamp(24px,6vw,120px)] lg:h-screen lg:pr-48"
    >
      <h2 id="expertise-title" className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        {t('expertise.label')}
      </h2>

      {rows.map((row) => (
        <div
          key={row.title}
          className="skill-row flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-glass-stroke py-[clamp(12px,2.2vh,20px)] text-[clamp(34px,4.6vw,72px)] leading-none"
        >
          {/* Titres toujours en serif italique ; seule la couleur change pour la ligne active */}
          <h3 className="skill-title font-serif font-normal italic tracking-[-0.02em] transition-colors duration-300">
            {row.title}
          </h3>
          <ul className="flex flex-wrap gap-2 text-sm font-normal leading-normal tracking-normal">
            {row.items.map((item) => (
              <li key={item} className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}