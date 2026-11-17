export const EMAIL = 'harsmix@gmail.com'

export const LINKS = [
  { label: 'GitHub', url: 'https://github.com/Limule-slime' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mirary-rasolohery-0977bb98' },
]

// Un CV par langue, à déposer dans public/cv/
export const cvUrl = (lng) => `/cv/mirary-rasolohery-cv-${lng === 'en' ? 'en' : 'fr'}.pdf`
