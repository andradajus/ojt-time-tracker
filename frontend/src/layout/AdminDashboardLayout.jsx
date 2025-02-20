import AdminNavbar from "../components/AdminNavbar";
import AdminDashboardRouter from "../router/AdminDashboardRouter";

const AdminDashboardLayout = () => {
  return (
    <>
      <div className="flex w-screen overflow-auto flex-col">
        <AdminNavbar />
        <AdminDashboardRouter />
      </div>
    </>
  );
};

export default AdminDashboardLayout;
