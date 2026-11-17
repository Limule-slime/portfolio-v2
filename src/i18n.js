import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr.json'
import en from './locales/en.json'

// La langue est donnée par l'adresse : "/" = français, "/en/" = anglais.
// Deux URL distinctes, c'est ce qui permet à Google d'indexer les deux versions
// (avec les balises hreflang générées par vite.config.js).
const langFromPath = () => (window.location.pathname.startsWith('/en') ? 'en' : 'fr')
const pathForLang = (lng) => (lng === 'en' ? '/en/' : '/')

i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: langFromPath(),
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en'],
  interpolation: { escapeValue: false }, // React protège déjà contre les injections
})

// Met à jour <html lang>, le titre et la description quand on change de langue sans recharger.
// (Les robots, eux, reçoivent directement la bonne version statique de chaque URL.)
function updateHead(lng) {
  const seo = i18n.getResourceBundle(lng, 'translation').seo
  document.documentElement.lang = lng
  document.title = seo.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
}
updateHead(i18n.resolvedLanguage)
i18n.on('languageChanged', updateHead)

// Change de langue sans perdre sa place dans la page.
// Au changement de langue, App.jsx reconstruit toutes les scènes. En supprimant les sections
// épinglées, ScrollTrigger (et le navigateur) font remonter la page. On mémorise donc la position
// et on fige la hauteur ; App.jsx restaure les deux une fois les scènes reconstruites.
let pendingScrollY = null

export function changeLanguage(lng) {
  if (lng === i18n.resolvedLanguage) return
  pendingScrollY = window.scrollY
  document.body.style.minHeight = `${document.documentElement.scrollHeight}px`
  // L'adresse suit la langue (sans recharger la page), en gardant l'ancre éventuelle (#work…)
  window.history.replaceState(null, '', pathForLang(lng) + window.location.hash)
  i18n.changeLanguage(lng)
}

// Lue une seule fois par App.jsx après la reconstruction
export function takePendingScrollY() {
  const y = pendingScrollY
  pendingScrollY = null
  return y
}

export default i18n
