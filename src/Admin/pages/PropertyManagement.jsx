import "../styles/PropertyManagement.css";
import { useEffect, useState } from "react";
import {
  getAdminProperties,
  approveProperty,
  rejectProperty,
  deleteProperty,
} from "../../api/adminService";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const loadProperties = async () => {
    try {
      setLoading(true);

      const response = await getAdminProperties(
        page,
        10,
        search,
        status,
        propertyType
      );

      setProperties(response.content || []);
      setTotalPages(response.totalPages || 0);

      const list = response.content || [];

      setStats({
        total: response.totalElements || list.length,
        approved: list.filter(
          (p) => p.approvalStatus === "APPROVED"
        ).length,
        pending: list.filter(
          (p) => p.approvalStatus === "PENDING"
        ).length,
        rejected: list.filter(
          (p) => p.approvalStatus === "REJECTED"
        ).length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [page, search, status, propertyType]);

  const handleApprove = async (id) => {
    try {
      await approveProperty(id);
      loadProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectProperty(id);
      loadProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await deleteProperty(id);
      loadProperties();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-property-page">
      <div className="admin-property-header">
        <div>
          <h2>Property Management</h2>
          <p>Manage all platform properties</p>
        </div>
      </div>

      <div className="admin-property-stats">
        <div className="admin-property-card">
          <h4>Total Properties</h4>
          <h2>{stats.total}</h2>
        </div>

        <div className="admin-property-card">
          <h4>Approved</h4>
          <h2>{stats.approved}</h2>
        </div>

        <div className="admin-property-card">
          <h4>Pending</h4>
          <h2>{stats.pending}</h2>
        </div>

        <div className="admin-property-card">
          <h4>Rejected</h4>
          <h2>{stats.rejected}</h2>
        </div>
      </div>

      <div className="admin-property-filters">
        <input
          type="text"
          placeholder="Search Property..."
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(0);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select
          value={propertyType}
          onChange={(e) => {
            setPage(0);
            setPropertyType(e.target.value);
          }}
        >
          <option value="">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      <div className="admin-property-table-wrapper">
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <table className="admin-property-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Type</th>
                <th>City</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No properties found
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <img
                        src={
                          property.coverImage ||
                          "https://via.placeholder.com/80"
                        }
                        alt={property.propertyName}
                        width="80"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "6px" }}
                      />
                    </td>

                    <td>{property.propertyName}</td>

                    <td>{property.ownerName}</td>

                    <td>{property.propertyType}</td>

                    <td>{property.city}</td>

                    <td>₹{property.monthlyRent}</td>

                    <td>
                  
                        {property.approvalStatus}
                    </td>

                    <td className="action-buttons">
                      {property.approvalStatus !== "APPROVED" && (
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(property.id)}
                        >
                          Approve
                        </button>
                      )}

                      {property.approvalStatus !== "REJECTED" && (
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(property.id)}
                        >
                          Reject
                        </button>
                      )}

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(property.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-pagination">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages || 1}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyManagement;