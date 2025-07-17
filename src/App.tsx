import type { FC, FormEvent, ReactElement } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddUrl from './pages/AddUrl';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const App: FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    navigate('/');
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Crawler
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/add-url">Add URL</Button>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/add-url" element={<AddUrl />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
