import "./PropertyConfiguration.css";

function PropertyConfiguration({
  formData,
  handleChange,
}) { 
  
 
    return (
    <div className="form-card">

      <h2>Property Configuration</h2>

      <div className="config-grid">

        {/* BHK */}

        <div className="form-group">
          <label>Number of BHK's</label>
<select
  name="bhk"
  value={formData.bhk}
  onChange={handleChange}
>
  <option value="">Select BHK</option>
  <option value="1">1 BHK</option>
  <option value="2">2 BHK</option>
  <option value="3">3 BHK</option>
  <option value="4">4 BHK</option>
  <option value="5">5 BHK</option>
</select>
        </div>

        {/* Bathrooms */}

        <div className="form-group">

          <label>Bathrooms</label>

         <input
  type="number"
  name="bathrooms"
  value={formData.bathrooms}
  onChange={handleChange}
/>
        </div>

        {/* Floors */}

        <div className="form-group">

          <label>Floors in Building</label>

          <input
  type="number"
  name="floors"
  value={formData.floors}
  onChange={handleChange}
/>

        </div>

        {/* Age */}

        <div className="form-group">

          <label>Property Age (Years)</label>

          <select
  name="propertyAge"
  value={formData.propertyAge}
  onChange={handleChange}
>

            <option>0-1</option>

            <option>1-5</option>

            <option >5-10</option>

            <option>10-20</option>

            <option>20+</option>

          </select>

        </div>

        {/* Balcony */}

        <div className="form-group">

          <label>Number of Balconies</label>
<input
  type="number"
  name="balconies"
  value={formData.balconies}
  onChange={handleChange}
/>
        </div>

      </div>

    </div>
  );
}

export default PropertyConfiguration;