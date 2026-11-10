import { Heart } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites.js'
import { IconButton } from '../ui'

function FavoriteButton({ vehicleId, size = 34, variant = 'overlay', ...rest }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(vehicleId)
  return (
    <IconButton
      icon={Heart}
      label={active ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      variant={variant}
      size={size}
      active={active}
      aria-pressed={active}
      iconProps={{ fill: active ? 'currentColor' : 'none' }}
      onClick={(e) => {
        e.preventDefault()
        toggleFavorite(vehicleId)
      }}
      {...rest}
    />
  )
}

export default FavoriteButton
