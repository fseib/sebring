import { BadgeCheck, Landmark, ShieldCheck } from 'lucide-react'
import styled from 'styled-components'
import { Badge, Container } from '../ui'
import SearchPanel from './SearchPanel.jsx'

const Wrapper = styled.section`
  position: relative;
  padding: 72px 0 80px;
  color: #fff;
  text-align: center;
  background:
    linear-gradient(180deg, rgba(8, 17, 36, 0.82) 0%, rgba(10, 30, 80, 0.9) 100%),
    url('/images/cars/macan.jpg') center 60% / cover no-repeat;
  overflow: hidden;

  @media ${({ theme }) => theme.media.sm} {
    padding: 48px 0 56px;
  }
`

const Title = styled.h1`
  max-width: 760px;
  margin: 18px auto 14px;
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;

  span {
    color: #8fb2ff;
  }
`

const Lead = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: #c3cee0;
  font-size: 1rem;
`

const Stats = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 28px;
  list-style: none;
  margin: 24px 0 36px;
  padding: 0;
  font-size: 0.82rem;
  font-weight: 600;

  li {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  svg {
    color: #8fb2ff;
  }
`

const stats = [
  { icon: BadgeCheck, text: '1.850+ Unidades Verificadas' },
  { icon: Landmark, text: 'Aprobación Crediticia en 24 Hs' },
  { icon: ShieldCheck, text: 'Garantía Mecánica 12 Meses' },
]

function Hero({ vehicles }) {
  return (
    <Wrapper aria-labelledby="hero-title">
      <Container>
        <Badge tone="light" pill dot>
          Sebring Hub Automotriz Argentina
        </Badge>
        <Title id="hero-title">
          Encontrá y Reservá tu Próximo Auto <span>en Minutos</span>
        </Title>
        <Lead>Transparencia absoluta, verificación pericial de 180 puntos y seña digital con reintegro 100% garantizado en 7 días.</Lead>
        <Stats>
          {stats.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Icon size={16} aria-hidden />
              {text}
            </li>
          ))}
        </Stats>
        <SearchPanel vehicles={vehicles} />
      </Container>
    </Wrapper>
  )
}

export default Hero
