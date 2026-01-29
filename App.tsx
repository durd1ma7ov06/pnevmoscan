
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, AuthState } from './types';
import { authService } from './services/authService';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setAuthState({ user, isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
  };

  const handleLogout = () => {
    authService.logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {authState.isAuthenticated && (
          <Navigation user={authState.user} onLogout={handleLogout} />
        )}
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/login" 
              element={!authState.isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/register" 
              element={!authState.isAuthenticated ? <Register onRegister={() => {}} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={authState.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>

        <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} PnevmoScan AI. Barcha huquqlar himoyalangan.</p>
          <p className="mt-1 text-xs px-4">Tibbiy maslahat uchun shifokorga murojaat qiling. Sun'iy intellekt natijalari faqat tavsiyaviy xarakterga ega.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
