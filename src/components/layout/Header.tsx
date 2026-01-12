"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/types";

const NAV_LINKS = [
    { href: "#projects", label: "Projects" },
    { href: "#journey", label: "Experiences" },
    { href: "#certificates", label: "Certifications" },
    { href: "#references", label: "References" },
] as const;

export const Header = () => {
    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    {PERSONAL_INFO.logo}
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-600 hover:text-black transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </motion.header>
    );
};
