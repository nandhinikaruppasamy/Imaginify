"use client";
import React, { useState } from 'react';
import ImageResizer from './ImageResizer';
import ImageCompression from './ImageCompression';
import ImageConversion from './ImageConversion';
import ImageCropping from '@/form-handling/ImageCropping';

const RestoreImageActions: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Render the corresponding action
  const renderSelectedAction = () => {
    switch (selectedAction) {
      case 'resize':
        return <ImageResizer />;
      case 'compress':
        return <ImageCompression />;
     case 'convert':
       return <ImageConversion />;
     case 'crop':
      return <ImageCropping />;
      default:
        return (
          <div style={containerStyle}>
            <h2>What action would you like to perform?</h2>
            <button
              style={buttonStyle}
              onClick={() => setSelectedAction('resize')}
            >
              Resize Image
            </button>
            <button
              style={buttonStyle}
              onClick={() => setSelectedAction('compress')}
            >
              Compress Image
            </button>
            <button
              style={buttonStyle}
              onClick={() => setSelectedAction('crop')}
            >
              Crop the Image
            </button>
            <button
              style={buttonStyle}
              onClick={() => setSelectedAction('convert')}
            >
              Convert the Image
            </button>
          </div>
        );
    }
  };

  return <div>{renderSelectedAction()}</div>;
};

// Inline styles
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '50px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  margin: '10px',
};

export default RestoreImageActions;
