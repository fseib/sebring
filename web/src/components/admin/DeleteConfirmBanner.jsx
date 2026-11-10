import { Trash2, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { getVehicleName } from '../../utils/vehicle.js'
import { Alert, Badge, Button } from '../ui'

const Ref = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
`

const Underline = styled.span`
  text-decoration: underline;
`

// Confirmación destacada antes de eliminar una unidad del inventario
function DeleteConfirmBanner({ vehicle, onCancel, onConfirm }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  const handleConfirm = async () => {
    setDeleting(true)
    setError(null)
    try {
      await onConfirm(vehicle)
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  return (
    <Alert
      tone="danger"
      icon={TriangleAlert}
      eyebrow={
        <Ref>
          <Badge tone="danger" size="sm">
            Acción crítica requerida
          </Badge>
          Ref: Stock #{vehicle.stockCode}
        </Ref>
      }
      title={
        <>
          ¿Confirmás la eliminación del vehículo{' '}
          <Underline>
            {getVehicleName(vehicle)} {vehicle.version} {vehicle.year} (Patente: {vehicle.plate})
          </Underline>
          ?
        </>
      }
      actions={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={deleting}>
            Descartar
          </Button>
          <Button variant="danger" icon={Trash2} onClick={handleConfirm} disabled={deleting}>
            {deleting ? 'Eliminando...' : 'Confirmar Eliminación'}
          </Button>
        </>
      }
    >
      <p>
        Esta acción retirará la unidad del catálogo público y cancelará de forma inmediata las reservas activas
        asociadas.
      </p>
      {error && <p>Error: {error}</p>}
    </Alert>
  )
}

export default DeleteConfirmBanner
