const theme = {
  colors: {
    primary: '#0d4fdb',
    primaryHover: '#0a3fb3',
    primarySoft: '#e6eefc',
    primarySofter: '#f2f6fd',
    navy: '#0b1527',
    navySoft: '#16233b',
    text: '#0f172a',
    textSoft: '#334155',
    muted: '#64748b',
    border: '#e3e8f0',
    background: '#f3f6fb',
    surface: '#ffffff',
    surfaceAlt: '#eef3fb',
    success: '#16a34a',
    successSoft: '#dcfce7',
    warning: '#c2610c',
    warningSoft: '#ffedd5',
    danger: '#c81e1e',
    dangerSoft: '#fde4e4',
    star: '#f59e0b',
    whatsapp: '#1da851',
  },
  fonts: {
    body: "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    pill: '999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 4px 16px rgba(15, 23, 42, 0.08)',
    lg: '0 24px 60px rgba(15, 23, 42, 0.22)',
  },
  // Uso: @media ${({ theme }) => theme.media.md} { ... }
  media: {
    sm: '(max-width: 640px)',
    md: '(max-width: 900px)',
    lg: '(max-width: 1100px)',
  },
}

export default theme
