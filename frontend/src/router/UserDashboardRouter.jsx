import { USER_DASHBOARD_ROUTES } from "../constants/privateRoutes"
import { Routes, Route } from "react-router-dom"

const UserDashboardRouter = () => {
  return (
    <Routes>
      {USER_DASHBOARD_ROUTES.map((route, key) => (
        <Route key={key} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default UserDashboardRouter