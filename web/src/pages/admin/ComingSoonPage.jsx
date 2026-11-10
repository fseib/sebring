import { Sparkles } from 'lucide-react'
import { Button, EmptyState } from '../../components/ui'

// Secciones del panel que todavía no tienen diseño
function ComingSoonPage({ title }) {
  return (
    <EmptyState icon={Sparkles} title={`${title}: próximamente`} action={<Button to="/admin">Ir al inventario</Button>}>
      Esta sección del panel todavía está en desarrollo.
    </EmptyState>
  )
}

export default ComingSoonPage
