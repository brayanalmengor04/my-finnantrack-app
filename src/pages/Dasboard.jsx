// Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SiCanva } from "react-icons/si"; // cambiar el icono para el boton de cerrar logeo ...

export default function Dashboard() { 
  // UserDetails : Recuperan el usuario obtenido del token jwt 
  const { token, userDetails, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (

    // Ejemplo para pasar los datos . 
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col">
      {/* Encabezado */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Mi Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <SiCanva className="text-xl" />
          Logout
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">
            ¡Bienvenido{userDetails?.name ? `, ${userDetails.name}` : ''}!
          </h2>
          {userDetails ? (
            <div className="space-y-2">
              <p><strong>ID:</strong> {userDetails.id}</p>
              <p><strong>Nombre:</strong> {userDetails.name}</p>
              <p><strong>Apellido:</strong> {userDetails.lastName}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Rol:</strong> {userDetails.role}</p>
              {/* <p className="text-sm text-gray-600"><strong>Token:</strong> {token}</p> */}
            </div>
          ) : (
            <p className="text-center">Cargando detalles del usuario...</p>
          )}
        </div>
      </main>
    </div>
  );
}
