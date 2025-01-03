"use client";

import React, { useState } from "react";

const CloudinaryTextToImage = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    if (!text) {
      alert("Please enter text to generate the image");
      return;
    }

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      if (response.ok) {
        setImageUrl(result.secure_url); // Get the URL of the generated image
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div>
      <h2>Generate Image with Text</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text"
      />
      <button onClick={generateImage}>Generate Image</button>

      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated Image" />
        </div>
      )}
    </div>
  );
};

export default CloudinaryTextToImage;
