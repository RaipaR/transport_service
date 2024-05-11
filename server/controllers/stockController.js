const Stock = require('../models/Stock');


exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find(); // Получить все записи на складе
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении записей на складе' });
    }
};

exports.createStock = async (req, res) => {
    try {
        const newStock = new Stock(req.body);
        if (req.file) newStock.photo = req.file.filename;
        await newStock.save();
        res.json(newStock);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании записи на складе' });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) updatedStock.photo = req.file.filename;
        await updatedStock.save();
        res.json(updatedStock);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении записи на складе' });
    }
};

exports.deleteStock = async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.json({ message: 'Запись успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении записи на складе' });
    }
};