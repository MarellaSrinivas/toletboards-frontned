import "./PropertyCard.css";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaBed,
} from "react-icons/fa";

function PropertyCard({ property }) {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="property-link"
    >
      <div className="property-card">

        <div className="property-image">

          <img
            src={`http://localhost:8080${property.coverImage}`}
            alt={property.propertyName}
          />

          <div className="property-tags">
            <span className="category">
              {property.propertyCategory || "Residential"}
            </span>

            <span className="badge">
              New
            </span>
          </div>

        </div>

        <div className="property-content">

          <h3>{property.propertyName}</h3>

          <div className="location">
            <FaMapMarkerAlt />
            <span>
              {property.city}, {property.state}
            </span>
          </div>

          <div className="property-info">

            <span>
              <FaRulerCombined />
              {property.totalArea || "--"} sqft
            </span>

            <span>
              <FaBed />
              {property.bhk || "--"} BHK
            </span>

          </div>

          <div className="property-footer">

            <div>
              <small>MONTHLY RENT</small>

              <h2>
                ₹{Number(property.monthlyRent).toLocaleString("en-IN")}
              </h2>
            </div>

            <button type="button">
              Details
            </button>

          </div>

        </div>

      </div>
    </Link>
  );
}

export default PropertyCard;