import { yourEnergyApi } from './base';
import { QuoteOfDay } from '@/types/quote-of-day';

const fetchQuote = async (): Promise<QuoteOfDay> => {
  const response = await yourEnergyApi.get<QuoteOfDay>(
    '/quote'
  );
  return response.data;
};

export { fetchQuote };
