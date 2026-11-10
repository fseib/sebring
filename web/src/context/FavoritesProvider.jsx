import { useCallback, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext.js'

const STORAGE_KEY = 'sebring:favorites'

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

// Favoritos del visitante, guardados en el navegador
export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Sin acceso a localStorage (modo privado): los favoritos solo duran la sesión
    }
  }, [ids])

  const toggleFavorite = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])

  const value = useMemo(() => ({ ids, toggleFavorite, isFavorite }), [ids, toggleFavorite, isFavorite])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
