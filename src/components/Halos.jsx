import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Halos flous d'arrière-plan (ce que le verre floute), qui dérivent lentement et au hasard
export default function Halos() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.halo', ref.current).forEach((halo) => {
          // Un trajet vers une position aléatoire, puis on recommence avec une nouvelle cible
          const drift = () => {
            gsap.to(halo, {
              x: gsap.utils.random(-220, 220),
              y: gsap.utils.random(-160, 160),
              scale: gsap.utils.random(0.85, 1.2),
              duration: gsap.utils.random(14, 26),
              ease: 'sine.inOut',
              onComplete: drift,
            })
          }
          drift()
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="halo absolute -top-40 left-[8%] size-[620px] rounded-full bg-accent/10 blur-[110px] will-change-transform" />
      <div className="halo absolute -bottom-40 -right-24 size-[540px] rounded-full bg-halo blur-[120px] will-change-transform" />
    </div>
  )
}
