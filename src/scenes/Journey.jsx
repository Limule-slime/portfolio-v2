import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'

export default function Journey() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const steps = t('journey.steps', { returnObjects: true })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Frise horizontale animée seulement sur grand écran (≥ 1024 px)
      mm.add(DESKTOP, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=160%', pin: true, scrub: true },
        })

        // La ligne se trace en 6 "unités" de temps…
        tl.from('.journey-line', { scaleX: 0, ease: 'none', duration: steps.length }, 0)
        // …et l'étape n°k s'allume à l'instant k, quand la ligne atteint sa colonne
        tl.from(
          '.journey-step',
          { opacity: 0.12, y: 30, scale: 0.9, filter: 'blur(6px)', stagger: 1, duration: 0.6, ease: 'power2.out' },
          0
        )
      })

      // Mobile : chaque étape apparaît en entrant à l'écran
      mm.add(MOBILE, () => {
        ref.current.querySelectorAll('.journey-step').forEach((step) => {
          gsap.from(step, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 90%' },
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
      aria-labelledby="journey-title"
      className="flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 md:px-[clamp(24px,6vw,120px)] lg:h-screen lg:pr-48"
    >
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t('journey.label')}</p>
      <h2
        id="journey-title"
        className="mt-4 text-[clamp(38px,5.4vw,80px)] font-semibold leading-none tracking-[-0.05em]"
      >
        {t('journey.title')} <span className="accent">{t('journey.titleAccent')}</span>
      </h2>

      <div className="relative mt-12">
        {/* Rail gris + ligne qui se trace (origin-left : elle grandit depuis la gauche) */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-0.5 bg-glass-stroke lg:block" />
        <div aria-hidden="true" className="journey-line absolute inset-x-0 top-[7px] hidden h-0.5 origin-left bg-fg lg:block" />

        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((s, i) => {
            const isLast = i === steps.length - 1
            return (
              <li key={s.date} className="journey-step flex flex-col">
                <span
                  aria-hidden="true"
                  className={`hidden size-4 rounded-full ring-[6px] lg:block ${
                    isLast ? 'bg-accent ring-accent/20' : 'bg-fg ring-glass-stroke'
                  }`}
                />
                <div className="glass flex-1 rounded-[18px] p-[18px] lg:mt-6">
                  <p className={`font-mono text-xs ${isLast ? 'text-accent' : 'text-muted'}`}>{s.date}</p>
                  <h3 className="mt-3 text-[clamp(15px,1.2vw,18px)] font-semibold leading-tight tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}