import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';
import '../style/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  const { setIsLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', credentials);
      
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true); 
      
      navigate('/'); 
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            required
            onChange={(e) => setCredentials({...credentials, email: e.target.value})} 
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            required
            onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
          />
        </div>
        
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;