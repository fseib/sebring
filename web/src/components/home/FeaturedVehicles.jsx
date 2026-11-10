import { CarFront } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { isPublic } from '../../utils/catalog.js'
import { Button, Container, Grid, Section, SectionHeading, SegmentedControl } from '../ui'
import FeaturedVehicleCard from '../vehicles/FeaturedVehicleCard.jsx'

const tabs = [
  { value: 'todos', label: 'Todos', match: () => true },
  { value: 'suv', label: 'SUVs', match: (v) => v.bodyType === 'suv' },
  { value: 'sedan', label: 'Sedanes', match: (v) => v.bodyType === 'sedan' || v.bodyType === 'hatchback' },
  { value: 'performance', label: 'Performance', match: (v) => v.hp >= 250 },
]

const More = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`

// "Vehículos destacados de la semana": los 3 más recientes disponibles de la pestaña elegida
function FeaturedVehicles({ vehicles }) {
  const [tab, setTab] = useState('todos')
  const { match } = tabs.find((t) => t.value === tab)
  const available = vehicles.filter((v) => isPublic(v) && v.status === 'disponible')
  const featured = available
    .filter(match)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3)

  return (
    <Section $tone="white" aria-labelledby="featured-title">
      <Container>
        <SectionHeading
          id="featured-title"
          eyebrow="Selección curada"
          dot
          title="Vehículos Destacados de la Semana"
          subtitle="Unidades inspeccionadas, con historial limpio y listas para entrega inmediata."
          action={
            <SegmentedControl
              label="Filtrar destacados"
              value={tab}
              onChange={setTab}
              activeTone="primary"
              size="sm"
              options={tabs.map(({ value, label }) => ({ value, label }))}
            />
          }
        />
        <Grid as="ul" $cols={3} aria-live="polite">
          {featured.map((vehicle) => (
            <li key={vehicle.id}>
              <FeaturedVehicleCard vehicle={vehicle} />
            </li>
          ))}
        </Grid>
        <More>
          <Button to="/catalogo" variant="soft" iconRight={CarFront}>
            Explorar el inventario completo (+{available.length} autos)
          </Button>
        </More>
      </Container>
    </Section>
  )
}

export default FeaturedVehicles
