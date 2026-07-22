import { useState } from "react";
import "./AmenitiesUtilities.css";

const amenitiesList = [
  "24/7 Security",
  "Power Backup",
  "Lift",
  "Car Parking",
  "Bike Parking",
  "CCTV",
  "Gym",
  "Swimming Pool",
  "Internet / WiFi",
  "Garden",
  "Club House",
  "Children Play Area"
];

function AmenitiesUtilities({ formData, handleChange }){

  const [amenities, setAmenities] = useState([]);

  const toggleAmenity = (item) => {

    if (amenities.includes(item)) {

      setAmenities(
        amenities.filter(a => a !== item)
      );

    } else {

      setAmenities([...amenities, item]);

    }

  };

  return (

    <div className="form-card">

      <h2>Amenities & Utilities</h2>

      {/* Water Supply */}

      <div className="form-group">

        <label>Water Supply</label>

        <select>

          <option>Corporation</option>

          <option>Borewell</option>

          <option>Corporation + Borewell</option>

          <option>Tanker</option>

        </select>

      </div>

      <h3 className="amenity-title">
        Available Amenities
      </h3>

      <div className="amenities-grid">

        {amenitiesList.map((item) => (

          <div
            key={item}
            className={`amenity-chip ${
              amenities.includes(item)
                ? "selected"
                : ""
            }`}
            onClick={() => toggleAmenity(item)}
          >

            {item}

          </div>

        ))}

      </div>

    </div>

  );

}

export default AmenitiesUtilities;