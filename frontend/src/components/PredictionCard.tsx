import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface Prediction {
    date: string;
    predicted_price: number;
}

interface PredictionCardProps {
    predictions: Prediction[];
    currentPrice: number;
}

export const PredictionCard = ({ predictions, currentPrice }: PredictionCardProps) => {
    if (!predictions.length) return null;

    const nextPrediction = predictions[0];
    const lastPrediction = predictions[predictions.length - 1];
    const isUpward = lastPrediction.predicted_price > currentPrice;
    const percentageChange = ((lastPrediction.predicted_price - currentPrice) / currentPrice) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bento-card p-6 relative overflow-hidden shadow-soft-lg"
        >
            {/* Background gradient decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-accent-teal/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
                <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">AI Forecast</h3>

                <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-white">
                        ${lastPrediction.predicted_price.toFixed(2)}
                    </span>
                    <span className={`flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-lg ${
                        isUpward 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-rose-500/20 text-rose-400'
                    }`}>
                        {isUpward ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(percentageChange).toFixed(2)}%
                    </span>
                </div>

                <div className="space-y-2">
                    {predictions.map((pred, i) => (
                        <motion.div
                            key={pred.date}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between text-sm py-2.5 px-3 rounded-lg bg-dark-card/30 hover:bg-dark-card/50 transition-colors border border-white/5"
                        >
                            <span className="text-gray-400 font-medium">
                                {new Date(pred.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-white font-semibold">${pred.predicted_price.toFixed(2)}</span>
                                {i === 0 && (
                                    <span className="text-xs px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                                        Next
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
