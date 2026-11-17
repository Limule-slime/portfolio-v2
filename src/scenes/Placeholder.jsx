import { useTranslation } from 'react-i18next'

export default function Placeholder({ id }) {
  const { t } = useTranslation()
  return (
    <section className="flex min-h-screen items-center justify-center">
      <h2 className="text-6xl font-semibold tracking-[-0.05em] text-muted">{t(`sections.${id}`)}</h2>
    </section>
  )
}