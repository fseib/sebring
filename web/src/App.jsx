import { Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout.jsx'
import MainLayout from './components/layout/MainLayout.jsx'
import ScrollManager from './components/layout/ScrollManager.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import VehicleDetailPage from './pages/VehicleDetailPage.jsx'
import ComingSoonPage from './pages/admin/ComingSoonPage.jsx'
import InventoryPage from './pages/admin/InventoryPage.jsx'
import ReservationsPage from './pages/admin/ReservationsPage.jsx'

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        {/* Tienda pública */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogPage />} />
          <Route path="catalogo/:id" element={<VehicleDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Panel del concesionario */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<InventoryPage />} />
          <Route path="reservas" element={<ReservationsPage />} />
          <Route path="tasaciones" element={<ComingSoonPage title="Tasaciones" />} />
          <Route path="metricas" element={<ComingSoonPage title="Métricas" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
