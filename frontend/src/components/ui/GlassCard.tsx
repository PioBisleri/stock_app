import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={hoverEffect ? { y: -2, scale: 1.01 } : {}}
            className={cn(
                "bento-card overflow-hidden",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
