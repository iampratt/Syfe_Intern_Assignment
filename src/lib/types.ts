export type Currency = 'USD' | 'INR';

export interface Contribution {
  id: string;
  amount: number; // Stored in the Goal's currency
  date: string; // ISO string
  note?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currency: Currency;
  contributions: Contribution[];
  createdAt: string;
}

export interface UserSettings {
  preferredCurrency: Currency;
}
