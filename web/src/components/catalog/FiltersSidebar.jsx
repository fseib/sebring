import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FUEL_TYPES, PRICE_RANGE, YEARS, ZONES } from '../../constants/catalog.js'
import { countBy, filterVehicles } from '../../utils/catalog.js'
import { formatNumber, formatUSD } from '../../utils/format.js'
import { Button, Card, Checkbox, DualRangeSlider, SegmentedControl } from '../ui'

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    border: none;
    background: none;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  button:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Group = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  legend {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  legend span {
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 0;
    text-transform: none;
  }
`

const PriceBoxes = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 6px 0 0;

  div {
    padding: 8px 10px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.primarySofter};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  div:last-child {
    text-align: right;
  }

  dt {
    font-size: 0.68rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  dd {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 700;
    white-space: nowrap;
  }
`

const FuelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 8px;
`

// Sidebar de filtros avanzados. Trabaja sobre un borrador y aplica todo junto con el botón.
function FiltersSidebar({ filters, vehicles, onApply, onReset }) {
  const [draft, setDraft] = useState({
    condition: filters.condition,
    brands: filters.brands,
    zones: filters.zones,
    years: filters.years,
    fuels: filters.fuels,
    price: [filters.minPrice ?? PRICE_RANGE.min, filters.maxPrice ?? PRICE_RANGE.max],
  })

  const update = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }))

  const brandCounts = useMemo(() => countBy(vehicles, (v) => v.brand), [vehicles])
  const brands = Object.keys(brandCounts).sort((a, b) => brandCounts[b] - brandCounts[a])
  const conditionCounts = countBy(vehicles, (v) => v.condition)
  const fuelCounts = countBy(vehicles, (v) => v.fuelType)

  const nextFilters = {
    condition: draft.condition,
    brands: draft.brands,
    zones: draft.zones,
    years: draft.years,
    fuels: draft.fuels,
    minPrice: draft.price[0] === PRICE_RANGE.min ? null : draft.price[0],
    maxPrice: draft.price[1] === PRICE_RANGE.max ? null : draft.price[1],
  }

  // Vista previa de cuántos resultados va a dar
  const previewCount = filterVehicles(vehicles, { ...filters, ...nextFilters }).length

  const toggleIn = (key, value, checked) =>
    update(key)(checked ? [...draft[key], value] : draft[key].filter((v) => v !== value))

  return (
    <Wrapper
      as="form"
      aria-labelledby="filters-title"
      $padding={22}
      onSubmit={(e) => {
        e.preventDefault()
        onApply(nextFilters)
      }}
    >
      <Header>
        <h2 id="filters-title">
          <SlidersHorizontal size={18} aria-hidden />
          Filtros Avanzados
        </h2>
        <button type="button" onClick={onReset}>
          Restablecer
        </button>
      </Header>

      <Group>
        <legend>Condición</legend>
        <SegmentedControl
          label="Condición"
          value={draft.condition}
          onChange={update('condition')}
          activeTone="dark"
          size="sm"
          columns={3}
          options={[
            { value: '', label: 'Todos' },
            { value: 'okm', label: `0km (${conditionCounts.okm ?? 0})` },
            { value: 'usado', label: `Usados (${conditionCounts.usado ?? 0})` },
          ]}
        />
      </Group>

      <Group>
        <legend>
          Rango de precio
          <span>
            USD {formatNumber(draft.price[0] / 1000)}k - USD {formatNumber(draft.price[1] / 1000)}k
          </span>
        </legend>
        <DualRangeSlider
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={PRICE_RANGE.step}
          value={draft.price}
          onChange={update('price')}
          labels={['Precio mínimo', 'Precio máximo']}
        />
        <PriceBoxes>
          <div>
            <dt>Mínimo</dt>
            <dd>
              <output>{formatUSD(draft.price[0])}</output>
            </dd>
          </div>
          <div>
            <dt>Máximo</dt>
            <dd>
              <output>{formatUSD(draft.price[1])}</output>
            </dd>
          </div>
        </PriceBoxes>
      </Group>

      <Group>
        <legend>Marcas líderes</legend>
        {brands.map((brand) => (
          <Checkbox
            key={brand}
            label={brand}
            count={brandCounts[brand]}
            checked={draft.brands.includes(brand)}
            onChange={(checked) => toggleIn('brands', brand, checked)}
          />
        ))}
      </Group>

      <Group>
        <legend>Radicación / Zona</legend>
        <SegmentedControl
          label="Zona"
          multiple
          value={draft.zones}
          onChange={update('zones')}
          activeTone="primary"
          size="sm"
          columns={3}
          options={ZONES}
        />
      </Group>

      <Group>
        <legend>Año de fabricación</legend>
        <SegmentedControl
          label="Año"
          multiple
          value={draft.years}
          onChange={update('years')}
          activeTone="primary"
          size="sm"
          columns={3}
          options={YEARS.map((y) => ({ value: y, label: String(y) }))}
        />
      </Group>

      <Group>
        <legend>Tipo de combustible</legend>
        <FuelGrid>
          {FUEL_TYPES.map((fuel) => (
            <Checkbox
              key={fuel.value}
              label={fuel.label}
              count={fuelCounts[fuel.value] ?? 0}
              checked={draft.fuels.includes(fuel.value)}
              onChange={(checked) => toggleIn('fuels', fuel.value, checked)}
            />
          ))}
        </FuelGrid>
      </Group>

      <Button type="submit" icon={Search} fullWidth>
        Aplicar Filtros ({previewCount})
      </Button>
    </Wrapper>
  )
}

export default FiltersSidebar
