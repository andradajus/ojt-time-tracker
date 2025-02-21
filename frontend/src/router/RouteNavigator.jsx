
import { useContext } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import { UserContext } from "../context/UserContext";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import UserOnboarding from "../pages/UserOnboarding";

const RouteNavigator = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      {user && user.user_type === 'admin' ? (
        <AdminDashboardLayout />
      ) : user && !user.is_onboarded ? (
        <UserOnboarding />
      ) : (
        <UserDashboardLayout />
      )}
    </>
  );
};

export default RouteNavigator;
