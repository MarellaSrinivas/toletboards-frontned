import "./PropertyStepper.css";

const steps = [
  "Details",
  "Config",
  "Rental",
  "Amenities",
  "Preferences",
  "Photos",
  "Location",
];

function PropertyStepper({ currentStep = 1 }) {
  return (
    <div className="stepper">

      {steps.map((step, index) => (

        <div className="step-wrapper" key={index}>

          <div
            className={`step-circle ${
              currentStep >= index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </div>

          <span>{step}</span>

          {index !== steps.length - 1 && (
            <div className="step-line"></div>
          )}

        </div>

      ))}

    </div>
  );
}

export default PropertyStepper;