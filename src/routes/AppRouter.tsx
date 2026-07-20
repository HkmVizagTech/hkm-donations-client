import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { AdminLogin } from '../pages/admin/AdminLogin'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { AdminCampaigns } from '../pages/admin/AdminCampaigns'
import { AdminFestivals } from '../pages/admin/AdminFestivals'
import { AdminDonations } from '../pages/admin/AdminDonations'
import { AdminLayout } from '../components/admin/AdminLayout'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="campaigns" element={<AdminCampaigns />} />
        <Route path="festivals" element={<AdminFestivals />} />
        <Route path="donations" element={<AdminDonations />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
