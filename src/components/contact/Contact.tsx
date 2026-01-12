"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { useState } from "react";
import { SOCIAL_LINKS, FADE_IN_UP } from "@/types";

// Medium icon as SVG component
const MediumIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
);

// ============================================
// CONSTANTS
// ============================================

const SOCIAL_LINKS_DATA = [
    {
        icon: Github,
        label: "GitHub",
        href: SOCIAL_LINKS.github,
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: SOCIAL_LINKS.linkedin,
    },
    {
        icon: MediumIcon,
        label: "Medium",
        href: "https://medium.com/@muasevim",
    },
] as const;

// ============================================
// CONTACT COMPONENT
// ============================================

export const Contact = () => {
    const [copied, setCopied] = useState(false);
    const contactEmail = "contact@mua.sevim";

    const handleCopyEmail = async () => {
        await navigator.clipboard.writeText(contactEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Title */}
                <motion.div
                    {...FADE_IN_UP}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Let's Make Ideas Reality!
                    </h2>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Available for freelance projects, consulting, or full-time opportunities.
                        Let's turn your ideas into reality.
                    </p>
                </motion.div>

                {/* Primary CTA - Email */}
                <motion.div
                    {...FADE_IN_UP}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-lg mx-auto">
                        <button
                            onClick={handleCopyEmail}
                            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all cursor-pointer"
                        >
                            <Mail size={20} />
                            <span className="text-sm">{copied ? "✓ Copied!" : contactEmail}</span>
                        </button>
                        <a
                            href="/resume.pdf"
                            download
                            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 text-gray-600 hover:text-black border border-gray-200 hover:border-gray-400 transition-all cursor-pointer"
                        >
                            <Download size={20} />
                            <span className="text-sm font-medium">View Resume</span>
                        </a>
                    </div>
                </motion.div>

                {/* Social Links - Icon Only */}
                <motion.div
                    {...FADE_IN_UP}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center justify-center gap-6"
                >
                    {SOCIAL_LINKS_DATA.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-gray-600 hover:text-black transition-colors"
                            aria-label={link.label}
                        >
                            <link.icon size={24} />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
