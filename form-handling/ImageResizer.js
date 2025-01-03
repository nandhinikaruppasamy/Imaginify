'use client'; // Add this line at the top

import React, { useState } from "react";
import styles from "./ImageResizer.module.css"; // Import the CSS module

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [resizedImageUrl, setResizedImageUrl] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(""); // Input field for width
  const [height, setHeight] = useState(""); // Input field for height

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setResizedImageUrl(null); // Reset the resized image when a new file is chosen
    }
  };

  const handleResizeImage = async () => {
    if (!image || !width || !height) {
      alert("Please upload an image and provide both width and height.");
      return;
    }

    const newWidth = parseInt(width, 10);
    const newHeight = parseInt(height, 10);

    if (isNaN(newWidth) || isNaN(newHeight)) {
      alert("Please provide valid numeric values for width and height.");
      return;
    }

    if (newWidth > 1000 || newHeight > 1000) {
      alert("Width and height should not exceed 1000px.");
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(image);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const resizedUrl = canvas.toDataURL("image/jpeg");

      setResizedImageUrl(resizedUrl);
      setIsResizing(false);
    };

    setIsResizing(true);
  };

  const handleDownload = () => {
    if (resizedImageUrl) {
      const link = document.createElement("a");
      link.href = resizedImageUrl;
      link.download = "resized_image.jpg";
      link.click();
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.formContainer}>
    <div className={styles.inputRow}>
  <input
    className={styles.fileInput}
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />

  <div className={styles.inputGroup}>
    <label className={styles.inputLabel} htmlFor="widthInput">
      Width (px)
    </label>
    <input
      id="widthInput"
      className={styles.numberInput}
      type="number"
      placeholder="Width"
      value={width}
      onChange={(e) => setWidth(e.target.value)}
      min="1"
      max="1000"
    />
  </div>

  <div className={styles.inputGroup}>
    <label className={styles.inputLabel} htmlFor="heightInput">
      Height (px)
    </label>
    <input
      id="heightInput"
      className={styles.numberInput}
      type="number"
      placeholder="Height"
      value={height}
      onChange={(e) => setHeight(e.target.value)}
      min="1"
      max="1000"
    />
  </div>
</div>


        <button
        className={styles.resizeButton}
        onClick={handleResizeImage}
        disabled={!image || isResizing}
        >
        {isResizing ? "Resizing..." : "Resize Image"}
        </button>

        {resizedImageUrl && (
        <><div className={styles["resized-image-container"]}>
            <h3>Resized Image:</h3>
            <img
              className={styles.resizedImage}
              src={resizedImageUrl}
              alt="Resized" />
          </div><button
            className={styles.downloadButton}
            onClick={handleDownload}
          >
              Download Resized Image
            </button></>
        )}
    </div>
</div>

  
  );
};

export default ImageResizer;
