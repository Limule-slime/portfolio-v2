import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../lib/gsap'

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const words = t('about.text').split(' ')
  const stats = t('about.stats', { returnObjects: true })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: '+=150%',   // 1,5 écran de défilement pour lire tranquillement
            pin: true,
            scrub: true,
          },
        })

        // 1. Les mots s'éclairent un par un (position 0 = début de la timeline)
        tl.fromTo('.about-word', { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: 'none' }, 0)

        // 2. Les cartes arrivent depuis la profondeur, en pivotant (démarre à 0.3)
        tl.from(
          '.stat-card',
          { opacity: 0, x: 220, z: -380, rotationY: -55, stagger: 0.25, duration: 1, ease: 'power2.out' },
          0.3
        )
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      aria-labelledby="about-title"
      className="flex h-screen flex-wrap items-center justify-center gap-[clamp(32px,5vw,80px)] px-6 py-28 lg:pr-44"
    >
      <div className="max-w-[680px] flex-[1_1_460px]">
        <h2 id="about-title" className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {t('about.label')}
        </h2>
        <p className="mt-5 text-[clamp(26px,3.1vw,44px)] font-medium leading-[1.2] tracking-[-0.035em]">
          {words.map((word, i) => {
            const isAccent = word.startsWith('*')
            return (
              <span key={i} className={`about-word ${isAccent ? 'accent' : ''}`}>
                {word.replaceAll('*', '')}{' '}
              </span>
            )
          })}
        </p>
      </div>

      {/* perspective sur le parent : c'est ce qui donne la profondeur à la rotation 3D */}
      <ul className="flex max-w-[420px] flex-[1_1_300px] flex-col gap-3.5 [perspective:1200px]">
        {stats.map((s) => (
          <li key={s.value} className="stat-card glass rounded-[22px] px-6 py-6">
            <p className="bg-gradient-to-b from-fg to-muted bg-clip-text text-[44px] font-semibold tracking-[-0.04em] text-transparent">
              {s.value}
            </p>
            <p className="mt-1 text-[15px] text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}