"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./BackgroundRemove.module.css";

const BackgroundRemove: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "MarXV6k4ip3VXakmHxMGaLnz";

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
      const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
        headers: { "X-Api-Key": apiKey },
        responseType: "blob",
      });

      setOriginalImage(URL.createObjectURL(file));
      setTransformedImage(URL.createObjectURL(response.data));
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.row}>
        <div className={styles.card}>
          <h3>Original</h3>
          {originalImage ? (
            <img src={originalImage} alt="Original" />
          ) : (
            <div className={styles.uploadArea}>
              <label htmlFor="fileUpload">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4a1 1 0 01.993.883L13 5v7h4a1 1 0 01.117 1.993L17 14h-4v4a1 1 0 01-1.993.117L11 18v-4H7a1 1 0 01-.117-1.993L7 12h4V5a1 1 0 011-1z"></path>
                </svg>
                <span>Click here to upload image</span>
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h3>Transformed</h3>
          {transformedImage ? (
            <img src={transformedImage} alt="Transformed" />
          ) : (
            <p>Transformed Image</p>
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={() => {
            if (transformedImage) {
              const link = document.createElement("a");
              link.href = transformedImage;
              link.download = "background_removed.png";
              link.click();
            }
          }}
        >
          Save Image
        </button>
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => {
            setOriginalImage(null);
            setTransformedImage(null);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default BackgroundRemove;
