import demoVehicles from '../data/vehicles.js'

const PLACEHOLDER = '/images/cars/placeholder.svg'

const defaults = {
  version: '',
  condition: 'usado',
  bodyType: 'suv',
  segment: '',
  discount: 0,
  km: 0,
  transmission: 'Automática',
  gearbox: 'Automática',
  fuelType: 'Nafta',
  fuelDetail: 'Nafta',
  engine: '',
  hp: 0,
  traction: '-',
  location: { zone: 'CABA', label: 'CABA', branch: 'Sucursal Vicente López / Pto. Madero' },
  plate: 'Sin placa (trámite)',
  vin: '-',
  stockCode: '-',
  status: 'disponible',
  stock: 1,
  warranty: true,
  singleOwner: false,
  image: PLACEHOLDER,
  gallery: [],
  publishedAt: new Date().toISOString(),
  inspection: { score: 100, date: new Date().toISOString() },
  notes: '',
  specs: { performance: [], comfort: [], safety: [] },
}

// Busca un vehículo de demo de la misma marca y modelo para reutilizar fotos y ficha técnica,
// ya que el backend solo guarda los datos básicos.
function findDemoMatch(apiVehicle) {
  const brand = apiVehicle.brand?.toLowerCase()
  const model = apiVehicle.model?.toLowerCase()
  return demoVehicles.find((v) => v.brand.toLowerCase() === brand && v.model.toLowerCase() === model)
}

// Backend (VehicleController) -> modelo de la UI
export function fromApi(apiVehicle, base) {
  const template = base ?? findDemoMatch(apiVehicle) ?? defaults
  const image = apiVehicle.imageUrl || template.image
  return {
    ...defaults,
    ...template,
    id: apiVehicle.id,
    brand: apiVehicle.brand,
    model: apiVehicle.model,
    version: apiVehicle.version ?? '',
    year: apiVehicle.year,
    price: Number(apiVehicle.price),
    currency: apiVehicle.currency ?? 'USD',
    stock: apiVehicle.stock ?? 0,
    transmission: apiVehicle.transmission ?? template.transmission,
    fuelType: apiVehicle.fuelType ?? template.fuelType,
    engine: apiVehicle.engine ?? template.engine,
    description: apiVehicle.description ?? '',
    status: apiVehicle.status ?? 'disponible',
    image,
    gallery: template.gallery?.length ? template.gallery : [{ src: image, label: 'Frontal' }],
  }
}

// Modelo de la UI -> VehicleRequest del backend
export function toApi(vehicle) {
  return {
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version,
    year: Number(vehicle.year),
    price: Number(vehicle.price),
    currency: vehicle.currency ?? 'USD',
    stock: Number(vehicle.stock ?? 1),
    transmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    engine: vehicle.engine,
    imageUrl: vehicle.image,
    description: vehicle.description ?? '',
    status: vehicle.status,
  }
}

export { defaults as vehicleDefaults }
