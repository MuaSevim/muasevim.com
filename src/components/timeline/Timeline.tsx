"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/types";
import experienceData from "@/data/experience.json";
import { FADE_IN_UP } from "@/types";

const TimelineItem = ({
    experience,
    index,
    isLeft
}: {
    experience: Experience;
    index: number;
    isLeft: boolean;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-12`}
        >
            {/* Content */}
            <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                {/* Date Badge - Black/White only */}
                <span className="inline-block text-xs px-3 py-1 bg-black text-white mb-3">
                    {experience.date}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>

                {/* Company & Location */}
                <div className="flex items-center gap-2 mb-3 justify-start" style={{ justifyContent: isLeft ? "flex-end" : "flex-start" }}>
                    <span className="text-black font-medium">{experience.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{experience.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 max-w-md" style={{ marginLeft: isLeft ? "auto" : 0 }}>
                    {experience.description}
                </p>
            </div>

            {/* Center Dot */}
            <div className="relative shrink-0">
                <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg z-10 relative" />
            </div>

            {/* Empty Space */}
            <div className="flex-1" />
        </motion.div>
    );
};

export const Timeline = () => {
    const experiences = experienceData as Experience[];
    // Reverse to show oldest first (past to present)
    const sortedExperiences = [...experiences].reverse();

    return (
        <section id="journey" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...FADE_IN_UP} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2">The Journey</h2>
                        <p className="text-gray-600 text-sm">
                            Every step has been a lesson. Every city has shaped my perspective.
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

                        {/* Items */}
                        {sortedExperiences.map((experience, index) => (
                            <TimelineItem
                                key={experience.id}
                                experience={experience}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
