import { CirclePlus, Download, Search } from 'lucide-react'
import styled from 'styled-components'
import { Button, Card, SegmentedControl, TextField } from '../ui'

const Wrapper = styled(Card)`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) auto auto auto;
  align-items: center;
  gap: 12px;
  margin: 24px 0 20px;

  @media ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1fr) auto auto;

    > :nth-child(2) {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`

// Barra de herramientas del inventario: búsqueda, filtro por estado, exportar y alta
function InventoryToolbar({ search, onSearch, status, onStatus, statusOptions, onExport, onAdd }) {
  return (
    <Wrapper as="section" aria-label="Herramientas del inventario" $padding={16}>
      {/* Búsqueda en vivo: el submit no recarga la página */}
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <TextField
          icon={Search}
          type="search"
          placeholder="Buscar por VIN, placa, modelo o marca"
          aria-label="Buscar en el inventario"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </form>
      <SegmentedControl label="Filtrar por estado" value={status} onChange={onStatus} options={statusOptions} />
      <Button variant="soft" icon={Download} onClick={onExport}>
        Exportar CSV
      </Button>
      <Button icon={CirclePlus} onClick={onAdd}>
        Agregar Nueva Unidad
      </Button>
    </Wrapper>
  )
}

export default InventoryToolbar
