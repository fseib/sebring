import { Images, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { Badge, IconButton, Modal } from '../ui'
import FavoriteButton from './FavoriteButton.jsx'

const Main = styled.figure`
  position: relative;
  margin: 0;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};
  aspect-ratio: 16 / 10;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Corner = styled.div`
  position: absolute;
  ${({ $pos }) => $pos};
`

const Counter = styled.figcaption`
  position: absolute;
  bottom: 14px;
  left: 14px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 0.75rem;
  font-weight: 600;
`

const Thumbs = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
`

const Thumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  aspect-ratio: 16 / 11;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    left: 6px;
    bottom: 6px;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(15, 23, 42, 0.7);
    color: #fff;
    font-size: 0.66rem;
  }
`

const FullImage = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
`

// Galería de fotos con miniaturas y vista ampliada
function VehicleGallery({ vehicleId, images, title }) {
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const current = images[index] ?? images[0]

  return (
    <section aria-label="Galería de fotos">
      <Main>
        <img src={current.src} alt={`${title} - ${current.label}`} />
        <Counter>
          Foto {index + 1} de {images.length} · {current.label}
        </Counter>
        <Corner $pos="top: 14px; left: 14px;">
          <Badge tone="dark" pill icon={Images}>
            Galería HD
          </Badge>
        </Corner>
        <Corner $pos="top: 14px; right: 14px;">
          <FavoriteButton vehicleId={vehicleId} size={38} />
        </Corner>
        <Corner $pos="bottom: 14px; right: 14px;">
          <IconButton icon={Maximize2} label="Ver en pantalla completa" variant="overlay" size={38} onClick={() => setZoomed(true)} />
        </Corner>
      </Main>

      {images.length > 1 && (
        <Thumbs>
          {images.map((image, i) => (
            <li key={image.src}>
              <Thumb
                $active={i === index}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${image.label}`}
              >
                <img src={image.src} alt="" loading="lazy" />
                <span aria-hidden>{image.label}</span>
              </Thumb>
            </li>
          ))}
        </Thumbs>
      )}

      <Modal open={zoomed} onClose={() => setZoomed(false)} title={title} subtitle={current.label} size="lg">
        <FullImage src={current.src} alt={`${title} - ${current.label}`} />
      </Modal>
    </section>
  )
}

export default VehicleGallery
