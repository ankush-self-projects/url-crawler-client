import type { FC, FormEvent } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Login: FC = () => {
  const { setToken, token } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token: jwtToken } = await loginService(username, password);
      setToken(jwtToken);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Login</Typography>
        <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default Login; 