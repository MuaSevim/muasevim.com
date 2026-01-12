"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Experience } from "@/types";
import experienceData from "@/data/experience.json";
import { FADE_IN_UP } from "@/types";

// ============================================
// COSMIC ORIGIN SECTION - Timeline Item Style
// ============================================

const CosmicOrigin = () => {
    // Generate deterministic stars to avoid hydration mismatch
    const stars = Array.from({ length: 12 }, (_, i) => ({
        x: ((i * 17) % 100),
        y: ((i * 23) % 100),
        size: (i % 2) + 1,
        delay: (i % 5) * 0.5,
        duration: 2 + (i % 3),
    }));

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-8 flex-row-reverse mb-12"
        >
            {/* Content - Right side */}
            <div className="flex-1 text-left">
                {/* Compact Square Cosmic Container */}
                <div className="relative w-full max-w-[200px] aspect-square rounded-sm overflow-hidden bg-black">
                    {/* Universe Image with Blend Effects */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/universe.png"
                            alt="The Universe"
                            fill
                            className="object-cover opacity-30 mix-blend-screen"
                            priority
                        />
                        {/* Gradient Overlays for depth */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_80%)]" />
                    </div>

                    {/* Subtle Animated Stars */}
                    <div className="absolute inset-0 overflow-hidden">
                        {stars.map((star, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white/60"
                                style={{
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                    width: star.size,
                                    height: star.size,
                                }}
                                animate={{
                                    opacity: [0.2, 0.6, 0.2],
                                }}
                                transition={{
                                    duration: star.duration,
                                    delay: star.delay,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Content - Minimal */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                        {/* Shining Star Core */}
                        <div className="mb-2">
                            <div className="relative">
                                {/* Pulsing glow */}
                                <div className="absolute inset-0 animate-pulse">
                                    <div className="w-3 h-3 mx-auto bg-white rounded-full blur-lg opacity-80" />
                                </div>
                                {/* Core star */}
                                <div className="w-2 h-2 mx-auto bg-white rounded-full shadow-[0_0_25px_8px_rgba(255,255,255,0.3)]" />
                            </div>
                        </div>

                        {/* Date Badge */}
                        <span className="inline-block text-[9px] px-2 py-0.5 bg-white/10 backdrop-blur-sm text-white/60 mb-1.5 border border-white/10">
                            ~13.8B Years Ago
                        </span>

                        {/* Title */}
                        <h4 className="text-xs font-medium text-white/80">
                            Let There Be Light
                        </h4>

                        {/* Description */}
                        <p className="text-white/30 text-[9px] mt-1">
                            Stardust → Me
                        </p>
                    </div>
                </div>

                {/* Time Skip Label */}
                <div className="flex items-center gap-2 mt-3">
                    <div className="w-4 h-px bg-gray-200" />
                    <span className="text-[9px] text-gray-400 font-mono">13.8B years later...</span>
                </div>
            </div>

            {/* Center Dot */}
            <div className="relative shrink-0">
                <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg z-10 relative" />
            </div>

            {/* Empty Space - Left side */}
            <div className="flex-1" />
        </motion.div>
    );
};

// ============================================
// TIMELINE ITEM COMPONENT
// ============================================

const TimelineItem = ({
    experience,
    index,
    isLeft
}: {
    experience: Experience;
    index: number;
    isLeft: boolean;
}) => {
    // Skip the origin story as we handle it specially
    if (experience.id === "istanbul-origin") {
        return null;
    }

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

// ============================================
// BIRTH/ORIGIN ITEM - Special Styling
// ============================================

const BirthItem = () => {
    const originData = (experienceData as Experience[]).find(e => e.id === "istanbul-origin");
    
    if (!originData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-8 flex-row mb-12"
        >
            {/* Content */}
            <div className="flex-1 text-right">
                {/* Date Badge - Special golden accent */}
                <span className="inline-block text-xs px-3 py-1 bg-black text-white mb-3">
                    {originData.date}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2">{originData.title}</h3>

                {/* Company & Location */}
                <div className="flex items-center gap-2 mb-3 justify-end">
                    <span className="text-black font-medium">{originData.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{originData.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 max-w-md ml-auto">
                    {originData.description}
                </p>
            </div>

            {/* Center Dot - Special Star */}
            <div className="relative shrink-0">
                <motion.div 
                    className="w-5 h-5 bg-black rounded-full border-4 border-white shadow-lg z-10 relative"
                    animate={{ 
                        boxShadow: [
                            "0 0 0 0 rgba(0,0,0,0.2)",
                            "0 0 0 8px rgba(0,0,0,0)",
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* Empty Space */}
            <div className="flex-1" />
        </motion.div>
    );
};

// ============================================
// MAIN TIMELINE COMPONENT
// ============================================

export const Timeline = () => {
    const experiences = experienceData as Experience[];
    // Filter out origin, reverse to show oldest first, then we'll add origin specially
    const sortedExperiences = [...experiences]
        .filter(e => e.id !== "istanbul-origin")
        .reverse();

    return (
        <section id="journey" className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...FADE_IN_UP} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2">Journey So Far</h2>
                        <p className="text-gray-600 text-sm">
                            From stardust to software. Every atom in my body was forged in the heart of a star.
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

                        {/* Cosmic Origin - First item on RIGHT */}
                        <CosmicOrigin />

                        {/* Birth/Origin Item - LEFT */}
                        <BirthItem />

                        {/* Rest of Timeline Items */}
                        {sortedExperiences.map((experience, index) => (
                            <TimelineItem
                                key={experience.id}
                                experience={experience}
                                index={index + 1}
                                isLeft={(index + 1) % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
