import UserNavbar from "../components/UserNavbar";
import UserDashboardRouter from "../router/UserDashboardRouter";

const UserDashboardLayout = () => {
  return (
    <>
      <div className="flex w-screen overflow-auto flex-col">
        <UserNavbar />
        <UserDashboardRouter />
      </div>
    </>
  );
};

export default UserDashboardLayout;
