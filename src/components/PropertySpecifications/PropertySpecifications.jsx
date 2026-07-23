import "./PropertySpecifications.css";

function PropertySpecifications({ property }) {
  const specs = [
    {
      label: "BHK",
      value: property.bhk,
    },
    {
      label: "Bathrooms",
      value: property.bathrooms,
    },
    {
      label: "Balconies",
      value: property.balconies,
    },
    {
      label: "Area",
      value: `${property.totalArea} Sq.ft`,
    },
    {
      label: "Floors",
      value: property.floors,
    },
    {
      label: "Furnishing",
      value: property.furnishingStatus,
    },
    {
      label: "Property Age",
      value: property.propertyAge,
    },
    {
      label: "Property Status",
      value: property.propertyStatus,
    },
    {
      label: "Preferred Tenant",
      value: property.preferredTenant,
    },
    {
      label: "Food Preference",
      value: property.foodPreference,
    },
    {
      label: "Pets Allowed",
      value: property.petsAllowed ? "Yes" : "No",
    },
    {
      label: "Smoking Allowed",
      value: property.smokingAllowed ? "Yes" : "No",
    },
    {
      label: "Alcohol Allowed",
      value: property.alcoholAllowed ? "Yes" : "No",
    },
  ];

  return (
    <div className="spec-card">
      <h2>Property Details</h2>

      <div className="spec-grid">
        {specs.map((item, index) => (
          <div
            className="spec-item"
            key={index}
          >
            <span>{item.label}</span>

            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertySpecifications;