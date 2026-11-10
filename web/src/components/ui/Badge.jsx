import styled, { css } from 'styled-components'

const tones = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  `,
  soft: css`
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.navy};
    color: #fff;
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successSoft};
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warningSoft};
    color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #fff;
  `,
  neutral: css`
    background: #e8ecf2;
    color: ${({ theme }) => theme.colors.textSoft};
  `,
  light: css`
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
  `,
}

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: ${({ $pill, theme }) => ($pill ? theme.radius.pill : '4px')};
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.2;
  ${({ $uppercase }) =>
    $uppercase &&
    css`
      text-transform: uppercase;
      letter-spacing: 0.06em;
    `}
  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 3px 7px;
          font-size: 0.62rem;
        `
      : css`
          padding: 5px 10px;
          font-size: 0.72rem;
        `}
  ${({ $tone }) => tones[$tone]}
`

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
`

function Badge({ tone = 'soft', size = 'md', uppercase = true, pill = false, dot = false, icon: Icon, children, ...rest }) {
  return (
    <StyledBadge $tone={tone} $size={size} $uppercase={uppercase} $pill={pill} {...rest}>
      {dot && <Dot />}
      {Icon && <Icon size={size === 'sm' ? 11 : 13} aria-hidden />}
      {children}
    </StyledBadge>
  )
}

export default Badge
