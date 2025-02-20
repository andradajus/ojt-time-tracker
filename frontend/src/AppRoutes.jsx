import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PUBLIC_ROUTES } from './constants/publicRoutes';

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {PUBLIC_ROUTES.map((route, key) => (
            <Route key={key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
