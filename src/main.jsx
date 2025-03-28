import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { AuthProvider } from './components/AuthContext';
import Spinner from './views/spinner/Spinner.js';
import './css/globals.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </AuthProvider>
</StrictMode>
)
