// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchOrders = () => {
  return axios.get(`${API_BASE_URL}/api/orders`);
};

export const createOrder = (order) => {
  return axios.post(`${API_BASE_URL}/api/orders`, order);
};