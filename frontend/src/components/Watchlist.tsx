import { Plus, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const watchlistData = [
    { symbol: "AAPL", price: 189.45, chg: 1.23, chgP: 0.65 },
    { symbol: "TSLA", price: 215.30, chg: -4.50, chgP: -2.05 },
    { symbol: "NVDA", price: 485.10, chg: 12.40, chgP: 2.62 },
    { symbol: "AMZN", price: 145.20, chg: 0.80, chgP: 0.55 },
    { symbol: "MSFT", price: 370.40, chg: -1.10, chgP: -0.30 },
    { symbol: "GOOGL", price: 138.80, chg: 2.30, chgP: 1.68 },
];

export const Watchlist = () => {
    return (
        <div className="h-full flex flex-col bento-card p-4 md:p-6 shadow-soft-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-white">Watchlist</h3>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                        <Plus size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2">
                {watchlistData.map((item, index) => (
                    <motion.div
                        key={item.symbol}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-dark-card/30 hover:bg-dark-card/50 rounded-xl p-4 cursor-pointer transition-all duration-200 border border-white/5 hover:border-white/10 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white text-lg">{item.symbol}</span>
                            <span className="text-right text-white font-medium">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <span className={`text-sm font-medium ${item.chg >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {item.chg > 0 ? "+" : ""}{item.chg.toFixed(2)}
                            </span>
                            <span className={`text-sm font-medium px-2 py-0.5 rounded-md ${
                                item.chgP >= 0 
                                    ? 'bg-emerald-500/20 text-emerald-400' 
                                    : 'bg-rose-500/20 text-rose-400'
                            }`}>
                                {item.chgP > 0 ? "+" : ""}{item.chgP.toFixed(2)}%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
