import styled from 'styled-components'

// Tabla con scroll horizontal en pantallas chicas
export const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;

  thead th {
    padding: 14px;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
    background: ${({ theme }) => theme.colors.primarySofter};
    white-space: nowrap;
  }

  /* td y encabezados de fila (<th scope="row">) comparten estilo de celda */
  td,
  tbody th {
    padding: 16px 14px;
    text-align: left;
    font-weight: inherit;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
  }

  caption {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  tbody tr:hover {
    background: #fafcff;
  }
`

export const TableFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 14px 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primarySofter};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`
