import { Bell, CarFront, ChartSpline, LockKeyhole, Store, Tag } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Badge, IconButton, Logo } from '../ui'
import UserMenu from './UserMenu.jsx'

const Shell = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 28px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.md} {
    position: static;
    height: auto;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 14px 16px;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    overflow-x: auto;
  }
`

const LogoBox = styled.div`
  padding: 0 8px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;

  @media ${({ theme }) => theme.media.md} {
    flex-direction: row;
  }
`

const navItemStyles = `
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
`

const NavItem = styled(NavLink)`
  ${navItemStyles}
  color: ${({ theme }) => theme.colors.textSoft};

  &:hover {
    background: ${({ theme }) => theme.colors.primarySofter};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`

const BackLink = styled(Link)`
  ${navItemStyles}
  color: ${({ theme }) => theme.colors.textSoft};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const Topbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.media.sm} {
    padding: 14px 16px;
  }
`

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Main = styled.main`
  padding: 28px 32px 48px;
  flex: 1;

  @media ${({ theme }) => theme.media.sm} {
    padding: 20px 16px 40px;
  }
`

const navItems = [
  { to: '/admin', label: 'Inventario', icon: CarFront, end: true },
  { to: '/admin/reservas', label: 'Reservas', icon: LockKeyhole },
  { to: '/admin/tasaciones', label: 'Tasaciones', icon: Tag },
  { to: '/admin/metricas', label: 'Métricas', icon: ChartSpline },
]

// Layout del panel del concesionario: menú lateral + barra superior
function AdminLayout() {
  return (
    <Shell>
      <Sidebar>
        <LogoBox>
          <Logo to="/admin" size="lg" />
        </LogoBox>
        <Nav aria-label="Panel">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavItem key={to} to={to} end={end}>
              <Icon size={19} aria-hidden />
              {label}
            </NavItem>
          ))}
        </Nav>
        <BackLink to="/">
          <Store size={19} aria-hidden />
          Volver a la Tienda
        </BackLink>
      </Sidebar>
      <Content>
        <Topbar>
          <Badge tone="soft" pill>
            Concesionario oficial
          </Badge>
          <TopActions>
            <IconButton icon={Bell} label="Notificaciones" variant="soft" size={40} />
            <UserMenu />
          </TopActions>
        </Topbar>
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Shell>
  )
}

export default AdminLayout
