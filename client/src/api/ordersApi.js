import axios from './axiosInstance';

export const fetchOrders = () => axios.get('orders');
export const createOrder = (orderData) => axios.post('orders', orderData);
export const updateOrder = (id, orderData) => axios.put(`orders/${id}`, orderData);
export const deleteOrder = (id) => axios.delete(`orders/${id}`);
