// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import OrdersTable from './components/OrdersTable';
import PreviewPage from './PreviewPage';
import { IconButton, Button, Modal, TextField, Box, Typography, MenuItem } from '@mui/material';
import { createOrder, fetchOrders, updateOrder, deleteOrder } from './api/ordersApi';

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

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [formData, setFormData] = useState({
        customer: '',
        executor: '',
        routea: '',
        routeb: '',
        cargo: '',
        vehicle: '',
        deliveryDate: '',
        status: '',
    });

 

    const fetchAllOrders = async () => {
        const response = await fetchOrders();
        setOrders(response.data);
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handlePreviewClose = () => setPreviewOpen(false);

    const handleOpen = () => {
        setCurrentOrder({});
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleEditOpen = (order) => {
        setCurrentOrder(order);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);

    const handleChange = (e) => {
        setCurrentOrder({ ...currentOrder, [e.target.name]: e.target.value });
    };

    const handleDelete = async (orderId) => {
        await deleteOrder(orderId);
        fetchAllOrders(); // Обновить данные после удаления
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentOrder._id) {
            await updateOrder(currentOrder._id, currentOrder);
            setEditOpen(false);
        } else {
            await createOrder(currentOrder);
            setOpen(false);
        }
        fetchAllOrders(); // Обновить данные после сохранения
    };

    const navigate = useNavigate();

    const handleOpenPreview = (order) => {
        navigate('/preview', { state: { order } });
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(currentOrder._id, formData);
            setOrders(prevOrders => prevOrders.map(order => order._id === currentOrder._id ? { ...order, ...formData } : order));
            handleEditClose();
        } catch (error) {
            console.error("Ошибка при обновлении заказа:", error);
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddIcon /> 
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6">Новый заказ</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Клиент"
                        name="customer"
                        value={currentOrder.customer}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Исполнитель"
                        name="executor"
                        value={currentOrder.executor}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Точка А"
                        name="routea"
                        value={currentOrder.routea}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Точка Б"
                        name="routeb"
                        value={currentOrder.routeb}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Груз"
                        name="cargo"
                        value={currentOrder.cargo}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Транспортное средство"
                        name="vehicle"
                        value={currentOrder.vehicle}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="date"
                        label="Дата доставки"
                        name="deliveryDate"
                        InputLabelProps={{ shrink: true }}
                        value={currentOrder.deliveryDate}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="normal"
                        required
                        fullWidth
                        label="Статус"
                        name="status"
                        value={currentOrder.status}
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
                    value={currentOrder.customer}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Исполнитель"
                    name="executor"
                    value={currentOrder.executor}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Точка А"
                    name="routea"
                    value={currentOrder.routea}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Точка Б"
                    name="routeb"
                    value={currentOrder.routeb}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Груз"
                    name="cargo"
                    value={currentOrder.cargo}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Транспортное средство"
                    name="vehicle"
                    value={currentOrder.vehicle}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    type="date"
                    label="Дата доставки"
                    name="deliveryDate"
                    InputLabelProps={{ shrink: true }}
                    value={currentOrder.deliveryDate}
                    onChange={handleChange}
                />
                <TextField
                    select
                    margin="normal"
                    fullWidth
                    label="Статус"
                    name="status"
                    value={currentOrder.status}
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
