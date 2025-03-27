// Dashboard.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiCanva } from "react-icons/si";
import { AuthContext } from '../../components/AuthContext';


const Dashboard = () => { 
  const { userDetails, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Encabezado */}
      <div className="mb-6 border-2 border-green-500 p-4 rounded-lg bg-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {userDetails && userDetails.name ? `¡Bienvenido, ${userDetails.name}!` : 'Dashboard'}
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <SiCanva className="text-xl" />
          <span>Logout</span>
        </button>
      </div>

      {/* Grid del Dashboard */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sección superior izquierda: RevenueForecast */}
        <div className="lg:col-span-8 col-span-12 border-2 border-blue-500 p-4 rounded-lg bg-white shadow-md">
          Renueve Componnet
        </div>

        {/* Sección superior derecha: NewCustomers y TotalIncome */}
        <div className="lg:col-span-4 col-span-12 border-2 border-blue-500 p-4 rounded-lg bg-white shadow-md">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mb-4 border-2 border-blue-500 p-4 rounded-lg">
              New usuarios
            </div>
            <div className="col-span-12 border-2 border-blue-500 p-4 rounded-lg">
              Otro servicio
            </div>
          </div>
        </div>

        {/* Sección intermedia izquierda: ProductRevenue */}
        <div className="lg:col-span-8 col-span-12 border-2 border-blue-500 p-4 rounded-lg bg-white shadow-md mt-8">
        Otro servicio
        </div>

        {/* Sección intermedia derecha: DailyActivity */}
        <div className="lg:col-span-4 col-span-12 flex border-2 border-blue-500 p-4 rounded-lg bg-white shadow-md mt-8">
        Otro servicio
        </div>

        {/* Sección inferior: BlogCards */}
        <div className="col-span-12 border-2 border-blue-500 p-4 rounded-lg bg-white shadow-md mt-8">
        Otro servicio
        </div>

        {/* Footer de créditos */}
        <div className="flex justify-center items-center gap-2 flex-wrap col-span-12 text-center mt-8">
          <p className="text-base">
            Design and Developed by{' '}
            Brayan Almengor
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
