import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { changeLanguage } from '../i18n'

const LANGS = ['fr', 'en']

const SunIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const current = i18n.resolvedLanguage
  const isDark = theme === 'dark'

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="glass flex w-full max-w-5xl items-center justify-between gap-4 rounded-full py-2 pl-6 pr-2">
        <a href="#home" className="text-[17px] font-bold tracking-[-0.02em]">
          Mirary R.
        </a>

        <div className="flex items-center gap-2">
          {/* Bascule clair / sombre : l'icône montre le thème vers lequel on va */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t('nav.themeToLight') : t('nav.themeToDark')}
            className="inline-flex size-11 items-center justify-center rounded-full border border-glass-stroke transition hover:bg-glass-strong"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Bascule FR / EN */}
          <div role="group" aria-label={t('nav.language')} className="flex rounded-full border border-glass-stroke p-1">
            {LANGS.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => changeLanguage(lng)}
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
