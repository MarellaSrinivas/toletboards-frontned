import "../styles/AdminOverview.css";
import {
  FaUsers,
  FaBuilding,
  FaClipboardCheck,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDashboard } from "../../api/adminService";


const AdminOverview = () => {

    

const [dashboard, setDashboard] = useState(null);

const loadDashboard = async () => {
  try {
    const data = await getDashboard();
    setDashboard(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  loadDashboard();
}, []);
  return (
    <div className="admin-overview">

      {/* Header */}
      <div className="admin-overview-header">
        <div>
          <h1>Admin Dashboard Overview</h1>
          <p>
            Welcome back. Here's what's happening with To-Let Boards today.
          </p>
        </div>

        <button className="admin-new-listing-btn">
          + New Listing
        </button>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon users">
            <FaUsers />
          </div>

          <h5>TOTAL USERS</h5>
<h2>{dashboard?.totalUsers ?? 0}</h2>
          <span>+12% this month</span>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon properties">
            <FaBuilding />
          </div>

          <h5>TOTAL PROPERTIES</h5>
<h2>{dashboard?.totalProperties ?? 0}</h2>
          <span>+5% this week</span>
        </div>

        <div className="admin-stat-card pending">
          <div className="admin-stat-icon approval">
            <FaClipboardCheck />
          </div>

          <h5>PENDING APPROVALS</h5>
<h2>{dashboard?.pendingProperties ?? 0}</h2>
          <span>High priority queue</span>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon visits">
            <FaCalendarAlt />
          </div>

          <h5>SCHEDULED VISITS TODAY</h5>
<h2>{dashboard?.todayVisits ?? 0}</h2>          <span>Next in 45 mins</span>
        </div>

      </div>

      {/* Content Section */}
      <div className="admin-overview-content">

        {/* Approval Queue */}
        <div className="admin-approval-section">

          <div className="admin-section-header">
            <h3>Property Approval Queue</h3>
            <button>View All</button>
          </div>

          <table className="admin-overview-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Location</th>
                <th>Posted</th>
                <th></th>
              </tr>
            </thead>

          <tbody>
  {dashboard?.recentProperties?.map((property) => (
    <tr key={property.id}>
      <td>
        <div className="admin-property-cell">
          <img
            src={property.coverImage}
            alt={property.propertyName}
          />

          <div>
            <strong>{property.propertyName}</strong>
          </div>
        </div>
      </td>

      <td>{property.ownerName}</td>

      <td>
        <span className="admin-badge residential">
          {property.propertyType}
        </span>
      </td>

      <td>{property.city}</td>

      <td>
        {new Date(property.createdAt).toLocaleDateString()}
      </td>

      <td>
        <FaEye />
      </td>
    </tr>
  ))}
</tbody>
          </table>

        </div>

        {/* Right Side */}
        <div className="admin-right-panel">

          <div className="admin-panel-card">
            <h3>Upcoming Visits</h3>

           {dashboard?.recentVisits?.map((visit) => (
  <div className="admin-visit-card" key={visit.id}>
    <strong>{visit.visitTime}</strong>

    <span>{visit.propertyName}</span>
  </div>
))}

          </div>

          <div className="admin-panel-card">
            <h3>Recent Inquiries</h3>

            <div className="admin-inquiry">
              <strong>Priya S.</strong>
              <p>Security deposit negotiable?</p>
            </div>

            <div className="admin-inquiry">
              <strong>Arjun Reddy</strong>
              <p>Requesting floor plan details.</p>
            </div>

            <div className="admin-inquiry">
              <strong>Vikram Nath</strong>
              <p>Can we schedule a visit tomorrow?</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminOverview;