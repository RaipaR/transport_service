// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import OrdersTable from './components/OrdersTable';
//import OrderPreviewPrint from './components/OrderPreviewPrint';
import PreviewPage from './PreviewPage';
import { Button, Modal, TextField, Box, Typography, MenuItem } from '@mui/material';
import { createOrder, fetchOrders } from './api/ordersApi';

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
  //  const [currentOrder, setCurrentOrder] = useState({});
    const [formData, setFormData] = useState({
        customer: '',
        vehicle: '',
        deliveryDate: '',
        status: '',
    });

    useEffect(() => {
        const loadOrders = async () => {
            const response = await fetchOrders();
            setOrders(response.data);
        };
        loadOrders().catch(console.error);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handlePreviewClose = () => setPreviewOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createOrder(formData);
            setOrders([...orders, response.data]);
            handleClose();
        } catch (error) {
            console.error("Ошибка при создании заказа:", error);
        }
    };

    const navigate = useNavigate();

    const handleOpenPreview = (order) => {
      navigate('/preview', { state: { order } });
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Создать заказ</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6">Новый заказ</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Клиент"
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Транспортное средство"
                        name="vehicle"
                        value={formData.vehicle}
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
                        value={formData.deliveryDate}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="normal"
                        required
                        fullWidth
                        label="Статус"
                        name="status"
                        value={formData.status}
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
            <OrdersTable orders={orders} openPreview={handleOpenPreview} />
            {previewOpen && <PreviewPage open={previewOpen} onClose={handlePreviewClose}/>}
        </div>
    );
};

export default OrdersPage;
