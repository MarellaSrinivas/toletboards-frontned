import { useState } from "react";
import "./PropertySidebar.css";

import {
  FaPhoneAlt,
  FaUserCircle,
  FaChartLine,
} from "react-icons/fa";

import api from "../../api/api";

function PropertySidebar({ property }) {

  const [visitDate, setVisitDate] = useState("");

  const [visitTime, setVisitTime] = useState("");

  const [loading, setLoading] = useState(false);

const scheduleVisit = async (e) => {
  e.preventDefault();

  if (!visitDate || !visitTime) {
    alert("Please select date and time.");
    return;
  }

  const selectedDateTime = new Date(
    `${visitDate}T${visitTime}`
  );

  const currentDateTime = new Date();

  // Must be future
  if (selectedDateTime <= currentDateTime) {
    alert(
      "Please select a future date and time."
    );
    return;
  }

  // Business hours validation
  const [hours, minutes] =
    visitTime.split(":").map(Number);

  const totalMinutes =
    hours * 60 + minutes;

  const startMinutes = 7 * 60; // 07:00 AM
  const endMinutes = 20 * 60; // 08:00 PM

  if (
    totalMinutes < startMinutes ||
    totalMinutes > endMinutes
  ) {
    alert(
      "Visit time must be between 7:00 AM and 8:00 PM."
    );
    return;
  }

  try {
    setLoading(true);

    await api.post("/visits", {
      propertyId: property.id,
      visitDate,
      visitTime,
    });

    alert("Visit scheduled successfully.");

    setVisitDate("");
    setVisitTime("");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Unable to schedule visit."
    );
  } finally {
    setLoading(false);
  }
};

  return (

    <aside className="property-sidebar">

      <div className="sidebar-card">

        <h3>Schedule a Visit</h3>

        <form onSubmit={scheduleVisit}>

          <label>Preferred Date</label>

    <input
  type="date"
  value={visitDate}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) =>
    setVisitDate(e.target.value)
  }
  required
/>

          <label>Preferred Time</label>

     <input
  type="time"
  value={visitTime}
  min="07:00"
  max="20:00"
  onChange={(e) =>
    setVisitTime(e.target.value)
  }
  required
/>
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Scheduling..."
              : "Schedule Visit"}
          </button>

        </form>

      </div>

      <div className="sidebar-card">

        <div className="agent">

          <FaUserCircle className="agent-icon" />

          <div>

            <h4>{property.ownerName}</h4>

            <span>Property Owner</span>

          </div>

        </div>

   <button
  className="call-btn"
  onClick={() =>
    window.location.href = `tel:${+917569685696}`
  }
>
  <FaPhoneAlt />
  Contact Owner
</button>

      </div>

      <div className="market-card">

        <div className="market-title">

          <FaChartLine />

          Property Information

        </div>

        <p>

          Monthly Rent:

          <strong>

            {" "}

            ₹{Number(property.monthlyRent).toLocaleString("en-IN")}

          </strong>

        </p>

        <p>

          Security Deposit:

          <strong>

            {" "}

            ₹{Number(property.securityDeposit).toLocaleString("en-IN")}

          </strong>

        </p>

        <p>

          Maintenance:

          <strong>

            {" "}

            ₹{Number(property.maintenanceCharges).toLocaleString("en-IN")}

          </strong>

        </p>

      </div>

    </aside>

  );

}

export default PropertySidebar;