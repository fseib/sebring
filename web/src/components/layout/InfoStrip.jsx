import styled from 'styled-components'
import { Container } from '../ui'

const Strip = styled.div`
  background: #e9eff9;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSoft};
`

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
  min-height: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-wrap: wrap;
`

const Side = styled.div`
  display: flex;
  align-items: center;
  gap: 8px 18px;
  flex-wrap: wrap;

  svg {
    vertical-align: -2px;
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.primary};
  }
`

// Barra fina debajo del header con información de contexto (izquierda / derecha)
function InfoStrip({ left, right }) {
  return (
    <Strip>
      <Inner>
        <Side>{left}</Side>
        {right && <Side>{right}</Side>}
      </Inner>
    </Strip>
  )
}

export default InfoStrip
