import Nav from './components/Nav'
import Timeline from './components/Timeline'
import Hero from './scenes/Hero'

export default function App() {
  return (
    <>
      {/* Halos fixes : ils restent derrière tout le site pendant le défilement */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[8%] size-[620px] rounded-full bg-accent/10 blur-[110px]" />
        <div className="absolute -bottom-40 -right-24 size-[540px] rounded-full bg-white/[0.06] blur-[120px]" />
      </div>

      <Nav />
      <Timeline active={0} />

      <main>
        <Hero />
      </main>
    </>
  )
}