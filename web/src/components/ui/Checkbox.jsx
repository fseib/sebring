import { Check } from 'lucide-react'
import styled from 'styled-components'

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const Box = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1.5px solid ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#b5c0d0')};
  background: ${({ $checked, theme }) => ($checked ? theme.colors.primary : theme.colors.surface)};
  color: #fff;
  transition: all 0.15s;

  ${HiddenInput}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

const Text = styled.span`
  flex: 1;
`

const Count = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: 999px;
  padding: 1px 8px;
`

function Checkbox({ label, checked, onChange, count, ...rest }) {
  return (
    <Wrapper>
      <HiddenInput type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} {...rest} />
      <Box $checked={checked} aria-hidden>
        {checked && <Check size={13} strokeWidth={3} />}
      </Box>
      <Text>{label}</Text>
      {count != null && <Count>{count}</Count>}
    </Wrapper>
  )
}

export default Checkbox
