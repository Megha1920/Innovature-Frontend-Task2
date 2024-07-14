import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile, downloadFile } from '../redux/fileSlice';

const FileHandlingPage = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(uploadFile({ file }));
    }
  };

  const handleDownload = (fileId) => {
    dispatch(downloadFile(fileId));
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Increased gap between form elements
    marginBottom: '20px',
    backgroundColor: '#ffffff', // Form background color
    borderRadius: '8px',        // Rounded corners for the form
    padding: '20px',            // Padding inside the form
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow
    maxWidth: '400px',          // Maximum width of the form
    width: '100%',              // Full width within max width
  };

  const inputStyle = {
    padding: '12px',            // Increased padding for the input
    border: '1px solid #ddd',   // Light border
    borderRadius: '4px',        // Rounded corners
    width: '100%',
    boxSizing: 'border-box',    // Include padding and border in width
    fontSize: '16px',           // Font size for better readability
    outline: 'none',            // Remove default outline
    transition: 'border-color 0.3s', // Smooth border color transition
  };

  const inputFocusStyle = {
    borderColor: '#007bff',     // Border color on focus
  };

  const buttonStyle = {
    backgroundColor: '#007bff', // Button background color
    border: 'none',
    color: '#ffffff',
    padding: '12px 24px',        // Increased padding for better click area
    borderRadius: '6px',         // Rounded corners
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth transitions
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Subtle shadow
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker background color on hover
    boxShadow: '0 6px 8px rgba(0,0,0,0.2)', // Deeper shadow on hover
  };

  const buttonFocusStyle = {
    outline: '2px solid #0056b3', // Outline on focus for accessibility
    outlineOffset: '2px',          // Offset to avoid overlap with content
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleUpload} style={formStyle}>
        <input
          type="file"
          onChange={handleFileChange}
          style={inputStyle}
          onFocus={(e) => e.currentTarget.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onFocus={(e) => e.currentTarget.style.outline = buttonFocusStyle.outline}
          onBlur={(e) => e.currentTarget.style.outline = 'none'}
        >
          Upload
        </button>
      </form>
      <button
        onClick={() => handleDownload('fileId')}
        style={buttonStyle}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        onFocus={(e) => e.currentTarget.style.outline = buttonFocusStyle.outline}
        onBlur={(e) => e.currentTarget.style.outline = 'none'}
      >
        Download File
      </button>
    </div>
  );
};

export default FileHandlingPage;
