// Contenido estático de la home
export const testimonials = [
  {
    name: 'Matías Rodríguez',
    detail: 'Compró Toyota Hilux SRX · Vicente López',
    text: 'Compré mi Hilux en Sebring y fue impecable. Me llevaron la camioneta hasta mi oficina en Vicente López para probarla, el informe pericial fue 100% transparente y me la entregaron el mismo día de la firma.',
  },
  {
    name: 'Carolina Silva V.',
    detail: 'Compró Peugeot 208 Feline · San Isidro',
    text: 'Tenía desconfianza al comprar un usado, pero los 180 puntos de peritaje y la garantía mecánica de 12 meses me dieron tranquilidad total. A las 72 hs de la seña ya estaba firmando en el registro automotor con transferencia lista.',
  },
  {
    name: 'Gonzalo Larraín',
    detail: 'Compró Amarok V6 Extreme · CABA',
    text: 'El proceso digital es impecable. El simulador de cuotas fue exacto con lo que finalmente firmé en la financiera. Cero sorpresas ni comisiones ocultas de concesionario. Totalmente recomendados.',
  },
]

export const trendingSearches = [
  { label: 'Toyota Hilux SRX', vehicleId: 1 },
  { label: 'VW Amarok V6', vehicleId: 2 },
  { label: 'Fiat Cronos', vehicleId: 13 },
  { label: 'Chevrolet Tracker', vehicleId: 19 },
  { label: 'Peugeot 208 GT', vehicleId: 33 },
]

export const budgetOptions = [
  { value: '', label: 'Sin límite' },
  { value: '25000', label: 'Hasta USD 25.000' },
  { value: '40000', label: 'Hasta USD 40.000' },
  { value: '60000', label: 'Hasta USD 60.000' },
  { value: '80000', label: 'Hasta USD 80.000' },
]

// Imagen representativa de cada categoría de carrocería
export const bodyTypeImages = {
  suv: '/images/cars/audi-q5.jpg',
  sedan: '/images/cars/bmw-serie-3.jpg',
  deportivo: '/images/cars/macan.jpg',
  electrificado: '/images/cars/mach-e.jpg',
  pickup: '/images/cars/hilux.jpg',
}
