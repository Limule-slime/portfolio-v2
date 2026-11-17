import { useState } from 'react'
import { ScrollTrigger, useGSAP } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Timeline, { SECTIONS } from './components/Timeline'
import Hero from './scenes/Hero'
import About from './scenes/About'
import Projects from './scenes/Projects'
import Expertise from './scenes/Expertise'
import Journey from './scenes/Journey'
import Contact from './scenes/Contact'

const SCENES = { home: Hero, about: About, work: Projects, expertise: Expertise, journey: Journey, contact: Contact }

export default function App() {
  const [active, setActive] = useState(0)
  useLenis()

  useGSAP(() => {
    SECTIONS.forEach((id, i) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && setActive(i),
      })
    })
  })

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[8%] size-[620px] rounded-full bg-accent/10 blur-[110px]" />
        <div className="absolute -bottom-40 -right-24 size-[540px] rounded-full bg-white/[0.06] blur-[120px]" />
      </div>

      <Nav />
      <Timeline active={active} />

      <main>
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