export const EMAIL = 'harsmix@gmail.com'

export const LINKS = [
  { label: 'GitHub', url: 'https://github.com/Limule-slime' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mirary-rasolohery' },
]

// Un CV par langue, à déposer dans public/cv/
export const cvUrl = (lng) => `/cv/mirary-rasolohery-cv-${lng === 'en' ? 'en' : 'fr'}.pdf`

// Clé publique Web3Forms (formulaire de contact) : elle ne permet que d'envoyer des messages
// vers l'adresse liée à la clé, on peut donc la laisser dans le code côté navigateur.
export const WEB3FORMS_KEY = 'e964ef1d-9f64-4532-86ed-7574a88a93ce'
