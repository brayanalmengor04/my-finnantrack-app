// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import router from "./routes/Router"
import { AuthProvider } from './components/AuthContext'; // si aplica
import "./css/globals.css";
const App: React.FC = () => {
  return (
    <AuthProvider>
     <RouterProvider router={router} />
    </AuthProvider>
  );
};
export default App;
