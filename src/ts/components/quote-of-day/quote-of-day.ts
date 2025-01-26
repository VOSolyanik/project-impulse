import { fetchQuote } from '@/api/quote.api';
import { QuoteOfDay } from '@/types/quote-of-day';

export class QuoteOfTheDay {
  private static readonly LOCAL_STORAGE_KEY = 'yourEnergy.quoteOfTheDay';

  public async initialize(): Promise<void> {
    const storedData = this.getStoredQuote();
    const today = new Date().toISOString().split('T')[0];

    if (storedData && storedData.date === today) {
      this.renderQuote(storedData.quote);
      return;
    }

    try {
      const quote = await fetchQuote();
      this.storeQuote(quote, today);
      this.renderQuote(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }

  private getStoredQuote(): { quote: QuoteOfDay; date: string } | null {
    const storedData = localStorage.getItem(QuoteOfTheDay.LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  private storeQuote(quote: QuoteOfDay, date: string): void {
    const data = { quote, date };
    localStorage.setItem(QuoteOfTheDay.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  private renderQuote(quote: QuoteOfDay): void {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    if (quoteElement) quoteElement.textContent = quote.quote;
    if (authorElement) authorElement.textContent = quote.author;
  }
}
