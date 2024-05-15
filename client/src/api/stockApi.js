// stockApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/stocks';

export const fetchStocks = () => axios.get(API_URL);
export const createStock = (stock) => axios.post(API_URL, stock);
export const updateStock = (id, stock) => axios.put(`${API_URL}/${id}`, stock);
export const deleteStock = (id) => axios.delete(`${API_URL}/${id}`);
export const fetchPhotos = (stockId) => axios.get(`${API_URL}/${stockId}/photos`);
export const addPhoto = (stockId, formData) => axios.post(`${API_URL}/${stockId}/photos`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const deletePhoto = (stockId, photo) => axios.delete(`${API_URL}/${stockId}/photos/${photo}`);
