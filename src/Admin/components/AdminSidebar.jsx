import {
  FaUsers,
  FaHome,
  FaClipboardCheck,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "../styles/AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo-section">
        <h2>ToLet Boards</h2>
        <span>Management Console</span>
      </div>

      <ul className="admin-menu-list">

        <li>
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "admin-menu-link admin-menu-link-active"
                : "admin-menu-link"
            }
          >
            <FaHome />
            <span>Overview</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard/users"
            className={({ isActive }) =>
              isActive
                ? "admin-menu-link admin-menu-link-active"
                : "admin-menu-link"
            }
          >
            <FaUsers />
            <span>User Management</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard/properties"
            className={({ isActive }) =>
              isActive
                ? "admin-menu-link admin-menu-link-active"
                : "admin-menu-link"
            }
          >
            <FaClipboardCheck />
            <span>Property Approval</span>
          </NavLink>
        </li>

       <li>
  <NavLink
    to="/admin/dashboard/visits"
    className={({ isActive }) =>
      isActive
        ? "admin-menu-link admin-menu-link-active"
        : "admin-menu-link"
    }
  >
    <FaCalendarAlt />
    <span>Visits</span>
  </NavLink>
</li>

         

      </ul>
    </aside>
  );
};

export default AdminSidebar;