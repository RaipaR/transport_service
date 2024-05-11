// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Sidebar from './components/Sidebar';
import OrdersPage from './OrdersPage';
import StockPage from './StockPage';
import PreviewPage from './PreviewPage';
import { AuthProvider, useAuth, useIsAuthenticated } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import UsersPage from './UsersPage';
import UserProfile from './components/UserProfile';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/users/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Container style={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/users/login" element={<LoginForm />} />
              <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
              <Route path="/preview" element={<PrivateRoute><PreviewPage /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
              <Route path="/stocks" element={<PrivateRoute><StockPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
