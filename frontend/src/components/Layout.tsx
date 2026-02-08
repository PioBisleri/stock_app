import { ReactNode } from "react";
import { Search, User, Bell } from "lucide-react";
import { Toolbar } from "./Toolbar";
import { Watchlist } from "./Watchlist";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-dark-bg text-dark-text font-sans p-4 md:p-bento">
            {/* Bento Box Grid Layout */}
            <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-4 md:gap-bento auto-rows-min">
                {/* Top Navigation Bar - Spans full width */}
                <nav className="col-span-12 bento-card flex items-center justify-between px-4 md:px-6 py-4 shadow-soft-lg">
                    <div className="flex items-center gap-4 md:gap-6">
                        <h1 className="text-lg md:text-xl font-bold text-gradient">
                            InvestHub
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                            <Search size={18} className="md:w-5 md:h-5" />
                        </button>
                        <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                            <Bell size={18} className="md:w-5 md:h-5" />
                        </button>
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-teal/20 flex items-center justify-center text-brand-300 shadow-soft">
                            <User size={16} className="md:w-[18px] md:h-[18px]" />
                        </div>
                    </div>
                </nav>

                {/* Left Sidebar - Icon Navigation */}
                <aside className="hidden md:block col-span-1 row-span-2">
                    <Toolbar />
                </aside>

                {/* Main Content Area - Chart */}
                <main className="col-span-12 md:col-span-8 lg:col-span-8 row-span-2 min-h-[500px] md:min-h-[600px]">
                    {children}
                </main>

                {/* Right Sidebar - Watchlist */}
                <aside className="col-span-12 md:col-span-3 lg:col-span-3 row-span-2">
                    <Watchlist />
                </aside>
            </div>
        </div>
    );
};
