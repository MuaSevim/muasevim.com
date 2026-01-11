"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";
import projectsData from "@/data/projects.json";
import { FADE_IN_UP } from "@/types";

const INITIAL_COUNT = 4;

export const ProjectsGrid = () => {
    const allProjects = projectsData as Project[];
    const [showAll, setShowAll] = useState(false);
    const projects = showAll ? allProjects : allProjects.slice(0, INITIAL_COUNT);

    return (
        <section id="projects" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...FADE_IN_UP} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2">Projects</h2>
                        <p className="text-gray-600 text-sm">
                            A selection of projects demonstrating full-stack capabilities.
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>

                    {/* See All Button */}
                    {!showAll && allProjects.length > INITIAL_COUNT && (
                        <motion.div
                            {...FADE_IN_UP}
                            className="mt-8 text-center"
                        >
                            <button
                                onClick={() => setShowAll(true)}
                                className="text-sm font-medium text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-all"
                            >
                                See all {allProjects.length} projects
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};
