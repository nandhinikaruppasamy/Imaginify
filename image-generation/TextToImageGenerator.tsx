'use client'; // If you're using Next.js

import React, { useState } from "react";
import styles from "./TextToImageGenerator.module.css"; // Import the CSS module

const TextToImageGenerator = () => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24); // Default font size
  const [textColor, setTextColor] = useState("#000000"); // Default text color
  const [bgColor, setBgColor] = useState("#ffffff"); // Default background color
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateImage = () => {
    if (!text) {
      alert("Please enter some text.");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      alert("Your browser doesn't support canvas.");
      return;
    }

    // Set canvas size
    const canvasWidth = 500; // Fixed width
    const canvasHeight = 200; // Fixed height
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fill the background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the text in the center of the canvas
    ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

    // Generate the image URL from the canvas
    const generatedImageUrl = canvas.toDataURL("image/png");
    setImageUrl(generatedImageUrl);
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "generated_text_image.png";
      link.click();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Text-to-Image Generator</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
        />
        <div className={styles.options}>
          <label>
            Font Size:
            <input
              type="number"
              min="10"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className={styles.numberInput}
            />
          </label>
          <label>
            Text Color:
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className={styles.colorPicker}
            />
          </label>
          <label>
            Background Color:
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className={styles.colorPicker}
            />
          </label>
        </div>
      </div>
      <button onClick={handleGenerateImage} className={styles.generateButton}>
        Generate Image
      </button>

      {imageUrl && (
        <div className={styles.result}>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated" className={styles.image} />
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default TextToImageGenerator;
