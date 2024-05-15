import axios from './axiosInstance';

// Функция для получения всех логов
export const fetchLogs = () => axios.get('logs');
