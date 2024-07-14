import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(formData));
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ maxWidth: '400px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Sign Up</h2>
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }} type="submit">Signup</button>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
