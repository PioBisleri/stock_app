import { useState } from 'react';
import { Layout } from './components/Layout';
import { StockSearch } from './components/StockSearch';
import { StockChart } from './components/StockChart';
import { PredictionCard } from './components/PredictionCard';
import { stockApi, Stock, StockPrice, Prediction } from './api/client';
import { Activity, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
    const [stock, setStock] = useState<Stock | null>(null);
    const [history, setHistory] = useState<StockPrice[]>([]);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (symbol: string) => {
        setLoading(true);
        setError('');
        setPredictions([]);
        setStock(null);

        try {
            const stockData = await stockApi.addStock(symbol);
            setStock(stockData);
            const historyData = await stockApi.getHistory(symbol);
            setHistory(historyData);
            const predictionData = await stockApi.getPredictions(symbol);
            setPredictions(predictionData);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch stock data. Please check the symbol and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            {/* Search State - Empty State */}
            {!stock && !loading && (
                <div className="h-full flex flex-col items-center justify-center bento-card p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-md"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Enter a Symbol to Analyze</h2>
                        <p className="text-gray-400 mb-8">Search for any stock symbol to view detailed charts and AI predictions</p>
                        <StockSearch onSearch={handleSearch} />
                    </motion.div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="h-full flex items-center justify-center bento-card">
                    <div className="text-center">
                        <Activity className="animate-spin text-brand-500 w-12 h-12 mx-auto mb-4" />
                        <p className="text-gray-400">Loading stock data...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="bento-card p-4 bg-rose-500/10 border-rose-500/20 flex items-center gap-3 text-rose-300 shadow-soft-lg">
                        <AlertCircle size={20} />
                        <span className="font-medium">{error}</span>
                    </div>
                </motion.div>
            )}

            {/* Main Analysis View - Bento Grid Layout */}
            {stock && !loading && (
                <div className="grid grid-cols-12 gap-4 md:gap-bento h-full">
                    {/* Chart - Takes most of the space */}
                    <div className="col-span-12 lg:col-span-8">
                        <StockChart data={history} symbol={stock.symbol} />
                    </div>

                    {/* Predictions Panel - Side card */}
                    <div className="col-span-12 lg:col-span-4">
                        <PredictionCard
                            predictions={predictions}
                            currentPrice={history.length > 0 ? history[history.length - 1].close : 0}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default App;
