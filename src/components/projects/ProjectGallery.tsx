"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code, Image as ImageIcon } from "lucide-react";
import type { ProjectImage } from "@/types";

interface ProjectGalleryProps {
    images?: ProjectImage[];
    projectTitle: string;
    github?: string | null;
}

// Placeholder images when no images are provided
const generatePlaceholders = (title: string): ProjectImage[] => [
    { src: "/images/placeholder-arch.svg", alt: `${title} Architecture`, caption: "System Architecture" },
    { src: "/images/placeholder-ui.svg", alt: `${title} UI`, caption: "User Interface" },
    { src: "/images/placeholder-flow.svg", alt: `${title} Flow`, caption: "User Flow" },
    { src: "/images/placeholder-code.svg", alt: `${title} Code`, caption: "Code Structure" },
];

export const ProjectGallery = ({ images, projectTitle, github }: ProjectGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
    const [activeTab, setActiveTab] = useState<"gallery" | "code">("gallery");

    const galleryImages = images && images.length > 0 ? images : generatePlaceholders(projectTitle);

    return (
        <div className="sticky top-24">
            {/* Tab Switcher */}
            {github && (
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab("gallery")}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "gallery"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        <ImageIcon size={14} />
                        Gallery
                    </button>
                    <button
                        onClick={() => setActiveTab("code")}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "code"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        <Code size={14} />
                        Code
                    </button>
                </div>
            )}

            {activeTab === "gallery" ? (
                <>
                    {/* Gallery Grid - Pinterest-style */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {galleryImages.map((image, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedImage(image)}
                                className={`relative overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity ${
                                    index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                                }`}
                            >
                                {image.src.startsWith("/images/placeholder") ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                        <div className="text-center p-4">
                                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-300 flex items-center justify-center">
                                                <ImageIcon size={20} className="text-gray-500" />
                                            </div>
                                            <span className="text-xs text-gray-500">{image.caption}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Lightbox */}
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                                onClick={() => setSelectedImage(null)}
                            >
                                <button
                                    className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <X size={24} />
                                </button>
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="relative max-w-4xl max-h-[80vh] w-full"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {selectedImage.src.startsWith("/images/placeholder") ? (
                                        <div className="w-full aspect-video flex items-center justify-center bg-gray-800 rounded-lg">
                                            <div className="text-center">
                                                <ImageIcon size={48} className="mx-auto mb-4 text-gray-600" />
                                                <p className="text-gray-400">{selectedImage.caption}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <Image
                                            src={selectedImage.src}
                                            alt={selectedImage.alt}
                                            width={1200}
                                            height={800}
                                            className="object-contain w-full h-full"
                                        />
                                    )}
                                    {selectedImage.caption && (
                                        <p className="text-center text-white/60 text-sm mt-4">
                                            {selectedImage.caption}
                                        </p>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                /* Code Embed */
                <div className="border border-gray-200 rounded-sm overflow-hidden">
                    <div className="bg-gray-900 text-white p-3 text-sm flex items-center justify-between">
                        <span className="text-gray-400">Repository Preview</span>
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors text-xs"
                            >
                                Open in GitHub →
                            </a>
                        )}
                    </div>
                    <iframe
                        src={github ? `https://github1s.com/${github.replace("https://github.com/", "")}` : ""}
                        className="w-full h-[500px] bg-gray-900"
                        title="Source Code Preview"
                    />
                </div>
            )}
        </div>
    );
};
