import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import fr from './locales/fr.json'
import en from './locales/en.json'

i18n
  .use(LanguageDetector)      // détecte la langue du navigateur
  .use(initReactI18next)      // relie i18next à React
  .init({
    resources: { fr: { translation: fr }, en: { translation: en } },
    supportedLngs: ['fr', 'en'],
    load: 'languageOnly',     // "en-US" devient "en"
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'], // d'abord le choix mémorisé, sinon le navigateur
      caches: ['localStorage'],             // mémorise le choix du visiteur
    },
    interpolation: { escapeValue: false },  // React protège déjà contre les injections
  })

// Garde <html lang="…"> à jour : lecteurs d'écran, référencement, traduction du navigateur
const setHtmlLang = (lng) => { document.documentElement.lang = lng }
setHtmlLang(i18n.resolvedLanguage)
i18n.on('languageChanged', setHtmlLang)

export default i18n