import { LockKeyhole, ServerOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getTransactions } from '../../api/transactions.js'
import { Alert, Badge, EmptyState, SectionHeading, Table, TableWrapper, VisuallyHidden } from '../../components/ui'
import { useFetch } from '../../hooks/useFetch.js'
import { useVehicles } from '../../hooks/useVehicles.js'
import { formatTimeLeft, formatUSD } from '../../utils/format.js'
import { getFinalPrice, getVehicleTitle } from '../../utils/vehicle.js'

const Block = styled.section`
  margin-bottom: 40px;
`

// Reservas activas (desde el inventario) + transacciones registradas en el backend
function ReservationsPage() {
  const { vehicles } = useVehicles()
  const transactions = useFetch(getTransactions)
  const reserved = vehicles.filter((v) => v.status === 'reservado')

  return (
    <>
      <VisuallyHidden as="h1">Reservas</VisuallyHidden>
      <Block aria-labelledby="active-reservations-title">
        <SectionHeading id="active-reservations-title" eyebrow="Señas digitales" title="Reservas activas" subtitle="Unidades bloqueadas por 72 horas con seña online." spacing={20} />
        {reserved.length === 0 ? (
          <EmptyState icon={LockKeyhole} title="No hay reservas activas" />
        ) : (
          <TableWrapper>
            <Table>
              <caption>Reservas activas</caption>
              <thead>
                <tr>
                  <th scope="col">Vehículo</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Vence en</th>
                </tr>
              </thead>
              <tbody>
                {reserved.map((v) => (
                  <tr key={v.id}>
                    <th scope="row">
                      <Link to={`/catalogo/${v.id}`}>
                        <strong>{getVehicleTitle(v)}</strong>
                      </Link>
                    </th>
                    <td>{v.stockCode}</td>
                    <td>{formatUSD(getFinalPrice(v))}</td>
                    <td>
                      <Badge tone="warning">
                        {v.reservedUntil ? (
                          <time dateTime={v.reservedUntil}>{formatTimeLeft(v.reservedUntil)}</time>
                        ) : (
                          '-'
                        )}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </Block>

      <Block aria-labelledby="transactions-title">
        <SectionHeading id="transactions-title" eyebrow="Backend" title="Transacciones registradas" subtitle="Datos de /api/transactions." spacing={20} />
        {transactions.loading && <p>Cargando...</p>}
        {transactions.error && (
          <Alert tone="warning" icon={ServerOff} title="No se pudo conectar con el backend">
            <p>{transactions.error.message}. Verificá que Spring Boot esté corriendo en el puerto 8080.</p>
          </Alert>
        )}
        {transactions.data?.length === 0 && <EmptyState icon={LockKeyhole} title="Todavía no hay transacciones" />}
        {transactions.data?.length > 0 && (
          <TableWrapper>
            <Table>
              <caption>Transacciones registradas en el backend</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Vehículo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {transactions.data.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>
                      {t.createdAt ? (
                        <time dateTime={t.createdAt}>{new Date(t.createdAt).toLocaleString('es-AR')}</time>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{t.userId}</td>
                    <td>{t.vehicleId}</td>
                    <td>{t.transactionType}</td>
                    <td>{formatUSD(t.totalAmount)}</td>
                    <td>
                      <Badge tone="soft">{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </Block>
    </>
  )
}

export default ReservationsPage
