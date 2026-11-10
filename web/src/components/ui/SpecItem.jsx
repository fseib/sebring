import styled, { css } from 'styled-components'

// Cada variante define la ubicación de ícono, etiqueta y valor en una grilla
const variants = {
  inline: css`
    grid-template-columns: auto 1fr;
    grid-template-areas: 'icon value';
    column-gap: 6px;
  `,
  stacked: css`
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'icon label'
      'icon value';
    column-gap: 12px;
  `,
  box: css`
    grid-template-columns: 1fr;
    grid-template-areas:
      'value'
      'label';
    row-gap: 2px;
    text-align: center;
    padding: 8px 6px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.primarySofter};
  `,
}

// Debe usarse dentro de un <dl>: el div agrupa el par <dt>/<dd>
const Item = styled.div`
  display: grid;
  align-items: center;
  min-width: 0;
  ${({ $variant }) => variants[$variant]}

  /* El dt no genera caja propia: su ícono y su texto se ubican en la grilla del item */
  dt {
    display: contents;
  }

  dd {
    grid-area: value;
    margin: 0;
    font-size: ${({ $variant }) => ($variant === 'stacked' ? '0.98rem' : '0.74rem')};
    font-weight: ${({ $variant }) => ($variant === 'inline' ? 500 : 700)};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
  }
`

const IconBox = styled.span`
  grid-area: icon;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};

  ${({ $variant, theme }) =>
    $variant === 'stacked' &&
    css`
      width: 38px;
      height: 38px;
      border-radius: ${theme.radius.sm};
      background: ${theme.colors.surface};
      box-shadow: ${theme.shadow.sm};
    `}
`

const Caption = styled.span`
  grid-area: label;
  font-size: ${({ $variant }) => ($variant === 'stacked' ? '0.68rem' : '0.66rem')};
  font-weight: ${({ $variant }) => ($variant === 'stacked' ? 700 : 500)};
  text-transform: ${({ $variant }) => ($variant === 'stacked' ? 'uppercase' : 'none')};
  letter-spacing: ${({ $variant }) => ($variant === 'stacked' ? '0.06em' : '0')};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.3;

  /* En la variante compacta la etiqueta solo la leen los lectores de pantalla */
  ${({ $variant }) =>
    $variant === 'inline' &&
    css`
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    `}
`

// Par etiqueta/valor de una ficha técnica. Variantes:
// - inline: compacto, etiqueta oculta visualmente (tarjetas del catálogo)
// - stacked: etiqueta en mayúsculas + valor destacado (ficha del vehículo)
// - box: centrado sobre fondo suave (tarjetas destacadas de la home)
function SpecItem({ icon: Icon, label, value, variant = 'inline' }) {
  return (
    <Item $variant={variant}>
      <dt>
        {Icon && variant !== 'box' && (
          <IconBox $variant={variant} aria-hidden>
            <Icon size={variant === 'stacked' ? 18 : 14} />
          </IconBox>
        )}
        <Caption $variant={variant}>{label}</Caption>
      </dt>
      <dd>{value}</dd>
    </Item>
  )
}

export default SpecItem
