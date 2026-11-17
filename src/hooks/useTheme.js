import { useEffect, useState } from 'react'

// Le thème initial a déjà été posé sur <html> par le petit script de index.html
const getInitial = () => document.documentElement.dataset.theme || 'dark'

export function useTheme() {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme) // mémorise le choix du visiteur
    } catch {
      /* stockage indisponible (navigation privée stricte) : on ignore */
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return [theme, toggle]
}
