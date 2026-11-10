import { Menu, Store, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Container, IconButton, Logo } from '../ui'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  gap: 40px;
  height: 68px;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;

  @media ${({ theme }) => theme.media.md} {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 12px 16px 20px;
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`

const linkStyles = `
  font-size: 0.9rem;
  font-weight: 500;
  padding: 6px 0;
  white-space: nowrap;
  transition: color 0.15s;
`

const MenuLink = styled(NavLink)`
  ${linkStyles}
  color: ${({ theme }) => theme.colors.textSoft};

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    font-weight: 700;
  }
`

const HashLink = styled(Link)`
  ${linkStyles}
  color: ${({ theme }) => theme.colors.textSoft};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: auto;
`

const PanelLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  @media ${({ theme }) => theme.media.sm} {
    display: none;
  }
`

const MenuToggle = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.md} {
    display: block;
  }
`

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Catálogo de Autos' },
]

// Secciones dentro de la home (anclas)
const sectionLinks = [
  { to: '/#financiamiento', label: 'Financiamiento' },
  { to: '/#vender', label: 'Vender mi Auto' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)

  // Cierra el menú mobile al navegar
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <Bar>
      <Inner>
        <Logo />
        <Nav $open={open} aria-label="Principal">
          {links.map((link) => (
            <MenuLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </MenuLink>
          ))}
          {sectionLinks.map((link) => (
            <HashLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </HashLink>
          ))}
        </Nav>
        <Actions>
          <PanelLink to="/admin">
            <Store size={16} aria-hidden />
            Panel Concesionario
          </PanelLink>
          <IconButton icon={UserRound} label="Mi cuenta / Panel" to="/admin" variant="dark" size={40} round />
          <MenuToggle>
            <IconButton
              icon={open ? X : Menu}
              label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            />
          </MenuToggle>
        </Actions>
      </Inner>
    </Bar>
  )
}

export default Header
