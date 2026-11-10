import styled from 'styled-components'
import { testimonials } from '../../data/home.js'
import { Avatar, Card, Container, Grid, Rating, Section, SectionHeading } from '../ui'

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Quote = styled(Card)`
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  blockquote {
    margin: 0;
    flex: 1;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSoft};
  }
`

const Author = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 12px;

  cite {
    display: block;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

function Testimonials() {
  return (
    <Section $tone="white" aria-labelledby="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Experiencias verificadas"
          title="La Confianza de Más de 8.000 Clientes"
          action={
            <Score>
              <Rating value={5} />
              <strong>4.9</strong>/ 5.0 en Google Reviews (1.420 opiniones)
            </Score>
          }
        />
        <Grid as="ul" $cols={3}>
          {testimonials.map((t) => (
            <li key={t.name}>
              <Quote as="figure" $padding={24}>
                <Rating value={5} />
                <blockquote>
                  <p>“{t.text}”</p>
                </blockquote>
                <Author>
                  <Avatar name={t.name} />
                  <div>
                    <cite>{t.name}</cite>
                    <span>{t.detail}</span>
                  </div>
                </Author>
              </Quote>
            </li>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default Testimonials
