import { CarFront, Search, Tag, Wallet } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BODY_TYPES } from '../../constants/catalog.js'
import { budgetOptions, trendingSearches } from '../../data/home.js'
import { serializeFilters } from '../../hooks/useCatalogFilters.js'
import { EMPTY_FILTERS, countBy } from '../../utils/catalog.js'
import { Button, Chip, SegmentedControl, SelectField } from '../ui'

const Panel = styled.form`
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: end;
  margin-top: 14px;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Trends = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSoft};

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

// Buscador de la home: arma los filtros y navega al catálogo
function SearchPanel({ vehicles }) {
  const navigate = useNavigate()
  const [condition, setCondition] = useState('')
  const [brand, setBrand] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [budget, setBudget] = useState('')

  const counts = countBy(vehicles, (v) => v.condition)
  const brandOptions = useMemo(
    () => [
      { value: '', label: 'Todas las marcas' },
      ...[...new Set(vehicles.map((v) => v.brand))].sort().map((b) => ({ value: b, label: b })),
    ],
    [vehicles],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = serializeFilters({
      ...EMPTY_FILTERS,
      condition,
      bodyType,
      brands: brand ? [brand] : [],
      maxPrice: budget ? Number(budget) : null,
    })
    navigate(`/catalogo?${params}`)
  }

  return (
    <Panel role="search" onSubmit={handleSubmit} aria-label="Buscar vehículos">
      <SegmentedControl
        label="Condición"
        value={condition}
        onChange={setCondition}
        activeTone="white"
        size="sm"
        options={[
          { value: '', label: `Todos (${vehicles.length})` },
          { value: 'okm', label: `0km de Concesionario (${counts.okm ?? 0})` },
          { value: 'usado', label: `Usados Seleccionados (${counts.usado ?? 0})` },
        ]}
      />
      <Fields>
        <SelectField label="Marca" icon={CarFront} value={brand} onChange={(e) => setBrand(e.target.value)} options={brandOptions} smallLabel />
        <SelectField
          label="Tipo de carrocería"
          icon={Tag}
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          options={[{ value: '', label: 'Cualquier carrocería' }, ...BODY_TYPES.map((t) => ({ value: t.value, label: t.short }))]}
          smallLabel
        />
        <SelectField label="Presupuesto máximo" icon={Wallet} value={budget} onChange={(e) => setBudget(e.target.value)} options={budgetOptions} smallLabel />
        <Button type="submit" size="lg" icon={Search}>
          Explorar Inventario
        </Button>
      </Fields>
      <Trends aria-labelledby="trends-title">
        <span id="trends-title">Tendencias en Argentina:</span>
        <ul>
          {trendingSearches.map((trend) => (
            <li key={trend.label}>
              <Chip to={`/catalogo/${trend.vehicleId}`}>{trend.label}</Chip>
            </li>
          ))}
        </ul>
      </Trends>
    </Panel>
  )
}

export default SearchPanel
