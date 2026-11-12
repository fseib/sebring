import { Heart, LockKeyhole, UserRound } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar, Container, Section } from '../../components/ui'
import { useAuth } from '../../hooks/useAuth.js'

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  h1 {
    font-size: 1.6rem;
    letter-spacing: -0.02em;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.9rem;
  }
`

const Tabs = styled.nav`
  display: flex;
  gap: 6px;
  margin-bottom: 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow-x: auto;
`

const Tab = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin-bottom: -1px;
  border-bottom: 2px solid transparent;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const tabs = [
  { to: '/cuenta', label: 'Mis datos', icon: UserRound, end: true },
  { to: '/cuenta/reservas', label: 'Mis reservas', icon: LockKeyhole },
  { to: '/cuenta/favoritos', label: 'Mis favoritos', icon: Heart },
]

// Sección "Mi cuenta" del usuario logueado (datos, reservas y favoritos)
function AccountLayout() {
  const { user } = useAuth()

  return (
    <Section $compact>
      <Container>
        <Head>
          <Avatar name={user.name} size={56} />
          <div>
            <h1>Mi cuenta</h1>
            <p>
              {user.name} · @{user.username}
            </p>
          </div>
        </Head>
        <Tabs aria-label="Secciones de mi cuenta">
          {tabs.map(({ to, label, icon: Icon, end }) => (
            <Tab key={to} to={to} end={end}>
              <Icon size={17} aria-hidden />
              {label}
            </Tab>
          ))}
        </Tabs>
        <Outlet />
      </Container>
    </Section>
  )
}

export default AccountLayout
