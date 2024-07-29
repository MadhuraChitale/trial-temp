// ---------------------------------------------------------------------------------------------------------------

import React, { useState } from "react";

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddPhoto = () => {
    if (file && description) {
      const newPhoto = {
        file: URL.createObjectURL(file),
        description,
      };
      setPhotos([...photos, newPhoto]);
      resetForm();
    }
  };

  const handleEditPhoto = () => {
    const updatedPhotos = photos.map((photo, index) => {
      if (index === currentIndex) {
        return {
          ...photo,
          file: file ? URL.createObjectURL(file) : photo.file,
          description: description || photo.description,
        };
      }
      return photo;
    });

    setPhotos(updatedPhotos);
    resetForm();
    setIsEditing(false);
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleEditButtonClick = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setDescription(photos[index].description);
    setFile(null);
  };

  const resetForm = () => {
    setDescription("");
    setFile(null);
    document.getElementById("fileInput").value = null;
  };

  return (
    <div>
      <div>
        <input id="fileInput" type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button onClick={isEditing ? handleEditPhoto : handleAddPhoto}>
          {isEditing ? "Save Changes" : "Add Photo"}
        </button>
      </div>
      <div>
        {photos.map((photo, index) => (
          <div
            key={index}
            style={{
              margin: "20px",
              border: "1px solid black",
              display: "inline-block",
            }}
          >
            <img
              src={photo.file}
              alt="Uploaded"
              style={{ width: "200px", height: "200px" }}
            />
            <p>{photo.description}</p>
            <button onClick={() => handleEditButtonClick(index)}>Edit</button>
            <button onClick={() => handleRemovePhoto(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
