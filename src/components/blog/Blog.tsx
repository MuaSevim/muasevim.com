"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import articlesData from "@/data/articles.json";
import type { Article } from "@/types";
import { FADE_IN_UP } from "@/types";

const DISPLAY_COUNT = 2;

// ============================================
// BLOG COMPONENT
// ============================================

export const Blog = () => {
    const articles = (articlesData as Article[]).slice(0, DISPLAY_COUNT);

    return (
        <section id="blog" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        {...FADE_IN_UP}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-2">Articles</h2>
                        <p className="text-gray-600 text-sm">
                            Thoughts on engineering, architecture, and building products.
                        </p>
                    </motion.div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles.map((article, index) => (
                            <motion.a
                                key={article.id}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group p-6 border border-gray-200 hover:border-black bg-gray-50 hover:bg-white transition-all"
                            >
                                {/* Meta */}
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>

                                {/* Title */}
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="font-semibold text-black group-hover:text-black leading-tight">
                                        {article.title}
                                    </h3>
                                    <ArrowUpRight 
                                        size={16} 
                                        className="text-gray-400 group-hover:text-black transition-colors shrink-0 mt-0.5" 
                                    />
                                </div>

                                {/* Excerpt */}
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {article.excerpt}
                                </p>
                            </motion.a>
                        ))}
                    </div>

                    {/* See All Link */}
                    <motion.div
                        {...FADE_IN_UP}
                        className="mt-8 text-center"
                    >
                        <a
                            href="https://medium.com/@muasevim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-all"
                        >
                            See all articles
                            <ArrowUpRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
