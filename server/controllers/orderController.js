// orderController.js

// Импорт моделей
const Order = require('../models/Order');
const LogEntry = require('../models/LogEntry');

// Получение всех заказов
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Получение всех заказов из базы данных
        res.json(orders); // Отправка списка заказов в формате JSON клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении заказов', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Создание нового заказа
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body); // Создание нового заказа на основе данных из запроса
        const savedOrder = await newOrder.save(); // Сохранение нового заказа в базе данных

        // Создание записи в логе о создании заказа
        const logEntry = new LogEntry({
            user: req.session.user._id, // Идентификатор пользователя, создавшего заказ (в данном случае, из сессии)
            action: 'CREATE', // Действие: создание
            details: `Создан заказ: ${savedOrder.orderNumber}` // Детали: номер созданного заказа
        });
        await logEntry.save(); // Сохранение записи в логе

        res.json(savedOrder); // Отправка информации о созданном заказе клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании заказа', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Обновление заказа
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Обновление заказа в базе данных

        // Создание записи в логе об обновлении заказа
        const logEntry = new LogEntry({
            user: req.session.user._id, // Идентификатор пользователя, обновившего заказ (в данном случае, из сессии)
            action: 'UPDATE', // Действие: обновление
            details: `Обновлен заказ: ${updatedOrder.orderNumber}` // Детали: номер обновленного заказа
        });
        await logEntry.save(); // Сохранение записи в логе

        res.json(updatedOrder); // Отправка информации о обновленном заказе клиенту
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при обновлении заказа', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Удаление заказа
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id); // Удаление заказа из базы данных

        // Создание записи в логе об удалении заказа
        const logEntry = new LogEntry({
            user: req.session.user._id, // Идентификатор пользователя, удалившего заказ (в данном случае, из сессии)
            action: 'DELETE', // Действие: удаление
            details: `Удален заказ: ${deletedOrder.orderNumber}` // Детали: номер удаленного заказа
        });
        await logEntry.save(); // Сохранение записи в логе

        res.json({ message: 'Заказ успешно удален' }); // Отправка сообщения об успешном удалении заказа клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении заказа', error }); // Отправка сообщения об ошибке на сервере
    }
};