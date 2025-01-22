
// first draft to present functionality
// TODO: refactor with Axios and the approach suggested by team leaed
export const fetchQuote = async (): Promise<{ author: string; quote: string }> => {
    const response = await fetch('https://your-energy.b.goit.study/api/quote');
    if (!response.ok) {
        throw new Error('Failed to fetch quote');
    }
    return response.json();
};


// --- saved as a draft after code conflict resolution ---

// import { yourEnergyApi } from './base';
// import { QuoteOfDay } from '../types/quote';

// export const getQuoteOfTheDay = async (): Promise<QuoteOfDay> => {
//   const response = await yourEnergyApi.get<QuoteOfDay>('/quote');
//   return response.data;
// };

