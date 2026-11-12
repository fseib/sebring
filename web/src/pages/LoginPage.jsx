import { KeyRound, LogIn, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Alert, Button, Card, Container, Section, TextField } from '../components/ui'
import { useAuth } from '../hooks/useAuth.js'

const Wrapper = styled(Card)`
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.h1`
  font-size: 1.5rem;
  letter-spacing: -0.02em;
`

const Subtitle = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const DemoHint = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.text};
  }
`

function LoginPage() {
  const { login, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Destino después de ingresar: a donde quería ir (si tiene permiso) o el inicio de su rol
  const getTarget = (admin) => {
    if (from && (admin || !from.startsWith('/admin'))) return from
    return admin ? '/admin' : '/'
  }

  // Ya logueado: no tiene sentido mostrar el formulario
  if (isAuthenticated) {
    return <Navigate to={getTarget(isAdmin)} replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = login(username, password)
    if (!user) {
      setError('Usuario o contraseña incorrectos.')
      return
    }
    navigate(getTarget(user.role === 'admin'), { replace: true })
  }

  return (
    <Section>
      <Container>
        <Wrapper $padding={32} $elevated>
          <div>
            <Title>Ingresar</Title>
            <Subtitle>Accedé con tu cuenta de Sebring.</Subtitle>
          </div>

          {error && <Alert tone="danger">
            <p>{error}</p>
          </Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Usuario"
              icon={UserRound}
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              autoFocus
              required
            />
            <TextField
              label="Contraseña"
              icon={KeyRound}
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              required
            />
            <Button type="submit" icon={LogIn} size="lg" fullWidth disabled={!username || !password}>
              Ingresar
            </Button>
          </Form>

          <DemoHint>
            Demo: <code>admin / admin</code> · <code>user / user</code>
          </DemoHint>
        </Wrapper>
      </Container>
    </Section>
  )
}

export default LoginPage
