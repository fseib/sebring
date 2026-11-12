import { LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, EmptyState, Table, TableWrapper } from '../../components/ui'
import { useReservations } from '../../hooks/useReservations.js'
import { useVehicles } from '../../hooks/useVehicles.js'
import { formatARS, formatTimeLeft } from '../../utils/format.js'
import { getVehicleTitle } from '../../utils/vehicle.js'

const deliveryLabels = { retiro: 'Retiro en sucursal', envio: 'Envío a domicilio' }

// "Mis reservas": historial de señas del usuario logueado
function MyReservationsPage() {
  const { myReservations } = useReservations()
  const { getVehicleById } = useVehicles()
  // Hora de referencia para saber si cada reserva sigue vigente
  const [now] = useState(() => Date.now())

  if (myReservations.length === 0) {
    return (
      <EmptyState icon={LockKeyhole} title="Todavía no hiciste reservas" action={<Button to="/catalogo">Ver catálogo</Button>}>
        Cuando señes una unidad desde su ficha, la vas a ver acá.
      </EmptyState>
    )
  }

  return (
    <TableWrapper>
      <Table>
        <caption>Mis reservas</caption>
        <thead>
          <tr>
            <th scope="col">Vehículo</th>
            <th scope="col">Código</th>
            <th scope="col">Fecha</th>
            <th scope="col">Entrega</th>
            <th scope="col">Seña</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {myReservations.map((r) => {
            const vehicle = getVehicleById(r.vehicleId)
            const active = new Date(r.reservedUntil).getTime() > now
            return (
              <tr key={r.code}>
                <th scope="row">
                  {vehicle ? (
                    <Link to={`/catalogo/${vehicle.id}`}>
                      <strong>{getVehicleTitle(vehicle)}</strong>
                    </Link>
                  ) : (
                    r.vehicleTitle ?? 'Unidad no disponible'
                  )}
                </th>
                <td>{r.code}</td>
                <td>
                  <time dateTime={r.createdAt}>{new Date(r.createdAt).toLocaleDateString('es-AR')}</time>
                </td>
                <td>{deliveryLabels[r.delivery] ?? '-'}</td>
                <td>{r.deposit ? formatARS(r.deposit) : '-'}</td>
                <td>
                  {active ? (
                    <Badge tone="warning">
                      Vence en <time dateTime={r.reservedUntil}>{formatTimeLeft(r.reservedUntil)}</time>
                    </Badge>
                  ) : (
                    <Badge tone="neutral">Vencida</Badge>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

export default MyReservationsPage
