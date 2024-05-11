// client/src/api/userApi.js
import axios from './axiosInstance';

export const loginUser = credentials => axios.post('/users/login', credentials);
export const logoutUser = () => axios.post('/users/logout');
export const fetchUsers = () => axios.get('/users');
export const createUser = userData => axios.post('/users/register', userData);
export const deleteUser = id => axios.delete(`/users/${id}`);
export const updateUser = userData => axios.put(`/users/${userData._id}`, userData);
