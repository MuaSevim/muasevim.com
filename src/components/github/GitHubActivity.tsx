"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useMemo } from "react";
import { FADE_IN_UP } from "@/types";

const STATS = [
    { value: "5+", label: "Years Experience" },
    { value: "€5M+", label: "Value Delivered" },
    { value: "24h", label: "Response Time" },
    { value: "100%", label: "Remote Ready" },
] as const;

// Custom GitHub-style calendar visualization
const CalendarGrid = () => {
    // Generate 52 weeks of data (1 year) - memoized to prevent re-renders
    const weeks = 52;
    const days = 7;

    // Generate deterministic activity levels based on week/day
    const activityData = useMemo(() => {
        return Array.from({ length: weeks }).map((_, weekIndex) =>
            Array.from({ length: days }).map((_, dayIndex) => {
                // Use a simple hash for deterministic but varied results
                const seed = (weekIndex * 7 + dayIndex + 42) % 100;
                if (seed > 70) return 4;
                if (seed > 50) return 3;
                if (seed > 30) return 2;
                if (seed > 15) return 1;
                return 0;
            })
        );
    }, []);

    const levelColors: Record<number, string> = {
        0: "bg-gray-100",
        1: "bg-green-200",
        2: "bg-green-400",
        3: "bg-green-600",
        4: "bg-green-800",
    };

    return (
        <div className="flex gap-1 overflow-x-auto py-2">
            {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((level, dayIndex) => (
                        <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm ${levelColors[level]}`}
                            title={`${level * 2} contributions`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export const GitHubActivity = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    {...FADE_IN_UP}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Contribution Activity</h2>
                            <p className="text-gray-600 text-sm">
                                Shipping code. Every. Single. Day.
                            </p>
                        </div>
                        <a
                            href="https://github.com/muasevim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            <Github size={16} />
                            View GitHub
                        </a>
                    </div>

                    {/* Calendar */}
                    <div className="border border-black p-6 bg-white">
                        <CalendarGrid />

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-gray-100" />
                                <div className="w-3 h-3 rounded-sm bg-green-200" />
                                <div className="w-3 h-3 rounded-sm bg-green-400" />
                                <div className="w-3 h-3 rounded-sm bg-green-600" />
                                <div className="w-3 h-3 rounded-sm bg-green-800" />
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 pt-12 border-t border-gray-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {STATS.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-3xl font-bold text-black">{stat.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
