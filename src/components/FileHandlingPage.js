import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, downloadFile } from '../redux/fileSlice';

const FileHandlingPage = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const files = useSelector((state) => state.file.files);
  const fileStatus = useSelector((state) => state.file.status);
  // const fileError = useSelector((state) => state.file.error);

  useEffect(() => {
  
  }, []);

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
    dispatch(downloadFile(fileId)).then((action) => {
      if (action.payload && action.payload.url) {
        const link = document.createElement('a');
        link.href = action.payload.url;
        link.setAttribute('download', action.payload.filename); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
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
    gap: '15px',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
  };

  const inputStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
    boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
  };

  const buttonFocusStyle = {
    outline: '2px solid #0056b3',
    outlineOffset: '2px',
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
      {fileStatus === 'loading' && <p>Loading...</p>}
      {/* {fileError && <p>Error: {fileError}</p>} */}
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <span>{file.file}</span>
            <button
              onClick={() => handleDownload(file.id)}
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
              onFocus={(e) => e.currentTarget.style.outline = buttonFocusStyle.outline}
              onBlur={(e) => e.currentTarget.style.outline = 'none'}
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileHandlingPage;
