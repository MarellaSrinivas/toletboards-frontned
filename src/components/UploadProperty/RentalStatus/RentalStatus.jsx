import { useState } from "react";
import "./RentalStatus.css";

function RentalStatus({ formData, handleChange }) {

 
  return (

    <div className="form-card">

      <h2>Rental & Status</h2>

      <div className="rental-grid">

        {/* Monthly Rent */}

        <div className="form-group">

          <label>Monthly Rent</label>

          <div className="input-prefix">

            <span>₹</span>

         <input
  type="number"
  name="monthlyRent"
  value={formData.monthlyRent}
  onChange={handleChange}
/>

          </div>

        </div>

        {/* Security Deposit */}

        <div className="form-group">

          <label>Security Deposit</label>

          <div className="input-prefix">

            <span>₹</span>

         <input
  type="number"
  name="securityDeposit"
  value={formData.securityDeposit}
  onChange={handleChange}
/>

          </div>

        </div>

        {/* Maintenance */}

        <div className="form-group">

          <label>Maintenance Charges / Month</label>

          <div className="input-prefix">

            <span>₹</span>

           <input
  type="number"
  name="maintenanceCharges"
  value={formData.maintenanceCharges}
  onChange={handleChange}
/>

          </div>

        </div>

        {/* Property Status */}

        <div className="form-group full-width">

          <label>Property Status</label>

          <div className="status-buttons">

            <button
             className={
  formData.propertyStatus === "Vacant"
    ? "active"
    : ""
}
             onClick={() =>
  handleChange({
    target: {
      name: "propertyStatus",
      value: "Vacant",
    },
  })
}
              type="button"
            >
              Vacant
            </button>

            <button
className={
  formData.propertyStatus === "Occupied"
    ? "active"
    : ""
}             onClick={() =>
  handleChange({
    target: {
      name: "propertyStatus",
      value: "Occupied",
    },
  })
}
              type="button"
            >
              Occupied
            </button>

            <button
className={
  formData.propertyStatus === "Notice Period"
    ? "active"
    : ""
}              onClick={() =>
  handleChange({
    target: {
      name: "propertyStatus",
      value: "Notice Period",
    },
  })
}
              type="button"
            >
              In Notice Period
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RentalStatus;