import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EMPTY_FILTERS } from '../utils/catalog.js'

// Los filtros del catálogo viven en la URL (?marca=Toyota&condicion=okm...)
// así se pueden compartir links y llegar filtrado desde la home.
const PARAMS = {
  q: 'q',
  condition: 'condicion',
  bodyType: 'tipo',
  brands: 'marca',
  zones: 'zona',
  years: 'anio',
  fuels: 'combustible',
  minPrice: 'min',
  maxPrice: 'max',
  sort: 'orden',
  page: 'pagina',
}

const LIST_KEYS = ['brands', 'zones', 'fuels', 'years']
const NUMBER_KEYS = ['minPrice', 'maxPrice', 'page']

function parse(params) {
  const filters = { ...EMPTY_FILTERS }
  Object.entries(PARAMS).forEach(([key, param]) => {
    const raw = params.get(param)
    if (raw == null || raw === '') return
    if (LIST_KEYS.includes(key)) {
      const list = raw.split(',').filter(Boolean)
      filters[key] = key === 'years' ? list.map(Number) : list
    } else if (NUMBER_KEYS.includes(key)) {
      filters[key] = Number(raw)
    } else {
      filters[key] = raw
    }
  })
  return filters
}

export function serializeFilters(filters) {
  const params = new URLSearchParams()
  Object.entries(PARAMS).forEach(([key, param]) => {
    const value = filters[key]
    const isEmpty = value == null || value === '' || (Array.isArray(value) && value.length === 0)
    const isDefault = (key === 'sort' && value === 'reciente') || (key === 'page' && value === 1)
    if (!isEmpty && !isDefault) params.set(param, Array.isArray(value) ? value.join(',') : String(value))
  })
  return params
}

export function useCatalogFilters() {
  const [params, setParams] = useSearchParams()
  const filters = useMemo(() => parse(params), [params])

  // Cualquier cambio de filtro vuelve a la página 1
  const updateFilters = useCallback(
    (partial) => setParams(serializeFilters({ ...filters, page: 1, ...partial })),
    [filters, setParams],
  )

  const clearFilters = useCallback(
    () => setParams(serializeFilters({ ...EMPTY_FILTERS, sort: filters.sort })),
    [filters.sort, setParams],
  )

  return { filters, updateFilters, clearFilters }
}
