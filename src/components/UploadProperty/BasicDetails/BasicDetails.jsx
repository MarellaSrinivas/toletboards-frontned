import { useState } from "react";
import "./BasicDetails.css";

function BasicDetails({ formData, handleChange }) {
 
  const subTypes = {
    Residential: [
      "Apartment",
      "Villa",
      "Independent House",
      "Gated Community",
    ],

    Commercial: [
      "Office",
      "Shop",
      "Hotel / Restaurant",
    ],

    
  };

  return (
    <div className="form-card">

      <h2>Basic Details</h2>

      <div className="form-grid">

        {/* Property Type */}

        <div className="form-group">

          <label>Property Type</label>

         <select
  name="propertyType"
  value={formData.propertyType}
  onChange={handleChange}
>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
           </select>

        </div>

        {/* Property Category */}

        <div className="form-group">

          <label>Property Category</label>

<select
  name="propertyCategory"
  value={formData.propertyCategory}
  onChange={handleChange}
>
{subTypes[formData.propertyType]?.map((item) => (
                <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>

        </div>

        {/* Property Name */}

        <div className="form-group full-width">

          <label>Property Name / Project Name</label>

          <input
  type="text"
  name="propertyName"
  value={formData.propertyName}
  onChange={handleChange}
/>

        </div>

        {/* Area */}

        <div className="form-group">

          <label>Total Area (Sq. Ft.)</label>

        <input
  type="number"
  name="totalArea"
  value={formData.totalArea}
  onChange={handleChange}
/>

        </div>

      </div>

    </div>
  );
}

export default BasicDetails;