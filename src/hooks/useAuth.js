import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (url, data) => {
    setLoading(true);
    setError(null);
    try {
      const { data: responseData } = await axios.post(url, data);
      return responseData;
    } catch (err) {
      setError(err.response?.data || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // No inclui el login porque en otro componente manejo de logout , y tema de comportamiento del token 


  const register = async ({ name, lastName, email, password, role }) => {
    return await postRequest('http://localhost:8080/api/auth/register', { name, lastName, email, password, role });
  }; 

  return {register, loading, error, setError};
};
