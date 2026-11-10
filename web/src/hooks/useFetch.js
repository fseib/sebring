import { useEffect, useState } from 'react'

// Ejecuta una función async al montar el componente y expone { data, loading, error }.
// Pasar una función estable (definida fuera del componente o con useCallback).
export function useFetch(fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetcher()
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [fetcher])

  return { data, loading, error }
}
