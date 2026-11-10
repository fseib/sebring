import { CarFront } from 'lucide-react'
import { Button, Container, EmptyState, Section } from '../components/ui'

function NotFoundPage() {
  return (
    <Section>
      <Container>
        <EmptyState icon={CarFront} title="Página no encontrada" action={<Button to="/">Volver al inicio</Button>}>
          La dirección que buscás no existe o fue movida.
        </EmptyState>
      </Container>
    </Section>
  )
}

export default NotFoundPage
