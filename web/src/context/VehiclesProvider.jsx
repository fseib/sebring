import { useCallback, useEffect, useMemo, useState } from 'react'
import * as vehiclesApi from '../api/vehicles.js'
import demoVehicles from '../data/vehicles.js'
import { fromApi, toApi } from '../services/vehicleMapper.js'
import { VehiclesContext } from './VehiclesContext.js'

// Fuente única de vehículos para toda la app (tienda + panel).
// Intenta cargar desde el backend; si no responde o no tiene datos, usa los datos de demo.
export function VehiclesProvider({ children }) {
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
  const saveVehicle = useCallback(
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

  const removeVehicle = useCallback(
    async (id) => {
      if (source === 'api') await vehiclesApi.deleteVehicle(id)
      setVehicles((prev) => prev.filter((v) => v.id !== id))
    },
    [source],
  )

  const value = useMemo(
    () => ({ vehicles, source, loading, getVehicleById, saveVehicle, removeVehicle }),
    [vehicles, source, loading, getVehicleById, saveVehicle, removeVehicle],
  )

  return <VehiclesContext.Provider value={value}>{children}</VehiclesContext.Provider>
}
