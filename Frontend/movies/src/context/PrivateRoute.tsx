import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute: React.FC = () => {
  const token = Cookies.get('token'); // Verifica se há um token no cookie

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
