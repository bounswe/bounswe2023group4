export interface ExchangeRateCardProps {
currency?: ExchangeRate;
}
export interface ExchangeRate {
    fromCurrency: string;
    toCurrency: string;
    date: string;
    amount: number;
    exchangeRate: number;
}