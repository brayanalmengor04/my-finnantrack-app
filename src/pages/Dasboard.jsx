// Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SiCanva } from "react-icons/si";

export default function Dashboard() {
  const { token, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      {user ? (
        <div className="mt-4 text-center">
          <p>
            {/* Usar mejor un userid para buscarlo desde backend */}
            <strong>ID de usuario:</strong> {user.user_id}
          </p>
          <p>
            {/* Esto es el payload de JWT completo  configurado desde el backend  */}
            <strong>Email:</strong> {user.sub} 
            <strong>Email:</strong> {user.role}
          </p>
          <p>
            <strong>Token:</strong> {token}
          </p>
        </div>
      ) : (
        <p className="mt-4">No hay información del usuario disponible.</p>
      )}
      <button 
        onClick={handleLogout} 
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <SiCanva className="text-xl" />
        Logout
      </button>
    </div>
  );
}
