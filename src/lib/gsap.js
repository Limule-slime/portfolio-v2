import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Sur mobile, la barre d'adresse qui apparaît/disparaît change la hauteur de l'écran :
// on évite de tout recalculer à chaque fois (source de saccades)
ScrollTrigger.config({ ignoreMobileResize: true })

// Deux régimes d'animation :
// - grand écran : sections épinglées (scènes "plein écran")
// - mobile / tablette : pas d'épinglage, animations légères au fil du défilement
export const DESKTOP = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
export const MOBILE = '(max-width: 1023px) and (prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, useGSAP }
