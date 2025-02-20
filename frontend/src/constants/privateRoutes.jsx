import UserHeroSection from "../components/UserHeroSection";
import AdminUserList from "../pages/AdminUserList";
import UserPayments from "../pages/UserPayments";
import UserTasks from "../pages/UserTasks";

export const ADMIN_ROUTES = [
    {
      path: '/',
      element: <span>ADMIN ROUTES</span>,
    },
];
  
export const USER_ROUTES = [
  {
    path: '/',
    element: <span>USER ROUTES</span>,
  },
];

export const USER_DASHBOARD_ROUTES = [
  {
    path: '/*',
    element: <UserHeroSection />,
  },
  {
    path: 'payments',
    element: <UserPayments />,
  },
  {
    path: 'tasks',
    element: <UserTasks />,
  }
]

export const ADMIN_DASHBOARD_ROUTES = [
  {
    path: '/*',
    element: <AdminUserList />,
  },
]