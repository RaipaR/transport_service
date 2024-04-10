import React, { useState, useEffect } from 'react';
import { createOrder, fetchOrders } from './api/ordersApi';
import OrderForm from './components/OrderForm'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

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
    const [showCreateForm, setShowCreateForm] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchOrders()
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => console.error("Ошибка при получении заказов:", error));
    }, []);

    const handleCreateOrder = async (formData) => {
        try {
            const response = await createOrder(formData);
            setOrders(prevOrders => [...prevOrders, response.data]);
            setShowCreateForm(false); // Закрываем форму после создания заказа
        } catch (error) {
            console.error('Failed to create the order:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>Создать заказ</Button>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">            
                <Box sx={style}>
                    <OrderForm onSave={handleCreateOrder} />
                </Box>
            </Modal>
        </div>
    );
    
};


export default OrdersPage;

