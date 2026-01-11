"use client";

import { motion } from "framer-motion";
import { Linkedin, Quote } from "lucide-react";
import referencesData from "@/data/references.json";
import type { Reference } from "@/types";
import { FADE_IN_UP } from "@/types";

export const References = () => {
    const references = referencesData as Reference[];

    return (
        <section id="references" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...FADE_IN_UP} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2">References</h2>
                        <p className="text-gray-600 text-sm">
                            What my previous managers and colleagues say about working with me.
                        </p>
                    </motion.div>

                    {/* References Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {references.map((ref, index) => (
                            <motion.div
                                key={ref.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group p-6 border border-gray-200 hover:border-black transition-all"
                            >
                                {/* Quote Icon */}
                                <Quote size={24} className="text-gray-200 mb-4" />

                                {/* Quote */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    "{ref.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="font-semibold text-black">{ref.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {ref.title} · {ref.company}
                                        </p>
                                    </div>
                                    {ref.linkedin && (
                                        <a
                                            href={ref.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-400 hover:text-black transition-colors"
                                            aria-label={`${ref.name} LinkedIn`}
                                        >
                                            <Linkedin size={16} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
