import { Routes, Route } from 'react-router-dom';
import { USER_ROUTES } from '../constants/privateRoutes';

const UserRouter = () => {
  return (
    <Routes>
      {USER_ROUTES.map((route, key) => (
        <Route key={key} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default UserRouter;
