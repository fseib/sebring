import { CarFront } from 'lucide-react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import AdminStats from '../../components/admin/AdminStats.jsx'
import DeleteConfirmBanner from '../../components/admin/DeleteConfirmBanner.jsx'
import InventoryTable from '../../components/admin/InventoryTable.jsx'
import InventoryToolbar from '../../components/admin/InventoryToolbar.jsx'
import VehicleFormModal from '../../components/admin/VehicleFormModal.jsx'
import { Alert, EmptyState, Pagination, TableFooter, TableWrapper, VisuallyHidden } from '../../components/ui'
import { useVehicles } from '../../hooks/useVehicles.js'
import { paginate } from '../../utils/catalog.js'
import { downloadCsv } from '../../utils/csv.js'
import { getFinalPrice, getVehicleTitle } from '../../utils/vehicle.js'

const PAGE_SIZE = 10

const BannerSlot = styled.div`
  margin-bottom: 24px;
`

const STATUS_FILTERS = [
  { value: 'todos', label: 'Todos', match: () => true },
  { value: 'disponible', label: 'Disponibles', match: (v) => v.status === 'disponible' },
  { value: 'reservado', label: 'En Reserva', match: (v) => v.status === 'reservado' },
  { value: 'taller', label: 'En Taller', match: (v) => v.status === 'taller' },
  { value: 'vendido', label: 'Vendidos', match: (v) => v.status === 'vendido' },
]

const CSV_COLUMNS = [
  { label: 'Stock', value: (v) => v.stockCode },
  { label: 'Vehículo', value: (v) => getVehicleTitle(v) },
  { label: 'Año', value: (v) => v.year },
  { label: 'VIN', value: (v) => v.vin },
  { label: 'Patente', value: (v) => v.plate },
  { label: 'Kilometraje', value: (v) => v.km },
  { label: 'Precio final (USD)', value: (v) => getFinalPrice(v) },
  { label: 'Estado', value: (v) => v.status },
]

function InventoryPage() {
  const { vehicles, source, saveVehicle, removeVehicle } = useVehicles()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('todos')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null) // { vehicle } | { vehicle: null } para alta
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const { match } = STATUS_FILTERS.find((f) => f.value === status)
    return vehicles.filter(
      (v) => match(v) && (!q || [getVehicleTitle(v), v.vin, v.plate, v.stockCode].join(' ').toLowerCase().includes(q)),
    )
  }, [vehicles, search, status])

  const { items, page: currentPage, totalPages, from, to } = paginate(filtered, page, PAGE_SIZE)

  const statusOptions = STATUS_FILTERS.map((f) => ({
    value: f.value,
    label: `${f.label} (${vehicles.filter(f.match).length})`,
  }))

  const handleDelete = async (vehicle) => {
    await removeVehicle(vehicle.id)
    setDeleting(null)
  }

  const askDelete = (vehicle) => {
    setDeleting(vehicle)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {source === 'demo' && (
        <BannerSlot>
          <Alert tone="info" title="Modo demostración">
            <p>
              No se pudo conectar con el backend (localhost:8080) o no tiene vehículos cargados. Los cambios se guardan
              solo en memoria hasta recargar la página.
            </p>
          </Alert>
        </BannerSlot>
      )}

      {deleting && (
        <BannerSlot>
          <DeleteConfirmBanner vehicle={deleting} onCancel={() => setDeleting(null)} onConfirm={handleDelete} />
        </BannerSlot>
      )}

      <VisuallyHidden as="h1">Inventario</VisuallyHidden>
      <AdminStats vehicles={vehicles} />

      <InventoryToolbar
        search={search}
        onSearch={(value) => {
          setSearch(value)
          setPage(1)
        }}
        status={status}
        onStatus={(value) => {
          setStatus(value)
          setPage(1)
        }}
        statusOptions={statusOptions}
        onExport={() => downloadCsv('inventario-sebring.csv', CSV_COLUMNS, filtered)}
        onAdd={() => setEditing({ vehicle: null })}
      />

      <section aria-label="Listado de unidades">
        {items.length === 0 ? (
          <EmptyState icon={CarFront} title="Sin resultados">
            No hay unidades que coincidan con la búsqueda.
          </EmptyState>
        ) : (
          <TableWrapper>
            <InventoryTable vehicles={items} onEdit={(vehicle) => setEditing({ vehicle })} onDelete={askDelete} />
            <TableFooter>
              <p role="status">
                Mostrando {from} - {to} de {filtered.length} unidades en stock
              </p>
              <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} activeTone="primary" />
            </TableFooter>
          </TableWrapper>
        )}
      </section>

      {editing && (
        <VehicleFormModal
          vehicle={editing.vehicle}
          vehicles={vehicles}
          onClose={() => setEditing(null)}
          onSave={saveVehicle}
        />
      )}
    </>
  )
}

export default InventoryPage
