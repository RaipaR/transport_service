const User = require('../models/User'); // Подключение модели пользователя
const LogEntry = require('../models/LogEntry'); // Подключение модели журнала действий
const md5 = require('md5'); // Подключение библиотеки для хеширования паролей

const authController = {}; // Создание объекта контроллера аутентификации

// Метод для проверки аутентификации пользователя
authController.ensureAuthenticated = (req, res, next) => {
  if (req.session.user) { // Проверка наличия пользователя в сессии
    return next(); // Переход к следующему middleware
  }
  return res.status(401).json({ message: 'Пользователь не аутентифицирован' }); // Отправка ошибки 401
};

// Метод для проверки административных прав доступа
authController.ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') { // Проверка роли пользователя
    return next(); // Переход к следующему middleware
  }
  return res.status(403).json({ message: 'Доступ запрещен' }); // Отправка ошибки 403
};

// Метод для получения списка всех пользователей
authController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Поиск всех пользователей без поля пароля
    res.json(users); // Отправка списка пользователей
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении списка пользователей' }); // Отправка ошибки 500
  }
};

// Метод для авторизации пользователя
authController.login = async (req, res) => {
  try {
    const { username, password } = req.body; // Получение имени пользователя и пароля из запроса
    const user = await User.findOne({ username }); // Поиск пользователя по имени
    if (user && await user.comparePassword(password)) { // Проверка наличия пользователя и сравнение паролей
      req.session.regenerate((err) => { // Создание новой сессии
        if (err) return res.status(500).json({ message: 'Ошибка при установке сессии' }); // Отправка ошибки 500
        req.session.user = user; // Установка пользователя в сессию

        const logEntry = new LogEntry({ // Создание записи в журнале действий
          user: user._id,
          action: 'LOGIN',
          details: `Пользователь ${user.username} вошел в систему`
        });
        logEntry.save(); // Сохранение записи в базе данных

        res.status(200).json({ user }); // Отправка успешного ответа с данными пользователя
      });
    } else {
      res.status(401).json({ message: 'Неверные учетные данные' }); // Отправка ошибки 401
    }
  } catch (error) {
    res.status(500).json({ message: 'Внутренняя ошибка сервера' }); // Отправка ошибки 500
  }
};

// Метод для создания нового пользователя
authController.createUser = async (req, res) => {
  const { username, password, fullName, role } = req.body; // Получение данных нового пользователя из запроса
  try {
    const user = new User({ username, password, fullName, role }); // Создание нового объекта пользователя
    await user.save(); // Сохранение пользователя в базе данных
    res.status(201).json({ user }); // Отправка успешного ответа с данными созданного пользователя
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error); // Вывод ошибки в консоль
    res.status(500).json({ message: 'Ошибка сервера при создании пользователя' }); // Отправка ошибки 500
  }
};

// Метод для выхода пользователя из системы
authController.logout = (req, res) => {
  req.session.destroy((err) => { // Удаление сессии пользователя
    if (err) return res.status(500).json({ message: 'Ошибка при выходе из системы' }); // Отправка ошибки 500
    res.status(200).json({ message: 'Вы успешно вышли из системы' }); // Отправка успешного ответа
  });
};

// Метод для обновления данных пользователя
authController.updateUser = async (req, res) => {
  const userId = req.params.id; // Получение идентификатора пользователя из параметров запроса
  const requestingUser = req.session.user; // Получение текущего пользователя из сессии

  if (requestingUser.role === 'admin' || requestingUser._id === userId) { // Проверка прав доступа
    try {
      const updateFields = { ...req.body }; // Получение обновленных данных из запроса

      if (req.body.password) { // Хеширование нового пароля, если он был изменен
        updateFields.password = md5(req.body.password);
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true }); // Обновление данных пользователя
      res.status(200).json(updatedUser); // Отправка успешного ответа с обновленными данными пользователя
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении данных пользователя', error }); // Отправка ошибки 500
    }
  } else {
    res.status(403).json({ message: 'Недостаточно прав для выполнения операции' }); // Отправка ошибки 403
  }
};

// Метод для удаления пользователя
authController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Получение идентификатора пользователя из параметров запроса
    const deletedUser = await User.findByIdAndDelete(id); // Удаление пользователя из базы данных

    if (!deletedUser) { // Проверка успешности удаления пользователя
      return res.status(404).json({ message: 'Пользователь не найден' }); // Отправка ошибки 404
    }

    res.status(200).json({ message: 'Пользователь успешно удален' }); // Отправка успешного ответа
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера при удалении пользователя' }); // Отправка ошибки 500
  }
};

module.exports = authController; // Экспорт контроллера аутентификации