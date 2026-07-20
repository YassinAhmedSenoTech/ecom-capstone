import { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('token')) {
        try {
          const { data } = await api.get('/auth/profile');
          setUser(data);
          setIsLoggedIn(true);
        } catch (err) {
          console.error("Failed to fetch user", err);
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, [isLoggedIn]); 

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};