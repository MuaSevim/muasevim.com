"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ScrollHintProps {
    targetId?: string;
}

export const ScrollHint = ({ targetId = "projects" }: ScrollHintProps) => {
    const handleClick = () => {
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.button
            onClick={handleClick}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            aria-label="Scroll to explore more"
        >
            <span className="text-xs uppercase tracking-widest">more about me</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown size={24} strokeWidth={1.5} />
            </motion.div>
        </motion.button>
    );
};
