import { useTranslation } from 'react-i18next'
import { useClock } from '../hooks/useClock'

const LANGS = ['fr', 'en']

export default function Nav() {
  const { t, i18n } = useTranslation()
  const time = useClock()
  const current = i18n.resolvedLanguage

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="glass flex w-full max-w-5xl items-center justify-between gap-4 rounded-full py-2 pl-6 pr-2">
        <a href="#home" className="text-[17px] font-bold tracking-[-0.02em]">
          Mirary R.
        </a>

        <div className="flex items-center gap-2">
          <span className="hidden px-2 font-mono text-xs text-muted sm:inline">
            {t('nav.clock')} {time}
          </span>

          {/* Bascule FR / EN */}
          <div role="group" aria-label={t('nav.language')} className="flex rounded-full border border-glass-stroke p-1">
            {LANGS.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => i18n.changeLanguage(lng)}
                aria-pressed={current === lng}
                className={`h-9 min-w-11 rounded-full px-3 font-mono text-xs uppercase transition ${
                  current === lng ? 'bg-fg text-ink' : 'text-muted hover:text-fg'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-ink sm:inline-flex"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </header>
  )
}