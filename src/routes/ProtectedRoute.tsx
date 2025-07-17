import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: FC<{ element: ReactElement }> = ({ element }) => {
  const { token } = useAuth();
  return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 