// UsersPage.js
import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UsersTable from './components/UsersTable';
import { fetchUsers, createUser, updateUser, deleteUser } from './api/userApi';
import { useAuth } from './context/AuthContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UsersPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ username: '', password: '', fullName: '', role: 'user' });

    const fetchAllUsers = async () => {
        const response = await fetchUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleOpen = () => {
        setCurrentUser({ username: '', password: '', fullName: '', role: 'user' });
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser._id) {
                // Параметры передаются в соответствии с userApi
                await updateUser(currentUser);
            } else {
                await createUser(currentUser);
            }
            setOpen(false);
            fetchAllUsers(); // Обновить данные после сохранения
        } catch (error) {
            console.error('Ошибка при сохранении пользователя:', error);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setOpen(true);
    };

    const handleDelete = async (userId) => {
        await deleteUser(userId);
        fetchAllUsers(); // Обновить данные после удаления
    };

    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    if (!user || user.role !== 'admin') {
        return <div>У вас нет доступа к этой странице</div>;
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>{currentUser._id ? 'Редактировать пользователя' : 'Добавить пользователя'}</Typography>
                    <TextField label="Имя пользователя" name="username" value={currentUser.username || ''} onChange={handleChange} fullWidth margin="dense" />
                    <TextField select label="Роль" name="role" value={currentUser.role || 'user'} onChange={handleChange} fullWidth margin="dense">
                        {['user', 'admin'].map(role => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField label="ФИО пользователя" name="fullName" value={currentUser.fullName || ''} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Пароль" name="password" type="password" value={currentUser.password || ''} onChange={handleChange} fullWidth margin="dense" />
                    <Button type="submit" variant="contained">Сохранить</Button>
                </Box>
            </Modal>
            <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default UsersPage;
