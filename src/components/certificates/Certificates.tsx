"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import certificatesData from "@/data/certificates.json";
import type { Certificate } from "@/types";
import { FADE_IN_UP } from "@/types";

const INITIAL_COUNT = 4;

// ============================================
// CERTIFICATES COMPONENT
// ============================================

export const Certificates = () => {
    const allCertificates = certificatesData as Certificate[];
    const [showAll, setShowAll] = useState(false);
    const certificates = showAll ? allCertificates : allCertificates.slice(0, INITIAL_COUNT);

    return (
        <section id="certificates" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        {...FADE_IN_UP}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-2">Certifications</h2>
                        <p className="text-gray-600 text-sm">
                            Industry-recognized credentials validating my expertise.
                        </p>
                    </motion.div>

                    {/* Certificates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certificates.map((cert, index) => (
                            <motion.a
                                key={cert.id}
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group flex items-center justify-between p-5 bg-white border border-gray-200 hover:border-black transition-all"
                            >
                                {/* Content */}
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-black">
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-600">{cert.issuer}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-sm text-gray-400">{cert.date}</span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <ExternalLink 
                                    size={14} 
                                    className="text-gray-400 group-hover:text-black transition-colors shrink-0" 
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* See All Button */}
                    {!showAll && allCertificates.length > INITIAL_COUNT && (
                        <motion.div
                            {...FADE_IN_UP}
                            className="mt-8 text-center"
                        >
                            <button
                                onClick={() => setShowAll(true)}
                                className="text-sm font-medium text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-all"
                            >
                                See all {allCertificates.length} certifications
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};
