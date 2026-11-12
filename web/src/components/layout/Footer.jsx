import { Clock, Headphones, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../hooks/useAuth.js'
import { Container, Logo } from '../ui'

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.colors.primarySofter};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 56px 0 28px;
`

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.3fr repeat(3, 1fr);
  gap: 32px;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`

const About = styled.section`
  p {
    margin-top: 12px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.muted};
    max-width: 300px;
  }
`

const Column = styled.nav`
  font-style: normal;

  h2 {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.muted};

  small {
    font-size: inherit;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.72rem;
  }
`

const CURRENT_YEAR = new Date().getFullYear()

const columns = [
  {
    title: 'Comprar y Vender',
    links: [
      { label: 'Vehículos 0km', to: '/catalogo?condicion=okm' },
      { label: 'Usados Seleccionados', to: '/catalogo?condicion=usado' },
      { label: 'Simulador de Cuotas', to: '/#financiamiento' },
    ],
  },
  {
    title: 'Garantías y Legal',
    links: [
      { label: 'Garantía de 12 Meses', to: '/#garantias' },
      { label: 'Inspección de 180 Puntos', to: '/#garantias' },
      { label: 'Política de Devolución de 7 Días', to: '/#garantias' },
    ],
  },
]

// Link al panel solo visible para administradores
const adminLink = { label: 'Panel Concesionario', to: '/admin' }

function Footer() {
  const { isAdmin } = useAuth()
  const visibleColumns = columns.map((column, index) =>
    isAdmin && index === columns.length - 1 ? { ...column, links: [...column.links, adminLink] } : column,
  )

  return (
    <Wrapper>
      <Container>
        <Columns>
          <About aria-label="Sobre Sebring">
            <Logo />
            <p>
              Plataforma líder en Argentina para compra, reserva online y financiación de vehículos 0km y usados
              certificados con peritaje mecánico.
            </p>
          </About>
          {visibleColumns.map((column) => (
            <Column key={column.title} aria-labelledby={`footer-${column.title}`}>
              <h2 id={`footer-${column.title}`}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </Column>
          ))}
          <Column as="address">
            <h2>Soporte y Showrooms</h2>
            <ul>
              <li>
                <Phone size={14} aria-hidden />
                <a href="tel:08008887327">0800-888-SEBRING</a>
              </li>
              <li>
                <Headphones size={14} aria-hidden />
                <a href="mailto:hola@sebring.com.ar">hola@sebring.com.ar</a>
              </li>
              <li>
                <MapPin size={14} aria-hidden />
                Av. del Libertador 2450, Vicente López
              </li>
              <li>
                <Clock size={14} aria-hidden />
                Lun a Sáb 09:00 a 19:30 hs
              </li>
            </ul>
          </Column>
        </Columns>
        <Bottom>
          <small>© {CURRENT_YEAR} Sebring Argentina S.A. Todos los derechos reservados. DNRPA / ACARA homologado.</small>
          <strong>Operación segura con reserva en línea</strong>
        </Bottom>
      </Container>
    </Wrapper>
  )
}

export default Footer
