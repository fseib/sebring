import { useContext } from 'react'
import { ReservationsContext } from '../context/ReservationsContext.js'

export function useReservations() {
  const context = useContext(ReservationsContext)
  if (!context) throw new Error('useReservations debe usarse dentro de <ReservationsProvider>')
  return context
}
