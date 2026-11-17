export default function App() {
  return (
    // relative + overflow-hidden : les halos sont positionnés par rapport à <main>
    // et ne débordent pas (pas de barre de défilement horizontale)
    <main className="relative min-h-screen overflow-hidden">

      {/* Halos flous : ce que le verre va flouter. aria-hidden = ignorés par les lecteurs d'écran */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-[8%] size-[620px] rounded-full bg-accent/10 blur-[110px]" />
        <div className="absolute -bottom-40 -right-24 size-[540px] rounded-full bg-white/[0.06] blur-[120px]" />
      </div>

      <section
        aria-labelledby="hero-title"
        className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        {/* Badge en verre */}
        <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]">
          <span aria-hidden="true" className="size-[7px] rounded-full bg-success" />
          Frontend Developer · Disponible freelance &amp; CDI
        </p>

        {/* Titre : taille fluide avec clamp(), interlettrage resserré */}
        <h1
          id="hero-title"
          className="mt-8 text-[clamp(44px,7vw,104px)] font-semibold leading-[1.02] tracking-[-0.055em]"
        >
          Je conçois et développe des
          <br />
          {/* L'utilitaire "accent" défini dans index.css : serif italique orange */}
          <span className="accent">interfaces web.</span>
        </h1>

        <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">
          Front-end, de la maquette Figma au code, depuis Antananarivo, en remote
          pour la France, le Canada et ailleurs.
        </p>

        {/* Boutons : de vrais liens <a>, car ils mènent quelque part */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#projets"
            className="inline-flex h-13 items-center gap-2 rounded-full bg-fg px-7 font-medium text-ink transition hover:-translate-y-0.5"
          >
            Voir les projets <span aria-hidden="true">→</span>
          </a>
          <a
            href="#"
            className="glass inline-flex h-13 items-center gap-2 rounded-full px-7 font-medium transition hover:-translate-y-0.5"
          >
            CV PDF <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  )
}