const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Новый', 'В работе', 'Выполнен', 'Отменен'] // Пример возможных статусов заказа
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;