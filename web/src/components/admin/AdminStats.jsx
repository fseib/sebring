import { Banknote, CarFront, LockKeyhole, TrendingUp, Wrench } from 'lucide-react'
import styled from 'styled-components'
import { formatCompact, formatUSD } from '../../utils/format.js'
import { getFinalPrice } from '../../utils/vehicle.js'
import { Grid, StatCard } from '../ui'

const Trend = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const Pill = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primarySoft};
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

// Métricas del inventario calculadas a partir de los vehículos
function AdminStats({ vehicles }) {
  const inStock = vehicles.filter((v) => v.status !== 'vendido')
  const okm = inStock.filter((v) => v.condition === 'okm').length
  const reserved = inStock.filter((v) => v.status === 'reservado').length
  const inWorkshop = inStock.filter((v) => v.status === 'taller').length
  const fleetValue = inStock.reduce((sum, v) => sum + getFinalPrice(v), 0)
  const avgTicket = inStock.length ? fleetValue / inStock.length : 0

  return (
    <Grid as="ul" aria-label="Métricas del inventario" $cols={4} $gap={18}>
      <li>
      <StatCard
        label="Total unidades en stock"
        value={inStock.length}
        extra={
          <Trend>
            <TrendingUp size={14} aria-hidden />
            +3.2%
          </Trend>
        }
        description={`0km: ${okm} · Usados: ${inStock.length - okm}`}
        icon={CarFront}
      />
      </li>
      <li>
      <StatCard
        label="Unidades reservadas"
        value={reserved}
        accent
        extra={<Pill>Señas Activas</Pill>}
        description={`${reserved} señas digitales retenidas`}
        icon={LockKeyhole}
      />
      </li>
      <li>
      <StatCard
        label="En preparación"
        value={inWorkshop}
        extra={<Trend>Taller</Trend>}
        description={`${inWorkshop} unidades en alistamiento`}
        icon={Wrench}
      />
      </li>
      <li>
      <StatCard
        tone="dark"
        label="Valor de flota"
        value={`USD ${formatCompact(fleetValue)}`}
        description={`Ticket promedio: ${formatUSD(avgTicket, { prefix: '$' })}`}
        icon={Banknote}
      />
      </li>
    </Grid>
  )
}

export default AdminStats
