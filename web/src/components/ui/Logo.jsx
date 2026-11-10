import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ $size }) => ($size === 'lg' ? '1.6rem' : '1.3rem')};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ $light, theme }) => ($light ? '#fff' : theme.colors.text)};

  b {
    font-weight: inherit;
  }

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

function Logo({ to = '/', light = false, size = 'md' }) {
  return (
    <StyledLogo to={to} $light={light} $size={size} aria-label="Sebring - Inicio">
      <Zap size={size === 'lg' ? 26 : 21} strokeWidth={2.5} aria-hidden />
      <b>
        Seb<span>ring</span>
      </b>
    </StyledLogo>
  )
}

export default Logo
