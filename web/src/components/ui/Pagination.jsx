import { ChevronLeft, ChevronRight } from 'lucide-react'
import styled from 'styled-components'

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`

const PageButton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  &[aria-current='page'] {
    background: ${({ $activeTone, theme }) => ($activeTone === 'dark' ? theme.colors.navy : theme.colors.primary)};
    border-color: transparent;
    color: #fff;
  }

  &:hover:not(:disabled):not([aria-current='page']) {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Ellipsis = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  padding: 0 2px;
`

// Devuelve las páginas a mostrar: 1 2 3 … 24
function getPages(page, totalPages) {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const pages = new Set([1, totalPages, page, page - 1, page + 1])
  if (page <= 3) [2, 3].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ['…', p] : [p]))
}

function Pagination({ page, totalPages, onChange, activeTone = 'dark' }) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Paginación">
      <List>
        <li>
          <PageButton
            $activeTone={activeTone}
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} aria-hidden />
          </PageButton>
        </li>
        {getPages(page, totalPages).map((p, i) => (
          <li key={p === '…' ? `e${i}` : p}>
            {p === '…' ? (
              <Ellipsis aria-hidden>…</Ellipsis>
            ) : (
              <PageButton
                $activeTone={activeTone}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Página ${p}`}
                onClick={() => onChange(p)}
              >
                {p}
              </PageButton>
            )}
          </li>
        ))}
        <li>
          <PageButton
            $activeTone={activeTone}
            onClick={() => onChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Página siguiente"
          >
            <ChevronRight size={16} aria-hidden />
          </PageButton>
        </li>
      </List>
    </nav>
  )
}

export default Pagination
