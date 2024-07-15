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

  
  const navStyle = {
    backgroundColor: '#282c34', 
    padding: '10px 20px',        
    color: '#ffffff',           
    display: 'flex',            
    justifyContent: 'space-between', 
    alignItems: 'center',      
  };

  const ulStyle = {
    listStyleType: 'none',      
    padding: '0',               
    margin: '0',                
    display: 'flex',            
  };

  const liStyle = {
    margin: '0 15px',           
  };

  const linkStyle = {
    color: '#ffffff',           
    textDecoration: 'none',     
    fontSize: '16px',          
    transition: 'color 0.3s',   
  };

  const buttonStyle = {
    backgroundColor: '#61dafb', 
    border: 'none',             
    color: '#282c34',          
    padding: '8px 16px',        
    cursor: 'pointer',          
    borderRadius: '4px',        
    fontSize: '16px',          
    transition: 'background-color 0.3s', 
  };

  const buttonHoverStyle = {
    backgroundColor: '#21a1f1', 
  };

  const linkHoverStyle = {
    color: '#61dafb',          
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
