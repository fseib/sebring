import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.15s;

  &:is(a):hover {
    background: #d9e5fb;
  }

  button {
    display: inline-flex;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
  }
`

// Etiqueta compacta. Con onRemove muestra una X; con `to` funciona como link.
function Chip({ children, onRemove, to }) {
  if (to) {
    return (
      <StyledChip as={Link} to={to}>
        {children}
      </StyledChip>
    )
  }
  return (
    <StyledChip>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Quitar ${children}`}>
          <X size={13} strokeWidth={2.5} />
        </button>
      )}
    </StyledChip>
  )
}

export default Chip
