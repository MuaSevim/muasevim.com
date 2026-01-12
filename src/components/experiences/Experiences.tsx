"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Experience } from "@/types";
import experienceData from "@/data/experience.json";
import { FADE_IN_UP } from "@/types";

// ============================================
// TIMELINE ITEM COMPONENT
// ============================================

interface TimelineItemProps {
    experience: Experience;
    index: number;
    isActive: boolean;
}

const TimelineItem = ({ experience, index, isActive }: TimelineItemProps) => {
    const isLeft = index % 2 === 0;
    
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center gap-8 mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
        >
            {/* Content */}
            <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                <motion.div
                    animate={{
                        scale: isActive ? 1.02 : 1,
                        opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                    className="inline-block bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {experience.date}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-1">
                        {experience.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium mb-3">
                        {experience.company}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 justify-end">
                        <MapPin size={12} />
                        <span>{experience.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {experience.description}
                    </p>
                    <span
                        className={`inline-block mt-4 text-[10px] px-2 py-1 uppercase tracking-wide ${
                            experience.type === "work"
                                ? "bg-blue-50 text-blue-700"
                                : experience.type === "education"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-green-50 text-green-700"
                        }`}
                    >
                        {experience.type}
                    </span>
                </motion.div>
            </div>

            {/* Center Dot */}
            <motion.div
                animate={{
                    scale: isActive ? 1.3 : 1,
                    backgroundColor: isActive ? "#000" : "#fff",
                }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 rounded-full border-2 border-gray-900 flex-shrink-0 z-10"
            />

            {/* Empty space for other side */}
            <div className="flex-1" />
        </motion.div>
    );
};

// ============================================
// MAP SECTION COMPONENT - REMOVED
// ============================================

// ============================================
// MAIN EXPERIENCES COMPONENT
// ============================================

export const Experiences = () => {
    const experiences = experienceData as Experience[];
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Filter out birth and cosmic origins, reverse for chronological order
    const professionalExperiences = [...experiences]
        .filter(e => e.id !== "istanbul-origin")
        .reverse();

    // Scroll-based activation
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            
            const items = containerRef.current.querySelectorAll('[data-timeline-item]');
            const scrollY = window.scrollY + window.innerHeight / 2;
            
            items.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemTop = rect.top + window.scrollY;
                
                if (scrollY >= itemTop && scrollY < itemTop + rect.height) {
                    setActiveIndex(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="journey" className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...FADE_IN_UP} className="mb-16">
                        <h2 className="text-2xl font-bold mb-2">Experiences</h2>
                        <p className="text-gray-600 text-sm">
                            My professional journey across different cities and companies.
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <div ref={containerRef} className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

                        {/* Timeline Items */}
                        {professionalExperiences.map((experience, index) => (
                            <div key={experience.id} data-timeline-item>
                                <TimelineItem
                                    experience={experience}
                                    index={index}
                                    isActive={activeIndex === index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
