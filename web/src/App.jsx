import { Route, Routes } from 'react-router-dom'
import RequireAdmin from './components/auth/RequireAdmin.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import AdminLayout from './components/layout/AdminLayout.jsx'
import MainLayout from './components/layout/MainLayout.jsx'
import ScrollManager from './components/layout/ScrollManager.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import VehicleDetailPage from './pages/VehicleDetailPage.jsx'
import AccountLayout from './pages/account/AccountLayout.jsx'
import MyFavoritesPage from './pages/account/MyFavoritesPage.jsx'
import MyReservationsPage from './pages/account/MyReservationsPage.jsx'
import ProfilePage from './pages/account/ProfilePage.jsx'
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
          <Route path="login" element={<LoginPage />} />

          {/* Mi cuenta (cualquier usuario logueado) */}
          <Route
            path="cuenta"
            element={
              <RequireAuth>
                <AccountLayout />
              </RequireAuth>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="reservas" element={<MyReservationsPage />} />
            <Route path="favoritos" element={<MyFavoritesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Panel del concesionario (solo admin) */}
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
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
