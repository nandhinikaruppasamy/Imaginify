'use client';

import React, { useState } from 'react';
import styles from './ImageCompression.module.css';

const ImageCompression: React.FC = () => {
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState<string | null>(
    null
  );
  const [isCompressing, setIsCompressing] = useState(false);

  // Handle file upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalSize(file.size); // Save original file size
      compressImage(file);
    }
  };

  // Compress the image
  const compressImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set compression quality (lower for smaller size)
        const compressionQuality = 0.6;

        // Set canvas size to the original image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Convert canvas to a compressed data URL
        const compressedUrl = canvas.toDataURL('image/jpeg', compressionQuality);

        // Convert compressed URL to Blob to get size
        fetch(compressedUrl)
          .then((res) => res.blob())
          .then((blob) => {
            setCompressedSize(blob.size); // Save compressed file size
            setCompressedImageUrl(compressedUrl); // Save compressed image URL
            setIsCompressing(false); // Stop compressing state
          });
      };
    };

    reader.readAsDataURL(file);
    setIsCompressing(true); // Set loading state
  };

  // Handle downloading the compressed image
  const handleDownload = () => {
    if (compressedImageUrl) {
      const link = document.createElement('a');
      link.href = compressedImageUrl;
      link.download = 'compressed_image.jpg';
      link.click();
    }
  };

  // Calculate size reduction in MB
  const calculateSizeReduction = () => {
    if (originalSize !== null && compressedSize !== null) {
      const originalMb = originalSize / (1024 * 1024); // Convert bytes to MB
      const compressedMb = compressedSize / (1024 * 1024); // Convert bytes to MB
      return {
        originalMb: originalMb.toFixed(2), // Limit to 2 decimal places
        compressedMb: compressedMb.toFixed(2),
        reductionMb: (originalMb - compressedMb).toFixed(2),
      };
    }
    return null;
  };

  const sizeInfo = calculateSizeReduction();

  return (
    <div className={styles.container}>
      <h2>Image Compression</h2>
      <input
        className={styles.fileInput}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {isCompressing && <p>Compressing image...</p>}

      {compressedImageUrl && (
        <div className={styles.resultContainer}>
          <img
            className={styles.compressedImage}
            src={compressedImageUrl}
            alt="Compressed"
          />
          {sizeInfo && (
            <div className={styles.sizeInfo}>
              <p>Original Size: {sizeInfo.originalMb} MB</p>
              <p>Compressed Size: {sizeInfo.compressedMb} MB</p>
              <p>Reduced By: {sizeInfo.reductionMb} MB</p>
            </div>
          )}
          <button className={styles.downloadButton} onClick={handleDownload}>
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCompression;
