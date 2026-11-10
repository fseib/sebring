import styled from 'styled-components'
import { getActiveFilterChips } from '../../utils/catalog.js'
import { Chip } from '../ui'

const Row = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;

  h2 {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
    margin-right: 4px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button.clear {
    border: none;
    background: none;
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`

// Chips de los filtros aplicados, cada uno removible
function ActiveFilters({ filters, onRemove, onClear }) {
  const chips = getActiveFilterChips(filters)
  if (chips.length === 0) return null

  return (
    <Row aria-labelledby="active-filters-title">
      <h2 id="active-filters-title">Filtros activos:</h2>
      <ul>
        {chips.map((chip) => (
          <li key={chip.id}>
            <Chip onRemove={() => onRemove(chip.remove)}>{chip.label}</Chip>
          </li>
        ))}
      </ul>
      <button type="button" className="clear" onClick={onClear}>
        Limpiar todos
      </button>
    </Row>
  )
}

export default ActiveFilters
