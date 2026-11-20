import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger, useGSAP } from './lib/gsap'
import { takePendingScrollY } from './i18n'
import { useLenis } from './hooks/useLenis'
import Halos from './components/Halos'
import Nav from './components/Nav'
import Timeline from './components/Timeline'
import { SECTIONS } from './data/sections'
import Hero from './scenes/Hero'
import About from './scenes/About'
import Projects from './scenes/Projects'
import Expertise from './scenes/Expertise'
import Journey from './scenes/Journey'
import Contact from './scenes/Contact'

const SCENES = { home: Hero, about: About, work: Projects, expertise: Expertise, journey: Journey, contact: Contact }

export default function App() {
  const [active, setActive] = useState(0)
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage
  useLenis()

  // L'adresse suit la section affichée (#about, #work…) : un lien copié
  // renvoie au bon endroit. replaceState : pas d'entrée ajoutée à l'historique.
  // On ne touche à l'URL que quand la section change vraiment (pas au chargement),
  // pour ne pas effacer un #section reçu dans un lien partagé.
  const lastActive = useRef(active)
  useEffect(() => {
    if (lastActive.current === active) return
    lastActive.current = active
    const hash = active === 0 ? '' : `#${SECTIONS[active]}`
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', window.location.pathname + hash)
    }
  }, [active])

  // Déclencheurs de la timeline. Recréés à chaque langue, APRÈS les scènes
  // (les effets des enfants passent avant ceux du parent), puis tout est recalculé.
  useGSAP(
    () => {
      const triggers = SECTIONS.map((id, i) =>
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          // Calculé APRÈS les sections épinglées, pour tenir compte de l'espace qu'elles ajoutent
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setActive(i),
        })
      )

      // Recalage explicite : quelle section est réellement à l'écran maintenant ?
      const syncActive = () => {
        const i = triggers.findIndex((t) => t.isActive)
        if (i !== -1) setActive(i)
      }

      ScrollTrigger.refresh()

      // Après un changement de langue : on revient à la position mémorisée par changeLanguage()
      // (i18n.js). On attend la frame suivante, quand tous les recalculs de ScrollTrigger sont finis.
      const y = takePendingScrollY()
      if (y !== null) {
        requestAnimationFrame(() => {
          window.scrollTo(0, y)
          ScrollTrigger.update()
          document.body.style.minHeight = ''
          syncActive()
        })
      } else {
        syncActive()
      }
    },
    { dependencies: [lang], revertOnUpdate: true } // revertOnUpdate : supprime les anciens déclencheurs
  )

  return (
    <>
      <Halos />

      <Nav />
      <Timeline active={active} />

      {/* key={lang} : au changement de langue, toutes les scènes sont démontées puis
          remontées dans l'ordre, avec des animations neuves et des mesures justes */}
      <main key={lang}>
        {SECTIONS.map((id) => {
          const Scene = SCENES[id]
          return (
            <div id={id} key={id}>
              <Scene />
            </div>
          )
        })}
      </main>
    </>
  )
}