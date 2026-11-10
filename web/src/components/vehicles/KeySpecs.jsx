import { ArrowLeftRight, Fuel, Gauge, Waypoints } from 'lucide-react'
import styled from 'styled-components'
import { formatKm } from '../../utils/format.js'
import { Card, SpecItem } from '../ui'

const Wrapper = styled(Card)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 16px 0 0;

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

// Resumen de 4 datos clave debajo de la galería
function KeySpecs({ vehicle }) {
  return (
    <Wrapper as="dl" aria-label="Datos clave" $tone="soft" $padding={18}>
      <SpecItem variant="stacked" icon={Gauge} label="Kilometraje" value={formatKm(vehicle.km)} />
      <SpecItem variant="stacked" icon={Waypoints} label="Transmisión" value={vehicle.gearbox} />
      <SpecItem variant="stacked" icon={Fuel} label="Motor / Combustible" value={vehicle.fuelDetail} />
      <SpecItem variant="stacked" icon={ArrowLeftRight} label="Tracción" value={vehicle.traction} />
    </Wrapper>
  )
}

export default KeySpecs
