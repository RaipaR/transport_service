// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import OrdersTable from './components/OrdersTable';
import PreviewPage from './PreviewPage';
import { IconButton, Button, Modal, TextField, Box, Typography, MenuItem } from '@mui/material';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from './api/ordersApi';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]); // Состояние для списка заказов
    const [open, setOpen] = useState(false); // Состояние для открытия/закрытия модального окна создания заказа
    const [previewOpen, setPreviewOpen] = useState(false); // Состояние для открытия/закрытия модального окна предпросмотра
    const [editOpen, setEditOpen] = useState(false); // Состояние для открытия/закрытия модального окна редактирования заказа
    const [currentOrder, setCurrentOrder] = useState({}); // Состояние для текущего редактируемого заказа
    const navigate = useNavigate(); // Функция навигации

    // Функция для загрузки всех заказов
    const fetchAllOrders = async () => {
        const response = await fetchOrders();
        setOrders(response.data);
    };

    useEffect(() => {
        fetchAllOrders(); // Загрузка заказов при монтировании компонента
    }, []);

    const handlePreviewClose = () => setPreviewOpen(false); // Обработчик закрытия модального окна предпросмотра

    // Обработчик открытия модального окна для создания нового заказа
    const handleOpen = () => {
        setCurrentOrder({}); // Очистка данных текущего заказа
        setOpen(true); // Открытие модального окна
    };

    const handleClose = () => setOpen(false); // Обработчик закрытия модального окна создания заказа

    // Обработчик открытия модального окна для редактирования заказа
    const handleEditOpen = (order) => {
        setCurrentOrder(order); // Установка текущего заказа для редактирования
        setEditOpen(true); // Открытие модального окна
    };
    
    const handleEditClose = () => setEditOpen(false); // Обработчик закрытия модального окна редактирования заказа

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        setCurrentOrder({ ...currentOrder, [e.target.name]: e.target.value });
    };

    // Обработчик удаления заказа
    const handleDelete = async (orderId) => {
        await deleteOrder(orderId);
        toast.success("Заказ удален успешно"); // Уведомление об успешном удалении заказа
        fetchAllOrders(); // Обновление списка заказов после удаления
    };

    // Обработчик отправки формы создания/редактирования заказа
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentOrder._id) {
            await updateOrder(currentOrder._id, currentOrder);
            toast.success("Заказ обновлен успешно"); // Уведомление об успешном обновлении заказа
            setEditOpen(false); // Закрытие модального окна редактирования
        } else {
            await createOrder(currentOrder);
            toast.success("Заказ создан успешно"); // Уведомление об успешном создании заказа
            setOpen(false); // Закрытие модального окна создания
        }
        fetchAllOrders(); // Обновление списка заказов после сохранения
    };

    // Обработчик открытия модального окна предпросмотра заказа
    const handleOpenPreview = (order) => {
        navigate('/preview', { state: { order } }); // Перенаправление на страницу предпросмотра с передачей данных заказа
    };

    return (
        <div style={{width: '100%' }}>
            <Typography variant="h4" gutterBottom>Заказы</Typography>
            <IconButton onClick={handleOpen}>
                <AddIcon /> 
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6">Новый заказ</Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Клиент"
                        name="customer"
                        value={currentOrder.customer || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Исполнитель"
                        name="executor"
                        value={currentOrder.executor || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Точка А"
                        name="routea"
                        value={currentOrder.routea || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Точка Б"
                        name="routeb"
                        value={currentOrder.routeb || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Груз"
                        name="cargo"
                        value={currentOrder.cargo || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Транспортное средство"
                        name="vehicle"
                        value={currentOrder.vehicle || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="date"
                        label="Дата загрузки"
                        name="deliveryDate"
                        InputLabelProps={{ shrink: true }}
                        value={currentOrder.deliveryDate || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        label="Статус"
                        name="status"
                        value={currentOrder.status || ''}
                        onChange={handleChange}
                    >
                        {['Новый', 'В работе', 'Выполнен', 'Отменен'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" variant="contained" sx={{ mt: 3 }}>Сохранить</Button>
                </Box>
            </Modal>
            <Modal open={editOpen} onClose={handleEditClose}>
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography variant="h6">Редактировать заказ</Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Клиент"
                    name="customer"
                    value={currentOrder.customer || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Исполнитель"
                    name="executor"
                    value={currentOrder.executor || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Точка А"
                    name="routea"
                    value={currentOrder.routea || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Точка Б"
                    name="routeb"
                    value={currentOrder.routeb || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Груз"
                    name="cargo"
                    value={currentOrder.cargo || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Транспортное средство"
                    name="vehicle"
                    value={currentOrder.vehicle || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    type="date"
                    label="Дата загрузки"
                    name="deliveryDate"
                    InputLabelProps={{ shrink: true }}
                    value={currentOrder.deliveryDate || ''}
                    onChange={handleChange}
                />
                <TextField
                    select
                    margin="normal"
                    fullWidth
                    label="Статус"
                    name="status"
                    value={currentOrder.status || ''}
                    onChange={handleChange}
                >
                    {['Новый', 'В работе', 'Выполнен', 'Отменен'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>Сохранить</Button>
            </Box>
        </Modal>
            <OrdersTable orders={orders} openPreview={handleOpenPreview} openEdit={handleEditOpen} onDelete={handleDelete}/>
            {previewOpen && <PreviewPage open={previewOpen} onClose={handlePreviewClose}/>}
            {editOpen}
        </div>
    );
};

export default OrdersPage;
