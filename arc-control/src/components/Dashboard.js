import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Dashboard = ({ session }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Após o logout, recarrega a página para voltar ao login
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Exibe o e-mail do usuário logado */}
      <p>Welcome, you are logged in as: {session.user.email}</p>

      {/* Link para a Tela de Gestão de Produtos */}
      <Link to="/products">
        <button>Manage Products</button>
      </Link>

      {/* Botão de Logout */}
      <button onClick={handleLogout} style={{ marginTop: '20px', backgroundColor: 'red' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
