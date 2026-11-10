import { ArrowRight, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatKm, formatUSD } from '../../utils/format.js'
import { getFinalPrice, getVehicleTitle } from '../../utils/vehicle.js'
import { Badge, Button, SpecItem } from '../ui'
import FavoriteButton from './FavoriteButton.jsx'
import VehicleImage, { ImageOverlay, TagStack } from './VehicleImage.jsx'

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  flex: 1;
`

const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Meta = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.74rem;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    color: ${({ theme }) => theme.colors.primary};
    white-space: nowrap;
  }
`

const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Specs = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin: 0;
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`

const PriceBlock = styled.dl`
  margin: 0;

  dt {
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  dd {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.2;
  }

  small {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`

function getConditionBadge(vehicle) {
  if (vehicle.condition === 'okm') return { label: '0km Concesionario', tone: 'dark' }
  if (vehicle.warranty) return { label: 'Usado Certificado', tone: 'primary' }
  return { label: 'Usado Seleccionado', tone: 'primary' }
}

// Tarjeta de la sección "Vehículos destacados" de la home
function FeaturedVehicleCard({ vehicle }) {
  const title = getVehicleTitle(vehicle)
  const badge = getConditionBadge(vehicle)
  const price = getFinalPrice(vehicle)
  const detailUrl = `/catalogo/${vehicle.id}`

  return (
    <Wrapper aria-label={title}>
      <VehicleImage src={vehicle.image} alt={title}>
        <ImageOverlay>
          <TagStack>
            <li>
              <Badge tone={badge.tone} size="sm">
                {badge.label}
              </Badge>
            </li>
            <li>
              <Badge tone="soft" size="sm" uppercase={false} icon={BadgeCheck}>
                180 Pts Certificado
              </Badge>
            </li>
          </TagStack>
          <FavoriteButton vehicleId={vehicle.id} />
        </ImageOverlay>
      </VehicleImage>
      <Body>
        <CardHeader>
          <Meta>
            <span>{vehicle.segment}</span>
            <strong>Patente: {vehicle.plate}</strong>
          </Meta>
          <Title>
            <Link to={detailUrl}>{title}</Link>
          </Title>
        </CardHeader>
        <Specs>
          <SpecItem variant="box" value={formatKm(vehicle.km)} label="Kilometraje" />
          <SpecItem variant="box" value={vehicle.gearbox} label="Transmisión" />
          <SpecItem variant="box" value={vehicle.engine} label="Motor" />
        </Specs>
        <Footer>
          <PriceBlock>
            <dt>Precio de contado</dt>
            <dd>
              {formatUSD(price)}
              <small>Anticipo desde {formatUSD(price * 0.3)}</small>
            </dd>
          </PriceBlock>
          <Button to={detailUrl} variant="dark" size="sm" iconRight={ArrowRight}>
            Ver Ficha & Reservar
          </Button>
        </Footer>
      </Body>
    </Wrapper>
  )
}

export default FeaturedVehicleCard
