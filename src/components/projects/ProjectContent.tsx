"use client";

import { motion } from "framer-motion";

interface ProjectContentProps {
    content?: string;
    bullets: string[];
}

export const ProjectContent = ({ content, bullets }: ProjectContentProps) => {
    // Parse markdown-style content to sections
    const parseContent = (text: string) => {
        const sections: { type: "heading" | "paragraph"; content: string }[] = [];
        const lines = text.split("\n");
        let currentParagraph = "";

        lines.forEach((line) => {
            if (line.startsWith("## ")) {
                if (currentParagraph.trim()) {
                    sections.push({ type: "paragraph", content: currentParagraph.trim() });
                    currentParagraph = "";
                }
                sections.push({ type: "heading", content: line.replace("## ", "") });
            } else if (line.trim()) {
                currentParagraph += line + " ";
            } else if (currentParagraph.trim()) {
                sections.push({ type: "paragraph", content: currentParagraph.trim() });
                currentParagraph = "";
            }
        });

        if (currentParagraph.trim()) {
            sections.push({ type: "paragraph", content: currentParagraph.trim() });
        }

        return sections;
    };

    if (content) {
        const sections = parseContent(content);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-gray max-w-none"
            >
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">About This Project</h3>
                <div className="space-y-4">
                    {sections.map((section, index) => (
                        section.type === "heading" ? (
                            <h4 key={index} className="text-lg font-semibold text-gray-900 mt-8 mb-3">
                                {section.content}
                            </h4>
                        ) : (
                            <p key={index} className="text-gray-600 leading-relaxed">
                                {section.content}
                            </p>
                        )
                    ))}
                </div>
            </motion.div>
        );
    }

    // Fallback to bullets if no content
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Key Highlights</h3>
            <ul className="space-y-3">
                {bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3 text-gray-600">
                        <span className="text-gray-400 shrink-0 mt-1">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};
