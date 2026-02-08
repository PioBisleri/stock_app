import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
    baseURL: API_URL,
});

export interface Stock {
    id: number;
    symbol: string;
    name: string;
    sector: string;
}

export interface StockPrice {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface Prediction {
    date: string;
    predicted_price: number;
}

export const stockApi = {
    // Add stock (fetch from Alpha Vantage if needed)
    addStock: async (symbol: string): Promise<Stock> => {
        const response = await api.post<Stock>(`/stocks/${symbol}`);
        return response.data;
    },

    // Get historical data
    getHistory: async (symbol: string): Promise<StockPrice[]> => {
        const response = await api.get<StockPrice[]>(`/stocks/${symbol}/history`);
        return response.data;
    },

    // Get predictions
    getPredictions: async (symbol: string, days: number = 5): Promise<Prediction[]> => {
        const response = await api.get<Prediction[]>(`/stocks/${symbol}/predict?days=${days}`);
        return response.data;
    }
};
