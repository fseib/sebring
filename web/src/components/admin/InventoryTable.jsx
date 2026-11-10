import { BadgeCheck, Eye, LockKeyhole, Pencil, Trash2, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BODY_TYPES } from '../../constants/catalog.js'
import { formatKm, formatTimeLeft, formatUSD } from '../../utils/format.js'
import { getFinalPrice, getFuelLabel, getMonthly, getVehicleName } from '../../utils/vehicle.js'
import { Badge, IconButton, Table } from '../ui'

const VehicleCell = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 220px;

  img {
    width: 76px;
    height: 54px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  a {
    display: block;
    font-weight: 700;
    font-size: 0.98rem;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Sub = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${({ $tone, theme }) => ($tone === 'warning' ? theme.colors.warning : theme.colors.muted)};
`

const Vin = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const Strong = styled.strong`
  display: block;
  font-size: 1rem;
  white-space: nowrap;
`

const Struck = styled.del`
  display: block;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted};
`

const Actions = styled.div`
  display: flex;
  gap: 6px;
`

function ConditionBadge({ vehicle }) {
  if (vehicle.condition === 'okm') return <Badge tone="dark">Nuevo 0km</Badge>
  if (vehicle.warranty) return <Badge tone="soft" icon={BadgeCheck}>Certificado</Badge>
  return <Badge tone="neutral">Usado</Badge>
}

function StatusCell({ vehicle }) {
  switch (vehicle.status) {
    case 'reservado':
      return (
        <>
          <Badge tone="warning">En reserva</Badge>
          {vehicle.reservedUntil && (
            <Sub $tone="warning">
              Expira en <time dateTime={vehicle.reservedUntil}>{formatTimeLeft(vehicle.reservedUntil)}</time>
            </Sub>
          )}
        </>
      )
    case 'taller':
      return (
        <Badge tone="soft" icon={Wrench}>
          En taller
        </Badge>
      )
    case 'vendido':
      return <Badge tone="neutral">Vendido</Badge>
    default:
      return (
        <Badge tone="soft" dot>
          Disponible
        </Badge>
      )
  }
}

// Tabla del inventario. Las acciones se delegan al padre (editar / eliminar).
function InventoryTable({ vehicles, onEdit, onDelete }) {
  return (
    <Table>
      <caption>Unidades del inventario</caption>
      <thead>
        <tr>
          <th scope="col">Vehículo</th>
          <th scope="col">VIN & Registro</th>
          <th scope="col">Condición</th>
          <th scope="col">Kilometraje</th>
          <th scope="col">Precio lista</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => {
          const sold = vehicle.status === 'vendido'
          return (
            <tr key={vehicle.id}>
              <th scope="row">
                <VehicleCell>
                  <img src={vehicle.image} alt="" loading="lazy" />
                  <div>
                    <Link to={`/catalogo/${vehicle.id}`}>
                      {getVehicleName(vehicle)} {vehicle.version}
                    </Link>
                    <Sub>
                      Año {vehicle.year} · {BODY_TYPES.find((t) => t.value === vehicle.bodyType)?.short} ·{' '}
                      {getFuelLabel(vehicle)}
                    </Sub>
                  </div>
                </VehicleCell>
              </th>
              <td>
                <Vin>{vehicle.vin}</Vin>
                <Sub>Placa: {vehicle.plate}</Sub>
              </td>
              <td>
                <ConditionBadge vehicle={vehicle} />
              </td>
              <td>
                <Strong>{formatKm(vehicle.km)}</Strong>
                <Sub>{vehicle.condition === 'okm' ? 'Entrega inmediata' : 'Odómetro certificado'}</Sub>
              </td>
              <td>
                {sold ? (
                  <>
                    <Struck>{formatUSD(vehicle.price, { prefix: '$' })}</Struck>
                    <Sub>Cerrado: {formatUSD(getFinalPrice(vehicle), { prefix: '$' })}</Sub>
                  </>
                ) : (
                  <>
                    <Strong>{formatUSD(getFinalPrice(vehicle), { prefix: '$' })}</Strong>
                    <Sub>Est. {formatUSD(getMonthly(vehicle), { prefix: '$' })}/mes</Sub>
                  </>
                )}
              </td>
              <td>
                <StatusCell vehicle={vehicle} />
              </td>
              <td>
                <Actions>
                  {sold ? (
                    <IconButton icon={Eye} label="Ver ficha" to={`/catalogo/${vehicle.id}`} />
                  ) : (
                    <IconButton icon={Pencil} label="Editar unidad" onClick={() => onEdit(vehicle)} />
                  )}
                  <IconButton
                    icon={LockKeyhole}
                    label="Ver reserva"
                    variant={vehicle.status === 'reservado' ? 'soft' : 'default'}
                    to={vehicle.status === 'reservado' ? '/admin/reservas' : undefined}
                    disabled={vehicle.status !== 'reservado'}
                  />
                  <IconButton icon={Trash2} label="Eliminar unidad" onClick={() => onDelete(vehicle)} />
                </Actions>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default InventoryTable
