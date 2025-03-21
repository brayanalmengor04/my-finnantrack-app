import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBackendTest = () => {
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testBackend = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('http://localhost:8080/api/public');
        setBackendStatus(data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    testBackend();
  }, []);

  return { loading, backendStatus, error };
};
