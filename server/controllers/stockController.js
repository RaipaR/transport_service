// stockController.js

// Импорт модели Stock и необходимых модулей
const Stock = require('../models/Stock');
const fs = require('fs');
const path = require('path');

// Получение всех записей о товарах на складе
exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find(); // Получение всех записей о товарах из базы данных
        res.json(stocks); // Отправка списка записей о товарах в формате JSON клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении записей', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Создание новой записи о товаре на складе
exports.createStock = async (req, res) => {
    try {
        const newStock = new Stock(req.body); // Создание новой записи о товаре на основе данных из запроса
        const savedStock = await newStock.save(); // Сохранение новой записи о товаре в базе данных
        res.json(savedStock); // Отправка информации о созданной записи о товаре клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании записи', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Обновление записи о товаре на складе
exports.updateStock = async (req, res) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Обновление записи о товаре в базе данных
        res.json(updatedStock); // Отправка информации о обновленной записи о товаре клиенту
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при обновлении записи', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Удаление записи о товаре на складе
exports.deleteStock = async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id); // Удаление записи о товаре из базы данных
        res.json({ message: 'Запись успешно удалена' }); // Отправка сообщения об успешном удалении записи клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении записи', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Получение фотографий товара на складе
exports.getStockPhotos = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id); // Поиск записи о товаре в базе данных по идентификатору
        if (!stock) {
            return res.status(404).json({ message: 'Запись не найдена' }); // Возвращение ошибки, если запись не найдена
        }
        res.json(stock.photos); // Отправка списка фотографий товара клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении фотографий', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Загрузка фотографий товара на склад
exports.uploadStockPhotos = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id); // Поиск записи о товаре в базе данных по идентификатору
        if (!stock) {
            return res.status(404).json({ message: 'Запись не найдена' }); // Возвращение ошибки, если запись не найдена
        }

        req.files.forEach(file => { // Обработка каждого загруженного файла
            const ext = path.extname(file.originalname); // Получение расширения файла
            const newFilename = `${file.filename}${ext}`; // Генерация нового имени файла с учетом расширения
            fs.renameSync(file.path, path.join('public', newFilename)); // Перемещение файла в папку 'public' с новым именем
            stock.photos.push(newFilename); // Добавление имени файла в список фотографий товара
        });

        await stock.save(); // Сохранение обновленной записи о товаре
        res.json(stock.photos); // Отправка списка фотографий товара клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при загрузке фотографий', error }); // Отправка сообщения об ошибке на сервере
    }
};

// Удаление фотографии товара со склада
exports.deleteStockPhoto = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id); // Поиск записи о товаре в базе данных по идентификатору
        if (!stock) {
            return res.status(404).json({ message: 'Запись не найдена' }); // Возвращение ошибки, если запись не найдена
        }

        const photoIndex = stock.photos.indexOf(req.params.photo); // Поиск индекса удаляемой фотографии в списке фотографий товара
        if (photoIndex > -1) {
            stock.photos.splice(photoIndex, 1); // Удаление фотографии из списка фотографий товара
            fs.unlinkSync(path.join('public', req.params.photo)); // Удаление файла фотографии из папки 'public'
            await stock.save(); // Сохранение обновленной записи о товаре
        }

        res.json(stock.photos); // Отправка списка оставшихся фотографий товара клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении фотографии', error }); // Отправка сообщения об ошибке на сервере
    }
};