import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { FavoritesContext } from './FavoritesContext.js'

// Cada usuario tiene su propia lista; sin sesión se usa la del visitante
const storageKey = (userId) => `sebring:favorites:${userId ?? 'guest'}`

function readStored(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? []
  } catch {
    return []
  }
}

// Favoritos guardados en el navegador, separados por usuario
export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const key = storageKey(user?.id)
  const [state, setState] = useState(() => ({ key, ids: readStored(key) }))

  // Al iniciar o cerrar sesión, carga la lista del nuevo usuario
  if (state.key !== key) {
    setState({ key, ids: readStored(key) })
  }
  const { ids } = state

  useEffect(() => {
    try {
      localStorage.setItem(state.key, JSON.stringify(state.ids))
    } catch {
      // Sin acceso a localStorage (modo privado): los favoritos solo duran la sesión
    }
  }, [state])

  const toggleFavorite = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      ids: prev.ids.includes(id) ? prev.ids.filter((x) => x !== id) : [...prev.ids, id],
    }))
  }, [])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])

  const value = useMemo(() => ({ ids, toggleFavorite, isFavorite }), [ids, toggleFavorite, isFavorite])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
