const User = require('../models/User');
const md5 = require('md5');

const authController = {};

authController.ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.status(401).json({ message: 'Пользователь не аутентифицирован' });
};

authController.ensureAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Доступ запрещен' });
};

authController.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
    }
};

authController.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && user.comparePassword(password)) {
            req.session.regenerate((err) => {
                if (err) return res.status(500).json({ message: 'Ошибка при установке сессии' });
                req.session.user = user; // Сохраняем пользователя в сессии
                res.status(200).json({ user });
            });
        } else {
            res.status(401).json({ message: 'Неверные учетные данные' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

authController.createUser = async (req, res) => {
    const { username, password, fullName, role } = req.body;
    try {
        const user = new User({ username, password, fullName, role });
        await user.save(); // Убедитесь, что в схеме все обязательные поля
        res.status(201).json({ user });
    } catch (error) {
        console.error('Ошибка при создании пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера при создании пользователя' });
    }
};

authController.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Ошибка при выходе из системы' });
        res.status(200).json({ message: 'Вы успешно вышли из системы' });
    });
};

authController.updateUser = async (req, res) => {
    const userId = req.params.id;
    const requestingUser = req.session.user;

    // Проверка прав администратора или пользователя
    if (requestingUser.role === 'admin' || requestingUser._id === userId) {
        try {
            const updateFields = { ...req.body };

            // Хеширование пароля, если он передается
            if (req.body.password) {
                updateFields.password = md5(req.body.password); // Замените на актуальную функцию хеширования
            }

            const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении данных пользователя', error });
        }
    } else {
        res.status(403).json({ message: 'Недостаточно прав для выполнения операции' });
    }
};

authController.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при удалении пользователя' });
    }
};

module.exports = authController;