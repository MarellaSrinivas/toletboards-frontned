import "./PropertySidebar.css";
import {
  FaPhoneAlt,
  FaUserCircle,
  FaChartLine,
} from "react-icons/fa";

function PropertySidebar() {
  return (
    <aside className="property-sidebar">

      {/* Schedule Visit Card */}

      <div className="sidebar-card">

        <h3>Schedule a Visit</h3>

        <form>

          <label>Preferred Date</label>
          <input type="date" />

          <label>Preferred Time</label>
          <input type="time" />

          <button type="submit">
            Schedule Visit
          </button>

        </form>

      </div>

      {/* Agent */}

      <div className="sidebar-card">

        <div className="agent">

          <FaUserCircle className="agent-icon" />

          <div>
            <h4>Suresh Reddy</h4>
            <span>SR Realty Properties</span>
          </div>

        </div>

        <button className="call-btn">
          <FaPhoneAlt />
          Call Agent
        </button>

      </div>

      {/* Market */}

      <div className="market-card">

        <div className="market-title">

          <FaChartLine />
          Market Insights

        </div>

        <p>
          Property value in HITEC City has increased by
          <strong> 15%</strong> over the last year.
        </p>

        <span>★★★★★ Excellent Investment</span>

      </div>

    </aside>
  );
}

export default PropertySidebar;