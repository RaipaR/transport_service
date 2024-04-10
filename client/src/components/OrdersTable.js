import React, { useEffect, useState } from 'react';
import { fetchOrders, deleteOrder } from '../api/ordersApi'; // Подключаем функцию deleteOrder из API
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders()
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => console.error("Ошибка при получении заказов:", error));
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId); // Вызываем функцию deleteOrder для удаления заказа
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId)); // Обновляем список заказов после удаления
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
                            <TableCell align="right"><button onClick={() => handleDeleteOrder(order._id)}>Удалить</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTable;