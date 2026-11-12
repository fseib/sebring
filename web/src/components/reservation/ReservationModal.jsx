import { ArrowLeft, ArrowRight, BadgeCheck, CircleCheckBig, LockKeyhole, LogIn } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { DEPOSIT_ARS, RESERVATION_HOURS } from '../../constants/catalog.js'
import { useAuth } from '../../hooks/useAuth.js'
import { isEmail, required, useForm } from '../../hooks/useForm.js'
import { useReservations } from '../../hooks/useReservations.js'
import { useVehicles } from '../../hooks/useVehicles.js'
import { formatNumber } from '../../utils/format.js'
import { canBeReserved, getFinalPrice, getVehicleTitle } from '../../utils/vehicle.js'
import { Alert, Button, EmptyState, Modal, Stepper } from '../ui'
import BuyerStep from './BuyerStep.jsx'
import DeliveryStep from './DeliveryStep.jsx'
import PaymentStep from './PaymentStep.jsx'

const STEPS = ['Anticipo & Entrega', 'Datos Comprador', 'Pago Seguro']

const initialValues = {
  delivery: 'retiro',
  fullName: '',
  document: '',
  email: '',
  city: '',
  phone: '',
  address: '',
  balancePayment: 'contado',
  comments: '',
  paymentMethod: 'tarjeta',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvc: '',
  acceptTerms: false,
}

const withCard = (rule) => (value, values) => (values.paymentMethod === 'tarjeta' ? rule(value) : undefined)

const rules = {
  fullName: required(),
  document: (v) => (String(v).replace(/\D/g, '').length >= 7 ? undefined : 'Ingresá un DNI o CUIT válido'),
  email: isEmail,
  city: required(),
  phone: (v) => (String(v).replace(/\D/g, '').length >= 8 ? undefined : 'Ingresá un teléfono válido'),
  address: (v, values) => (values.delivery === 'envio' && !String(v).trim() ? 'Obligatorio para el envío' : undefined),
  cardNumber: withCard((v) => (v.replace(/\s/g, '').length >= 15 ? undefined : 'Número de tarjeta inválido')),
  cardName: withCard(required()),
  cardExpiry: withCard((v) => (/^(0[1-9]|1[0-2])\/\d{2}$/.test(v) ? undefined : 'Formato MM/AA')),
  cardCvc: withCard((v) => (/^\d{3,4}$/.test(v) ? undefined : 'Código inválido')),
  acceptTerms: (v) => (v ? undefined : 'Debés aceptar las condiciones para continuar'),
}

// Campos a validar en cada paso
const STEP_FIELDS = [
  ['fullName', 'document', 'email', 'city'],
  ['phone', 'address'],
  ['cardNumber', 'cardName', 'cardExpiry', 'cardCvc', 'acceptTerms'],
]

const StepperBox = styled.div`
  margin-bottom: 22px;
`

const SuccessDetails = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 16px;
  margin: 16px 0 0;
  text-align: left;
  font-size: 0.85rem;

  dt {
    color: ${({ theme }) => theme.colors.muted};
  }

  dd {
    margin: 0;
    font-weight: 600;
  }
`

const FooterLeft = styled.div`
  margin-right: auto;
`

// Flujo de reserva online en 3 pasos. Al confirmar, la unidad pasa a "reservado"
// y la reserva queda en el historial del usuario ("Mis reservas"). Requiere sesión.
function ReservationModal({ vehicle, onClose }) {
  const { reserveVehicle } = useVehicles()
  const { addReservation } = useReservations()
  const { user } = useAuth()
  const location = useLocation()
  // Precarga los datos del comprador con el perfil del usuario
  const [prefilled] = useState(() => ({
    ...initialValues,
    fullName: user?.name ?? '',
    document: user?.document ?? '',
    email: user?.email ?? '',
    city: user?.city ?? '',
    phone: user?.phone ?? '',
  }))
  const form = useForm(prefilled, rules)
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  // Se evalúa solo al abrir: después de confirmar, la unidad pasa a "reservado" y no queremos cerrar el modal
  const [wasReservable] = useState(() => canBeReserved(vehicle))

  const title = getVehicleTitle(vehicle)
  const isLastStep = step === STEPS.length - 1

  const confirmReservation = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const reservedUntil = new Date(Date.now() + RESERVATION_HOURS * 3_600_000).toISOString()
      await reserveVehicle(vehicle, reservedUntil)
      const code = `RS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      addReservation({
        code,
        vehicleId: vehicle.id,
        vehicleTitle: title,
        reservedUntil,
        delivery: form.values.delivery,
        deposit: DEPOSIT_ARS,
      })
      setConfirmation({ code, reservedUntil })
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    if (!form.validate(STEP_FIELDS[step])) return
    if (isLastStep) confirmReservation()
    else setStep((s) => s + 1)
  }

  if (!user) {
    return (
      <Modal open onClose={onClose} title="Ingresá para reservar" subtitle={title} icon={LockKeyhole} size="sm">
        <EmptyState
          icon={LogIn}
          title="Necesitás una cuenta para señar"
          action={
            <Button to="/login" state={{ from: location.pathname + location.search }} icon={LogIn}>
              Ingresar
            </Button>
          }
        >
          Así podés seguir el estado de tu reserva desde "Mis reservas".
        </EmptyState>
      </Modal>
    )
  }

  if (!wasReservable) {
    return (
      <Modal open onClose={onClose} title="Unidad no disponible" subtitle={title} icon={LockKeyhole} size="sm">
        <EmptyState
          icon={LockKeyhole}
          title="Esta unidad no se puede señar en este momento"
          action={<Button onClick={onClose}>Volver a la ficha</Button>}
        >
          Ya tiene una reserva activa o está en preparación. Agendá un test drive o consultá por unidades similares.
        </EmptyState>
      </Modal>
    )
  }

  if (confirmation) {
    return (
      <Modal open onClose={onClose} title="Reserva confirmada" subtitle={title} icon={BadgeCheck} size="sm">
        <EmptyState
          icon={CircleCheckBig}
          title="¡Listo! La unidad quedó bloqueada para vos"
          action={
            <Button onClick={onClose} icon={ArrowLeft}>
              Volver a la ficha
            </Button>
          }
        >
          Te enviamos el comprobante a <strong>{form.values.email}</strong>. Un asesor te contactará en las próximas
          horas para coordinar la entrega.
          <SuccessDetails>
            <dt>Código</dt>
            <dd>{confirmation.code}</dd>
            <dt>Seña</dt>
            <dd>${formatNumber(DEPOSIT_ARS)} ARS</dd>
            <dt>Válida hasta</dt>
            <dd>
              <time dateTime={confirmation.reservedUntil}>
                {new Date(confirmation.reservedUntil).toLocaleString('es-AR')}
              </time>
            </dd>
          </SuccessDetails>
        </EmptyState>
      </Modal>
    )
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Reserva & Seña de Vehículo en Línea"
      subtitle={`${title} (${vehicle.year})`}
      icon={BadgeCheck}
      footer={
        <>
          <FooterLeft>
            {step === 0 ? (
              <Button variant="ghost" onClick={onClose}>
                Cancelar y Volver a la Ficha
              </Button>
            ) : (
              <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep((s) => s - 1)} disabled={submitting}>
                Volver
              </Button>
            )}
          </FooterLeft>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={submitting}
            icon={isLastStep ? LockKeyhole : undefined}
            iconRight={isLastStep ? undefined : ArrowRight}
          >
            {isLastStep
              ? submitting
                ? 'Procesando...'
                : `Confirmar Seña Segura ($${formatNumber(DEPOSIT_ARS)} ARS)`
              : 'Continuar'}
          </Button>
        </>
      }
    >
      <StepperBox>
        <Stepper steps={STEPS} current={step} />
      </StepperBox>

      {step === 0 && <DeliveryStep vehiclePrice={getFinalPrice(vehicle)} branch={vehicle.location.branch} form={form} />}
      {step === 1 && <BuyerStep form={form} />}
      {step === 2 && <PaymentStep form={form} />}

      {submitError && (
        <Alert tone="danger" title="No pudimos registrar la reserva" style={{ marginTop: 16 }}>
          <p>{submitError}</p>
        </Alert>
      )}
    </Modal>
  )
}

export default ReservationModal
