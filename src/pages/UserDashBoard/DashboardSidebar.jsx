import "./DashboardSidebar.css";
import {
  FaHome,
  FaBuilding,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

function DashboardSidebar({
  activeTab,
  setActiveTab,
}) {
  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

 
  return (
    <div className="dashboard-sidebar">


     <button
  className={
    activeTab === "overview"
      ? "active"
      : ""
  }
  onClick={() =>
    setActiveTab("overview")
  }
>
  <FaHome />
  <span>Home</span>
</button>

<button
  className={
    activeTab === "listings"
      ? "active"
      : ""
  }
  onClick={() =>
    setActiveTab("listings")
  }
>
  <FaBuilding />
  <span>Listings</span>
</button>

<button
  className={
    activeTab === "profile"
      ? "active"
      : ""
  }
  onClick={() =>
    setActiveTab("profile")
  }
>
  <FaUser />
  <span>Profile</span>
</button>

<button
  className="logout-btn"
  onClick={logout}
>
  <FaSignOutAlt />
  <span>Logout</span>
</button>

    </div>
  );
}

export default DashboardSidebar;