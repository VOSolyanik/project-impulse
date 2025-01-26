import axios from 'axios';

export const yourEnergyApi = axios.create({
  baseURL: 'https://your-energy.b.goit.study/api',
});
