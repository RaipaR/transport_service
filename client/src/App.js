import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Sidebar from './components/Sidebar'; // Убедитесь, что путь к Sidebar корректен
import OrdersPage from './OrdersPage'; // Импортируйте компоненты ваших страниц
import PreviewPage from './PreviewPage';
// import ClientsPage from './ClientsPage';
// import WarehousePage from './WarehousePage';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Отображение Sidebar */}
        <Container style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<h1>Добро пожаловать в систему управления заказами</h1>} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            {/* Когда страницы будут готовы, раскомментируйте эти маршруты */}
            {/* <Route path="/clients" element={<ClientsPage />} /> */}
            {/* <Route path="/warehouse" element={<WarehousePage />} /> */}
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
