// src/App.tsx
import React from 'react';
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toast } from './components/Toast';


const App: React.FC = () => {

  return (
 <div>
     <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
      <Route
          path="/"
          element={<DashboardPage />}
        />
      </Route>

  
    </Routes>
    </BrowserRouter>
    <Toast/>
 </div>
  );
};

export default App;
