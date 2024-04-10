const Order = require('../models/Order');

// Получить список всех заказов
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить заказ по его ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создать новый заказ
const createOrder = async (req, res) => {
  const { customer, vehicle, deliveryDate, status } = req.body;

  if (!customer || !vehicle || !deliveryDate || !status) {
      return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
  }

  try {
      const order = new Order({
          customer,
          vehicle,
          deliveryDate,
          status
      });

      const newOrder = await order.save();
      res.status(201).json(newOrder);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Обновить заказ по его ID
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Удалить заказ по его ID
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            res.json({ message: 'Заказ удален' });
        } else {
            res.status(404).json({ message: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
