import { Check } from 'lucide-react'
import { Fragment } from 'react'
import styled from 'styled-components'

const List = styled.ol`
  display: flex;
  align-items: center;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Step = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: ${({ $state }) => ($state === 'current' ? 700 : 500)};
  color: ${({ $state, theme }) => ($state === 'upcoming' ? theme.colors.muted : theme.colors.text)};
  white-space: nowrap;

  @media ${({ theme }) => theme.media.sm} {
    span.label {
      display: ${({ $state }) => ($state === 'current' ? 'inline' : 'none')};
    }
  }
`

const Circle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ $state, theme }) => ($state === 'upcoming' ? theme.colors.surfaceAlt : theme.colors.primary)};
  color: ${({ $state, theme }) => ($state === 'upcoming' ? theme.colors.muted : '#fff')};
`

const Line = styled.li`
  flex: 1;
  height: 1px;
  min-width: 16px;
  background: ${({ $done, theme }) => ($done ? theme.colors.primary : theme.colors.border)};
`

// Indicador de pasos para formularios multi-etapa
function Stepper({ steps, current }) {
  return (
    <List>
      {steps.map((label, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'upcoming'
        return (
          <Fragment key={label}>
            {index > 0 && <Line aria-hidden $done={index <= current} />}
            <Step $state={state} aria-current={state === 'current' ? 'step' : undefined}>
              <Circle $state={state}>{state === 'done' ? <Check size={14} strokeWidth={3} /> : index + 1}</Circle>
              <span className="label">{label}</span>
            </Step>
          </Fragment>
        )
      })}
    </List>
  )
}

export default Stepper
