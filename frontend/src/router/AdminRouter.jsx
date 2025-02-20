import { Routes, Route } from 'react-router-dom';
import { ADMIN_ROUTES } from '../constants/privateRoutes';

const AdminRouter = () => {
  return (
    <>
      <Routes>
        {ADMIN_ROUTES.map((route, key) => (
          <Route key={key} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default AdminRouter;
