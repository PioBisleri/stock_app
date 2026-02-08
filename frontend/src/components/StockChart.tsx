import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";

interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface StockChartProps {
    data: StockData[];
    symbol: string;
}

export const StockChart = ({ data, symbol }: StockChartProps) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500 bento-card p-8">
                <p className="text-gray-400">Loading or No Data...</p>
            </div>
        );
    }

    const latestPrice = data[data.length - 1].close;
    const startPrice = data[0].close;
    const isPositive = latestPrice >= startPrice;
    const positiveColor = "#2dd4bf";
    const negativeColor = "#fb7185";
    const color = isPositive ? positiveColor : negativeColor;

    return (
        <div className="h-full flex flex-col bento-card p-6 shadow-soft-lg">
            {/* Chart Header */}
            <div className="mb-6 flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold text-white">{symbol}</h2>
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-mono font-semibold text-white">
                            ${latestPrice.toFixed(2)}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-lg ${
                            isPositive 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : 'bg-rose-500/20 text-rose-400'
                        }`}>
                            {isPositive ? '+' : ''}{((latestPrice - startPrice) / startPrice * 100).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <defs>
                            {/* Soft gradient for positive trend */}
                            <linearGradient id="gradientPositive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={positiveColor} stopOpacity={0.4} />
                                <stop offset="50%" stopColor={positiveColor} stopOpacity={0.15} />
                                <stop offset="100%" stopColor={positiveColor} stopOpacity={0} />
                            </linearGradient>
                            {/* Soft gradient for negative trend */}
                            <linearGradient id="gradientNegative" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={negativeColor} stopOpacity={0.4} />
                                <stop offset="50%" stopColor={negativeColor} stopOpacity={0.15} />
                                <stop offset="100%" stopColor={negativeColor} stopOpacity={0} />
                            </linearGradient>
                            {/* Volume gradient */}
                            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid 
                            stroke="rgba(255, 255, 255, 0.03)" 
                            vertical={false} 
                            horizontal={true} 
                            strokeDasharray="3 3" 
                        />
                        
                        <XAxis
                            dataKey="date"
                            hide={true}
                        />
                        
                        <YAxis
                            yAxisId="price"
                            orientation="right"
                            domain={['auto', 'auto']}
                            stroke="rgba(148, 163, 184, 0.3)"
                            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val.toFixed(2)}
                            type="number"
                        />
                        
                        <YAxis
                            yAxisId="vol"
                            orientation="left"
                            tick={false}
                            axisLine={false}
                            hide={true}
                        />

                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'rgba(19, 19, 26, 0.95)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0.75rem',
                                padding: '0.75rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
                            }}
                            itemStyle={{ color: '#e4e4e7', fontSize: '0.875rem' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem' }}
                            isAnimationActive={false}
                        />

                        {/* Volume Bars with gradient */}
                        <Bar
                            yAxisId="vol"
                            dataKey="volume"
                            fill="url(#volumeGradient)"
                            radius={[2, 2, 0, 0]}
                            barSize={6}
                        />

                        {/* Main Price Area with soft gradient */}
                        <Area
                            yAxisId="price"
                            type="monotone"
                            dataKey="close"
                            stroke={color}
                            strokeWidth={2.5}
                            fill={isPositive ? "url(#gradientPositive)" : "url(#gradientNegative)"}
                            activeDot={{ 
                                r: 5, 
                                strokeWidth: 2, 
                                stroke: color,
                                fill: color,
                                filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.5))'
                            }}
                            animationDuration={600}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
