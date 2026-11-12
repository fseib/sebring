import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ToastViewport from '../components/ui/Toast.jsx'
import { ToastContext } from './ToastContext.js'

const DURATION = 4000

// Notificaciones efímeras para confirmar acciones (guardar, eliminar, etc.).
// Uso: const { showToast } = useToast(); showToast({ title: 'Guardado', message: '...', tone: 'success' })
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismissToast = useCallback((id) => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    ({ title, message, tone = 'success', duration = DURATION }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      setToasts((prev) => [...prev, { id, title, message, tone }])
      timers.current.set(id, setTimeout(() => dismissToast(id), duration))
      return id
    },
    [dismissToast],
  )

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
