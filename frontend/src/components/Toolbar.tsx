import { LineChart, TrendingUp, BarChart3, PieChart, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Toolbar = () => {
    const [activeTool, setActiveTool] = useState(0);
    
    const tools = [
        { icon: LineChart, label: "Charts" },
        { icon: TrendingUp, label: "Trends" },
        { icon: BarChart3, label: "Analysis" },
        { icon: PieChart, label: "Portfolio" },
    ];

    return (
        <div className="flex flex-col items-center gap-3 py-6">
            {tools.map((tool, i) => (
                <motion.button
                    key={i}
                    onClick={() => setActiveTool(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        transition-all duration-200 relative group
                        ${activeTool === i 
                            ? 'bg-gradient-to-br from-brand-500/30 to-accent-teal/30 text-brand-300 shadow-soft-lg shadow-glow' 
                            : 'bg-dark-card/50 text-gray-400 hover:text-white hover:bg-dark-card/70 shadow-soft'
                        }
                    `}
                >
                    <tool.icon size={22} />
                    {/* Tooltip */}
                    <span className="absolute left-full ml-3 bg-dark-card/95 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-soft-lg">
                        {tool.label}
                    </span>
                </motion.button>
            ))}

            <div className="w-8 h-px bg-white/10 my-2" />

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-dark-card/50 text-gray-400 hover:text-white hover:bg-dark-card/70 shadow-soft transition-all duration-200"
            >
                <Settings size={22} />
            </motion.button>
        </div>
    );
};
