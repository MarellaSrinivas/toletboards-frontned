import "./PropertyLocation.css";
import { FaMapMarkerAlt } from "react-icons/fa";

function PropertyLocation({ location }) {

    return (

        <div className="location-card">

            <h2>Location</h2>

            <div className="map-placeholder">

                <div className="map-tag">

                    <FaMapMarkerAlt/>

                    {location}

                </div>

            </div>

        </div>

    );

}

export default PropertyLocation;