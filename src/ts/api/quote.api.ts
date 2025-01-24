
export const fetchQuote = async (): Promise<{ author: string; quote: string }> => {
    const response = await fetch('https://your-energy.b.goit.study/api/quote');
    if (!response.ok) {
        throw new Error('Failed to fetch quote');
    }
    return response.json();
};
