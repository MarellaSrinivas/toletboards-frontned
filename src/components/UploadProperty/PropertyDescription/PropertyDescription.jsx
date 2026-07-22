import "./PropertyDescription.css";

const locationData = {
  Telangana: {
    Hyderabad: [
      "Madhapur",
      "Hitech City",
      "Gachibowli",
      "Kondapur",
      "Kukatpally",
      "Manikonda",
    ],
    Warangal: [
      "Hanamkonda",
      "Kazipet",
      "Subedari",
    ],
  },

  AndhraPradesh: {
    Vijayawada: [
      "Benz Circle",
      "Governorpet",
      "Poranki",
    ],
    Visakhapatnam: [
      "MVP Colony",
      "Madhurawada",
      "Gajuwaka",
    ],
  },
};

function PropertyDescription({ formData, handleChange }) {
  const cities = formData.state
    ? Object.keys(locationData[formData.state] || {})
    : [];

  const areas =
    formData.state && formData.city
      ? locationData[formData.state][formData.city] || []
      : [];

  return (
    <div className="form-card">
      <h2>Property Description & Location</h2>

      <div className="form-grid">

        <div className="form-group full-width">
          <label>Property Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>

        {/* State */}
        <div className="form-group">
          <label>State</label>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>

            {Object.keys(locationData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="form-group">
          <label>City</label>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
          >
            <option value="">Select City</option>

            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div className="form-group">
          <label>Area / Locality</label>

          <select
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!formData.city}
          >
            <option value="">Select Area</option>

            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Longitude</label>
          <input
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Google Maps Link</label>
          <input
            name="googleMapLink"
            value={formData.googleMapLink}
            onChange={handleChange}
          />
        </div>

      </div>
    </div>
  );
}

export default PropertyDescription;