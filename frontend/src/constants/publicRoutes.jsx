import Login from "../Login";
import RouterLayout from "../router/RouterLayout";

export const PUBLIC_ROUTES = [
  {
    path: '/',
    element: <Login />,
    isPrivate: false,
  },
  {
    path: '/dashboard/*',
    element: <RouterLayout />,
  }
//   {
//     path: '/*',
//     element: <Login />,
//     isPrivate: false,
//   },
//   {
//     path: '/register',
//     element: <Registration />,
//     isPrivate: false,
//   },
//   {
//     path: '/dashboard/*',
//     element: <AdminRouter />,
//   },
];
