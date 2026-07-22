import "./PropertyDescription.css";

function PropertyDescription({ description }) {
  return (
    <div className="description-card">

      <h2>About this Property</h2>

      <p>{description}</p>

    </div>
  );
}

export default PropertyDescription;