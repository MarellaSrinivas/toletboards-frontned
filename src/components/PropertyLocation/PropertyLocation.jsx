import "./PropertyLocation.css";
import { FaMapMarkerAlt } from "react-icons/fa";

function PropertyLocation({ property }) {
  return (
    <div className="location-card">
      <h2>Location</h2>

      <div className="map-placeholder">
        <div className="map-tag">
          <FaMapMarkerAlt />

          {property.address},
          {" "}
          {property.city},
          {" "}
          {property.state}
        </div>

        {property.googleMapLink && (
          <a
            href={property.googleMapLink}
            target="_blank"
            rel="noreferrer"
            className="map-link"
          >
            View On Google Maps
          </a>
        )}
      </div>
    </div>
  );
}

export default PropertyLocation;