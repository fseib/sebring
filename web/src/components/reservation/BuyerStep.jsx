import { Phone, Wallet } from 'lucide-react'
import { FormGrid, SelectField, TextField } from '../ui'
import { StepTitle } from './DeliveryStep.jsx'

const balanceOptions = [
  { value: 'contado', label: 'Contado / Transferencia' },
  { value: 'financiado', label: 'Financiación Plan Sebring' },
  { value: 'mixto', label: 'Parte contado + financiación' },
]

// Paso 2: contacto y forma de pago del saldo
function BuyerStep({ form }) {
  const { values, errors, handleChange } = form
  return (
    <>
      <StepTitle as="h3" style={{ marginTop: 0 }}>
        <Phone size={18} aria-hidden />
        Contacto del Comprador
      </StepTitle>
      <FormGrid>
        <TextField
          label="Teléfono celular *"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="11 5555-5555"
          autoComplete="tel"
          smallLabel
        />
        <TextField
          label={values.delivery === 'envio' ? 'Domicilio de entrega *' : 'Domicilio'}
          name="address"
          value={values.address}
          onChange={handleChange}
          error={errors.address}
          placeholder="Calle, número, piso"
          autoComplete="street-address"
          smallLabel
        />
      </FormGrid>

      <StepTitle>
        <Wallet size={18} aria-hidden />
        Cancelación del Saldo
      </StepTitle>
      <FormGrid>
        <SelectField
          label="Forma de pago del saldo"
          name="balancePayment"
          value={values.balancePayment}
          onChange={handleChange}
          options={balanceOptions}
          smallLabel
        />
      </FormGrid>
      <div style={{ marginTop: 16 }}>
        <TextField
          label="Comentarios para el asesor"
          name="comments"
          value={values.comments}
          onChange={handleChange}
          placeholder="Horario de contacto preferido, consultas..."
          multiline
          rows={3}
          smallLabel
        />
      </div>
    </>
  )
}

export default BuyerStep
