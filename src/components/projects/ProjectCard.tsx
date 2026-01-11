"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group border border-gray-200 hover:border-black bg-white p-6 transition-all"
        >
            {/* Category */}
            <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold px-3 py-1 bg-black text-white">
                    {project.category}
                </span>
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black transition-colors"
                        aria-label={`View ${project.title}`}
                    >
                        <ArrowUpRight size={18} />
                    </a>
                )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 leading-tight">
                {project.title}
            </h3>

            {/* Bullets */}
            <ul className="space-y-2 mb-6">
                {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-3 py-1 border border-gray-200 bg-gray-50 text-gray-600"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.article>
    );
};
