import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Adresse définitive du site (à changer si tu passes sur un nom de domaine à toi)
const SITE = 'https://mirary.netlify.app'

const readSeo = (lng) => JSON.parse(fs.readFileSync(`src/locales/${lng}.json`, 'utf-8')).seo
const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Balises <head> de référencement pour une langue : titre, description, URL canonique,
// versions linguistiques (hreflang), aperçus réseaux sociaux et données structurées (JSON-LD)
function seoHead(lng) {
  const seo = readSeo(lng)
  const url = lng === 'en' ? `${SITE}/en/` : `${SITE}/`
  const image = `${SITE}/og-${lng}.jpg`
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mirary Rasolohery',
    alternateName: 'Mirary R.',
    jobTitle: seo.jobTitle,
    description: seo.description,
    url,
    image,
    address: { '@type': 'PostalAddress', addressLocality: 'Antananarivo', addressCountry: 'MG' },
    knowsAbout: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'WordPress', 'WooCommerce', 'Magento 2', 'Figma', 'Web accessibility'],
    knowsLanguage: ['fr', 'en', 'mg'],
    sameAs: ['https://github.com/Limule-slime', 'https://www.linkedin.com/in/mirary-rasolohery'],
  }

  return `<!--seo-start-->
    <title>${escape(seo.title)}</title>
    <meta name="description" content="${escape(seo.description)}" />
    <meta name="author" content="Mirary Rasolohery" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="fr" href="${SITE}/" />
    <link rel="alternate" hreflang="en" href="${SITE}/en/" />
    <link rel="alternate" hreflang="x-default" href="${SITE}/" />
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="Mirary Rasolohery" />
    <meta property="og:title" content="${escape(seo.title)}" />
    <meta property="og:description" content="${escape(seo.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(seo.ogAlt)}" />
    <meta property="og:locale" content="${lng === 'en' ? 'en_US' : 'fr_FR'}" />
    <meta property="og:locale:alternate" content="${lng === 'en' ? 'fr_FR' : 'en_US'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(seo.title)}" />
    <meta name="twitter:description" content="${escape(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${JSON.stringify(person)}</script>
    <!--seo-end-->`
}

// Plugin maison : injecte les balises FR dans index.html, puis, au build,
// crée dist/en/index.html avec les balises EN (même application, autre langue)
function seoPlugin() {
  let isBuild = false
  return {
    name: 'portfolio-seo',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    transformIndexHtml(html, ctx) {
      const lng = ctx?.originalUrl?.startsWith('/en') ? 'en' : 'fr' // en dev, /en/ sert aussi index.html
      return html.replace('<!--seo-->', seoHead(lng)).replace('<html lang="fr"', `<html lang="${lng}"`)
    },
    closeBundle() {
      if (!isBuild) return
      const dist = path.resolve('dist')
      const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
      const en = html
        .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, seoHead('en'))
        .replace('<html lang="fr"', '<html lang="en"')
      fs.mkdirSync(path.join(dist, 'en'), { recursive: true })
      fs.writeFileSync(path.join(dist, 'en', 'index.html'), en)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
})
