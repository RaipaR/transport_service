// UserProfile.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../api/userApi';
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';

const UserProfile = () => {
    const { user, setUser, logout } = useAuth(); // Получение информации о пользователе из контекста аутентификации
    const [formData, setFormData] = useState(user ? { ...user, password: '' } : { fullName: '', username: '', password: '' }); // Состояние для данных формы
    const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования формы
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Состояние для отображения уведомления

    // Если пользователь не аутентифицирован, выводим сообщение об ошибке
    if (!user) {
        return <Typography variant="h5">Пользователь не найден или не аутентифицирован</Typography>;
    }

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(formData); // Обновление информации о пользователе на сервере
            setUser(response.data); // Обновление состояния информации о пользователе
            setIsEditing(false); // Выход из режима редактирования
            setSnackbarOpen(true); // Отображение уведомления об успешном обновлении
        } catch (error) {
            console.error('Ошибка при обновлении информации:', error);
        }
    };

    // Обработчик клика на кнопку редактирования
    const handleEditClick = () => {
        setIsEditing(true); // Вход в режим редактирования
    };

    // Обработчик клика на кнопку "Назад"
    const handleBackClick = () => {
        setIsEditing(false); // Выход из режима редактирования
    };

    // Обработчик выхода из аккаунта
    const handleLogout = () => {
        logout(); // Вызов функции выхода из аккаунта из контекста аутентификации
    };

    // Обработчик закрытия уведомления
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Личный кабинет
                </Typography>
                {isEditing ? (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            label="ФИО"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Новый пароль"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="password"
                        />
                        <Box textAlign="center" marginTop="20px">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginRight: '10px' }}
                            >
                                Сохранить
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleBackClick}
                            >
                                Назад
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            <strong>ФИО:</strong> {user.fullName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Логин:</strong> {user.username}
                        </Typography>
                        <Box textAlign="center" marginTop="20px">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEditClick}
                                style={{ marginRight: '10px' }}
                            >
                                Изменить
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Информация обновлена успешно!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UserProfile;
