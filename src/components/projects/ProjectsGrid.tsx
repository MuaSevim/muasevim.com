"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";
import projectsData from "@/data/projects.json";
import { FADE_IN_UP } from "@/types";

const INITIAL_COUNT = 3;

export const ProjectsGrid = () => {
    const allProjects = projectsData as Project[];
    const [showAll, setShowAll] = useState(false);
    const projects = showAll ? allProjects : allProjects.slice(0, INITIAL_COUNT);

    return (
        <section id="projects" className="py-24 bg-gray-50 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...FADE_IN_UP} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2">Projects</h2>
                        <p className="text-gray-600 text-sm">
                            A selection of projects demonstrating full-stack capabilities.
                        </p>
                    </motion.div>

                    {/* Grid - 3 columns */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence mode="popLayout">
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* See All Button */}
                    {!showAll && allProjects.length > INITIAL_COUNT && (
                        <motion.div
                            {...FADE_IN_UP}
                            className="mt-12 text-center"
                        >
                            <button
                                onClick={() => setShowAll(true)}
                                className="px-8 py-3 text-sm font-medium text-gray-700 hover:text-black border border-gray-300 hover:border-black transition-all hover:shadow-sm"
                            >
                                See All Projects
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};
