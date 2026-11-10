import { LockKeyhole, Store, Truck, UserRound } from 'lucide-react'
import styled from 'styled-components'
import { DEPOSIT_ARS, DEPOSIT_USD, RESERVATION_HOURS } from '../../constants/catalog.js'
import { formatNumber, formatUSD } from '../../utils/format.js'
import { FormGrid, RadioCard, TextField } from '../ui'

const Summary = styled.section`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primarySofter};
  border: 1px solid ${({ theme }) => theme.colors.primarySoft};

  > svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }

  @media ${({ theme }) => theme.media.sm} {
    flex-wrap: wrap;
  }
`

const SummaryText = styled.div`
  flex: 1;
  min-width: 200px;

  strong {
    font-size: 1rem;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Total = styled.dl`
  margin: 0;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;

  dt {
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  dd {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
`

export const StepTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 12px;
  font-size: 0.95rem;
  font-weight: 700;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const OptionsFieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  min-width: 0;
`

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`

// Paso 1: resumen de la seña, modalidad de entrega y datos del titular
function DeliveryStep({ vehiclePrice, branch, form }) {
  const { values, errors, handleChange, setValue } = form
  return (
    <>
      <Summary aria-labelledby="deposit-title">
        <LockKeyhole size={26} aria-hidden />
        <SummaryText>
          <strong id="deposit-title">
            Seña Reembolsable: ${formatNumber(DEPOSIT_ARS)} ARS (o USD {DEPOSIT_USD})
          </strong>
          <p>100% protegido y reembolsable por contrato. Bloquea el vehículo en exclusividad por {RESERVATION_HOURS} horas para vos.</p>
        </SummaryText>
        <Total>
          <dt>Valor total unidad</dt>
          <dd>{formatUSD(vehiclePrice)}</dd>
        </Total>
      </Summary>

      <OptionsFieldset>
      <StepTitle as="legend">Seleccioná la modalidad de entrega:</StepTitle>
      <Options>
        <RadioCard
          name="delivery"
          value="retiro"
          checked={values.delivery === 'retiro'}
          onChange={(v) => setValue('delivery', v)}
          icon={Store}
          title={`Retiro en ${branch}`}
          description="Centro de Entregas Sebring (Av. del Libertador 1450 / Juana Manso 950)"
          note="Bonificado · Listo en 24h"
          noteTone="success"
        />
        <RadioCard
          name="delivery"
          value="envio"
          checked={values.delivery === 'envio'}
          onChange={(v) => setValue('delivery', v)}
          icon={Truck}
          title="Envío en Batea a Todo el País"
          description="Transporte cerrado asegurado directo a tu domicilio o provincia"
          note="Coordinación logística personalizada"
        />
      </Options>
      </OptionsFieldset>

      <StepTitle>
        <UserRound size={18} aria-hidden />
        Datos del Titular de la Reserva
      </StepTitle>
      <FormGrid>
        <TextField
          label="Nombre y Apellido Completo *"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Ej: Rodrigo Morales"
          autoComplete="name"
          smallLabel
        />
        <TextField
          label="DNI / CUIT *"
          name="document"
          value={values.document}
          onChange={handleChange}
          error={errors.document}
          placeholder="20-35892411-9"
          smallLabel
        />
        <TextField
          label="Correo Electrónico *"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="nombre@email.com"
          autoComplete="email"
          smallLabel
        />
        <TextField
          label="Provincia / Localidad *"
          name="city"
          value={values.city}
          onChange={handleChange}
          error={errors.city}
          placeholder="Vicente López, Buenos Aires"
          smallLabel
        />
      </FormGrid>
    </>
  )
}

export default DeliveryStep
