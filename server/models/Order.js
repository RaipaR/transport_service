const mongoose = require('mongoose');
const { incrementCounter } = require('./counterModel');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now },
    customer: { type: String, required: true },
    executor: { type: String, required: true },
    routea: { type: String, required: true },
    routeb: { type: String, required: true },
    cargo: { type: String, required: true },
    vehicle: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    status: { type: String, required: true,
        enum: ['Новый', 'В работе', 'Выполнен', 'Отменен'] }
    
});

orderSchema.pre('save', async function(next) {
    if (this.isNew) {
      this.orderNumber = await incrementCounter('order');
    }
    next();
  });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;




