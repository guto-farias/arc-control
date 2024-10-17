import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  // Estado para armazenar o e-mail e a senha inseridos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Autenticar usando Supabase
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError('Invalid email or password');
    } else {
      // Redirecionar para o Dashboard (ou qualquer outra tela)
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
