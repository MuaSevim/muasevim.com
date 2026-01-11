"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { SOCIAL_LINKS, FADE_IN_UP } from "@/types";

// ============================================
// CONSTANTS
// ============================================

const SOCIAL_CARDS = [
    {
        icon: Github,
        label: "GitHub",
        href: SOCIAL_LINKS.github,
        username: "@muasevim",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: SOCIAL_LINKS.linkedin,
        username: "/in/muasevim",
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
        <section id="contact" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Title */}
                <motion.div
                    {...FADE_IN_UP}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Let's Build Together
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

                {/* Social Links */}
                <motion.div
                    {...FADE_IN_UP}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-4"
                >
                    {SOCIAL_CARDS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-6 border border-gray-200 hover:border-black transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-50 group-hover:bg-black group-hover:text-white transition-all">
                                    <link.icon size={24} />
                                </div>
                                <div>
                                    <p className="font-medium text-black">{link.label}</p>
                                    <p className="text-sm text-gray-500">{link.username}</p>
                                </div>
                            </div>
                            <ExternalLink size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
