import { useTranslation } from 'react-i18next'
import { SECTIONS } from '../data/sections'

export default function Timeline({ active = 0 }) {
  const { t } = useTranslation()
  const progress = (active / (SECTIONS.length - 1)) * 100

  return (
    <nav
      aria-label={t('timeline.label')}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 gap-3.5 lg:flex"
    >
      <ol className="flex flex-col gap-1.5 text-right">
        {SECTIONS.map((id, i) => {
          const isActive = i === active
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'step' : undefined}
                className="flex min-h-11 flex-col items-end justify-center"
              >
                <span className={`font-mono text-[11px] ${isActive ? 'text-accent' : 'text-muted'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.1em] transition duration-300 ${
                    isActive ? 'text-fg' : 'translate-x-1.5 text-muted opacity-40'
                  }`}
                >
                  {t(`sections.${id}`)}
                </span>
              </a>
            </li>
          )
        })}
      </ol>

      {/* Piste + progression + point actif */}
      <div aria-hidden="true" className="relative w-0.5 rounded-full bg-glass-stroke">
        <div
          className="absolute inset-x-0 top-0 rounded-full bg-fg transition-[height] duration-500"
          style={{ height: `${progress}%` }}
        />
        <div
          className="absolute -left-[5px] size-3 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/20 transition-[top] duration-500"
          style={{ top: `${progress}%` }}
        />
      </div>
    </nav>
  )
}