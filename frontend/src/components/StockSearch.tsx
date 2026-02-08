import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StockSearchProps {
    onSearch: (symbol: string) => void;
}

export const StockSearch = ({ onSearch }: StockSearchProps) => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.toUpperCase());
            setQuery("");
        }
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div
                    className={`
                        relative flex items-center bg-dark-card/60 backdrop-blur-xl border 
                        transition-all duration-300 rounded-bento h-14 px-5 shadow-soft
                        ${isFocused
                            ? "border-brand-500/50 shadow-glow ring-2 ring-brand-500/20"
                            : "border-white/10 hover:border-white/20"}
                    `}
                >
                    <Search className={`w-5 h-5 mr-3 transition-colors ${isFocused ? "text-brand-400" : "text-gray-400"}`} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for a stock symbol (e.g. AAPL, TSLA)..."
                        className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg font-medium"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-soft hover:shadow-soft-lg"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};
