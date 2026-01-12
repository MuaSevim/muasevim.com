import { notFound } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectContent } from "@/components/projects/ProjectContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return (projectsData as Project[]).map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = (projectsData as Project[]).find((p) => p.id === id);
    
    if (!project) {
        return { title: "Project Not Found" };
    }

    return {
        title: `${project.title} | Muhammed Sevim`,
        description: project.summary || project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = (projectsData as Project[]).find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Content */}
                <div className="container mx-auto px-6 py-12 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left - Project Details */}
                            <div className="order-2 lg:order-1">
                                {/* Category as Subtitle */}
                                <p className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3">
                                    {project.category}
                                </p>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                    {project.title}
                                </h1>

                                {/* Summary */}
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {project.summary || project.description}
                                </p>

                                {/* Links */}
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
                                        >
                                            <Github size={14} />
                                            Source Code
                                        </a>
                                    )}
                                </div>

                                {/* Technologies */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h3>
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
                                </div>

                                {/* Content */}
                                <ProjectContent content={project.content} bullets={project.bullets} />
                            </div>

                            {/* Right - Gallery */}
                            <div className="order-1 lg:order-2">
                                <ProjectGallery 
                                    images={project.images} 
                                    projectTitle={project.title}
                                    github={project.github}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
