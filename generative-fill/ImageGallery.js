"use client";
import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Importing the CSS file

const ImageSearchApp = () => {
  const [query, setQuery] = useState(""); // Search query
  const [images, setImages] = useState([]); // Array to store images
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling
  const [selectedImage, setSelectedImage] = useState(null); // State to handle the clicked image

  // Your Pexels API Key (use the key you provided here)
  const PEXELS_API_KEY = "HmjvGZQaUYvUcPlWVWtrmZIZQrnm45UZ1ffasUGpqIi2FOn5xEveOGQG";
  
  // Function to handle search
  const searchImages = async () => {
    if (!query) return;
    setLoading(true);
    setError(null); // Reset error before starting new search

    try {
      // Make GET request to Pexels API
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        params: {
          query: query,
          per_page: 15,  // Limit the number of results per page
        },
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });

      setImages(response.data.photos); // Set the images state with the search results
    } catch (err) {
      setError("Error fetching images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image click (for side view)
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to handle image download
  const handleDownload = (image) => {
    const link = document.createElement("a");
    link.href = image.src.large;  // URL for larger image or original
    link.download = `pexels_image_${image.id}.jpg`;
    link.click();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Image Search App</h1>
        <p>Transform your images with ease!</p>
      </div>

      {/* Search Section */}
      <div className="searchSection">
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchInput"
        />
        <button onClick={searchImages} className="searchButton">Search</button>
      </div>

      {/* Loading and Error Message */}
      {loading && <p className="loadingText">Loading...</p>}
      {error && <p className="errorText">{error}</p>}

      {/* Image Gallery */}
      <div className="imageGallery">
        {images.map((image) => (
          <div
            key={image.id}
            className="imageCard"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src.small}
              alt={image.alt}
              className="image"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Selected Image */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightboxContent" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src.large}
              alt={selectedImage.alt}
              className="lightboxImage"
            />
            <div className="downloadButtonContainer">
              <button
                onClick={() => handleDownload(selectedImage)}
                className="downloadButton"
              >
                Download Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearchApp;
