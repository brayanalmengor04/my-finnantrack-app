// src/routes/Router.tsx
import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

// Carga perezosa de las páginas
const Login = Loadable(lazy(() => import('../views/auth/login/Login')));
const Dashboard = Loadable(lazy(() => import('../views/dasboard/Dasboard')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

const Router = [
  {
    // Ruta raíz que redirige a /auth/login
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      {path: "login", element: <Login />,},
      {
        path: "*",
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <FullLayout />,
    children: [
      { index: true,
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
];

const router = createBrowserRouter(Router, { basename: '/finnantrack' });
export default router;
