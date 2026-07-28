import "../styles/AdminVisits.css";
import { useEffect, useState } from "react";
import { getVisits } from "../../api/adminService";

const AdminVisits = () => {
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [status, setStatus] = useState("");

  const loadVisits = async () => {
    try {
      setLoading(true);

      const data = await getVisits(page, 10, status);

      setVisits(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisits();
  }, [page, status]);

  return (
    <div className="admin-visits-page">

      <div className="admin-page-header">

        <div>
          <h2>Visit Management</h2>
          <p>Manage all property visits</p>
        </div>

      </div>

      <div className="visit-filter">

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Visits</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

      </div>

      <div className="admin-table-wrapper">

        {loading ? (
          <p>Loading visits...</p>
        ) : (
          <table className="admin-table">

            <thead>
              <tr>
                <th>Property</th>
                <th>Visitor</th>
                <th>Owner</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {visits.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No Visits Found
                  </td>
                </tr>
              ) : (
                visits.map((visit) => (
<tr
    key={visit.id}
    onClick={() => setSelectedVisit(visit)}
    style={{ cursor: "pointer" }}
>
                    <td>{visit.propertyName}</td>

                    <td>{visit.visitorName}</td>

                    <td>{visit.ownerName}</td>

                    <td>{visit.visitDate}</td>

                    <td>{visit.visitTime}</td>

                    <td>
                      <span
                        className={`visit-status ${visit.status.toLowerCase()}`}
                      >
                        {visit.status}
                      </span>
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
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          {page + 1} / {totalPages || 1}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

      {selectedVisit && (
<div className="visit-modal-overlay">

    <div className="visit-modal">

        <h2>Visit Details</h2>

        <h4>Property</h4>
        <p>{selectedVisit.propertyName}</p>

        <hr />

        <h4>Visitor</h4>
        <p><b>Name:</b> {selectedVisit.visitorName}</p>
        <p><b>Phone:</b> {selectedVisit.visitorPhone}</p>
        <p><b>Email:</b> {selectedVisit.visitorEmail}</p>

        <hr />

        <h4>Owner</h4>
        <p><b>Name:</b> {selectedVisit.ownerName}</p>
        <p><b>Phone:</b> {selectedVisit.ownerPhone}</p>
        <p><b>Email:</b> {selectedVisit.ownerEmail}</p>

        <hr />

        <h4>Visit</h4>
        <p><b>Date:</b> {selectedVisit.visitDate}</p>
        <p><b>Time:</b> {selectedVisit.visitTime}</p>
        <p><b>Status:</b> {selectedVisit.status}</p>

        <button
            onClick={() => setSelectedVisit(null)}
        >
            Close
        </button>

    </div>

</div>
)}

    </div>
  );
};

export default AdminVisits;