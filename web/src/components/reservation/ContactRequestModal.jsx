import { CircleCheckBig, Send } from 'lucide-react'
import { useState } from 'react'
import { isEmail, required, useForm } from '../../hooks/useForm.js'
import { Button, EmptyState, FormGrid, Modal, SelectField, TextField } from '../ui'

const timeSlots = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'].map((t) => ({ value: t, label: `${t} hs` }))

const today = () => new Date().toISOString().slice(0, 10)

// Formulario de contacto genérico: test drive, pre-aprobación de crédito, tasación de usado...
// Con `withSchedule` agrega fecha y horario.
function ContactRequestModal({
  onClose,
  title,
  subtitle,
  icon,
  submitLabel = 'Enviar solicitud',
  successText = 'Un asesor Sebring te va a contactar dentro de las próximas 2 horas hábiles.',
  withSchedule = false,
  defaultMessage = '',
}) {
  const form = useForm(
    { name: '', phone: '', email: '', date: today(), time: timeSlots[0].value, message: defaultMessage },
    {
      name: required(),
      phone: (v) => (String(v).replace(/\D/g, '').length >= 8 ? undefined : 'Ingresá un teléfono válido'),
      email: isEmail,
    },
  )
  const [sent, setSent] = useState(false)
  const { values, errors, handleChange } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.validate()) setSent(true)
  }

  return (
    <Modal open onClose={onClose} title={title} subtitle={subtitle} icon={icon} size="sm">
      {sent ? (
        <EmptyState icon={CircleCheckBig} title="¡Solicitud enviada!" action={<Button onClick={onClose}>Cerrar</Button>}>
          {successText}
          {withSchedule && ` Turno solicitado: ${new Date(`${values.date}T00:00`).toLocaleDateString('es-AR')} a las ${values.time} hs.`}
        </EmptyState>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <FormGrid $cols={1}>
            <TextField label="Nombre y apellido *" name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" />
            <FormGrid>
              <TextField label="Teléfono *" name="phone" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} autoComplete="tel" />
              <TextField label="Email *" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" />
            </FormGrid>
            {withSchedule && (
              <FormGrid>
                <TextField label="Fecha" name="date" type="date" min={today()} value={values.date} onChange={handleChange} />
                <SelectField label="Horario" name="time" value={values.time} onChange={handleChange} options={timeSlots} />
              </FormGrid>
            )}
            <TextField label="Mensaje" name="message" value={values.message} onChange={handleChange} multiline rows={3} />
            <Button type="submit" size="lg" icon={Send} fullWidth>
              {submitLabel}
            </Button>
          </FormGrid>
        </form>
      )}
    </Modal>
  )
}

export default ContactRequestModal
