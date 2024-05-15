const LogEntry = require('../models/LogEntry'); // Импорт модели LogEntry для работы с логами

// Получение всех логов с информацией о пользователях, которые их создали, с сортировкой по дате создания в обратном порядке
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await LogEntry.find() // Поиск всех логов в базе данных
            .populate('user', 'username') // Заполнение поля 'user' информацией о пользователе (только имя пользователя)
            .sort({ createdAt: -1 }); // Сортировка логов по полю 'createdAt' в обратном порядке
        res.json(logs); // Отправка списка логов в формате JSON клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении логов', error }); // Отправка сообщения об ошибке на сервере
    }
};