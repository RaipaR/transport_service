// UsersPage.js
import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UsersTable from './components/UsersTable';
import { fetchUsers, createUser, updateUser, deleteUser } from './api/userApi'; // Импорт функций API для работы с пользователями
import { useAuth } from './context/AuthContext'; // Импорт хука для работы с контекстом аутентификации

// Стили модального окна
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
    const { user } = useAuth(); // Получение текущего пользователя из контекста аутентификации
    const [users, setUsers] = useState([]); // Состояние для списка пользователей
    const [open, setOpen] = useState(false); // Состояние для открытия/закрытия модального окна
    const [currentUser, setCurrentUser] = useState({}); // Состояние для текущего редактируемого пользователя

    // Функция для загрузки списка пользователей с сервера
    const fetchAllUsers = async () => {
        const response = await fetchUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        fetchAllUsers(); // Вызов функции загрузки пользователей при загрузке компонента
    }, []);

    // Обработчик открытия модального окна для добавления нового пользователя
    const handleOpen = () => {
        setCurrentUser({}); // Очистка данных текущего пользователя
        setOpen(true);
    };
    
    // Обработчик закрытия модального окна
    const handleClose = () => setOpen(false);

    // Обработчик отправки формы добавления/редактирования пользователя
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser._id) {
                await updateUser(currentUser); // Вызов функции обновления пользователя, если у него есть ID
            } else {
                await createUser(currentUser); // Вызов функции создания нового пользователя, если у него нет ID
            }
            setOpen(false); // Закрытие модального окна после сохранения
            fetchAllUsers(); // Обновление списка пользователей после сохранения
        } catch (error) {
            console.error('Ошибка при сохранении пользователя:', error); // Обработка ошибки при сохранении пользователя
        }
    };

    // Обработчик редактирования пользователя
    const handleEdit = (user) => {
        setCurrentUser(user); // Установка текущего редактируемого пользователя
        setOpen(true); // Открытие модального окна
    };

    // Обработчик удаления пользователя
    const handleDelete = async (userId) => {
        await deleteUser(userId); // Вызов функции удаления пользователя
        fetchAllUsers(); // Обновление списка пользователей после удаления
    };

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value }); // Обновление данных текущего пользователя при изменении полей формы
    };

    // Проверка наличия аутентифицированного пользователя и его роли перед отображением страницы
    if (!user || user.role !== 'admin') {
        return <div>У вас нет доступа к этой странице</div>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Пользователи</Typography>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        {currentUser._id ? 'Редактировать пользователя' : 'Добавить пользователя'}
                    </Typography>
                    <TextField 
                        label="Имя пользователя" 
                        name="username" 
                        value={currentUser.username || ''} 
                        onChange={handleChange} 
                        fullWidth 
                        margin="dense" 
                        />
                    <TextField 
                        select label="Роль" 
                        name="role" 
                        value={currentUser.role || 'user'} 
                        onChange={handleChange} 
                        fullWidth 
                        margin="dense">
                        {['user', 'admin'].map(role => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        label="ФИО пользователя" 
                        name="fullName" 
                        value={currentUser.fullName || ''} 
                        onChange={handleChange} 
                        fullWidth 
                        margin="dense" />
                    <TextField 
                        label="Пароль" 
                        name="password" 
                        type="password" 
                        value={currentUser.password || ''} 
                        onChange={handleChange} 
                        fullWidth 
                        margin="dense" />
                    <Button type="submit" variant="contained">Сохранить</Button>
                </Box>
            </Modal>
            <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default UsersPage;
