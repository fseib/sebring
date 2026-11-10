import styled, { css } from 'styled-components'

const tones = {
  danger: css`
    background: ${({ theme }) => theme.colors.dangerSoft};
    border-color: #f6c6c6;
    --alert-accent: ${({ theme }) => theme.colors.danger};
  `,
  info: css`
    background: ${({ theme }) => theme.colors.primarySofter};
    border-color: ${({ theme }) => theme.colors.primarySoft};
    --alert-accent: ${({ theme }) => theme.colors.primary};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warningSoft};
    border-color: #fbd5ad;
    --alert-accent: ${({ theme }) => theme.colors.warning};
  `,
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 22px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  ${({ $tone }) => tones[$tone]}

  @media ${({ theme }) => theme.media.md} {
    flex-direction: column;
    align-items: flex-start;
  }
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: var(--alert-accent);
  color: #fff;
`

const Content = styled.div`
  flex: 1;
  min-width: 0;
  color: var(--alert-accent);

  h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 4px 0;
  }

  p {
    font-size: 0.85rem;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
`

// Aviso destacado con ícono, título, texto y acciones (ej. confirmar eliminación)
function Alert({ tone = 'info', icon: Icon, eyebrow, title, children, actions, ...rest }) {
  return (
    <Wrapper role={tone === 'danger' ? 'alert' : 'status'} $tone={tone} {...rest}>
      {Icon && (
        <IconBox>
          <Icon size={24} aria-hidden />
        </IconBox>
      )}
      <Content>
        {eyebrow}
        {title && <h3>{title}</h3>}
        {children}
      </Content>
      {actions && <Actions>{actions}</Actions>}
    </Wrapper>
  )
}

export default Alert
