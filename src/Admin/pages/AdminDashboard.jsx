import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;