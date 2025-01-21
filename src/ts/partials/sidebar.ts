
import { fetchQuote } from '../api/quote.api';
import { Quote } from '../types/quote';

export class QuoteOfTheDay {
  private static readonly LOCAL_STORAGE_KEY = 'quoteOfTheDay';

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

  private getStoredQuote(): { quote: Quote; date: string } | null {
    const storedData = localStorage.getItem(QuoteOfTheDay.LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  private storeQuote(quote: Quote, date: string): void {
    const data = { quote, date };
    localStorage.setItem(QuoteOfTheDay.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  private renderQuote(quote: Quote): void {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    if (quoteElement) quoteElement.textContent = quote.quote;
    if (authorElement) authorElement.textContent = quote.author;
  }
}

// Initialization should be moved to a business logic module.
// Added just for the testing purposes
const quote = new QuoteOfTheDay();
quote.initialize();
