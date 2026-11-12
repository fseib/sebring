import { ShieldAlert } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { Button, Container, EmptyState, Section } from '../ui'

// Protege rutas del panel: sin sesión → login; con sesión sin rol admin → acceso denegado
function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  if (!isAdmin) {
    return (
      <Section>
        <Container>
          <EmptyState
            icon={ShieldAlert}
            title="Acceso restringido"
            action={
              <>
                <Button to="/">Volver a la tienda</Button>{' '}
                <Button variant="secondary" onClick={logout}>
                  Ingresar con otra cuenta
                </Button>
              </>
            }
          >
            Solo los administradores pueden entrar al Panel Concesionario.
          </EmptyState>
        </Container>
      </Section>
    )
  }

  return children ?? <Outlet />
}

export default RequireAdmin
