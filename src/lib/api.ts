
const API_URL = 'https://open.er-api.com/v6/latest/USD';

export async function fetchExchangeRate(): Promise<number> {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error('Failed to fetch exchange rate');
        }
        const data = await res.json();
        return data.rates.INR; // We only need USD -> INR for this specific assignment scope
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}
