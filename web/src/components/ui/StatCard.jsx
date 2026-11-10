import styled from 'styled-components'
import { Card } from './layout.js'

const Wrapper = styled(Card)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 22px;
`

const Label = styled.h3`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $dark }) => ($dark ? '#b6c2d6' : 'inherit')};
  opacity: ${({ $dark }) => ($dark ? 1 : 0.7)};
`

const ValueRow = styled.p`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0 6px;
`

const Value = styled.span`
  font-size: 2.1rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ $accent, $dark, theme }) => ($dark ? '#fff' : $accent ? theme.colors.primary : theme.colors.text)};
`

const Description = styled.p`
  font-size: 0.82rem;
  color: ${({ $dark, theme }) => ($dark ? '#94a3b8' : theme.colors.muted)};
`

const IconBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $dark, theme }) => ($dark ? theme.colors.primary : theme.colors.primarySoft)};
  color: ${({ $dark, theme }) => ($dark ? '#fff' : theme.colors.primary)};
`

// Tarjeta de métrica para el panel: etiqueta, valor, complemento, descripción e ícono
function StatCard({ label, value, extra, description, icon: Icon, tone = 'default', accent = false }) {
  const dark = tone === 'dark'
  return (
    <Wrapper as="article" $tone={tone}>
      <div>
        <Label $dark={dark}>{label}</Label>
        <ValueRow>
          <Value $dark={dark} $accent={accent}>
            {value}
          </Value>
          {extra}
        </ValueRow>
        {description && <Description $dark={dark}>{description}</Description>}
      </div>
      {Icon && (
        <IconBox $dark={dark} aria-hidden>
          <Icon size={22} aria-hidden />
        </IconBox>
      )}
    </Wrapper>
  )
}

export default StatCard
