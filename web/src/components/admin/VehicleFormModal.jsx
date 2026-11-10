import { DollarSign, Gauge, Percent, Save, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { BODY_TYPES, CONDITIONS, FUEL_TYPES, RESERVATION_HOURS, STATUS_OPTIONS, TRANSMISSIONS } from '../../constants/catalog.js'
import { required, useForm } from '../../hooks/useForm.js'
import { vehicleDefaults } from '../../services/vehicleMapper.js'
import { formatUSD } from '../../utils/format.js'
import { getVehicleName } from '../../utils/vehicle.js'
import { Alert, Badge, Button, FormGrid, IconTile, Modal, SelectField, TextField, Toggle } from '../ui'

const Aside = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const Muted = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
`

const SectionTitle = styled.h3`
  margin: 4px 0 14px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const WarrantyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primarySofter};

  div {
    flex: 1;
  }

  strong {
    display: block;
    font-size: 0.95rem;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Spaced = styled.div`
  margin-top: 18px;
`

const CURRENT_YEAR = new Date().getFullYear()

const toOptions = (list) => list.map(({ value, label }) => ({ value, label }))

const numberRule = (min, message) => (v) => (v === '' || Number(v) < min || Number.isNaN(Number(v)) ? message : undefined)

const rules = {
  brand: required(),
  model: required(),
  year: (v) => (Number(v) >= 1990 && Number(v) <= CURRENT_YEAR + 1 ? undefined : 'Año inválido'),
  price: numberRule(1, 'Ingresá un precio válido'),
  discount: (v, values) =>
    Number(v) < 0 || Number(v) >= Number(values.price) ? 'El descuento debe ser menor al precio' : undefined,
  km: numberRule(0, 'Ingresá un kilometraje válido'),
}

// Alta y edición de unidades del inventario.
// `vehicle` null = alta. El promedio de mercado se calcula con las unidades del mismo segmento.
function VehicleFormModal({ vehicle, vehicles, onClose, onSave }) {
  const isNew = !vehicle
  const base = vehicle ?? { ...vehicleDefaults, brand: '', model: '', year: CURRENT_YEAR, price: '', km: 0 }
  const form = useForm({
    brand: base.brand,
    model: base.model,
    version: base.version,
    year: base.year,
    condition: base.condition,
    bodyType: base.bodyType,
    fuelType: base.fuelType,
    transmission: base.transmission,
    plate: base.plate,
    image: isNew ? '' : base.image,
    price: base.price,
    discount: base.discount ?? 0,
    km: base.km,
    status: base.status,
    notes: base.notes ?? '',
    warranty: base.warranty,
  }, rules)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const { values, errors, handleChange, setValue } = form

  const sameSegment = vehicles.filter((v) => v.bodyType === values.bodyType && v.id !== vehicle?.id)
  const marketAverage = sameSegment.length
    ? sameSegment.reduce((sum, v) => sum + Number(v.price), 0) / sameSegment.length
    : null
  const finalPrice = Math.max(0, Number(values.price || 0) - Number(values.discount || 0))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.validate()) return
    setSaving(true)
    setError(null)
    try {
      const reservedUntil =
        values.status === 'reservado'
          ? (base.reservedUntil ?? new Date(Date.now() + RESERVATION_HOURS * 3_600_000).toISOString())
          : null
      await onSave({
        ...base,
        ...values,
        year: Number(values.year),
        price: Number(values.price),
        discount: Number(values.discount || 0),
        km: Number(values.km),
        image: values.image || base.image,
        gallery: values.image && values.image !== base.image ? [{ src: values.image, label: 'Frontal' }] : base.gallery,
        reservedUntil,
        publishedAt: base.publishedAt ?? new Date().toISOString(),
      })
      onClose()
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      icon={SlidersHorizontal}
      title={isNew ? 'Agregar Nueva Unidad - Sebring' : 'Modificar Unidad de Inventario - Sebring'}
      subtitle={
        isNew ? (
          'Completá los datos de la unidad para publicarla en el catálogo'
        ) : (
          <>
            <strong style={{ color: '#0d4fdb' }}>
              {getVehicleName(vehicle)} {vehicle.version} {vehicle.year}
            </strong>{' '}
            · Patente: {vehicle.plate}
          </>
        )
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" form="vehicle-form" icon={Save} disabled={saving}>
            {saving ? 'Guardando...' : isNew ? 'Publicar Unidad' : 'Guardar Cambios'}
          </Button>
        </>
      }
    >
      <form id="vehicle-form" onSubmit={handleSubmit} noValidate>
        {isNew && (
          <>
            <SectionTitle>Datos de la unidad</SectionTitle>
            <FormGrid $cols={3}>
              <TextField label="Marca *" name="brand" value={values.brand} onChange={handleChange} error={errors.brand} />
              <TextField label="Modelo *" name="model" value={values.model} onChange={handleChange} error={errors.model} />
              <TextField label="Versión" name="version" value={values.version} onChange={handleChange} />
              <TextField label="Año *" name="year" type="number" value={values.year} onChange={handleChange} error={errors.year} />
              <SelectField label="Condición" name="condition" value={values.condition} onChange={handleChange} options={toOptions(CONDITIONS)} />
              <SelectField label="Carrocería" name="bodyType" value={values.bodyType} onChange={handleChange} options={toOptions(BODY_TYPES.filter((t) => t.value !== 'electrificado'))} />
              <SelectField label="Combustible" name="fuelType" value={values.fuelType} onChange={handleChange} options={toOptions(FUEL_TYPES)} />
              <SelectField label="Transmisión" name="transmission" value={values.transmission} onChange={handleChange} options={toOptions(TRANSMISSIONS)} />
              <TextField label="Patente" name="plate" value={values.plate} onChange={handleChange} />
            </FormGrid>
            <Spaced>
              <TextField label="URL de la foto principal" name="image" type="url" placeholder="https://..." value={values.image} onChange={handleChange} />
            </Spaced>
            <SectionTitle style={{ marginTop: 24 }}>Precio y estado</SectionTitle>
          </>
        )}

        <FormGrid>
          <TextField
            label="Precio Sugerido (USD)"
            aside={<Aside>MSRP Base</Aside>}
            icon={DollarSign}
            name="price"
            type="number"
            min="0"
            value={values.price}
            onChange={handleChange}
            error={errors.price}
            hint={marketAverage ? `Promedio de mercado para este segmento: ${formatUSD(marketAverage, { prefix: '$' })}` : undefined}
          />
          <TextField
            label="Descuento Promocional (USD)"
            aside={
              <Badge tone="warning" size="sm" uppercase={false}>
                Campaña Q4
              </Badge>
            }
            icon={Percent}
            name="discount"
            type="number"
            min="0"
            value={values.discount}
            onChange={handleChange}
            error={errors.discount}
            hint={`Precio final en catálogo: ${formatUSD(finalPrice, { prefix: '$' })}`}
          />
          <TextField
            label="Kilometraje Actual Certificado"
            icon={Gauge}
            name="km"
            type="number"
            min="0"
            value={values.km}
            onChange={handleChange}
            error={errors.km}
            hint="Odómetro verificado por escáner OBD-II"
          />
          <SelectField
            label="Estado en Inventario"
            name="status"
            value={values.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
            hint="Al cambiar a 'Disponible' se libera la reserva"
          />
        </FormGrid>

        <Spaced>
          <TextField
            label="Notas de Taller & Gestoría"
            aside={<Muted>Visible solo para personal interno</Muted>}
            name="notes"
            value={values.notes}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Spaced>

        <WarrantyBox>
          <IconTile $size={40}>
            <ShieldCheck size={20} aria-hidden />
          </IconTile>
          <div>
            <strong>Garantía Certificada Sebring (12 Meses)</strong>
            <span>Incluye cobertura total motriz y asistencia en ruta 24/7.</span>
          </div>
          <Toggle label="Garantía certificada" checked={values.warranty} onChange={(checked) => setValue('warranty', checked)} />
        </WarrantyBox>

        {error && (
          <Alert tone="danger" title="No se pudo guardar" style={{ marginTop: 16 }}>
            <p>{error}</p>
          </Alert>
        )}
      </form>
    </Modal>
  )
}

export default VehicleFormModal
