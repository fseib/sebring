import styled from 'styled-components'
import { Eyebrow } from './layout.js'

const Wrapper = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-between')};
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
  gap: 20px;
  margin-bottom: ${({ $spacing = 28 }) => $spacing}px;
  flex-wrap: wrap;
`

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  gap: 8px;
  max-width: 720px;
`

const Title = styled.h2.attrs(({ $id }) => ({ id: $id }))`
  font-size: ${({ $size }) => ($size === 'lg' ? 'clamp(1.7rem, 3vw, 2.3rem)' : 'clamp(1.4rem, 2.4vw, 1.75rem)')};
  font-weight: 800;
  color: ${({ $light, theme }) => ($light ? '#fff' : theme.colors.text)};
`

const Subtitle = styled.p`
  color: ${({ $light, theme }) => ($light ? '#b6c2d6' : theme.colors.muted)};
  font-size: 0.95rem;
`

const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
`

// Encabezado de sección: eyebrow + título + subtítulo + acción opcional a la derecha
// `id` se aplica al título para que la sección lo referencie con aria-labelledby
function SectionHeading({ id, eyebrow, title, subtitle, action, center = false, light = false, size = 'md', dot = false, as = 'h2', spacing }) {
  return (
    <Wrapper $center={center} $spacing={spacing}>
      <Texts $center={center}>
        {eyebrow && (
          <Eyebrow $light={light}>
            {dot && <Dot />}
            {eyebrow}
          </Eyebrow>
        )}
        <Title as={as} $id={id} $size={size} $light={light}>
          {title}
        </Title>
        {subtitle && <Subtitle $light={light}>{subtitle}</Subtitle>}
      </Texts>
      {action}
    </Wrapper>
  )
}

export default SectionHeading
