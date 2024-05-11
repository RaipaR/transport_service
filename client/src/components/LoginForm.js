import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await login(credentials); // Убедитесь, что `login` правильно устанавливает ошибки
          navigate('/');
        } catch (error) {
          console.error('Ошибка входа:', error);
          setError('Произошла ошибка при попытке входа');
        }
      };
      

    return (
        <div>
            <h1>Вход в систему</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    name="username"
                    label="Имя пользователя"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    value={credentials.username}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Пароль"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    value={credentials.password}
                />
                <Button type="submit" color="primary" variant="contained">Войти</Button>
                {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
            </form>
        </div>
    );
};

export default LoginForm;
