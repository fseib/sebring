import styled from 'styled-components'

const Track = styled.button`
  position: relative;
  width: 52px;
  height: 30px;
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  background: ${({ $on, theme }) => ($on ? theme.colors.primary : '#cbd5e1')};
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: ${({ $on }) => ($on ? '26px' : '4px')};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: left 0.2s;
  }
`

// Interruptor on/off accesible (role="switch")
function Toggle({ checked, onChange, label, ...rest }) {
  return (
    <Track
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      $on={checked}
      onClick={() => onChange(!checked)}
      {...rest}
    />
  )
}

export default Toggle
