import "./FormButtons.css";


function FormButtons() {

  
  const publishProperty = async () => {
  try {
    const payload = {
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
    };

    console.log("Sending Payload", payload);

    const response = await api.post(
      "/properties",
      payload
    );

    console.log(response.data);

    alert("Property Published Successfully");

  } catch (error) {
    console.error("Property Error", error);

    if (error.response) {
      console.log(error.response.data);
      alert(error.response.data.message || "Failed");
    } else {
      alert("Server not reachable");
    }
  }
};

  const handleSaveDraft = () => {
    alert("Draft Saved");
  };

  const handlePreview = () => {
    alert("Preview Page");
  };

  const handlePublish = () => {
    alert("Publish Property");
  };

  return (

    <div className="form-buttons">

      <button
        className="draft-btn"
        onClick={handleSaveDraft}
      >
        Save Draft
      </button>

      <button
        className="preview-btn"
        onClick={handlePreview}
      >
        Preview
      </button>

      <button
        className="publish-btn"
        onClick={publishProperty}
      >
        Publish Property
      </button>

    </div>

  );

}

export default FormButtons;