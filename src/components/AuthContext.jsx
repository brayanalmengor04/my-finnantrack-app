// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken'));
  const [user, setUser] = useState(() => (token ? jwtDecode(token) : null));  
  const [userDetails, setUserDetails] = useState(null); 
  const [errorLogin, setErrorLogin] = useState(null); 
  const [loadingLogin, setLoadingLogin] = useState(false);

  const login = async (email, password) => {
    setLoadingLogin(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      const data = response.data;
      if (data?.error) {
        setErrorLogin(data.error);
        setLoadingLogin(false);
        return null;
      }
      if (data?.token) {
        setLoadingLogin(false);
        setErrorLogin(null);
        return data.token;
      }
      setLoadingLogin(false);
      return null;
    } catch (err) { 
      setErrorLogin(err.response?.data || err.message);
      setLoadingLogin(false);
      return null;
    }
  };

  const loginUser = async (email, password) => {
    const tokenFromServer = await login(email, password); 
    if (tokenFromServer) {
      localStorage.setItem('jwtToken', tokenFromServer);
      setToken(tokenFromServer);
      setUser(jwtDecode(tokenFromServer));
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
  };
  const clearErrorLogin = () => setErrorLogin(null);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]); 

  // Nuevo useEffect para obtener detalles adicionales del usuario usando su ID
  useEffect(() => {
    if (user && user.user_id) {
      axios
        .get(`http://localhost:8080/api/auth/user/${user.user_id}`, {
          headers: {
            // Suponiendo que el endpoint requiere autenticación
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => {
          console.error("Error al obtener los detalles del usuario:", error);
        });
    }
  }, [user, token]);



  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser, errorLogin, loadingLogin, clearErrorLogin, userDetails}}>
      {children}
    </AuthContext.Provider>
  );
};
