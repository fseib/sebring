import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import IconButton from './IconButton.jsx'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: none; }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.15s ease-out;
  overflow-y: auto;
`

const widths = { sm: '480px', md: '680px', lg: '800px' }

const Dialog = styled.div`
  width: 100%;
  max-width: ${({ $size }) => widths[$size]};
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  animation: ${slideUp} 0.2s ease-out;
  overflow: hidden;
`

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 22px 24px;
  background: ${({ theme }) => theme.colors.primarySofter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }
`

const Subtitle = styled.div`
  margin-top: 4px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Body = styled.div`
  padding: 24px;
  overflow-y: auto;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.primarySofter};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`

// Modal genérico: se renderiza en un portal, cierra con Escape o clic afuera y bloquea el scroll.
function Modal({ open, onClose, title, subtitle, icon: Icon, size = 'md', footer, children }) {
  useEffect(() => {
    if (!open) return undefined
    const handleKey = (e) => e.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <Overlay onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Dialog role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined} $size={size}>
        <Header>
          {Icon && (
            <HeaderIcon>
              <Icon size={22} aria-hidden />
            </HeaderIcon>
          )}
          <HeaderText>
            <h2>{title}</h2>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </HeaderText>
          <IconButton icon={X} label="Cerrar" onClick={onClose} variant="default" />
        </Header>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Dialog>
    </Overlay>,
    document.body,
  )
}

export default Modal
