import { CarFront, FileSearch, LockKeyhole, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import ActiveFilters from '../components/catalog/ActiveFilters.jsx'
import FiltersSidebar from '../components/catalog/FiltersSidebar.jsx'
import InfoStrip from '../components/layout/InfoStrip.jsx'
import { Badge, Button, Card, Container, EmptyState, IconTile, Pagination, SelectField } from '../components/ui'
import VehicleCard from '../components/vehicles/VehicleCard.jsx'
import { SORT_OPTIONS } from '../constants/catalog.js'
import { serializeFilters, useCatalogFilters } from '../hooks/useCatalogFilters.js'
import { useVehicles } from '../hooks/useVehicles.js'
import { filterVehicles, isPublic, paginate, sortVehicles } from '../utils/catalog.js'

// 15 = 5 filas completas en la grilla de 3 columnas
const PAGE_SIZE = 15

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  padding: 36px 0 20px;

  h1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 800;
  }

  p {
    max-width: 560px;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 0.92rem;
  }
`

const SortBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 240px;

  label {
    font-size: 0.8rem;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  > div {
    flex: 1;
  }
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 270px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
  padding-bottom: 64px;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.media.md} {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
  }
`

const MobileToggle = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.md} {
    display: block;
  }
`

const Results = styled.ul`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const ResultsFooter = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSoft};
`

const DnrpaCard = styled(Card)`
  display: flex;
  gap: 14px;

  h2 {
    font-size: 0.92rem;
  }

  p {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`

function CatalogPage() {
  const { vehicles } = useVehicles()
  const { filters, updateFilters, clearFilters } = useCatalogFilters()
  const [showFilters, setShowFilters] = useState(false)

  const publicVehicles = useMemo(() => vehicles.filter(isPublic), [vehicles])
  const results = useMemo(
    () => sortVehicles(filterVehicles(vehicles, filters), filters.sort),
    [vehicles, filters],
  )
  const { items, page, totalPages, from, to } = paginate(results, filters.page, PAGE_SIZE)

  const changePage = (nextPage) => {
    updateFilters({ page: nextPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <InfoStrip
        left={
          <>
            <Badge tone="soft" size="sm">
              Stock físico verificado
            </Badge>
            <span>Entrega inmediata · Peritaje 180 puntos · Radicación al día</span>
          </>
        }
        right={
          <>
            <span>
              <ShieldCheck size={14} aria-hidden />
              Garantía mecánica Sebring 12 meses
            </span>
            <span>
              <LockKeyhole size={14} aria-hidden />
              Seña online 100% reembolsable
            </span>
          </>
        }
      />
      <Container>
        <Head>
          <div>
            <h1>
              Catálogo de Vehículos
              <Badge tone="soft" pill uppercase={false}>
                {results.length} disponibles
              </Badge>
            </h1>
            <p>
              Explorá unidades con trazabilidad legal confirmada, kilometraje certificado y garantía de recompra a valor
              garantizado.
            </p>
          </div>
          <SortBox>
            <label htmlFor="sort">Ordenar por:</label>
            <SelectField
              id="sort"
              tone="white"
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              options={SORT_OPTIONS}
            />
          </SortBox>
        </Head>

        <ActiveFilters filters={filters} onRemove={updateFilters} onClear={clearFilters} />

        <Layout>
          <div>
            <MobileToggle>
              <Button
                variant="secondary"
                icon={SlidersHorizontal}
                fullWidth
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                aria-controls="catalog-filters"
                style={{ marginBottom: 16 }}
              >
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </Button>
            </MobileToggle>
            <Aside id="catalog-filters" aria-label="Filtros del catálogo" $open={showFilters}>
              {/* key: si los filtros cambian desde afuera (chips, URL) se reinicia el borrador */}
              <FiltersSidebar
                key={serializeFilters(filters).toString()}
                filters={filters}
                vehicles={publicVehicles}
                onApply={(next) => {
                  updateFilters(next)
                  setShowFilters(false)
                }}
                onReset={clearFilters}
              />
              <DnrpaCard as="section" $tone="soft" $padding={18}>
                <IconTile $tone="solid" $size={40} aria-hidden>
                  <FileSearch size={20} />
                </IconTile>
                <div>
                  <h2>Informe DNRPA y Libre Deuda</h2>
                  <p>Informe de dominio histórico, multas y patentes verificado sin cargo.</p>
                </div>
              </DnrpaCard>
            </Aside>
          </div>

          <section aria-label="Resultados">
            {items.length === 0 ? (
              <EmptyState
                icon={CarFront}
                title="No encontramos vehículos con esos filtros"
                action={<Button onClick={clearFilters}>Limpiar filtros</Button>}
              >
                Probá ampliando el rango de precio o quitando alguna marca.
              </EmptyState>
            ) : (
              <>
                <Results>
                  {items.map((vehicle) => (
                    <li key={vehicle.id}>
                      <VehicleCard vehicle={vehicle} />
                    </li>
                  ))}
                </Results>
                <ResultsFooter as="footer" $padding="14px 18px">
                  <p role="status">
                    Mostrando <strong>
                      {from} – {to}
                    </strong>{' '}
                    de <strong>{results.length}</strong> vehículos
                  </p>
                  <Pagination page={page} totalPages={totalPages} onChange={changePage} />
                </ResultsFooter>
              </>
            )}
          </section>
        </Layout>
      </Container>
    </>
  )
}

export default CatalogPage
