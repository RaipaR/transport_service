// OrdersTable.js
import React from 'react';
import { deleteOrder } from '../api/ordersApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const OrdersTable = ({ orders, setOrders, openPreview }) => {
    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error("Ошибка при удалении заказа:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="таблица заказов">
                <TableHead>
                    <TableRow>
                        <TableCell>Клиент</TableCell>
                        <TableCell align="right">Транспортное средство</TableCell>
                        <TableCell align="right">Дата доставки</TableCell>
                        <TableCell align="right">Статус</TableCell>
                        <TableCell align="right">Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell component="th" scope="row">{order.customer}</TableCell>
                            <TableCell align="right">{order.vehicle}</TableCell>
                            <TableCell align="right">{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
                            <TableCell align="right">{order.status}</TableCell>
                            <TableCell align="right">
                                <Button 
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteOrder(order._id)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Удалить
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => openPreview(order)}
                                >
                                    Предварительный просмотр
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTable;
