import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Импорт хука для работы с контекстом аутентификации
import { useNavigate } from 'react-router-dom'; // Импорт хука для навигации

// Компонент формы входа в систему
const LoginForm = () => {
    const [credentials, setCredentials] = useState({ // Состояние для хранения данных формы входа
        username: '',
        password: ''
    });
    const [error, setError] = useState(''); // Состояние для отображения ошибки входа
    const { login } = useAuth(); // Получение функции для входа из контекста аутентификации
    const navigate = useNavigate(); // Получение функции навигации

    // Обработчик изменения данных формы
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value }); // Обновление состояния данных формы при изменении полей
    };

    // Обработчик отправки формы входа
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(credentials); // Вызов функции для входа с передачей учетных данных
            navigate('/'); // Перенаправление на главную страницу после успешного входа
        } catch (error) {
            console.error('Ошибка входа:', error); // Вывод ошибки в консоль при ошибке входа
            setError('Произошла ошибка при попытке входа'); // Установка сообщения об ошибке
        }
    };

    return (
        <div>
            <h1>Вход в систему</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Имя пользователя"
                        type="text"
                        fullWidth
                        sx={{ width: '400px' }} 
                        onChange={handleChange}
                        value={credentials.username}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        margin="dense"
                        name="password"
                        label="Пароль"
                        type="password"
                        fullWidth
                        sx={{ width: '400px' }} 
                        onChange={handleChange}
                        value={credentials.password}
                    />
                </div>
                <Button type="submit" color="primary" variant="contained">Войти</Button>
                {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>} {/* Отображение сообщения об ошибке, если оно есть */}
            </form>
        </div>
    );
};

export default LoginForm; // Экспорт компонента формы входа
