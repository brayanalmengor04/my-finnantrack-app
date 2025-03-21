import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });
      // Suponiendo que el endpoint retorna { token: '...' }
      localStorage.setItem('jwtToken', data.token);
      setLoading(false);
      return data.token;
    } catch (err) {
      setError(err.response?.data || err.message);
      setLoading(false);
      return null;
    }
  };

  const register = async ({ name, lastName, email, password, role }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/register', {
        name,
        lastName,
        email,
        password,
        role, //"ADMIN", en el formulario viene de un input hidden
      });
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data || err.message);
      setLoading(false);
      return null;
    }
  };

  return { login, register, loading, error };
};
