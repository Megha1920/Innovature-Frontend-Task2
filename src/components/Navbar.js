import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Inline styles
  const navStyle = {
    backgroundColor: '#282c34', // Background color for the navbar
    padding: '10px 20px',        // Padding around the navbar
    color: '#ffffff',           // Text color
    display: 'flex',            // Flexbox for layout
    justifyContent: 'space-between', // Space out items
    alignItems: 'center',       // Center items vertically
  };

  const ulStyle = {
    listStyleType: 'none',      // Remove bullet points
    padding: '0',               // Remove default padding
    margin: '0',                // Remove default margin
    display: 'flex',            // Flexbox for list items
  };

  const liStyle = {
    margin: '0 15px',           // Margin between list items
  };

  const linkStyle = {
    color: '#ffffff',           // Link color
    textDecoration: 'none',     // Remove underline
    fontSize: '16px',           // Font size
    transition: 'color 0.3s',   // Smooth color transition
  };

  const buttonStyle = {
    backgroundColor: '#61dafb', // Background color for the button
    border: 'none',             // Remove border
    color: '#282c34',           // Text color
    padding: '8px 16px',        // Padding inside the button
    cursor: 'pointer',          // Pointer cursor on hover
    borderRadius: '4px',        // Rounded corners
    fontSize: '16px',           // Font size
    transition: 'background-color 0.3s', // Smooth background color transition
  };

  const buttonHoverStyle = {
    backgroundColor: '#21a1f1', // Darker background color on hover
  };

  const linkHoverStyle = {
    color: '#61dafb',           // Link color on hover
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {user ? (
          <>
            <li style={liStyle}><Link to="/tasks" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>Tasks</Link></li>
            <li style={liStyle}><Link to="/files" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>Files</Link></li>
            <li style={liStyle}><button onClick={handleLogout} style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>Logout</button></li>
          </>
        ) : (
          <>
            <li style={liStyle}><Link to="/signup" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>Signup</Link></li>
            <li style={liStyle}><Link to="/login" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
