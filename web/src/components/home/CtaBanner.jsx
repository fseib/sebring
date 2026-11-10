import { ArrowRight } from 'lucide-react'
import styled from 'styled-components'
import { Button, Container, Eyebrow, Section } from '../ui'

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 44px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: linear-gradient(120deg, #0b1527 0%, #10224a 100%);
  color: #fff;

  h2 {
    margin: 10px 0;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 800;
  }

  p {
    max-width: 560px;
    font-size: 0.88rem;
    color: #b6c2d6;
  }

  @media ${({ theme }) => theme.media.sm} {
    padding: 28px 22px;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

function CtaBanner() {
  return (
    <Section $compact aria-labelledby="cta-title">
      <Container>
        <Banner>
          <div>
            <Eyebrow $light>Reserva 100% protegida</Eyebrow>
            <h2 id="cta-title">¿Listo para estrenar tu próximo vehículo?</h2>
            <p>
              Bloqueá la unidad que te gusta hoy mismo con una seña digital 100% reembolsable de $350.000 ARS (o USD 300)
              y congelá el precio antes de que lo reserve otro comprador.
            </p>
          </div>
          <Actions>
            <Button to="/catalogo" size="lg" iconRight={ArrowRight}>
              Ver Catálogo Completo
            </Button>
            <Button to="/#vender" size="lg" variant="outlineLight">
              Vender mi Auto
            </Button>
          </Actions>
        </Banner>
      </Container>
    </Section>
  )
}

export default CtaBanner
