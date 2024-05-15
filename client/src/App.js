import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import OrdersPage from './OrdersPage';
import StockPage from './StockPage';
import PreviewPage from './PreviewPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import UsersPage from './UsersPage';
import UserProfile from './components/UserProfile';
import LogsPage from './LogsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/users/login" replace />;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex' }}>
            <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
            <Container maxWidth="xl" style={{ flexGrow: 1, padding: '100px 0px 0px 30px', width: '100%' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/orders" replace />} />
                <Route path="/users/login" element={<LoginForm />} />
                <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
                <Route path="/preview" element={<PrivateRoute><PreviewPage /></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
                <Route path="/stocks" element={<PrivateRoute><StockPage /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/logs" element={<PrivateRoute><LogsPage /></PrivateRoute>} />
              </Routes>
            </Container>
          </div>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
