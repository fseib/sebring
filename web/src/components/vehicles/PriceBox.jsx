import { Banknote, CalendarDays, Phone, RefreshCw, ShieldCheck, SquareCheck, Store, Zap, LockKeyhole } from 'lucide-react'
import styled from 'styled-components'
import { DEPOSIT_ARS, DEPOSIT_USD, RESERVATION_HOURS } from '../../constants/catalog.js'
import { formatNumber, formatTimeLeft, formatUSD } from '../../utils/format.js'
import { canBeReserved, getFinalPrice, getMonthly } from '../../utils/vehicle.js'
import { Badge, Button, CheckList, IconButton, IconTile } from '../ui'

const Wrapper = styled.aside`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 26px 22px 22px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, #7aa7ff);
  }
`

const TopRow = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  h2 {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
  }
`

const Price = styled.p`
  margin: 10px 0 6px;
  font-size: clamp(2.2rem, 4vw, 2.9rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;

  small {
    font-size: 1rem;
    font-weight: 600;
    margin-left: 6px;
    color: ${({ theme }) => theme.colors.textSoft};
  }
`

const OldPrice = styled.del`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Financing = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSoft};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const LockInfo = styled.section`
  margin: 20px 0 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primarySofter};

  h3 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 6px;
  }

  p {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.textSoft};
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
`

const Advisor = styled.address`
  font-style: normal;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primarySofter};

  div {
    flex: 1;
    min-width: 0;
  }

  strong {
    display: block;
    font-size: 0.82rem;
  }

  span {
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const guarantees = [
  { icon: ShieldCheck, text: 'Garantía total de 12 meses o 20.000 km incluida' },
  { icon: RefreshCw, text: '7 días de prueba o devolución íntegra de tu dinero' },
  { icon: SquareCheck, text: 'Certificación mecánica pericial de 180 puntos aprobada' },
]

// Caja lateral de la ficha: precio, financiación y acciones de reserva
function PriceBox({ vehicle, onReserve, onTestDrive }) {
  const reservable = canBeReserved(vehicle)
  const finalPrice = getFinalPrice(vehicle)

  return (
    <Wrapper aria-label="Precio y reserva">
      <TopRow>
        <h2>Precio de contado garantizado</h2>
        {vehicle.savingsVsNew > 0 && (
          <Badge tone="success" size="sm" uppercase={false}>
            Ahorro {formatUSD(vehicle.savingsVsNew, { prefix: '$' })} vs Nuevo
          </Badge>
        )}
        {vehicle.discount > 0 && (
          <Badge tone="warning" size="sm" uppercase={false}>
            Descuento {formatUSD(vehicle.discount)}
          </Badge>
        )}
      </TopRow>
      {vehicle.discount > 0 && <OldPrice>{formatUSD(vehicle.price)}</OldPrice>}
      <Price>
        ${formatNumber(finalPrice)}
        <small>USD</small>
      </Price>
      <Financing>
        <Banknote size={18} aria-hidden />
        <span>
          O desde <strong>${formatNumber(getMonthly(vehicle))}/mes</strong> en 48 cuotas (pie del 25%)
        </span>
      </Financing>

      <LockInfo>
        <h3>
          <LockKeyhole size={17} aria-hidden />
          Bloqueo y Seña Exclusiva de {RESERVATION_HOURS} Horas
        </h3>
        <p>
          Congelá el valor e impedí que otro comprador reserve esta unidad con una seña de{' '}
          <strong>
            ${formatNumber(DEPOSIT_ARS)} ARS (o USD {DEPOSIT_USD}) 100% reembolsable
          </strong>
          .
        </p>
      </LockInfo>

      <Buttons>
        <Button size="lg" icon={Zap} fullWidth onClick={onReserve} disabled={!reservable}>
          {reservable
            ? `Reservar Online (Seña $${formatNumber(DEPOSIT_ARS)} ARS)`
            : vehicle.status === 'reservado'
              ? `Unidad señada · libera en ${formatTimeLeft(vehicle.reservedUntil)}`
              : 'Unidad no disponible para seña'}
        </Button>
        <Button size="lg" variant="soft" icon={CalendarDays} fullWidth onClick={onTestDrive}>
          Agendar Test Drive Gratuito
        </Button>
      </Buttons>

      <CheckList items={guarantees} gap={6} />

      <Advisor>
        <IconTile $tone="solid" $size={40} style={{ background: '#0b1527' }} aria-hidden>
          <Store size={19} aria-hidden />
        </IconTile>
        <div>
          <strong>{vehicle.location.branch}</strong>
          <span>Asesor oficial Sebring asignado</span>
        </div>
        <IconButton icon={Phone} label="Llamar a la sucursal" href="tel:08008887327" variant="default" />
      </Advisor>
    </Wrapper>
  )
}

export default PriceBox
