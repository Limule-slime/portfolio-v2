import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const TYPES = ['freelance', 'job', 'other']

// Classes partagées par les champs texte
const field =
  'w-full rounded-[14px] border border-glass-stroke bg-glass-strong px-4 py-3.5 text-[15px] placeholder:text-muted/70 outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30'

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()            // on gère l'envoi nous-mêmes, sans recharger la page
    const form = e.currentTarget  // à garder AVANT le await (currentTarget est vidé ensuite)
    setStatus('sending')

    try {
      // Netlify attend un POST classique encodé comme un formulaire HTML
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="contact-form glass w-full max-w-[500px] rounded-[28px] p-[clamp(22px,3vw,32px)]"
    >
      {/* Champs techniques pour Netlify */}
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{t('contact.form.heading')}</h3>

      {/* Type de demande : de vrais boutons radio, stylés en pilules */}
      <fieldset className="mt-5">
        <legend className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {t('contact.form.type')}
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {TYPES.map((type, i) => (
            <label
              key={type}
              className="cursor-pointer rounded-full border border-glass-stroke px-4 py-2.5 text-sm font-medium transition hover:border-fg/40 has-checked:border-fg has-checked:bg-fg has-checked:text-ink has-focus-visible:ring-2 has-focus-visible:ring-accent/50"
            >
              <input type="radio" name="type" value={type} defaultChecked={i === 0} className="sr-only" />
              {t(`contact.form.types.${type}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t('contact.form.name')}</span>
          <input name="name" required autoComplete="name" placeholder={t('contact.form.namePh')} className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t('contact.form.email')}</span>
          <input type="email" name="email" required autoComplete="email" placeholder={t('contact.form.emailPh')} className={`${field} mt-2`} />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t('contact.form.message')}</span>
        <textarea name="message" required rows={5} placeholder={t('contact.form.messagePh')} className={`${field} mt-2 resize-y`} />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-fg font-medium text-ink transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
      >
        {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
        {status !== 'sending' && <span aria-hidden="true">→</span>}
      </button>

      {/* Zone annoncée par les lecteurs d'écran quand son contenu change */}
      <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm">
        {status === 'success' && <span className="text-success">{t('contact.form.success')}</span>}
        {status === 'error' && <span className="text-accent">{t('contact.form.error')}</span>}
      </p>
    </form>
  )
}