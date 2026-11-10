import { ArrowRight, BadgeCheck, CircleCheck, FileCheck, Landmark, MapPin, ShieldCheck, Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Badge, Card, Container, Grid, IconTile, Section, SectionHeading } from '../ui'

const PropCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.84rem;
    color: ${({ theme }) => theme.colors.muted};
    flex: 1;
  }
`

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  padding: 0;
`

const ReportBanner = styled(Card)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;

  div.text {
    flex: 1;
    min-width: 240px;
  }

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  ul {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

// Propuestas de valor. "test drive" abre el modal de contacto (lo maneja la página).
function ValueProps({ onTestDrive }) {
  const items = [
    {
      icon: Undo2,
      title: 'Reserva Reembolsable 7 Días',
      text: 'Reservá cualquier vehículo 100% online con una seña de $350.000 ARS (o USD 300). Tenés 7 días corridos para revisarlo, probarlo o solicitar el reintegro inmediato sin penalizaciones.',
      action: { label: 'Elegir un vehículo', to: '/catalogo' },
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Mecánica de 12 Meses',
      text: 'Todos los autos certificados incluyen cobertura mecánica integral de motor, transmisión, sistema de tracción y componentes eléctricos mayores respaldada por escrito.',
      action: { label: 'Ver usados certificados', to: '/catalogo?condicion=usado' },
    },
    {
      icon: MapPin,
      title: 'Prueba de Manejo a Domicilio',
      text: '¿Sin tiempo para venir al showroom? Llevamos la unidad a tu domicilio o trabajo en CABA o Zona Norte para una prueba de manejo guiada de 45 minutos.',
      action: { label: 'Solicitar Test Drive', onClick: onTestDrive },
    },
    {
      icon: Landmark,
      title: 'Financiación a Medida',
      text: 'Pre-aprobación crediticia en 24 hs con tasa preferencial Plan Sebring. Elegí el anticipo y el plazo que mejor se adapten a vos, sin impacto en tu historial.',
      action: { label: 'Simular mi cuota', to: '/#financiamiento' },
    },
  ]

  return (
    <Section id="garantias" aria-labelledby="value-props-title">
      <Container>
        <SectionHeading
          id="value-props-title"
          center
          size="lg"
          eyebrow="El estándar Sebring"
          title="Comprar un Auto Nunca Fue Tan Transparente"
          subtitle="Eliminamos la incertidumbre de la compra automotriz tradicional mediante garantías legales respaldadas por escrito y tecnología de inspección técnica."
          spacing={40}
        />
        <Grid as="ul" $cols={4} $gap={18}>
          {items.map(({ icon: Icon, title, text, action }) => (
            <li key={title}>
              <PropCard as="article" $padding={22}>
                <IconTile aria-hidden>
                  <Icon size={22} />
                </IconTile>
                <h3>{title}</h3>
                <p>{text}</p>
                <ActionLink
                  as={action.onClick ? 'button' : Link}
                  to={action.to}
                  onClick={action.onClick}
                  type={action.onClick ? 'button' : undefined}
                >
                  {action.label} <ArrowRight size={14} aria-hidden />
                </ActionLink>
              </PropCard>
            </li>
          ))}
        </Grid>
        <ReportBanner as="aside" aria-labelledby="report-title" $tone="soft" $padding={18}>
          <IconTile $tone="solid" aria-hidden>
            <FileCheck size={22} />
          </IconTile>
          <div className="text">
            <h3 id="report-title">Informe Técnico Digital por Cada Vehículo</h3>
            <p>Accedé al reporte pericial completo de 180 puntos antes de dar un solo centavo.</p>
          </div>
          <ul>
            <li>
              <Badge tone="soft" uppercase={false} icon={CircleCheck}>
                Cero Siniestros Estructurales
              </Badge>
            </li>
            <li>
              <Badge tone="soft" uppercase={false} icon={BadgeCheck}>
                Kilometraje 100% Verificado
              </Badge>
            </li>
          </ul>
        </ReportBanner>
      </Container>
    </Section>
  )
}

export default ValueProps
