import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const variants = {
  default: css`
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSoft};
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  soft: css`
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) {
      background: #d9e5fb;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSoft};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primarySofter};
    }
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.navy};
    color: #fff;
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.navySoft};
    }
  `,
  // Sobre imágenes
  overlay: css`
    background: rgba(255, 255, 255, 0.92);
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    &:hover:not(:disabled) {
      background: #fff;
    }
  `,
}

const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $round, theme }) => ($round ? theme.radius.pill : theme.radius.sm)};
  border: 1px solid transparent;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
  ${({ $variant }) => variants[$variant]}

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.danger};
    `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

// Botón cuadrado solo con ícono. `label` es obligatorio por accesibilidad.
function IconButton({ icon: Icon, label, to, href, variant = 'default', size = 36, round = false, active = false, iconProps, ...rest }) {
  const component = to ? Link : href ? 'a' : 'button'
  return (
    <StyledIconButton
      as={component}
      to={to}
      href={href}
      type={component === 'button' ? 'button' : undefined}
      aria-label={label}
      title={label}
      $variant={variant}
      $size={size}
      $round={round}
      $active={active}
      {...rest}
    >
      <Icon size={Math.round(size * 0.46)} aria-hidden {...iconProps} />
    </StyledIconButton>
  )
}

export default IconButton
