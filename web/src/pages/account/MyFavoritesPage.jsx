import { Heart } from 'lucide-react'
import { Button, EmptyState, Grid } from '../../components/ui'
import VehicleCard from '../../components/vehicles/VehicleCard.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'
import { useVehicles } from '../../hooks/useVehicles.js'

// "Mis favoritos": unidades marcadas con el corazón
function MyFavoritesPage() {
  const { ids } = useFavorites()
  const { vehicles } = useVehicles()
  const favorites = vehicles.filter((v) => ids.includes(v.id))

  if (favorites.length === 0) {
    return (
      <EmptyState icon={Heart} title="No tenés favoritos todavía" action={<Button to="/catalogo">Explorar catálogo</Button>}>
        Tocá el corazón en cualquier unidad para guardarla acá.
      </EmptyState>
    )
  }

  return (
    <Grid as="ul" $cols={3}>
      {favorites.map((vehicle) => (
        <li key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </li>
      ))}
    </Grid>
  )
}

export default MyFavoritesPage
