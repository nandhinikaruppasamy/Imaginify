"use client";
import React, { useState, useRef, useEffect } from "react";
import './style.css';
const ImageEditor = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [filter, setFilter] = useState("none");
  const [brightness, setBrightness] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);
  const imageRef = useRef(new Image()); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      imageRef.current.src = imageUrl;
      imageRef.current.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        ctx.scale(zoom, zoom);

        ctx.filter = `brightness(${brightness})`;

        ctx.filter = filter;

        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [imageUrl, filter, brightness, rotation, zoom]); 

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "edited_image.png";
    link.click();
  };

  return (
    <div className="container">

      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
          <canvas
            ref={canvasRef}
            width="500"
            height="500"
            style={{
              border: "1px solid black",
              display: "block",
              margin: "20px auto",
            }}
          ></canvas>
        </div>
      )}

      <div className="controls">
        <label>
          Grayscale:
          <input
            type="checkbox"
            onChange={(e) =>
              setFilter(e.target.checked ? "grayscale(100%)" : "none")
            }
          />
        </label>
        <button onClick={() => setFilter("none")}>Reset Filter</button>

        <div>
          <label>Brightness</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </div>

        <div>
          <label>Rotate</label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          />
        </div>

        <div class="zoom-controls">
  <button id="zoom-in">Zoom In</button>
  <button id="zoom-out">Zoom Out</button>
</div>

        <div className="download-btn">
          <button onClick={handleDownload}>Download Edited Image</button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
