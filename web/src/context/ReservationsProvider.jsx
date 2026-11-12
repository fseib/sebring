import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { ReservationsContext } from './ReservationsContext.js'

const STORAGE_KEY = 'sebring:reservations'

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

// Historial de reservas hechas desde la tienda, guardado en el navegador (sin backend)
export function ReservationsProvider({ children }) {
  const { user } = useAuth()
  const [reservations, setReservations] = useState(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
    } catch {
      // Sin acceso a localStorage: el historial solo dura la sesión
    }
  }, [reservations])

  // reservation: { code, vehicleId, reservedUntil, delivery, deposit }
  const addReservation = useCallback(
    (reservation) => {
      if (!user) throw new Error('Tenés que iniciar sesión para reservar.')
      const entry = { ...reservation, userId: user.id, createdAt: new Date().toISOString() }
      setReservations((prev) => [entry, ...prev])
      return entry
    },
    [user],
  )

  const myReservations = useMemo(
    () => (user ? reservations.filter((r) => r.userId === user.id) : []),
    [reservations, user],
  )

  const value = useMemo(() => ({ myReservations, addReservation }), [myReservations, addReservation])

  return <ReservationsContext.Provider value={value}>{children}</ReservationsContext.Provider>
}
