import { CalendarDays, Landmark } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import BodyTypeGrid from '../components/home/BodyTypeGrid.jsx'
import CtaBanner from '../components/home/CtaBanner.jsx'
import FeaturedVehicles from '../components/home/FeaturedVehicles.jsx'
import FinanceSimulator from '../components/home/FinanceSimulator.jsx'
import Hero from '../components/home/Hero.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import SellCarCard from '../components/home/SellCarCard.jsx'
import ValueProps from '../components/home/ValueProps.jsx'
import ContactRequestModal from '../components/reservation/ContactRequestModal.jsx'
import { Container, Section } from '../components/ui'
import { useVehicles } from '../hooks/useVehicles.js'
import { isPublic } from '../utils/catalog.js'
import { formatNumber, formatUSD } from '../utils/format.js'

const FinanceGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`

// Configuración del modal de contacto según la acción que lo abrió
const contactConfigs = {
  testDrive: () => ({
    title: 'Prueba de Manejo a Domicilio',
    subtitle: 'Llevamos la unidad a tu casa u oficina (CABA y Zona Norte)',
    icon: CalendarDays,
    submitLabel: 'Solicitar Test Drive',
    withSchedule: true,
  }),
  financing: ({ price, downPayment, term, monthly }) => ({
    title: 'Solicitar Pre-Aprobación',
    subtitle: `${formatUSD(price)} · anticipo ${formatUSD(downPayment)} · ${term} cuotas de $${formatNumber(monthly)}`,
    icon: Landmark,
    submitLabel: 'Enviar solicitud de crédito',
    successText: 'Recibimos tu solicitud. Te enviaremos la pre-aprobación por email dentro de las 24 hs hábiles.',
  }),
}

function HomePage() {
  const { vehicles } = useVehicles()
  const [contact, setContact] = useState(null)
  const publicVehicles = vehicles.filter(isPublic)

  const openContact = (type) => (data = {}) => setContact(contactConfigs[type](data))

  return (
    <>
      <Hero vehicles={publicVehicles} />
      <BodyTypeGrid vehicles={publicVehicles} />
      <FeaturedVehicles vehicles={publicVehicles} />
      <ValueProps onTestDrive={() => openContact('testDrive')()} />
      <Section id="financiamiento" $tone="white" aria-label="Financiamiento y venta de tu auto">
        <Container>
          <FinanceGrid>
            <FinanceSimulator onRequest={openContact('financing')} />
            <SellCarCard />
          </FinanceGrid>
        </Container>
      </Section>
      <Testimonials />
      <CtaBanner />

      {contact && <ContactRequestModal {...contact} onClose={() => setContact(null)} />}
    </>
  )
}

export default HomePage
