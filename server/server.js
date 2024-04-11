require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

// Импорт маршрутов
const orderRoutes = require('./routes/orderRoutes');
//const customerRoutes = require('./routes/customerRoutes');
//const vehicleRoutes = require('./routes/vehicleRoutes');

// Использование маршрутов
app.use('/api/orders', orderRoutes);
//app.use('/api/customers', customerRoutes);
//app.use('/api/vehicles', vehicleRoutes);

// Обработка запросов к корню сервера
app.get('/', (req, res) => {
  res.send('Welcome to the Order Management API!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

