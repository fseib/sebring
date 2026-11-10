import { Cog, Eye, Fuel, Gauge, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DEPOSIT_USD } from '../../constants/catalog.js'
import { formatKm, formatUSD } from '../../utils/format.js'
import {
  canBeReserved,
  getConditionLabel,
  getFinalPrice,
  getFuelLabel,
  getMonthly,
  getStockTag,
  getVehicleTitle,
} from '../../utils/vehicle.js'
import { Badge, Button, IconButton, SpecItem } from '../ui'
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
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }

  &:hover img {
    transform: scale(1.04);
  }
`

const Media = styled.div`
  position: relative;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  flex: 1;
`

const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MetaRow = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.72rem;

  span:first-child {
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.muted};
    text-align: right;
  }
`

const Title = styled.h3`
  font-size: 1.08rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Specs = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primarySofter};
`

const PriceRow = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  margin: auto 0 0;

  dt {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  dd {
    margin: 0;
  }
`

const Price = styled.dd`
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;

  del {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Monthly = styled.div`
  text-align: right;

  dd {
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Actions = styled.footer`
  display: flex;
  gap: 8px;

  > :first-child {
    flex: 1;
  }
`

// Tarjeta de vehículo del catálogo
function VehicleCard({ vehicle }) {
  const detailUrl = `/catalogo/${vehicle.id}`
  const tag = getStockTag(vehicle)
  const reservable = canBeReserved(vehicle)
  const title = getVehicleTitle(vehicle)

  return (
    <Wrapper aria-label={title}>
      <Media>
        {/* La foto es un atajo visual al mismo link del título: se oculta del teclado y lectores */}
        <Link to={detailUrl} tabIndex={-1} aria-hidden>
          <VehicleImage src={vehicle.image} alt="" />
        </Link>
        <ImageOverlay>
          <TagStack>
            <li>
              <Badge tone={tag.tone} size="sm">
                {tag.label}
              </Badge>
            </li>
            {vehicle.warranty && (
              <li>
                <Badge tone="primary" size="sm">
                  Garantía Sebring
                </Badge>
              </li>
            )}
          </TagStack>
          <FavoriteButton vehicleId={vehicle.id} />
        </ImageOverlay>
      </Media>
      <Body>
        <CardHeader>
          <MetaRow>
            <span>
              {getConditionLabel(vehicle)} · {vehicle.year}
            </span>
            <span>Radicación: {vehicle.location.label}</span>
          </MetaRow>
          <Title title={title}>
            <Link to={detailUrl}>{title}</Link>
          </Title>
        </CardHeader>
        <Specs>
          <SpecItem icon={Gauge} label="Kilometraje" value={formatKm(vehicle.km)} />
          <SpecItem icon={Cog} label="Transmisión" value={vehicle.gearbox} />
          <SpecItem icon={Fuel} label="Combustible" value={getFuelLabel(vehicle)} />
        </Specs>
        <PriceRow>
          <div>
            <dt>Precio de contado</dt>
            <Price>
              {vehicle.discount > 0 && <del>{formatUSD(vehicle.price)}</del>}
              {formatUSD(getFinalPrice(vehicle))}
            </Price>
          </div>
          <Monthly>
            <dt>Cuota estimada</dt>
            <dd>{formatUSD(getMonthly(vehicle))}/mes</dd>
          </Monthly>
        </PriceRow>
        <Actions>
          <Button
            to={reservable ? `${detailUrl}?reservar=1` : undefined}
            disabled={!reservable}
            icon={LockKeyhole}
            size="sm"
          >
            {reservable ? `Señar con USD ${DEPOSIT_USD}` : 'No disponible para seña'}
          </Button>
          <IconButton icon={Eye} label="Ver ficha completa" to={detailUrl} size={34} />
        </Actions>
      </Body>
    </Wrapper>
  )
}

export default VehicleCard
