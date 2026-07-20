import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../style/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registered successfully');
      navigate('/login'); 
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            required 
            placeholder="Name" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            required 
            placeholder="Email" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            required 
            placeholder="Password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
        </div>

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;