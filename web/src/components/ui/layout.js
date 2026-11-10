import styled, { css } from 'styled-components'

// Primitivas de layout reutilizables

export const Container = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 24px;

  @media ${({ theme }) => theme.media.sm} {
    padding: 0 16px;
  }
`

export const Section = styled.section`
  padding: ${({ $compact }) => ($compact ? '40px 0' : '72px 0')};
  background: ${({ $tone, theme }) =>
    $tone === 'white' ? theme.colors.surface : $tone === 'dark' ? theme.colors.navy : 'transparent'};

  @media ${({ theme }) => theme.media.sm} {
    padding: ${({ $compact }) => ($compact ? '28px 0' : '48px 0')};
  }
`

const cardTones = {
  default: css`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
  `,
  soft: css`
    background: ${({ theme }) => theme.colors.primarySofter};
    border: 1px solid ${({ theme }) => theme.colors.primarySoft};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.navy};
    border: 1px solid ${({ theme }) => theme.colors.navy};
    color: #fff;
  `,
}

export const Card = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ $padding = 20 }) => (typeof $padding === 'number' ? `${$padding}px` : $padding)};
  box-shadow: ${({ $elevated, theme }) => ($elevated ? theme.shadow.md : theme.shadow.sm)};
  ${({ $tone = 'default' }) => cardTones[$tone]}
`

// Usar as="ul" cuando los hijos son una colección (tarjetas), con cada item en <li>
export const Grid = styled.div`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${({ $gap = 20 }) => $gap}px;
  grid-template-columns: repeat(${({ $cols = 3 }) => $cols}, minmax(0, 1fr));

  @media ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(${({ $cols = 3 }) => Math.min($cols, 3)}, minmax(0, 1fr));
  }
  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(${({ $cols = 3 }) => Math.min($cols, 2)}, minmax(0, 1fr));
  }
  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Stack = styled.div`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
  gap: ${({ $gap = 12 }) => $gap}px;
  align-items: ${({ $align = 'stretch' }) => $align};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
`

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $light, theme }) => ($light ? '#93b4f5' : theme.colors.primary)};
`

export const Muted = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ $size = '0.9rem' }) => $size};
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ $space = 16 }) => $space}px 0;
`

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
