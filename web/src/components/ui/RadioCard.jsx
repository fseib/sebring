import styled from 'styled-components'

const Wrapper = styled.label`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ $checked, theme }) => ($checked ? theme.colors.primary : 'transparent')};
  background: ${({ $checked, theme }) => ($checked ? theme.colors.surface : theme.colors.primarySofter)};
  box-shadow: ${({ $checked }) => ($checked ? '0 0 0 4px rgba(13, 79, 219, 0.08)' : 'none')};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ $checked, theme }) => ($checked ? theme.colors.primary : theme.colors.primarySoft)};
  }

  input {
    position: absolute;
    opacity: 0;
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

const IconBox = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  margin-top: 2px;
`

const Content = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Note = styled.p`
  margin-top: 8px;
  font-size: 0.72rem !important;
  font-weight: 700;
  color: ${({ $tone, theme }) => ($tone === 'success' ? theme.colors.success : theme.colors.primary)} !important;
`

const Radio = styled.span`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#c3cddb')};
  box-shadow: inset 0 0 0 3px #fff;
  background: ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#fff')};
`

// Opción de radio con formato de tarjeta (modalidad de entrega, medio de pago, etc.)
function RadioCard({ name, value, checked, onChange, icon: Icon, title, description, note, noteTone }) {
  return (
    <Wrapper $checked={checked}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      {Icon && (
        <IconBox>
          <Icon size={18} aria-hidden />
        </IconBox>
      )}
      <Content>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {note && <Note $tone={noteTone}>{note}</Note>}
      </Content>
      <Radio $checked={checked} aria-hidden />
    </Wrapper>
  )
}

export default RadioCard
