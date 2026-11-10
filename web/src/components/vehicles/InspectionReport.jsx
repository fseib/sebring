import { CircleCheck, CircleCheckBig } from 'lucide-react'
import styled from 'styled-components'
import inspectionCategories from '../../data/inspection.js'
import { formatDate } from '../../utils/format.js'
import { Badge, Card, CheckList, Grid, IconTile } from '../ui'

const Wrapper = styled(Card)`
  margin-top: 36px;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 26px;
  flex-wrap: wrap;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  h3 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const Status = styled.dl`
  margin: 0;
  text-align: right;

  dt {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  dd {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.success};
  }

  @media ${({ theme }) => theme.media.sm} {
    text-align: left;
  }
`

const CategoryCard = styled(Card)`
  height: 100%;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 14px;
  }

  h4 {
    font-size: 1rem;
  }

  data {
    font-size: 0.68rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.success};
    white-space: nowrap;
  }
`

// Informe del peritaje de 180 puntos
function InspectionReport({ inspection }) {
  return (
    <Wrapper as="section" aria-labelledby="inspection-title" $tone="soft" $padding={32}>
      <Header>
        <Title>
          <IconTile $tone="success" $size={52} aria-hidden>
            <CircleCheckBig size={26} />
          </IconTile>
          <div>
            <h3 id="inspection-title">
              Inspección Pericial de 180 Puntos Sebring Certificada
              <Badge tone="success" size="sm">
                Score {inspection.score}/100
              </Badge>
            </h3>
            <p>
              Evaluado el <time dateTime={inspection.date}>{formatDate(inspection.date)}</time> por Peritos
              Verificadores Oficiales en centro técnico Sebring Buenos Aires.
            </p>
          </div>
        </Title>
        <Status>
          <dt>Documentación y estatus</dt>
          <dd>
            <CircleCheck size={16} aria-hidden />
            VTV al Día · 08 Firmado · Sin Multas
          </dd>
        </Status>
      </Header>
      <Grid as="ul" $cols={4} $gap={16}>
        {inspectionCategories.map((category, index) => (
          <li key={category.title}>
            <CategoryCard as="article" $padding={18}>
              <header>
                <h4>
                  {index + 1}. {category.title}
                </h4>
                <data value={category.points}>
                  {category.points}/{category.points} Pts
                </data>
              </header>
              <CheckList items={category.items} defaultIcon={CircleCheck} iconColor="success" />
            </CategoryCard>
          </li>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default InspectionReport
