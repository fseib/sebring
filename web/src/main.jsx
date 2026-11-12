import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavoritesProvider.jsx'
import { ToastProvider } from './context/ToastProvider.jsx'
import { VehiclesProvider } from './context/VehiclesProvider.jsx'
import GlobalStyle from './styles/GlobalStyle.js'
import theme from './styles/theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ToastProvider>
          <VehiclesProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </VehiclesProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
