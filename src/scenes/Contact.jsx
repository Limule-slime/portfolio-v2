import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../lib/gsap'
import ContactForm from '../components/ContactForm'
import { EMAIL, LINKS } from '../data/contact'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* presse-papiers indisponible : le lien mailto reste utilisable */
    }
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Pas d'épinglage : c'est la dernière section. L'animation se joue pendant son arrivée.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 15%', scrub: true },
        })
        tl.from('.contact-title', { scale: 3.2, filter: 'blur(16px)', opacity: 0, transformOrigin: 'left center', ease: 'power2.out' })
          .from('.contact-form', { x: 120, opacity: 0, filter: 'blur(8px)', ease: 'power2.out' }, '<0.3')
          .from('.contact-extra', { y: 24, opacity: 0, stagger: 0.1 }, '<0.2')
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      aria-labelledby="contact-title"
      className="flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-28 md:px-[clamp(24px,6vw,120px)] lg:pr-48"
    >
      <div className="flex flex-1 flex-wrap items-center justify-between gap-16">
        <div className="max-w-[600px] flex-[1_1_420px]">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{t('contact.label')}</p>
          <h2
            id="contact-title"
            className="contact-title mt-6 text-[clamp(56px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.06em]"
          >
            {t('contact.title')}
            <br />
            <span className="accent">{t('contact.titleAccent')}</span>
          </h2>
          <p className="contact-extra mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">{t('contact.intro')}</p>

          <div className="contact-extra mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-13 items-center gap-2 rounded-full bg-fg px-7 font-medium text-ink transition hover:-translate-y-0.5"
            >
              {EMAIL} <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="glass inline-flex h-13 items-center rounded-full px-6 font-medium transition hover:-translate-y-0.5"
            >
              {copied ? t('contact.copied') : t('contact.copy')}
            </button>
          </div>

          <ul className="contact-extra mt-8 flex flex-wrap gap-7 text-[15px] text-muted">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-block py-2 transition hover:text-fg">
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>

      <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-glass-stroke pt-6 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} Mirary Rasolohery · {t('contact.footer')}</span>
        <a href="#home" className="transition hover:text-fg">↑ Top</a>
      </footer>
    </section>
  )
}