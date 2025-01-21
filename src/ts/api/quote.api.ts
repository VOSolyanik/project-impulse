import { axiosGoit } from './axiosConfig';
import { QuoteResponse } from '../types/quote';

export const getQuoteOfTheDay = async (): Promise<QuoteResponse> => {
  const response = await axiosGoit.get<QuoteResponse>('/quote');
  return response.data;
};
