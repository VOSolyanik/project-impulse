import axios from 'axios';

// Створюємо інстанс Axios
export const yourEnergyApi = axios.create({
  baseURL: 'https://your-energy.b.goit.study/api', // Базова URL-адреса для всіх запитів
});
