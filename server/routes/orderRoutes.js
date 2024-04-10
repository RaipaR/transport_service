const express = require('express');
const router = express.Router();

// Подключаем контроллеры для работы с заказами
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

// Маршрут для получения списка всех заказов
router.get('/', getAllOrders);

// Маршрут для получения заказа по его ID
router.get('/:id', getOrderById);

// Маршрут для создания нового заказа
router.post('/', createOrder);

// Маршрут для обновления заказа по его ID
router.put('/:id', updateOrder);

// Маршрут для удаления заказа по его ID
router.delete('/:id', deleteOrder);

module.exports = router;
