import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import styled, { css } from 'styled-components'

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const Label = styled.label`
  font-size: ${({ $small }) => ($small ? '0.72rem' : '0.85rem')};
  font-weight: 600;
  color: ${({ $light, theme }) => ($light ? '#b6c2d6' : theme.colors.textSoft)};
`

const Hint = styled.p`
  font-size: 0.78rem;
  color: ${({ $error, theme }) => ($error ? theme.colors.danger : theme.colors.muted)};
`

const Control = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    left: 14px;
    color: ${({ theme }) => theme.colors.muted};
    pointer-events: none;
  }

  > svg.chevron {
    left: auto;
    right: 12px;
  }
`

const inputStyles = css`
  width: 100%;
  min-height: 46px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 0 14px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '40px' : '14px')};
  font-size: 0.92rem;
  font-weight: 500;
  transition:
    border-color 0.15s,
    background 0.15s;

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  ${({ $invalid, theme }) =>
    $invalid &&
    css`
      border-color: ${theme.colors.danger};
    `}

  ${({ $tone, theme }) =>
    $tone === 'white' &&
    css`
      background: ${theme.colors.surface};
      border-color: ${theme.colors.border};
    `}
`

const Input = styled.input`
  ${inputStyles}
`

const Select = styled.select`
  ${inputStyles}
  appearance: none;
  padding-right: 36px;
  cursor: pointer;
`

const TextArea = styled.textarea`
  ${inputStyles}
  padding: 12px 14px;
  min-height: 110px;
  resize: vertical;
  line-height: 1.5;
`

function FieldShell({ id, label, aside, hint, error, light, smallLabel, children }) {
  return (
    <FieldWrapper>
      {(label || aside) && (
        <LabelRow>
          {label && (
            <Label htmlFor={id} $light={light} $small={smallLabel}>
              {label}
            </Label>
          )}
          {aside}
        </LabelRow>
      )}
      {children}
      {(error || hint) && (
        <Hint id={`${id}-hint`} $error={Boolean(error)} role={error ? 'alert' : undefined}>
          {error || hint}
        </Hint>
      )}
    </FieldWrapper>
  )
}

// Input de texto con label, ícono, ayuda y error
export function TextField({ label, aside, hint, error, icon: Icon, multiline = false, tone, light, smallLabel, ...inputProps }) {
  const autoId = useId()
  const id = inputProps.id ?? autoId
  const Component = multiline ? TextArea : Input
  return (
    <FieldShell id={id} label={label} aside={aside} hint={hint} error={error} light={light} smallLabel={smallLabel}>
      <Control>
        {Icon && !multiline && <Icon size={17} aria-hidden />}
        <Component
          id={id}
          $hasIcon={Boolean(Icon) && !multiline}
          $invalid={Boolean(error)}
          $tone={tone}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-hint` : undefined}
          {...inputProps}
        />
      </Control>
    </FieldShell>
  )
}

// Select con las mismas props que TextField. options: [{ value, label }]
export function SelectField({ label, aside, hint, error, icon: Icon, options, tone, light, smallLabel, ...selectProps }) {
  const autoId = useId()
  const id = selectProps.id ?? autoId
  return (
    <FieldShell id={id} label={label} aside={aside} hint={hint} error={error} light={light} smallLabel={smallLabel}>
      <Control>
        {Icon && <Icon size={17} aria-hidden />}
        <Select
          id={id}
          $hasIcon={Boolean(Icon)}
          $invalid={Boolean(error)}
          $tone={tone}
          aria-describedby={error || hint ? `${id}-hint` : undefined}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronDown className="chevron" size={16} aria-hidden />
      </Control>
    </FieldShell>
  )
}

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols = 2 }) => $cols}, minmax(0, 1fr));
  gap: 16px 18px;

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`
