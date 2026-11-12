import { ChevronDown, Heart, LockKeyhole, LogOut, Store, UserRound } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../hooks/useAuth.js'
import { Avatar } from '../ui'

const Wrapper = styled.div`
  position: relative;
`

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  font-weight: 600;
  transition: border-color 0.15s;

  &:hover,
  &[aria-expanded='true'] {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  > svg {
    color: ${({ theme }) => theme.colors.muted};
    transition: transform 0.15s;
  }

  &[aria-expanded='true'] > svg {
    transform: rotate(180deg);
  }
`

const TriggerName = styled.span`
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${({ theme }) => theme.media.sm} {
    display: none;
  }
`

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 60;
  width: 240px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
`

const MenuHeader = styled.div`
  padding: 10px 12px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 6px;

  strong {
    display: block;
    font-size: 0.9rem;
  }

  span {
    display: block;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.muted};
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const itemStyles = `
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: 0.88rem;
  font-weight: 500;
  text-align: left;
`

const Item = styled(Link)`
  ${itemStyles}
  color: ${({ theme }) => theme.colors.textSoft};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primarySofter};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const LogoutItem = styled.button`
  ${itemStyles}
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 6px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 0 6px 6px;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.dangerSoft};
  }
`

const accountItems = [
  { to: '/cuenta', label: 'Mis datos', icon: UserRound },
  { to: '/cuenta/reservas', label: 'Mis reservas', icon: LockKeyhole },
  { to: '/cuenta/favoritos', label: 'Mis favoritos', icon: Heart },
]

// Menú desplegable del usuario logueado: cuenta, reservas, favoritos, panel (admin) y cerrar sesión
function UserMenu() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const wrapperRef = useRef(null)
  const menuId = useId()

  // Cierra el menú al navegar
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Cierra con click afuera o Escape
  useEffect(() => {
    if (!open) return undefined
    const handleClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  if (!user) return null

  const items = isAdmin ? [...accountItems, { to: '/admin', label: 'Panel Concesionario', icon: Store }] : accountItems

  const handleLogout = () => {
    setOpen(false)
    logout()
    navigate('/', { replace: true })
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        <Avatar name={user.name} size={32} />
        <TriggerName>{user.name}</TriggerName>
        <ChevronDown size={16} aria-hidden />
      </Trigger>

      {open && (
        <Menu id={menuId} aria-label="Mi cuenta">
          <MenuHeader>
            <strong>{user.name}</strong>
            <span>{user.email || user.username}</span>
          </MenuHeader>
          <nav>
            {items.map(({ to, label, icon: Icon }) => (
              <Item key={to} to={to}>
                <Icon size={17} aria-hidden />
                {label}
              </Item>
            ))}
          </nav>
          <LogoutItem type="button" onClick={handleLogout}>
            <LogOut size={17} aria-hidden />
            Cerrar sesión
          </LogoutItem>
        </Menu>
      )}
    </Wrapper>
  )
}

export default UserMenu
