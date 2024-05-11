// UserProfile.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../api/userApi';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const UserProfile = () => {
    const { user, setUser, logout } = useAuth();
    const [formData, setFormData] = useState(user ? { ...user, password: '' } : { fullName: '', username: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return <Typography variant="h5">Пользователь не найден или не аутентифицирован</Typography>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(formData);
            setUser(response.data);
            setIsEditing(false);
            alert('Информация обновлена');
        } catch (error) {
            console.error('Ошибка при обновлении информации:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleLogout = () => {
        logout();
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
                            >
                                Сохранить
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
                            >
                                Изменить
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginLeft: '10px' }}
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default UserProfile;
