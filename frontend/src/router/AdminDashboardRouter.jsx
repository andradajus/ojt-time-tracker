import { ADMIN_DASHBOARD_ROUTES } from "../constants/privateRoutes"
import { Routes, Route } from "react-router-dom"

const AdminDashboardRouter = () => {
  return (
    <Routes>
      {ADMIN_DASHBOARD_ROUTES.map((route, key) => (
        <Route key={key} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default AdminDashboardRouter