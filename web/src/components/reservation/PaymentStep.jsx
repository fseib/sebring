import { CreditCard, Info, Landmark } from 'lucide-react'
import styled from 'styled-components'
import { DEPOSIT_ARS } from '../../constants/catalog.js'
import { formatNumber } from '../../utils/format.js'
import { Checkbox, FormGrid, RadioCard, TextField } from '../ui'
import { OptionsFieldset, StepTitle } from './DeliveryStep.jsx'

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`

const Note = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.warningSoft};
  color: ${({ theme }) => theme.colors.warning};
  font-size: 0.8rem;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`

const Terms = styled.footer`
  margin-top: 16px;

  p {
    margin-top: 4px;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.danger};
  }
`

// Formatea "4111111111111111" como "4111 1111 1111 1111"
const formatCardNumber = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

// Paso 3: medio de pago de la seña
function PaymentStep({ form }) {
  const { values, errors, handleChange, setValue } = form
  return (
    <>
      <OptionsFieldset>
      <StepTitle as="legend" style={{ marginTop: 0 }}>
        Medio de pago de la seña (${formatNumber(DEPOSIT_ARS)} ARS):
      </StepTitle>
      <Options>
        <RadioCard
          name="paymentMethod"
          value="tarjeta"
          checked={values.paymentMethod === 'tarjeta'}
          onChange={(v) => setValue('paymentMethod', v)}
          icon={CreditCard}
          title="Tarjeta de crédito o débito"
          description="Acreditación inmediata"
        />
        <RadioCard
          name="paymentMethod"
          value="transferencia"
          checked={values.paymentMethod === 'transferencia'}
          onChange={(v) => setValue('paymentMethod', v)}
          icon={Landmark}
          title="Transferencia bancaria"
          description="Te enviamos CBU y alias por email"
        />
      </Options>
      </OptionsFieldset>

      {values.paymentMethod === 'tarjeta' && (
        <>
          <StepTitle>
            <CreditCard size={18} aria-hidden />
            Datos de la tarjeta
          </StepTitle>
          <FormGrid>
            <TextField
              label="Número de tarjeta *"
              name="cardNumber"
              inputMode="numeric"
              value={values.cardNumber}
              onChange={(e) => setValue('cardNumber', formatCardNumber(e.target.value))}
              error={errors.cardNumber}
              placeholder="0000 0000 0000 0000"
              autoComplete="cc-number"
              smallLabel
            />
            <TextField
              label="Nombre como figura en la tarjeta *"
              name="cardName"
              value={values.cardName}
              onChange={handleChange}
              error={errors.cardName}
              autoComplete="cc-name"
              smallLabel
            />
            <TextField
              label="Vencimiento (MM/AA) *"
              name="cardExpiry"
              value={values.cardExpiry}
              onChange={handleChange}
              error={errors.cardExpiry}
              placeholder="08/28"
              autoComplete="cc-exp"
              maxLength={5}
              smallLabel
            />
            <TextField
              label="Código de seguridad *"
              name="cardCvc"
              inputMode="numeric"
              value={values.cardCvc}
              onChange={handleChange}
              error={errors.cardCvc}
              placeholder="123"
              autoComplete="cc-csc"
              maxLength={4}
              smallLabel
            />
          </FormGrid>
        </>
      )}

      <Note>
        <Info size={16} aria-hidden />
        Entorno de demostración: no se realiza ningún cobro real ni se envían los datos de la tarjeta.
      </Note>

      <Terms>
        <Checkbox
          label="Acepto las condiciones de reserva y la política de reembolso de 7 días"
          checked={values.acceptTerms}
          onChange={(checked) => setValue('acceptTerms', checked)}
        />
        {errors.acceptTerms && <p role="alert">{errors.acceptTerms}</p>}
      </Terms>
    </>
  )
}

export default PaymentStep
