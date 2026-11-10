import { ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

/* ---------- Breadcrumb ---------- */

const Crumbs = styled.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textSoft};

  li {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  [aria-current='page'] {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`

// items: [{ label, to }] — el último se muestra como página actual
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Ruta de navegación">
      <Crumbs>
        {items.map((item, index) => (
          <li key={item.label}>
            {index > 0 && <ChevronRight size={13} aria-hidden />}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
          </li>
        ))}
      </Crumbs>
    </nav>
  )
}

/* ---------- Rating ---------- */

const Stars = styled.span`
  display: inline-flex;
  gap: 2px;
  color: ${({ theme }) => theme.colors.star};
`

export function Rating({ value = 5, size = 15 }) {
  return (
    <Stars aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill={i < value ? 'currentColor' : 'none'} aria-hidden />
      ))}
    </Stars>
  )
}

/* ---------- Avatar ---------- */

const Circle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ $size }) => $size * 0.36}px;
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.colors.surface};
`

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

export function Avatar({ name, size = 40, children }) {
  return (
    <Circle $size={size} aria-hidden>
      {children ?? getInitials(name)}
    </Circle>
  )
}

/* ---------- IconTile: ícono dentro de un cuadrado de color ---------- */

export const IconTile = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size = 44 }) => $size}px;
  height: ${({ $size = 44 }) => $size}px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $tone, theme }) =>
    ({ solid: theme.colors.primary, success: theme.colors.success, whatsapp: theme.colors.whatsapp })[$tone] ??
    theme.colors.primarySoft};
  color: ${({ $tone, theme }) => ($tone && $tone !== 'soft' ? '#fff' : theme.colors.primary)};
`

/* ---------- CheckList ---------- */

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = 8 }) => $gap}px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.84rem;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ $iconColor, theme }) => ($iconColor === 'success' ? theme.colors.success : theme.colors.primary)};
  }
`

// items: [{ icon, text }] o strings (usa defaultIcon)
export function CheckList({ items, defaultIcon: DefaultIcon, iconColor = 'primary', gap }) {
  return (
    <List $iconColor={iconColor} $gap={gap}>
      {items.map((item) => {
        const { icon: Icon = DefaultIcon, text } = typeof item === 'string' ? { text: item } : item
        return (
          <li key={text}>
            {Icon && <Icon size={16} aria-hidden />}
            <span>{text}</span>
          </li>
        )
      })}
    </List>
  )
}
