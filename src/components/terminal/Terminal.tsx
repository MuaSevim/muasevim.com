"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn, generateId, delay } from "@/lib/utils";
import { PERSONAL_INFO } from "@/types";

// ============================================
// TYPES
// ============================================

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface TerminalProps {
    className?: string;
}

// ============================================
// DEMO ANIMATION CONTENT
// ============================================

const DEMO_QUESTION = "Why should we hire you?";
const DEMO_ANSWER = `I don't just write code—I solve problems that matter.

€5M saved through automation at Hogarth Worldwide.
AI-powered legal infrastructure for Finland's Justice 4.0.
Currently building Raven: revolutionizing P2P logistics.

I bring deep technical skills paired with product thinking.`;

// ============================================
// MOCK RESPONSES - Will be replaced with AI SDK
// ============================================

const PERSONALITY_RESPONSES: Record<string, string> = {
    default: `I'm Muhammed—a full-stack engineer who believes code should be poetry, not prose. 

I've shipped enterprise automation worth €5M, built AI legal platforms in Helsinki, and I'm currently revolutionizing P2P logistics with Raven.

What would you like to know?`,

    hire: `Why should you hire me? Simple—I don't just write code, I solve problems.

• €5M in automation savings at Hogarth Worldwide
• Built AI infrastructure for Justice 4.0
• Currently building Raven: P2P international logistics

I bring a rare combination of deep technical skills and product thinking.`,

    weakness: `"Why shouldn't we hire him?" Nice try. 

My only weakness? I'm obsessed with clean architecture. I've been known to refactor perfectly working code because the abstraction wasn't elegant enough.

But that obsession is exactly why my code scales.`,

    raven: `Raven is my brainchild—a peer-to-peer international logistics platform.

Instead of paying €50+ for small package delivery, Raven connects senders with travelers who have extra luggage space. Everyone wins:
• Senders save up to 80%
• Travelers earn extra income
• Fewer carbon emissions

Tech: NestJS, React Native (Expo + Tamagui), Stream API, Azure AD B2C.`,

    stack: `My technical arsenal:

Frontend: React, Next.js, React Native, TypeScript
Backend: Node.js, NestJS, Python, PostgreSQL
Cloud: AWS, Azure, Docker, Kubernetes
AI/ML: Azure ML SDK, LLM integration

I'm currently deep into Cybersecurity for my 90-day sprint.`,
};

const getResponse = async (input: string): Promise<string> => {
    const lower = input.toLowerCase();

    // Simulate typing delay
    await delay(800 + Math.random() * 1200);

    if (lower.includes("hire") || lower.includes("why")) {
        return PERSONALITY_RESPONSES.hire;
    }
    if (lower.includes("weakness") || lower.includes("shouldn't")) {
        return PERSONALITY_RESPONSES.weakness;
    }
    if (lower.includes("raven") || lower.includes("project")) {
        return PERSONALITY_RESPONSES.raven;
    }
    if (lower.includes("stack") || lower.includes("tech") || lower.includes("skill")) {
        return PERSONALITY_RESPONSES.stack;
    }

    return PERSONALITY_RESPONSES.default;
};

// ============================================
// TYPING ANIMATION HOOK
// ============================================

const useTypingAnimation = (text: string, speed: number = 40, startDelay: number = 0) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [startDelay]);

    useEffect(() => {
        if (!hasStarted) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, hasStarted]);

    return { displayedText, isComplete, hasStarted };
};

// ============================================
// DEMO ANIMATION COMPONENT
// ============================================

