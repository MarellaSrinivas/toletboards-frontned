import { useState } from "react";
import "./TenantPreferences.css";


function TenantPreferences({ formData, handleChange }) {

  
const tenantTypes = [
  "Family",
  "Bachelor",
  "Working Professionals",
  "Students",
  "Company Lease",
];

const furnishingOptions = [
  "Unfurnished",
  "Semi Furnished",
  "Fully Furnished",
];

const foodOptions = [
  "Veg",
  "Non-Veg",
  "Both",
]; 

  return (

    <div className="form-card">

      <h2>Tenant Preferences</h2>

      {/* Preferred Tenant */}

      <div className="preference-section">

        <label>Preferred Tenant</label>

        <div className="chip-group">

          {tenantTypes.map((item) => (

            <button
              key={item}
              type="button"
             className={`chip ${
  formData.preferredTenant === item
    ? "active-chip"
    : ""
}`}
             onClick={() =>
  handleChange({
    target: {
      name: "preferredTenant",
      value: item,
    },
  })
}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Furnishing */}

      <div className="preference-section">

        <label>Furnishing Status</label>

        <div className="chip-group">

          {furnishingOptions.map((item) => (

            <button
              key={item}
              type="button"
              className={`chip ${
  formData.furnishingStatus === item
    ? "active-chip"
    : ""
}`}
              onClick={() =>
  handleChange({
    target: {
      name: "furnishingStatus",
      value: item,
    },
  })
}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Food */}

      <div className="preference-section">

        <label>Food Preference</label>

        <div className="chip-group">

          {foodOptions.map((item) => (

            <button
              key={item}
              type="button"
              className={`chip ${
  formData.foodPreference === item
    ? "active-chip"
    : ""
}`}
onClick={() =>
  handleChange({
    target: {
      name: "foodPreference",
      value: item,
    },
  })
}            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Switches */}

      <div className="toggle-grid">

        <div className="toggle-item">

          <span>Pets Allowed</span>

<input
  type="checkbox"
  name="petsAllowed"
  checked={formData.petsAllowed}
  onChange={handleChange}
/>
        </div>

        <div className="toggle-item">

          <span>Smoking Allowed</span>

<input
  type="checkbox"
  name="smokingAllowed"
  checked={formData.smokingAllowed}
  onChange={handleChange}
/>
        </div>

        <div className="toggle-item">

          <span>Alcohol Allowed</span>

<input
  type="checkbox"
  name="alcoholAllowed"
  checked={formData.alcoholAllowed}
  onChange={handleChange}
/>
        </div>

        <div className="toggle-item">

          <span>Available Immediately</span>

<input
  type="checkbox"
  name="availableImmediately"
  checked={formData.availableImmediately}
  onChange={handleChange}
/>
        </div>

      </div>

      {/* Available Date */}

      <div className="form-group available-date">

        <label>Available From</label>

<input
  type="date"
  name="availableFrom"
  value={formData.availableFrom}
  onChange={handleChange}
/>
      </div>

    </div>

  );

}

export default TenantPreferences;