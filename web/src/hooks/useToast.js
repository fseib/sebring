import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext.js'

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return context
}
