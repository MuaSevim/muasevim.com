"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/types";

const SOCIAL_ICONS = [
    { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: "Email" },
] as const;

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-black text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            {PERSONAL_INFO.logo}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">
                            © {currentYear} {PERSONAL_INFO.fullName}. All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("mailto") ? undefined : "_blank"}
                                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label={label}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        className="px-6 py-3 bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors"
                    >
                        Let's Talk
                    </a>
                </div>
            </div>
        </footer>
    );
};
