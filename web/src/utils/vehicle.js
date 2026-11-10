import { FUEL_TYPES, labelOf } from '../constants/catalog.js'
import { estimateMonthly } from './finance.js'

export function getVehicleName(vehicle) {
  return `${vehicle.brand} ${vehicle.model}`
}

export function getVehicleTitle(vehicle) {
  return [vehicle.brand, vehicle.model, vehicle.version].filter(Boolean).join(' ')
}

// Precio publicado en catálogo (lista menos descuento promocional)
export function getFinalPrice(vehicle) {
  return Math.max(0, Number(vehicle.price) - Number(vehicle.discount || 0))
}

export function getMonthly(vehicle) {
  return estimateMonthly(getFinalPrice(vehicle))
}

export function getFuelLabel(vehicle) {
  return labelOf(FUEL_TYPES, vehicle.fuelType)
}

export function isElectrified(vehicle) {
  return vehicle.fuelType === 'Hibrido' || vehicle.fuelType === 'Electrico'
}

// Etiqueta principal sobre la foto en las tarjetas del catálogo
export function getStockTag(vehicle) {
  if (vehicle.status === 'reservado') return { label: 'Reservado', tone: 'warning' }
  if (vehicle.status === 'taller') return { label: 'En preparación', tone: 'neutral' }
  if (vehicle.condition === 'okm') return { label: '0km Entrega Inmediata', tone: 'dark' }
  if (getFinalPrice(vehicle) >= 60000) return { label: 'Gama Premium', tone: 'dark' }
  return { label: 'En Stock Físico', tone: 'dark' }
}

export function getConditionLabel(vehicle) {
  if (vehicle.condition === 'okm') return '0km'
  return vehicle.warranty ? 'Usado seleccionado' : 'Usado'
}

export function canBeReserved(vehicle) {
  return vehicle.status === 'disponible'
}
