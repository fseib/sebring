// Tasa nominal anual usada por el simulador (Plan Sebring)
export const ANNUAL_RATE = 0.068
export const DEFAULT_TERM = 48
export const DEFAULT_DOWN_PAYMENT = 0.25

// Cuota fija (sistema francés)
export function monthlyPayment(amount, months = DEFAULT_TERM, annualRate = ANNUAL_RATE) {
  if (amount <= 0) return 0
  const rate = annualRate / 12
  return (amount * rate) / (1 - Math.pow(1 + rate, -months))
}

// Cuota estimada de un vehículo financiando el saldo luego del anticipo
export function estimateMonthly(price, downPayment = DEFAULT_DOWN_PAYMENT, months = DEFAULT_TERM) {
  return monthlyPayment(price * (1 - downPayment), months)
}
