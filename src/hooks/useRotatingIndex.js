import { useEffect, useState } from 'react'

export function useRotatingIndex(length, delay = 2400) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay)
    return () => clearInterval(id)
  }, [length, delay])

  return index
}