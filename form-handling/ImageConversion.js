"use client";
import React, { useState } from "react";
import styles from "./ImageConversion.module.css";

const convertImageFormat = (file, outputFormat) => {
  const img = new Image();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      img.src = reader.result;
    };

    img.onerror = () => reject("Error loading image");
    reader.onerror = () => reject("Error reading file");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(`image/${outputFormat}`);
      resolve(dataUrl);
    };

    reader.readAsDataURL(file);
  });
};

const ImageConversion = () => {
  const [file, setFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [convertedImage, setConvertedImage] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setConvertedImage(null); // Reset the converted image when a new file is selected
  };

  const handleFormatChange = (event) => {
    setOutputFormat(event.target.value);
  };

  const handleConvert = () => {
    console.log("Convert button clicked!");

    if (!file) {
      alert("Please select an image to convert!");
      return;
    }

    console.log(`File selected: ${file.name}`);
    console.log(`Output format selected: ${outputFormat}`);

    convertImageFormat(file, outputFormat)
      .then((dataUrl) => {
        console.log("Image successfully converted!");
        setConvertedImage(dataUrl); // Display the converted image
      })
      .catch((error) => {
        console.error("Error during image conversion:", error);
      });
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement("a");
      link.href = convertedImage;
      link.download = `converted-image.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Image Format Converter</h1>
      <input type="file" onChange={handleFileChange} className={styles.fileInput} />
      <select value={outputFormat} onChange={handleFormatChange} className={styles.select}>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
      </select>
      <button onClick={handleConvert} className={styles.button}>
        Convert Image
      </button>
      {convertedImage && (
        <div>
          <h2 className={styles.resultHeading}>Converted Image</h2>
          <img src={convertedImage} alt="Converted" className={styles.resultImage} />
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageConversion;
