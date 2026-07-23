import { useState } from "react";

import DashboardSidebar from "./DashboardSidebar";

import Overview from "./Overview";
import MyListings from "./MyListings";
import ProfileSettings from "./ProfileSettings";

import "./Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] =
    useState("overview");

  return (
    <div className="dashboard">
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="dashboard-content">

        {activeTab === "overview" && (
          <Overview />
        )}

        {activeTab ===
          "listings" && (
          <MyListings />
        )}

        {activeTab ===
          "profile" && (
          <ProfileSettings />
        )}

      </div>
    </div>
  );
}

export default Dashboard;