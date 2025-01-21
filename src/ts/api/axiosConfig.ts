import axios from 'axios';

// Створюємо інстанс Axios
export const axiosGoit = axios.create({
  baseURL: 'https://your-energy.b.goit.study/api/', // Базова URL-адреса для всіх запитів
  timeout: 10000, // Тайм-аут запиту (в мілісекундах)
});
