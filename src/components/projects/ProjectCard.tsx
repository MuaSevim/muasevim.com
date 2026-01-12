"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <Link href={`/projects/${project.id}`}>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border border-gray-200 bg-white p-5 transition-all duration-300 ease-out hover:border-black hover:shadow-sm cursor-pointer h-full flex flex-col"
            >
                {/* Category Badge */}
                <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-black text-white uppercase tracking-wide">
                        {project.category}
                    </span>
                    <ArrowUpRight 
                        size={16} 
                        className="text-gray-300 group-hover:text-black transition-colors duration-300" 
                    />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                    {project.title}
                </h3>

                {/* Summary - 2 lines max */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {project.summary || project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 border border-gray-200 bg-gray-50 text-gray-500"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 text-gray-400">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </motion.article>
        </Link>
    );
};
