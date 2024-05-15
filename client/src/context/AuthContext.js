// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../api/userApi'; // Импорт функций для работы с аутентификацией

// Создание контекста аутентификации
const AuthContext = createContext(null);

// Провайдер контекста аутентификации
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user'); // Получение пользователя из локального хранилища
    return savedUser ? JSON.parse(savedUser) : null; // Парсинг пользователя из JSON
  });
  const [error, setError] = useState(null); // Состояние для отображения ошибки

  // Функция для входа пользователя
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials); // Вызов функции для входа с передачей учетных данных
      if (response.status === 200) {
        const userData = response.data.user; // Получение данных пользователя из ответа
        setUser(userData); // Установка пользователя в состояние
        localStorage.setItem('user', JSON.stringify(userData)); // Сохранение пользователя в локальное хранилище
      } else {
        setError('Неверное имя пользователя или пароль'); // Установка ошибки при неверном вводе учетных данных
      }
    } catch (error) {
      console.error('Ошибка при попытке входа:', error); // Вывод ошибки в консоль при ошибке входа
      setError('Ошибка входа в систему'); // Установка общей ошибки входа
    }
  };

  // Функция для выхода пользователя
  const logout = async () => {
    try {
      const response = await logoutUser(); // Вызов функции для выхода
      if (response.status === 200) {
        setUser(null); // Установка пользователя в null при успешном выходе
        localStorage.removeItem('user'); // Удаление пользователя из локального хранилища
      } else {
        console.error('Ошибка при выходе:', error); // Вывод ошибки в консоль при ошибке выхода
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error); // Вывод ошибки в консоль при ошибке выхода
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, error }}> {/* Передача значений контекста */}
      {children} {/* Отображение дочерних компонентов */}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = () => useContext(AuthContext);
