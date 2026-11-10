import { BODY_TYPES, CONDITIONS, FUEL_TYPES, labelOf } from '../constants/catalog.js'
import { formatUSD } from './format.js'
import { getFinalPrice, getVehicleTitle, isElectrified } from './vehicle.js'

export const EMPTY_FILTERS = {
  q: '',
  condition: '',
  bodyType: '',
  brands: [],
  zones: [],
  years: [],
  fuels: [],
  minPrice: null,
  maxPrice: null,
  sort: 'reciente',
  page: 1,
}

// Vehículos que se muestran en la tienda pública
export function isPublic(vehicle) {
  return vehicle.status !== 'vendido'
}

export function filterVehicles(vehicles, filters) {
  const q = filters.q.trim().toLowerCase()
  return vehicles.filter((v) => {
    if (!isPublic(v)) return false
    if (q && !getVehicleTitle(v).toLowerCase().includes(q)) return false
    if (filters.condition && v.condition !== filters.condition) return false
    if (filters.bodyType === 'electrificado' && !isElectrified(v)) return false
    if (filters.bodyType && filters.bodyType !== 'electrificado' && v.bodyType !== filters.bodyType) return false
    if (filters.brands.length && !filters.brands.includes(v.brand)) return false
    if (filters.zones.length && !filters.zones.includes(v.location.zone)) return false
    if (filters.years.length && !filters.years.includes(v.year)) return false
    if (filters.fuels.length && !filters.fuels.includes(v.fuelType)) return false
    const price = getFinalPrice(v)
    if (filters.minPrice != null && price < filters.minPrice) return false
    if (filters.maxPrice != null && price > filters.maxPrice) return false
    return true
  })
}

const sorters = {
  reciente: (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  'precio-asc': (a, b) => getFinalPrice(a) - getFinalPrice(b),
  'precio-desc': (a, b) => getFinalPrice(b) - getFinalPrice(a),
  'km-asc': (a, b) => a.km - b.km,
}

export function sortVehicles(vehicles, sort) {
  return [...vehicles].sort(sorters[sort] ?? sorters.reciente)
}

export function paginate(items, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    from: items.length ? start + 1 : 0,
    to: Math.min(start + pageSize, items.length),
  }
}

// Cantidad de vehículos por valor de un campo (para los contadores de filtros)
export function countBy(vehicles, getKey) {
  return vehicles.reduce((acc, v) => {
    const key = getKey(v)
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})
}

// Chips de "Filtros activos": cada uno sabe qué parte del filtro quitar
export function getActiveFilterChips(filters) {
  const chips = []
  const without = (key, value) => ({ [key]: filters[key].filter((item) => item !== value) })

  if (filters.q) chips.push({ id: 'q', label: `"${filters.q}"`, remove: { q: '' } })
  if (filters.condition) {
    chips.push({ id: 'condition', label: labelOf(CONDITIONS, filters.condition), remove: { condition: '' } })
  }
  if (filters.bodyType) {
    chips.push({ id: 'bodyType', label: labelOf(BODY_TYPES, filters.bodyType), remove: { bodyType: '' } })
  }
  filters.brands.forEach((b) => chips.push({ id: `brand-${b}`, label: b, remove: without('brands', b) }))
  filters.zones.forEach((z) => chips.push({ id: `zone-${z}`, label: z, remove: without('zones', z) }))
  filters.years.forEach((y) => chips.push({ id: `year-${y}`, label: String(y), remove: without('years', y) }))
  filters.fuels.forEach((f) =>
    chips.push({ id: `fuel-${f}`, label: labelOf(FUEL_TYPES, f), remove: without('fuels', f) }),
  )
  if (filters.minPrice != null) {
    chips.push({ id: 'min', label: `Desde ${formatUSD(filters.minPrice)}`, remove: { minPrice: null } })
  }
  if (filters.maxPrice != null) {
    chips.push({ id: 'max', label: `Menos de ${formatUSD(filters.maxPrice)}`, remove: { maxPrice: null } })
  }
  return chips
}
