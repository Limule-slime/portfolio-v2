import { useEffect, useState } from 'react'

const format = () =>
  new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Indian/Antananarivo',
  }).format(new Date())

export function useClock() {
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 20_000) // mise à jour toutes les 20 s
    return () => clearInterval(id) // nettoyage quand le composant disparaît
  }, [])

  return time
}