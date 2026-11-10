import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de página vuelve arriba; si la URL tiene #ancla, scrollea a esa sección.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return undefined
    }
    // Espera a que la página termine de renderizar
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default ScrollManager
