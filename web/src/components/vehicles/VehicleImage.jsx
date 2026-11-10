import styled from 'styled-components'

const Frame = styled.div`
  position: relative;
  aspect-ratio: ${({ $ratio }) => $ratio};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
`

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`

// Lista de etiquetas sobre la foto (cada etiqueta va en un <li>)
export const TagStack = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
`

const PLACEHOLDER = '/images/cars/placeholder.svg'

// Foto de vehículo con proporción fija y fallback si la imagen no carga
function VehicleImage({ src, alt, ratio = '16 / 10', children, loading = 'lazy' }) {
  return (
    <Frame $ratio={ratio}>
      <img
        src={src || PLACEHOLDER}
        alt={alt}
        loading={loading}
        onError={(e) => {
          if (!e.currentTarget.src.endsWith(PLACEHOLDER)) e.currentTarget.src = PLACEHOLDER
        }}
      />
      {children}
    </Frame>
  )
}

export default VehicleImage
