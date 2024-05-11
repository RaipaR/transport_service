// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../api/userApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      console.error('Ошибка при попытке входа:', error);
      setError('Ошибка входа в систему');
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem('user');
      } else {
        console.error('Ошибка при выходе:', error);
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);