"use client";
import React, { useState } from 'react';
import './TextToImageGenerate.module.css'; // CSS module for styling

const TextImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('');

  // Hardcoded API Token
  const apiToken = "apify_api_uZBGbhKzOzMw0vJQ8TjpephMWbsfiZ0XTUiC"; // Replace with your actual API key

  const handleGenerateImage = async () => {
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
  
    setLoading(true);
    setError('');
    setImageUrl('');
    setStatus('');
  
    try {
      const response = await fetch('https://api.apify.com/v2/acts/hamza.alwan~craiyon-crawler/runs?token=' + apiToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          searchStrings: [prompt],
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setTaskId(data.id);  // Save the task ID to check status later
        setStatus(data.status);  // Save the task's current status
  
        // Poll for status if task is still running
        pollTaskStatus(data.id);
      } else {
        setError(data.error || 'Failed to generate image');
      }
    } catch (err) {
      setError('An error occurred while generating the image');
    }
  };
  

  const pollTaskStatus = async (taskId) => {
    const intervalId = setInterval(async () => {
      const response = await fetch(`https://api.apify.com/v2/acts/hamza.alwan~craiyon-crawler/runs/${taskId}?token=${apiToken}`);
      const data = await response.json();

      if (data.status === 'FINISHED') {
        clearInterval(intervalId);
        fetchDataset(data.defaultDatasetId);
      }
    }, 2000); // Check every 2 seconds
  };

  const fetchDataset = async (datasetId) => {
    try {
      const response = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${apiToken}`);
      const dataset = await response.json();

      if (dataset && dataset.length > 0) {
        const imageUrls = dataset.map(item => item.image_url);  // Assuming the response has image_url field
        setImageUrl(imageUrls[0]);  // Show the first image URL
      } else {
        setError('No images found in the dataset');
      }
    } catch (err) {
      setError('Error fetching dataset');
    }
  };

  return (
    <div className="image-generator">
      <h2>Text to Image Generator</h2>
      <input
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {status && <p>Status: {status}</p>} {/* Show current task status */}

      {error && <p className="error">{error.message || error}</p>} {/* Render error properly */}

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default TextImageGenerator;
