import { useContext } from 'react'
import { VehiclesContext } from '../context/VehiclesContext.js'

export function useVehicles() {
  const context = useContext(VehiclesContext)
  if (!context) throw new Error('useVehicles debe usarse dentro de <VehiclesProvider>')
  return context
}