const DemoAnimation = ({ onInteraction }: { onInteraction: () => void }) => {
    const { displayedText: questionText, isComplete: questionComplete } = useTypingAnimation(
        DEMO_QUESTION,
        50,
        800
    );
    const { displayedText: answerText, isComplete: answerComplete } = useTypingAnimation(
        DEMO_ANSWER,
        20,
        questionComplete ? 0 : 99999999
    );

    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    // Restart animation after completion
    useEffect(() => {
        if (answerComplete) {
            const restartTimeout = setTimeout(() => {
                onInteraction();
            }, 6000);
            return () => clearTimeout(restartTimeout);
        }
    }, [answerComplete, onInteraction]);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-full max-w-xl px-6 space-y-6">
                {/* Demo Question */}
                {questionText && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end"
                    >
                        <div className="bg-gray-100 rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                            <p className="text-gray-800 text-sm">
                                {questionText}
                                {!questionComplete && showCursor && (
                                    <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 align-middle" />
                                )}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Demo Answer */}
                {questionComplete && answerText && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-start"
                    >
                        <div className="max-w-[85%]">
                            <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                                {answerText}
                                {!answerComplete && showCursor && (
                                    <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 align-middle" />
                                )}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// ============================================
// CHAT MESSAGE COMPONENT
// ============================================

const ChatMessage = ({ message }: { message: Message }) => {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex", isUser ? "justify-end" : "justify-start")}
        >
            {isUser ? (
                <div className="bg-gray-100 rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                    <p className="text-gray-800 text-sm">{message.content}</p>
                </div>
            ) : (
                <div className="max-w-[85%]">
                    <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

// ============================================
// TYPING INDICATOR
// ============================================

const TypingIndicator = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-start"
    >
        <div className="flex gap-1 py-2">
            <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
            />
        </div>
    </motion.div>
);

// ============================================
// MAIN TERMINAL COMPONENT
// ============================================

export const Terminal = ({ className }: TerminalProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showDemo, setShowDemo] = useState(true);
    const [demoKey, setDemoKey] = useState(0);
    const [showTopShadow, setShowTopShadow] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        // Only scroll if there are messages
        if (messages.length > 0 || isTyping) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setShowTopShadow(target.scrollTop > 20);
    };

    const handleInteraction = () => {
        if (showDemo) {
            setDemoKey((prev) => prev + 1);
        }
    };

    const handleFocus = () => {
        setShowDemo(false);
    };

    const handleBlur = () => {
        // Restart demo if no messages and input is empty
        if (messages.length === 0 && !input.trim()) {
            setShowDemo(true);
            setDemoKey((prev) => prev + 1);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!input.trim() || isTyping) return;

        setShowDemo(false);

        const userMessage: Message = {
            id: generateId(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const response = await getResponse(input);

        const assistantMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: response,
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, assistantMessage]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(e);
        }
    };

    return (
        <div
            className={cn(
                "relative flex flex-col bg-white min-h-[600px]",
                className
            )}
        >
            {/* Header - Name & Title */}
            <div className="text-center pt-4 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
                    {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                    {PERSONAL_INFO.title}
                </p>
            </div>

            {/* Demo Animation or Messages */}
            <div className="flex-1 relative">
                {/* Subtle top shadow indicator */}
                <div 
                    className={cn(
                        "absolute top-0 left-0 right-0 h-12 pointer-events-none transition-opacity duration-300 z-10",
                        "bg-gradient-to-b from-white via-white/50 to-transparent",
                        showTopShadow && !showDemo ? "opacity-100" : "opacity-0"
                    )}
                />
                
                {showDemo ? (
                    <DemoAnimation key={demoKey} onInteraction={handleInteraction} />
                ) : (
                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="absolute inset-0 overflow-y-auto px-6 scrollbar-hide"
                    >
                        <div className="max-w-xl mx-auto space-y-4 pb-4">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                            </AnimatePresence>
                            {isTyping && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input - Centered at bottom */}
            <div className="p-6 pt-0">
                <form 
                    onSubmit={handleSubmit} 
                    className="max-w-xl mx-auto"
                    onFocus={(e) => e.stopPropagation()}
                >
                    <div className="relative flex items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Ask me anything..."
                            disabled={isTyping}
                            className="w-full bg-gray-50 text-gray-800 text-sm rounded-full px-5 py-3.5 pr-12 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50 transition-all"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 p-2 bg-black text-white rounded-full disabled:opacity-30 disabled:bg-gray-300 hover:bg-gray-800 transition-all"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
