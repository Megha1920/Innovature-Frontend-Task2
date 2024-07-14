import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
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
    await dispatch(login(formData));
    navigate('/tasks');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
      <form style={{ maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Login</h2>
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px', border: '1px solid #ced4da', borderRadius: '4px' }} type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px', border: '1px solid #ced4da', borderRadius: '4px' }} type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }} type="submit">Login</button>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
