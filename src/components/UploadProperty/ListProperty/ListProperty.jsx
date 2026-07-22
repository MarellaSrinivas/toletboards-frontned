import { useState } from "react";
import api from "../../../api/api";
import BasicDetails from "../BasicDetails/BasicDetails";
import PropertyConfiguration from "../PropertyConfiguration/PropertyConfiguration";
import RentalStatus from "../RentalStatus/RentalStatus";
import AmenitiesUtilities from "../AmenitiesUtilities/AmenitiesUtilities"
import PropertyDescription from "../PropertyDescription/PropertyDescription";
import TenantPreferences from "../TenantPreferences/TenantPreferences";
import UploadPhotos from "../UploadPhotos/UploadPhotos";
import PropertyStepper from "../PropertyStepper/PropertyStepper";
import FormButtons from "../FormButtons/FormButtons";
import "./ListProperty.css";
import "../PropertyStepper/PropertyStepper.css";

function ListProperty() {
  const [currentStep, setCurrentStep] = useState(1);

 const [formData, setFormData] = useState({
  propertyType: "Residential",
  propertyCategory: "",
  propertyName: "",
  totalArea: "",

  bhk: "",
  bathrooms: "",
  floors: "",
  balconies: "",
  propertyAge: "",

  monthlyRent: "",
  securityDeposit: "",
  maintenanceCharges: "",
  propertyStatus: "Vacant",

  preferredTenant: "",
  furnishingStatus: "",
  foodPreference: "",

  petsAllowed: false,
  smokingAllowed: false,
  alcoholAllowed: false,
  availableImmediately: false,

  availableFrom: "",

  description: "",

  state: "",
  city: "",
  address: "",

  latitude: "",
  longitude: "",
  googleMapLink: "",

  // NEW
  images: [],
  coverIndex: 0,
});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const publishProperty = async () => {
  try {

    const property = {

      ...formData,

      totalArea: Number(formData.totalArea),

      bhk: formData.bhk
        ? Number(formData.bhk)
        : null,

      bathrooms: formData.bathrooms
        ? Number(formData.bathrooms)
        : null,

      floors: formData.floors
        ? Number(formData.floors)
        : null,

      balconies: formData.balconies
        ? Number(formData.balconies)
        : null,

      latitude: formData.latitude
        ? Number(formData.latitude)
        : null,

      longitude: formData.longitude
        ? Number(formData.longitude)
        : null,

      images: undefined,
      coverIndex: undefined

    };

    const data = new FormData();

    // JSON
    data.append(
      "property",
      new Blob(
        [JSON.stringify(property)],
        {
          type: "application/json",
        }
      )
    );

    // Images
    formData.images.forEach(image => {

      data.append(
        "images",
        image.file
      );

    });

    // Cover Image
    data.append(
      "coverIndex",
      formData.coverIndex
    );

    const response = await api.post(

      "/properties/upload",

      data,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

    );

    console.log(response.data);

    alert("Property Uploaded Successfully");

  }

  catch (error) {

    console.log(error);

    if (error.response) {

      console.log(error.response.data);

      alert(
        error.response.data.message
      );

    } else {

      alert("Server Error");

    }

  }
};

  return (
    <>

<PropertyStepper currentStep={currentStep} />
      {currentStep === 1 && (
        <BasicDetails
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {currentStep === 2 && (
        <PropertyConfiguration
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {currentStep === 3 && (
        <RentalStatus
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {currentStep === 4 && (
  <AmenitiesUtilities
    formData={formData}
    handleChange={handleChange}
  />
)}

      {currentStep === 5 && (
        <TenantPreferences
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {currentStep === 6 && (
 <UploadPhotos
    formData={formData}
    setFormData={setFormData}
/>
)}

      {currentStep === 7 && (
        <PropertyDescription
          formData={formData}
          handleChange={handleChange}
        />
      )}
{/* 
      {currentStep === 7 && (
        <button
          className="publish-btn"
          onClick={publishProperty}
        >
          Publish Property
        </button>
      )} */}
<div className="step-buttons">

    {currentStep > 1 && (

        <button
            className="back-btn"
            onClick={() => setCurrentStep(currentStep - 1)}
        >
            ← Previous
        </button>

    )}

    {currentStep < 7 ? (

        <button
            className="next-btn"
            onClick={() => setCurrentStep(currentStep + 1)}
        >
            Next →
        </button>

    ) : (

      <button
  className="publish-btn"
  onClick={publishProperty}
>
  Publish Property
</button>

    )}

 

</div>
   <br />
        {/* <FormButtons />  */}
    </>
  );
}

export default ListProperty;