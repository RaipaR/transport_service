// src/App.js
import React, { useState } from 'react';
import OrdersTable from './components/OrdersTable';
import OrdersPage from './OrdersPage';
import { Container } from '@mui/material';

const App = () => {
  const [orders, setOrders] = useState([]);

  const handleSaveOrder = (savedOrder) => {
      setOrders([...orders, savedOrder]);
  };

  return (
    <Container maxWidth="lg">
      <h1>Заказы</h1>
      <OrdersPage />
      <OrdersTable />
    </Container>
  );
};

export default App;