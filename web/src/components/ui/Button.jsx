import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    box-shadow: 0 6px 16px rgba(13, 79, 219, 0.25);
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  soft: css`
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.text};
    &:hover:not(:disabled) {
      background: #d9e5fb;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.navy};
    color: #fff;
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.navySoft};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSoft};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primarySofter};
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #fff;
    &:hover:not(:disabled) {
      background: #a51818;
    }
  `,
  whatsapp: css`
    background: ${({ theme }) => theme.colors.whatsapp};
    color: #fff;
    &:hover:not(:disabled) {
      background: #168a43;
    }
  `,
  // Para fondos oscuros
  outlineLight: css`
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.25);
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.16);
    }
  `,
}

const sizes = {
  sm: css`
    height: 34px;
    padding: 0 14px;
    font-size: 0.8rem;
  `,
  md: css`
    height: 42px;
    padding: 0 18px;
    font-size: 0.9rem;
  `,
  lg: css`
    height: 50px;
    padding: 0 24px;
    font-size: 0.95rem;
  `,
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 600;
  white-space: nowrap;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
`

const iconSize = { sm: 15, md: 17, lg: 18 }

// Botón polimórfico: <button>, <Link to> (react-router) o <a href>
function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconRight: IconRight,
  type = 'button',
  children,
  ...rest
}) {
  const component = to ? Link : href ? 'a' : 'button'
  return (
    <StyledButton
      as={component}
      to={to}
      href={href}
      type={component === 'button' ? type : undefined}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...rest}
    >
      {Icon && <Icon size={iconSize[size]} aria-hidden />}
      {children}
      {IconRight && <IconRight size={iconSize[size]} aria-hidden />}
    </StyledButton>
  )
}

export default Button
