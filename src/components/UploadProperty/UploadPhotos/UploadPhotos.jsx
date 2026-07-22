import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrash, FaStar } from "react-icons/fa";
import "./UploadPhotos.css";

function UploadPhotos({
    formData,
    setFormData,
}){

  const fileInputRef = useRef(null);

 const images = formData.images;
  const handleUpload = (e) => {

    const files = Array.from(e.target.files);

    const uploaded = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        cover: false
    }));

    setFormData(prev => ({

        ...prev,

        images: [...prev.images, ...uploaded]

    }));

};
const removeImage = (index) => {

    const updated = [...images];

    URL.revokeObjectURL(updated[index].preview);

    updated.splice(index, 1);

    setFormData(prev => ({

        ...prev,

        images: updated

    }));

};

  const makeCover = (index) => {

    const updated = images.map((img, i) => ({
      ...img,
      cover: i === index
    }));

setFormData(prev => ({

    ...prev,

    images: updated,

    coverIndex: index

}));
  };

  return (

    <div className="form-card">

      <h2>Property Photos</h2>

      <p className="upload-subtitle">
        Upload high quality images of your property.
        The first image can be selected as the cover image.
      </p>

      <div
        className="upload-box"
        onClick={() => fileInputRef.current.click()}
      >

        <FaCloudUploadAlt />

        <h3>Click to Upload Images</h3>

        <p>PNG, JPG, JPEG</p>

        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          hidden
        />

      </div>

      {images.length > 0 && (

        <div className="preview-grid">

          {images.map((image, index) => (

            <div
              className="preview-card"
              key={index}
            >

              <img
                src={image.preview}
                alt=""
              />

              {image.cover && (
                <span className="cover-tag">
                  Cover
                </span>
              )}

              <div className="image-actions">

                <button
                  onClick={() => makeCover(index)}
                  title="Make Cover"
                >
                  <FaStar />
                </button>

                <button
                  onClick={() => removeImage(index)}
                  title="Delete"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default UploadPhotos;