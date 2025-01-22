import { yourEnergyApi } from './base';
import { QuoteOfDay } from '../types/quote';

export const getQuoteOfTheDay = async (): Promise<QuoteOfDay> => {
  const response = await yourEnergyApi.get<QuoteOfDay>('/quote');
  return response.data;
};
