import styled, { css } from 'styled-components'

const activeTones = {
  white: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.navy};
    color: #fff;
  `,
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  `,
}

const Group = styled.div`
  display: ${({ $columns }) => ($columns ? 'grid' : 'inline-flex')};
  grid-template-columns: ${({ $columns }) => ($columns ? `repeat(${$columns}, minmax(0, 1fr))` : 'none')};
  gap: 4px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
`

const Option = styled.button`
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ $size, $compact }) => ($compact ? '6px 4px' : $size === 'sm' ? '6px 12px' : '9px 16px')};
  font-size: ${({ $size }) => ($size === 'sm' ? '0.78rem' : '0.86rem')};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  white-space: nowrap;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &[aria-pressed='true'] {
    ${({ $activeTone }) => activeTones[$activeTone]}
  }
`

// Grupo de opciones tipo "tabs". Con `multiple`, value es un array.
function SegmentedControl({
  options,
  value,
  onChange,
  multiple = false,
  activeTone = 'white',
  size = 'md',
  columns,
  label,
  ...rest
}) {
  const isActive = (optionValue) => (multiple ? value.includes(optionValue) : value === optionValue)

  const handleClick = (optionValue) => {
    if (!multiple) return onChange(optionValue)
    onChange(isActive(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue])
  }

  return (
    <Group role="group" aria-label={label} $columns={columns} {...rest}>
      {options.map((option) => (
        <Option
          key={option.value}
          type="button"
          aria-pressed={isActive(option.value)}
          onClick={() => handleClick(option.value)}
          $activeTone={activeTone}
          $size={size}
          $compact={Boolean(columns)}
        >
          {option.label}
        </Option>
      ))}
    </Group>
  )
}

export default SegmentedControl
