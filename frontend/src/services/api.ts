import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export interface Stock {
    id: number;
    symbol: string;
    name: string;
    sector: string;
    created_at: string;
}

export interface StockPrice {
    id: number;
    stock_id: number;
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

export const api = {
    addStock: async (symbol: string): Promise<Stock> => {
        const response = await axios.post(`${API_URL}/stocks/${symbol}`);
        return response.data;
    },

    getHistory: async (symbol: string): Promise<StockPrice[]> => {
        const response = await axios.get(`${API_URL}/stocks/${symbol}/history`);
        return response.data;
    },

    getPrediction: async (symbol: string, days: int = 5): Promise<Prediction[]> => {
        const response = await axios.get(`${API_URL}/stocks/${symbol}/predict?days=${days}`);
        return response.data;
    }
};
