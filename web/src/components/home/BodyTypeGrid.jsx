import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BODY_TYPES } from '../../constants/catalog.js'
import { bodyTypeImages } from '../../data/home.js'
import { filterVehicles, EMPTY_FILTERS } from '../../utils/catalog.js'
import { Container, Section, SectionHeading } from '../ui'
import VehicleImage from '../vehicles/VehicleImage.jsx'

const Grid = styled.ul`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;

  @media ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Item = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  padding: 14px;

  h3 {
    font-size: 0.9rem;
  }

  p {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const LinkAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const categories = BODY_TYPES.filter((t) => bodyTypeImages[t.value])

// Accesos al catálogo filtrado por carrocería
function BodyTypeGrid({ vehicles }) {
  return (
    <Section aria-labelledby="body-types-title">
      <Container>
        <SectionHeading
          id="body-types-title"
          eyebrow="Segmentos de excelencia"
          title="Explorá por Carrocería"
          action={
            <LinkAction to="/catalogo">
              Ver todas las categorías <ArrowRight size={16} />
            </LinkAction>
          }
        />
        <Grid>
          {categories.map((category) => {
            const count = filterVehicles(vehicles, { ...EMPTY_FILTERS, bodyType: category.value }).length
            return (
              <li key={category.value}>
                <Item to={`/catalogo?tipo=${category.value}`}>
                  <VehicleImage src={bodyTypeImages[category.value]} alt="" ratio="16 / 9" />
                  <Info>
                    <div>
                      <h3>{category.label}</h3>
                      <p>
                        {count} {count === 1 ? 'unidad disponible' : 'unidades disponibles'}
                      </p>
                    </div>
                    <ArrowRight size={18} aria-hidden />
                  </Info>
                </Item>
              </li>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}

export default BodyTypeGrid
