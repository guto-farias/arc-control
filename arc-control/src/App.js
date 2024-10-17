import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { supabase } from './supabaseClient';
import ProductManagement from './components/ProductManagement';

function App() {
  const [session, setSession] = useState(null);

  // Checa a sessão de login ao carregar o componente
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Verifica o estado de login quando há mudanças na autenticação
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Se a sessão existir, exibe as rotas do dashboard e de produtos, senão exibe o login */}
        {session ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard session={session} />} />
            <Route path="/products" element={<ProductManagement />} />
            {/* Redireciona para o dashboard se tentar acessar a raiz */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
