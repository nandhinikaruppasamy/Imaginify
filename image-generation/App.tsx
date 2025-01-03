"use client";
import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isMouseDownRef = useRef(false);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Ensure the image is loaded before drawing
  useEffect(() => {
    if (imgRef.current && canvasRef.current) {
      imgRef.current.onload = () => {
        drawCanvas(); // Draw the image on the canvas once loaded
      };
    }
  }, [image]); // Re-run when a new image is uploaded

  // Start dragging to select the area (mouse down)
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Capture the start point of the selection
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setSelection({ x, y, width: 0, height: 0 });
    isMouseDownRef.current = true;
  };

  // Update the selection area as the user drags (mouse move)
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isMouseDownRef.current || !selection) return;
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const width = x - selection.x;
    const height = y - selection.y;

    // Update the selection box dynamically while dragging
    setSelection({
      ...selection,
      width,
      height,
    });
  };

  // End dragging (mouse up)
  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  // Draw the uploaded image and selection box on the canvas
  const drawCanvas = () => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx && imgRef.current) {
      // Draw the uploaded image on the canvas
      ctx.drawImage(imgRef.current, 0, 0);

      // Draw the selection box if it exists
      if (selection) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 3]); // Add dashed line to the selection box
        ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
      }
    }
  };

  // Simulate object removal by clearing the selected area
  const removeObject = () => {
    if (canvasRef.current && selection) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx && imgRef.current) {
        // Draw the image again on top of the canvas
        ctx.drawImage(imgRef.current, 0, 0);

        // Clear (remove) the selected area
        ctx.clearRect(selection.x, selection.y, selection.width, selection.height);
      }
    }
  };

  // Convert the canvas to an image and allow user to download it
  const downloadImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const imageUrl = canvas.toDataURL('image/png'); // Convert canvas to a data URL
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'modified-image.png';
      link.click();
    }
  };

  return (
    <div className="App">
      <h1>Image Object Removal</h1>

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <>
          <h2>Uploaded Image</h2>
          <img ref={imgRef} src={image} alt="Uploaded" className="uploaded-image" />

          <canvas
            ref={canvasRef}
            width={imgRef.current ? imgRef.current.width : 0}
            height={imgRef.current ? imgRef.current.height : 0}
            className="image-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </>
      )}

      <button className="remove-btn" onClick={removeObject}>Remove Object</button>

      <div className="download-section">
        <button className="download-btn" onClick={downloadImage}>Download Modified Image</button>
      </div>
    </div>
  );
};

export default App;
