const express = require('express');
const router = express.Router();
const { getStocks, createStock, updateStock, deleteStock } = require('../controllers/stockController');

router.get('/', getStocks); // Убедитесь, что `getStocks` определен и доступен
router.post('/', createStock); // Маршрут для создания записи на складе
router.put('/:id', updateStock); // Маршрут для обновления записи на складе
router.delete('/:id', deleteStock); // Маршрут для удаления записи на складе


module.exports = router;