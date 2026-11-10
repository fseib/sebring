// Valores y etiquetas compartidas entre catálogo, home y panel.

// Seña online para reservar una unidad
export const DEPOSIT_USD = 300
export const DEPOSIT_ARS = 350000
export const RESERVATION_HOURS = 72

export const PRICE_RANGE = { min: 10000, max: 100000, step: 500 }

export const CONDITIONS = [
  { value: 'okm', label: '0km' },
  { value: 'usado', label: 'Usados' },
]

export const BODY_TYPES = [
  { value: 'suv', label: 'SUVs Familiares', short: 'SUV' },
  { value: 'sedan', label: 'Sedanes Ejecutivos', short: 'Sedán' },
  { value: 'deportivo', label: 'Deportivos de Alta Gama', short: 'Deportivo' },
  { value: 'electrificado', label: 'Eléctricos & Híbridos', short: 'Electrificado' },
  { value: 'pickup', label: 'Pick-ups & Utilitarios', short: 'Pick-up' },
  { value: 'hatchback', label: 'Hatchbacks', short: 'Hatchback' },
]

// Los valores coinciden con el enum FuelType del backend (Nafta, Diesel, Hibrido, Electrico)
export const FUEL_TYPES = [
  { value: 'Nafta', label: 'Nafta' },
  { value: 'Diesel', label: 'Diésel' },
  { value: 'Hibrido', label: 'Híbrido' },
  { value: 'Electrico', label: '100% Eléctrico' },
]

// Coinciden con el enum Transmission del backend
export const TRANSMISSIONS = [
  { value: 'Automática', label: 'Automática' },
  { value: 'Manual', label: 'Manual' },
]

export const ZONES = [
  { value: 'CABA', label: 'CABA' },
  { value: 'GBA', label: 'GBA' },
  { value: 'Interior', label: 'Interior' },
]

export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025]

export const SORT_OPTIONS = [
  { value: 'reciente', label: 'Más reciente' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'km-asc', label: 'Menor kilometraje' },
]

export const VEHICLE_STATUS = {
  disponible: { label: 'Disponible', tone: 'primary' },
  reservado: { label: 'En reserva', tone: 'warning' },
  taller: { label: 'En taller', tone: 'soft' },
  vendido: { label: 'Vendido', tone: 'neutral' },
}

export const STATUS_OPTIONS = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'reservado', label: 'Señado (Depósito recibido)' },
  { value: 'taller', label: 'En taller / Preparación' },
  { value: 'vendido', label: 'Vendido' },
]

export function labelOf(list, value) {
  return list.find((item) => item.value === value)?.label ?? value
}
