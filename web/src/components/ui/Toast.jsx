import { CircleCheck, CircleX, Info, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import IconButton from './IconButton.jsx'

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: none; }
`

const tones = {
  success: { icon: CircleCheck, color: 'success' },
  danger: { icon: CircleX, color: 'danger' },
  info: { icon: Info, color: 'primary' },
}

const accent = ({ $tone, theme }) => theme.colors[tones[$tone].color]

const Viewport = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(380px, calc(100vw - 32px));
  pointer-events: none;

  @media ${({ theme }) => theme.media.sm} {
    right: 16px;
    bottom: 16px;
  }
`

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 12px 14px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${accent};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${slideIn} 0.2s ease-out;
  pointer-events: auto;

  > svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: ${accent};
  }
`

const Text = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
  }

  p {
    margin-top: 2px;
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

// Pila de notificaciones flotantes (abajo a la derecha). La maneja <ToastProvider>.
function ToastViewport({ toasts, onDismiss }) {
  return createPortal(
    <Viewport role="region" aria-label="Notificaciones">
      {toasts.map(({ id, tone, title, message }) => {
        const Icon = tones[tone].icon
        return (
          <Item key={id} $tone={tone} role={tone === 'danger' ? 'alert' : 'status'}>
            <Icon size={20} aria-hidden />
            <Text>
              <strong>{title}</strong>
              {message && <p>{message}</p>}
            </Text>
            <IconButton icon={X} label="Cerrar notificación" variant="ghost" size={28} onClick={() => onDismiss(id)} />
          </Item>
        )
      })}
    </Viewport>,
    document.body,
  )
}

export default ToastViewport
