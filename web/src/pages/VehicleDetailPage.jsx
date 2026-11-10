import { BadgeCheck, CalendarDays, CarFront } from 'lucide-react'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import InfoStrip from '../components/layout/InfoStrip.jsx'
import ContactRequestModal from '../components/reservation/ContactRequestModal.jsx'
import ReservationModal from '../components/reservation/ReservationModal.jsx'
import { Badge, Breadcrumb, Button, Container, EmptyState, Section } from '../components/ui'
import InspectionReport from '../components/vehicles/InspectionReport.jsx'
import KeySpecs from '../components/vehicles/KeySpecs.jsx'
import PriceBox from '../components/vehicles/PriceBox.jsx'
import SpecsSection from '../components/vehicles/SpecsSection.jsx'
import VehicleGallery from '../components/vehicles/VehicleGallery.jsx'
import { useVehicles } from '../hooks/useVehicles.js'
import { formatKm } from '../utils/format.js'
import { getVehicleTitle } from '../utils/vehicle.js'

const IdList = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;

  div {
    display: flex;
    gap: 6px;
  }

  div:first-child dt::before {
    content: '●  ';
    color: ${({ theme }) => theme.colors.success};
  }

  div:last-child {
    color: ${({ theme }) => theme.colors.primary};
  }

  dd {
    margin: 0;
  }
`

const Top = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 1fr);
  gap: 28px;
  align-items: start;
  padding: 28px 0 56px;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Badges = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0 0 14px;
  padding: 0;
`

const Title = styled.h1`
  font-size: clamp(1.7rem, 3.4vw, 2.3rem);
  font-weight: 800;
`

const Subtitle = styled.p`
  margin: 6px 0 20px;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 0.92rem;
`

const Sticky = styled.div`
  position: sticky;
  top: 88px;
`

function VehicleDetailPage() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { getVehicleById, loading } = useVehicles()
  const [testDriveOpen, setTestDriveOpen] = useState(false)
  const vehicle = getVehicleById(id)

  // El modal de reserva se abre con ?reservar=1 (así funciona el botón "Señar" del catálogo)
  const reserving = searchParams.get('reservar') === '1' && Boolean(vehicle)
  const setReserving = (open) => setSearchParams(open ? { reservar: '1' } : {}, { replace: true })

  if (!vehicle) {
    return (
      <Container>
        <Section>
          <EmptyState
            icon={CarFront}
            title={loading ? 'Cargando vehículo...' : 'No encontramos este vehículo'}
            action={!loading && <Button to="/catalogo">Volver al catálogo</Button>}
          >
            {!loading && 'Puede que la unidad ya se haya vendido o que el link sea incorrecto.'}
          </EmptyState>
        </Section>
      </Container>
    )
  }

  const title = getVehicleTitle(vehicle)

  return (
    <article aria-labelledby="vehicle-title">
      <InfoStrip
        left={
          <Breadcrumb
            items={[
              { label: 'Inicio', to: '/' },
              { label: 'Catálogo de Autos', to: '/catalogo' },
              { label: `${title} ${vehicle.year}` },
            ]}
          />
        }
        right={
          <IdList>
            <div>
              <dt>VIN:</dt>
              <dd>{vehicle.vin}</dd>
            </div>
            <div>
              <dt>STOCK</dt>
              <dd>#{vehicle.stockCode}</dd>
            </div>
          </IdList>
        }
      />

      <Container>
        <Top>
          <div>
            <header>
              <Badges aria-label="Distintivos">
                {vehicle.warranty && (
                  <li>
                    <Badge tone="soft" pill icon={BadgeCheck}>
                      Certificado Sebring
                    </Badge>
                  </li>
                )}
                {vehicle.status === 'disponible' && (
                  <li>
                    <Badge tone="soft" pill>
                      Entrega inmediata (24h)
                    </Badge>
                  </li>
                )}
                {vehicle.status === 'reservado' && (
                  <li>
                    <Badge tone="warning" pill>
                      Señado
                    </Badge>
                  </li>
                )}
                {vehicle.condition === 'okm' ? (
                  <li>
                    <Badge tone="dark" pill>
                      0km
                    </Badge>
                  </li>
                ) : (
                  vehicle.singleOwner && (
                    <li>
                      <Badge tone="dark" pill>
                        Único dueño
                      </Badge>
                    </li>
                  )
                )}
              </Badges>
              <Title id="vehicle-title">{title}</Title>
              <Subtitle>
                Año {vehicle.year} · {formatKm(vehicle.km)} · {vehicle.engine} · {vehicle.traction} · Transmisión{' '}
                {vehicle.gearbox}
              </Subtitle>
            </header>
            <VehicleGallery
              key={vehicle.id}
              vehicleId={vehicle.id}
              images={vehicle.gallery.length ? vehicle.gallery : [{ src: vehicle.image, label: 'Frontal' }]}
              title={title}
            />
            <KeySpecs vehicle={vehicle} />
          </div>
          <Sticky>
            <PriceBox vehicle={vehicle} onReserve={() => setReserving(true)} onTestDrive={() => setTestDriveOpen(true)} />
          </Sticky>
        </Top>
      </Container>

      <Section $tone="white" aria-labelledby="specs-title">
        <Container>
          <SpecsSection specs={vehicle.specs} />
          <InspectionReport inspection={vehicle.inspection} />
        </Container>
      </Section>

      {reserving && <ReservationModal vehicle={vehicle} onClose={() => setReserving(false)} />}
      {testDriveOpen && (
        <ContactRequestModal
          onClose={() => setTestDriveOpen(false)}
          title="Agendar Test Drive Gratuito"
          subtitle={`${title} · ${vehicle.location.branch}`}
          icon={CalendarDays}
          submitLabel="Confirmar turno"
          withSchedule
        />
      )}
    </article>
  )
}

export default VehicleDetailPage
