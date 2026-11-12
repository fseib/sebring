import { useCallback, useEffect, useMemo, useState } from 'react'
import * as vehiclesApi from '../api/vehicles.js'
import demoVehicles from '../data/vehicles.js'
import { useAuth } from '../hooks/useAuth.js'
import { fromApi, toApi } from '../services/vehicleMapper.js'
import { VehiclesContext } from './VehiclesContext.js'

// Fuente única de vehículos para toda la app (tienda + panel).
// Intenta cargar desde el backend; si no responde o no tiene datos, usa los datos de demo.
export function VehiclesProvider({ children }) {
  const { isAdmin } = useAuth()
  const [vehicles, setVehicles] = useState(demoVehicles)
  const [source, setSource] = useState('demo')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    vehiclesApi
      .getVehicles()
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          setVehicles(list.map((v) => fromApi(v)))
          setSource('api')
        }
      })
      .catch(() => {
        // Backend apagado: seguimos con los datos de demo
      })
      .finally(() => setLoading(false))
  }, [])

  const getVehicleById = useCallback(
    (id) => vehicles.find((v) => String(v.id) === String(id)),
    [vehicles],
  )

  // Crea o actualiza. Con backend, persiste vía API y conserva los campos que solo existen en la UI.
  const persistVehicle = useCallback(
    async (vehicle) => {
      let saved = vehicle
      if (source === 'api') {
        const response = vehicle.id
          ? await vehiclesApi.updateVehicle(vehicle.id, toApi(vehicle))
          : await vehiclesApi.createVehicle(toApi(vehicle))
        saved = fromApi(response, vehicle)
      } else if (!vehicle.id) {
        saved = { ...vehicle, id: Date.now() }
      }

      setVehicles((prev) =>
        prev.some((v) => v.id === saved.id)
          ? prev.map((v) => (v.id === saved.id ? saved : v))
          : [saved, ...prev],
      )
      return saved
    },
    [source],
  )

  // Alta / edición de inventario: solo administradores
  const saveVehicle = useCallback(
    async (vehicle) => {
      if (!isAdmin) throw new Error('Solo un administrador puede modificar el inventario.')
      return persistVehicle(vehicle)
    },
    [isAdmin, persistVehicle],
  )

  // Reserva hecha por un cliente desde la tienda: solo cambia el estado de la unidad
  const reserveVehicle = useCallback(
    (vehicle, reservedUntil) => persistVehicle({ ...vehicle, status: 'reservado', reservedUntil }),
    [persistVehicle],
  )

  const removeVehicle = useCallback(
    async (id) => {
      if (!isAdmin) throw new Error('Solo un administrador puede eliminar unidades.')
      if (source === 'api') await vehiclesApi.deleteVehicle(id)
      setVehicles((prev) => prev.filter((v) => v.id !== id))
    },
    [source, isAdmin],
  )

  const value = useMemo(
    () => ({ vehicles, source, loading, getVehicleById, saveVehicle, reserveVehicle, removeVehicle }),
    [vehicles, source, loading, getVehicleById, saveVehicle, reserveVehicle, removeVehicle],
  )

  return <VehiclesContext.Provider value={value}>{children}</VehiclesContext.Provider>
}
