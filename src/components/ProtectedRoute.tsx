// src/components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate, useLocation, Outlet } from 'react-router-dom';
import { RootState } from '../store';



const ProtectedRoute: React.FC<any> = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate state={{from: location}} to='/signin' replace />
};

export default ProtectedRoute;
