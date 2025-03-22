import React, { useState } from 'react';
import { SiGoogle, SiGithub } from 'react-icons/si';
import { useAuth } from './../hooks/useAuth';
import { useBackendTest } from './../hooks/useBackendTest';
import { SiReact } from "react-icons/si";

export default function Login() {
  const { login, register,setError, loading, error } = useAuth();
  const { loading: backendLoading, backendStatus, error: backendError } = useBackendTest();
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Toggle para cambiar entre login y register
  const toggleView = e => {
    e.preventDefault();
    setIsLogin(prev => !prev);
  };
  // Maneja el login
  const handleSubmitLogin = async e => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;
    const token = await login(email, password);
    if (token) {
      setModalMessage('Login exitoso');
      setShowModal(true);
      e.target.reset();
    }
    console.log('Login token:', token);
  };

  // Maneja el registro
  const handleSubmitRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const data = await register({ name: firstName, lastName, email, password, role });
    if (data) {
      setModalMessage('Registro y login exitoso');
      setShowModal(true);
      form.reset();
    }
    console.log('Register data:', data);
  };

  return ( 
  <div className="w-screen h-screen flex items-center justify-center bg-gray-50 bg-theme-magenta-blue">    
    <div className="w-[90vw] h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden flex">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 ease-out animate-fade-in">
            <div className="flex items-center space-x-3">
              <SiReact className="text-blue-500 text-3xl" />
              <h2 className="text-xl font-bold">Notification</h2>
            </div>
            <p className="mt-4 text-gray-700">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="hidden lg:flex lg:w-1/2 "> 
        <img
          src="../image/bg-loginv3.jpg"
          alt="Imagen presentación de login"
          className="relative inset-0 w-full h-full object-cover"
        /> 
      </div>
      {/* Sección derecha con el formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative"> 
    
            <div className='absolute top-0 right-0 p-5'>
                {(() => {
            // Estado "procesando"
            if (backendLoading) {
              return (
                <p className="text-yellow-500 flex items-center mt-2 text-sm">
                  {/* Pequeña animación de 'pulse' en el icono */}
                  <span className="mr-2 animate-pulse">🟡</span>
                  Processing...
                </p>
              );
            }
            if (backendError) {
              return (
                <p className="text-red-500 flex items-center mt-2 text-sm">
                  {/* Pequeña animación de 'bounce' en el icono */}
                  <span className="mr-2 animate-bounce">🔴</span>
                  Out of service
                </p>
              );
            }
            if (backendStatus) {
              return (
                <p className="text-green-500 flex items-center mt-2 text-sm">
                  <span className="mr-2">🟢</span>
                  In service
                </p>
              );
            }
            return null;
          })()}
          </div>
        <div className="w-full max-w-md space-y-6">
          {!isLogin ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900 text-center">Finnantrack - Login </h1>
              <p className="text-center text-sm text-gray-500">
                Welcome back, please enter your credentials.
              </p>

              {/* Formulario de Login */}
              <form onSubmit={handleSubmitLogin} className="space-y-8 mt-6">
                {/* Email */}
                <div className="relative">
                  <input type="email" id="loginEmail"name="loginEmail" placeholder=" "
                    className="
                      block w-full px-2.5 pb-2.5 pt-4 text-sm
                      text-gray-900 bg-transparent rounded-lg
                      border border-gray-300 appearance-none
                      focus:outline-none focus:ring-0
                      focus:border-black peer
                    "
                    required
                  />
                  <label
                    htmlFor="loginEmail"className="
                      absolute text-sm text-gray-500 duration-300
                      transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                      bg-gray-50 px-2
                      peer-focus:px-2 peer-placeholder-shown:scale-100
                      peer-placeholder-shown:-translate-y-1/2
                      peer-placeholder-shown:top-1/2
                      peer-focus:top-2 peer-focus:scale-75
                      peer-focus:-translate-y-4 left-2
                    "
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input type="password" id="loginPassword" name="loginPassword" placeholder=" "
                    className="
                      block w-full px-2.5 pb-2.5 pt-4 text-sm
                      text-gray-900 bg-transparent rounded-lg
                      border border-gray-300 appearance-none
                      focus:outline-none focus:ring-0
                      focus:border-black peer
                    "
                    required
                  />
                  <label
                    htmlFor="loginPassword" className="
                      absolute text-sm text-gray-500 duration-300
                      transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                      bg-gray-50 px-2
                      peer-focus:px-2 peer-placeholder-shown:scale-100
                      peer-placeholder-shown:-translate-y-1/2
                      peer-placeholder-shown:top-1/2
                      peer-focus:top-2 peer-focus:scale-75
                      peer-focus:-translate-y-4 left-2
                    "
                  >
                    Password
                  </label>
                </div>
                <button type="submit" className="cursor-pointer w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Log in'}
                </button>

                {/* Error de credenciales */}
                {error && error !== '' && (
                <div className="mt-4 p-3 border border-red-400 bg-red-100 text-red-700 rounded relative">
                  <span>{typeof error === 'object' ? error.error || 'Error inesperado' : error}</span>
                  <button
                    className="absolute top-1 right-2 text-red-600 font-bold"
                    onClick={() => setError(null)} // Limpiar error al hacer clic
                  >
                    ✖
                  </button>
                  </div>
                )}
              </form>

              {/* Toggle para registro */}
              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="#" onClick={toggleView} className="text-black hover:underline">
                  Register here
                </a>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-900 text-center">Sign Up</h1>
              <p className="text-center text-sm text-gray-500">
                Support me as the creator of the app.
              </p> 
              <p className="text-center text-sm text-gray-500 mt-2">or sign up with email</p>
              <form onSubmit={handleSubmitRegister} className="space-y-8 mt-4">
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input type="text" id="firstName" name="firstName" placeholder=" "
                      className="
                        block w-full px-2.5 pb-2.5 pt-4 text-sm
                        text-gray-900 bg-transparent rounded-lg
                        border border-gray-300 appearance-none
                        focus:outline-none focus:ring-0
                        focus:border-black peer
                      "
                      required
                    />
                    <label htmlFor="firstName"
                      className="
                        absolute text-sm text-gray-500 duration-300
                        transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                        bg-gray-50 px-2
                        peer-focus:px-2 peer-placeholder-shown:scale-100
                        peer-placeholder-shown:-translate-y-1/2
                        peer-placeholder-shown:top-1/2
                        peer-focus:top-2 peer-focus:scale-75
                        peer-focus:-translate-y-4 left-2
                      "
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input type="text" id="lastName" name="lastName" placeholder=" "
                      className="
                        block w-full px-2.5 pb-2.5 pt-4 text-sm
                        text-gray-900 bg-transparent rounded-lg
                        border border-gray-300 appearance-none
                        focus:outline-none focus:ring-0
                        focus:border-black peer
                      "
                      required
                    />
                    <label htmlFor="lastName"
                      className="
                        absolute text-sm text-gray-500 duration-300
                        transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                        bg-gray-50 px-2
                        peer-focus:px-2 peer-placeholder-shown:scale-100
                        peer-placeholder-shown:-translate-y-1/2
                        peer-placeholder-shown:top-1/2
                        peer-focus:top-2 peer-focus:scale-75
                        peer-focus:-translate-y-4 left-2
                      "
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <input type="email" id="signupEmail" name="email" placeholder=" "
                    className="
                      block w-full px-2.5 pb-2.5 pt-4 text-sm
                      text-gray-900 bg-transparent rounded-lg
                      border border-gray-300 appearance-none
                      focus:outline-none focus:ring-0
                      focus:border-black peer
                    "
                    required
                  />
                  <label htmlFor="signupEmail"
                    className="
                      absolute text-sm text-gray-500 duration-300
                      transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                      bg-gray-50 px-2
                      peer-focus:px-2 peer-placeholder-shown:scale-100
                      peer-placeholder-shown:-translate-y-1/2
                      peer-placeholder-shown:top-1/2
                      peer-focus:top-2 peer-focus:scale-75
                      peer-focus:-translate-y-4 left-2
                    "
                  >
                    Email
                  </label>
                </div>
                {/* Password */}
                <div className="relative">
                  <input type="password" id="signupPassword" name="password" placeholder=" "
                    className="
                      block w-full px-2.5 pb-2.5 pt-4 text-sm
                      text-gray-900 bg-transparent rounded-lg
                      border border-gray-300 appearance-none
                      focus:outline-none focus:ring-0
                      focus:border-black peer
                    "
                    required
                  />
                  <label htmlFor="signupPassword"
                    className="
                      absolute text-sm text-gray-500 duration-300
                      transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                      bg-gray-50 px-2
                      peer-focus:px-2 peer-placeholder-shown:scale-100
                      peer-placeholder-shown:-translate-y-1/2
                      peer-placeholder-shown:top-1/2
                      peer-focus:top-2 peer-focus:scale-75
                      peer-focus:-translate-y-4 left-2
                    "
                  >
                    Password
                  </label>
                </div>

                {/* Campo hidden para el rol */}
                <input type="hidden" name="role" value="ADMIN" />
                <button type="submit" className="cursor-pointer w-full py-2 px-4 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-black transition-colors"
                >
                  Sign Up
                </button>
              </form> 

            {/* Mostrar error si existe cambiar icono  */} 
              {error && error !== '' && (
                <div className="mt-4 p-3 border border-red-400 bg-red-100 text-red-700 rounded relative">
                  <span>{typeof error === 'object' ? error.error || 'Error inesperado' : error}</span>
                  <button
                    className="cursor-pointer absolute top-1 right-2 text-red-600 font-bold"
                    onClick={() => setError(null)} // Limpiar error al hacer clic
                  >
                    ✖
                  </button>
                  </div>
                )}


              {/* Toggle para login */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" onClick={toggleView} className="text-black hover:underline">
                  Login here
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div> 
  </div>
  );
}
