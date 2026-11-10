import styled from 'styled-components'
import { IconTile } from './misc.jsx'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 56px 24px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};

  h3 {
    font-size: 1.1rem;
    margin-top: 6px;
  }

`

const Text = styled.div`
  max-width: 420px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`

const Action = styled.div`
  margin-top: 10px;
`

// Mensaje para listas vacías, errores o secciones en construcción
function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <Wrapper>
      {Icon && (
        <IconTile $size={52}>
          <Icon size={24} aria-hidden />
        </IconTile>
      )}
      <h3>{title}</h3>
      {children && <Text>{children}</Text>}
      {action && <Action>{action}</Action>}
    </Wrapper>
  )
}

export default EmptyState
