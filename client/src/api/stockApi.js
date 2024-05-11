// stockApi.js
import axios from './axiosInstance';

export const fetchStocks = () => axios.get('stocks');
export const createStock = (stockData) => axios.post('stocks', stockData);
export const updateStock = (id, stockData) => axios.put(`stocks/${id}`, stockData);
export const deleteStock = (id) => axios.delete(`stocks/${id}`);
