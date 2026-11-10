import { MessageCircle } from 'lucide-react'
import styled from 'styled-components'
import { whatsappUrl } from '../../constants/contact.js'
import { Button, Card, IconTile } from '../ui'

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  background: linear-gradient(160deg, #0b1527 0%, #10224a 100%);

  h2 {
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
  }

  p {
    font-size: 0.95rem;
    color: #b6c2d6;
  }
`

// "¿Querés vender tu auto?": deriva la consulta a WhatsApp
function SellCarCard() {
  return (
    <Wrapper as="section" id="vender" aria-labelledby="sell-title" $tone="dark" $padding={32}>
      <IconTile $tone="whatsapp" $size={56} aria-hidden>
        <MessageCircle size={28} />
      </IconTile>
      <h2 id="sell-title">¿Querés vender tu auto?</h2>
      <p>Contactate con nosotros por WhatsApp</p>
      <Button
        href={whatsappUrl('Hola Sebring, quiero vender mi auto.')}
        target="_blank"
        rel="noopener noreferrer"
        variant="whatsapp"
        size="lg"
        icon={MessageCircle}
      >
        Escribinos por WhatsApp
      </Button>
    </Wrapper>
  )
}

export default SellCarCard
