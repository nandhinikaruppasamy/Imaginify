"use client";

import React, { useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import styles from "./ImageCropping.module.css";

const ImageCropping = () => {
  const [image, setImage] = useState(null); // Uploaded image
  const [croppedImage, setCroppedImage] = useState(null); // Cropped image
  const cropperRef = useRef(null); // Reference for Cropper instance

  // Handle image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set image for cropping
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedDataUrl = croppedCanvas.toDataURL("image/png");
      setCroppedImage(croppedDataUrl);
    }
  };

  // Handle download of cropped image
  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = "cropped-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Image Cropping Tool</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      {image && (
        <div className={styles.cropperContainer}>
          <Cropper
            src={image}
            style={{ height: "auto", width: "100%" }}
            viewMode={1} // Restrict the cropper to stay within the image
            background={false} // Removes checkerboard pattern
            dragMode="move" // Allow dragging the selection
            initialAspectRatio={null} // Freeform cropping
            guides={true} // Show cropping guides
            ref={cropperRef}
            checkCrossOrigin={false} // Ensures no CORS issues
          />
        </div>
      )}

      <button onClick={handleCrop} className={styles.cropButton}>
        Crop Image
      </button>

      {croppedImage && (
        <div className={styles.resultContainer}>
          <h2 className={styles.resultHeading}>Cropped Image</h2>
          <img src={croppedImage} alt="Cropped" className={styles.resultImage} />
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download Cropped Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropping;
