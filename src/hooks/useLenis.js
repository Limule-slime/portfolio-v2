import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useLenis() {
  useEffect(() => {
    // Pas de défilement "glissant" si le visiteur a demandé moins d'animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ anchors: true }) // anchors : les liens #section défilent en douceur
    lenis.on('scroll', ScrollTrigger.update)   // ScrollTrigger suit la position de Lenis

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)          // une seule boucle d'animation pour Lenis et GSAP
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}