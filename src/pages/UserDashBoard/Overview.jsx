import { useEffect, useState } from "react";
import { getDashboard } from "../../api/propertyApi";
import "./Overview.css";

function Overview() {
  const [dashboard, setDashboard] = useState({
    totalListings: 0,
    totalEnquiries: 0,
    activeProperties: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overview">

      <h2 className="overview-title">
        Dashboard Overview
      </h2>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>{dashboard.totalListings}</h3>
          <p>Total Listings</p>
        </div>

        <div className="stat-card">
          <h3>{dashboard.totalEnquiries}</h3>
          <p>Total Enquiries</p>
        </div>

        <div className="stat-card">
          <h3>{dashboard.activeProperties}</h3>
          <p>Active Properties</p>
        </div>

      </div>

    </div>
  );
}

export default Overview;