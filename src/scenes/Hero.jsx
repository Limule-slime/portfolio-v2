import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center"
    >
      <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]">
        <span aria-hidden="true" className="size-[7px] rounded-full bg-success" />
        {t('hero.badge')}
      </p>

      <h1
        id="hero-title"
        className="mt-8 text-[clamp(40px,6.4vw,92px)] font-semibold leading-[1.04] tracking-[-0.055em]"
      >
        {t('hero.title')}
        <br />
        <span className="accent">{t('hero.titleAccent')}</span>
      </h1>

      <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">{t('hero.intro')}</p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a href="#work" className="inline-flex h-13 items-center gap-2 rounded-full bg-fg px-7 font-medium text-ink transition hover:-translate-y-0.5">
          {t('hero.ctaWork')} <span aria-hidden="true">→</span>
        </a>
        <a href="#" className="glass inline-flex h-13 items-center gap-2 rounded-full px-7 font-medium transition hover:-translate-y-0.5">
          {t('hero.ctaCv')} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}