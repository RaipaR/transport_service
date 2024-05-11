import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/',
    withCredentials: true  
    // Другие глобальные настройки можно добавить здесь
});

export default axiosInstance;