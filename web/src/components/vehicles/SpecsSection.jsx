import { Armchair, FileText, Fuel, Shield } from 'lucide-react'
import styled from 'styled-components'
import { Button, Card, Grid, SectionHeading } from '../ui'

const GroupCard = styled(Card)`
  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }
`

const Rows = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 9px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.86rem;

  dt {
    color: ${({ theme }) => theme.colors.textSoft};
  }

  dd {
    margin: 0;
    font-weight: 600;
    text-align: right;
  }
`

const groups = [
  { key: 'performance', title: 'Rendimiento y Mecánica', icon: Fuel },
  { key: 'comfort', title: 'Confort y Equipamiento', icon: Armchair },
  { key: 'safety', title: 'Seguridad y Asistencias ADAS', icon: Shield },
]

// Ficha técnica agrupada en 3 tarjetas
function SpecsSection({ specs }) {
  return (
    <>
      <SectionHeading
        id="specs-title"
        eyebrow="Ficha técnica exhaustiva"
        title="Especificaciones & Peritaje Oficial"
        size="lg"
        action={
          <Button variant="soft" size="sm" icon={FileText} onClick={() => window.print()}>
            Descargar Informe DNRPA y Peritaje (PDF)
          </Button>
        }
      />
      <Grid $cols={3}>
        {groups.map(({ key, title, icon: Icon }) => (
          <GroupCard key={key} as="section" aria-labelledby={`specs-${key}`} $tone="soft" $padding={22}>
            <h3 id={`specs-${key}`}>
              <Icon size={18} aria-hidden />
              {title}
            </h3>
            <Rows>
              {(specs[key] ?? []).map(([label, value]) => (
                <Row key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </Row>
              ))}
            </Rows>
          </GroupCard>
        ))}
      </Grid>
    </>
  )
}

export default SpecsSection
