// import { useContext } from 'react';
// import { UserContext } from '../context/UserContext';
import UserDashboardLayout from '../layout/UserDashboardLayout';

const RouteNavigator = () => {
//   const { user, loading } = useContext(UserContext);

//   if (loading) {
//     return <MainLoading />;
//   }

  return (
    <>
      <UserDashboardLayout />

      {/* <AdminDashboardLayout /> */}
    </>
  );
};

export default RouteNavigator;
