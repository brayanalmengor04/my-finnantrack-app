import React, { useState } from 'react';
import { SiGoogle, SiGithub } from 'react-icons/si';
import { useAuth } from './../hooks/useAuth';
import { useBackendTest } from './../hooks/useBackendTest'; 
import { SiReact } from "react-icons/si";

export default function Login() {
  const { login, register, loading, error } = useAuth();
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
    <div className="flex min-h-screen">
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

      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/image/bg-loginv3.jpg"
          alt="Imagen presentación de login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md space-y-6">
        
          {!isLogin ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900 text-center">Login</h1> 
                {/* Indicador del estado del backend */}
               
              <p className="text-center text-sm text-gray-500">
                Welcome back, please enter your credentials.
              </p>
              <form onSubmit={handleSubmitLogin} className="space-y-4">
                <div>
                  <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="loginEmail"
                    placeholder="you@gmail.com"
                    className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-gray-300 transition-colors" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    placeholder="********"
                    className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-gray-300 transition-colors" 
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Log in'}
                </button> 
         
                {(() => {
                  if (backendLoading) {
                    return (
                      <p className="text-blue-500 flex items-center">
                        <span className="mr-2">⏳</span>
                        Cargando backend...
                      </p>
                    );
                  }
                  if (backendError) {
                    return (
                      <p className="text-red-500 flex items-center">
                        <span className="mr-2">❌</span>
                        Error backend: {backendError}
                      </p>
                    );
                  }
                  if (backendStatus) {
                    return (
                      <p className="text-green-500 flex items-center">
                        <span className="mr-2">✅</span>
                        Backend active
                      </p>
                    );
                  }
                  return null;
                })()}
                {error && <p className="text-red-500 text-sm">{error}</p>} 
              </form>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
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
              <div className="flex gap-4">
                <button
                  type="button"
                  className="cursor-pointer flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <SiGoogle className="text-xl" />
                  Sign Up with Google
                </button>
                <button
                  type="button"
                  className="cursor-pointer flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <SiGithub className="text-xl" />
                  Sign Up with Github
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">or sign up with email</p>
              <form onSubmit={handleSubmitRegister} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-gray-300 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-gray-300 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    name="email"
                    placeholder="you@example.com"
                    className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-gray-300 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    placeholder="********"
                    className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-gray-300 transition-colors"
                  />
                </div>
                <input type="hidden" name="role" value="ADMIN" />
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-black transition-colors"
                >
                  Sign Up
                </button>
              </form>
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
  );
}
