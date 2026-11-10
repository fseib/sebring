import { useState } from 'react'
import styled from 'styled-components'
import { ANNUAL_RATE, monthlyPayment } from '../../utils/finance.js'
import { formatNumber, formatUSD } from '../../utils/format.js'
import { Badge, Button, Card, Eyebrow, RangeSlider, SegmentedControl } from '../ui'

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;

  h2 {
    margin-top: 6px;
    font-size: 1.4rem;
    font-weight: 800;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Control = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ControlHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSoft};

  output {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ $accent, theme }) => ($accent ? theme.colors.primary : theme.colors.text)};
  }
`

const Scale = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Result = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primarySofter};
  border: 1px solid ${({ theme }) => theme.colors.primarySoft};

  span {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
  }

  output {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  small {
    margin-left: 4px;
    color: ${({ theme }) => theme.colors.muted};
  }

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const TERMS = [24, 36, 48, 60]

// Simulador de cuotas (sistema francés con la tasa del Plan Sebring)
function FinanceSimulator({ onRequest }) {
  const [price, setPrice] = useState(45000)
  const [downPct, setDownPct] = useState(20)
  const [term, setTerm] = useState(48)

  const downPayment = (price * downPct) / 100
  const monthly = monthlyPayment(price - downPayment, term)

  return (
    <Wrapper as="section" aria-labelledby="simulator-title" $padding={28} $elevated>
      <Head>
        <div>
          <Eyebrow>Herramienta financiera</Eyebrow>
          <h2 id="simulator-title">Simulador de Financiamiento a Medida</h2>
          <p>Calculá tu cuota estimada con pre-aprobación en línea sin impacto en tu historial crediticio.</p>
        </div>
        <Badge tone="neutral" uppercase={false}>
          Tasa Preferencial {(ANNUAL_RATE * 100).toFixed(1)}% TNA
        </Badge>
      </Head>

      <Control>
        <ControlHead>
          Valor del Vehículo
          <output>{formatUSD(price)}</output>
        </ControlHead>
        <RangeSlider min={15000} max={120000} step={500} value={price} onChange={setPrice} label="Valor del vehículo" />
        <Scale>
          <span>$15.000</span>
          <span>$120.000</span>
        </Scale>
      </Control>

      <Control>
        <ControlHead $accent>
          Anticipo / Entrega Inicial
          <output>
            {formatUSD(downPayment, { prefix: '$' })} USD ({downPct}%)
          </output>
        </ControlHead>
        <RangeSlider min={10} max={60} step={5} value={downPct} onChange={setDownPct} label="Porcentaje de anticipo" />
        <Scale>
          <span>10% Mínimo</span>
          <span>60% Máximo</span>
        </Scale>
      </Control>

      <Control>
        <ControlHead>Plazo del Crédito (Meses)</ControlHead>
        <SegmentedControl
          label="Plazo"
          value={term}
          onChange={setTerm}
          activeTone="dark"
          columns={4}
          options={TERMS.map((t) => ({ value: t, label: `${t} meses` }))}
        />
      </Control>

      <Result>
        <div>
          <span>Cuota mensual estimada</span>
          <output>${formatNumber(monthly)}</output>
          <small>USD / mes*</small>
          <p>Incluye seguro de desgravamen y gastos notariales.</p>
        </div>
        <Button onClick={() => onRequest({ price, downPayment, term, monthly })}>Solicitar Pre-Aprobación</Button>
      </Result>
    </Wrapper>
  )
}

export default FinanceSimulator
