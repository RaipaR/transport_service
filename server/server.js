require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Импорт маршрутов
const orderRoutes = require('./routes/orderRoutes');
//const customerRoutes = require('./routes/customerRoutes');
const stockRoutes = require('./routes/stockRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Использование маршрутов
app.use('/api/orders', orderRoutes);
//app.use('/api/customers', customerRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/users', userRoutes);

// Стандартный маршрут для проверки, что сервер работает
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Запуск сервера
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});