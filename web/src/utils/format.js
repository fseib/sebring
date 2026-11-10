const numberFormat = new Intl.NumberFormat('es-AR')

export function formatNumber(value) {
  return numberFormat.format(Math.round(Number(value) || 0))
}

export function formatUSD(value, { prefix = 'USD ' } = {}) {
  return `${prefix}${formatNumber(value)}`
}

export function formatARS(value) {
  return `$${formatNumber(value)} ARS`
}

export function formatKm(value) {
  return `${formatNumber(value)} km`
}

// 14_200_000 -> "14.2M", 36_980 -> "36.9K"
export function formatCompact(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return String(value)
}

export function formatDate(value) {
  // "2025-02-12" se interpreta como UTC y en Argentina mostraría el día anterior
  const date = typeof value === 'string' && value.length === 10 ? new Date(`${value}T12:00:00`) : new Date(value)
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Tiempo restante legible: "14h 20m"
export function formatTimeLeft(isoDate) {
  const diff = new Date(isoDate).getTime() - Date.now()
  if (diff <= 0) return 'Vencida'
  const hours = Math.floor(diff / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  return `${hours}h ${minutes}m`
}
