'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageCardProps {
    message: string;
    onRegenerate?: () => void;
}

export default function MessageCard({ message, onRegenerate }: MessageCardProps) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const wordCount = message.split(/\s+/).filter(word => word.length > 0).length;
    const charCount = message.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="message-card"
        >
            {/* Header with Stats */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20"
                    >
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-primary">{wordCount} words</span>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
                        className="text-sm text-gray-500 dark:text-gray-400"
                    >
                        {charCount} characters
                    </motion.div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="btn-icon"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                    <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>
            </div>

            {/* Message Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30">
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                                    {message}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-hover text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.svg
                                            key="check"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    ) : (
                                        <motion.svg
                                            key="copy"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </motion.button>

                            {onRegenerate && (
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95, rotate: 180 }}
                                    onClick={onRegenerate}
                                    className="flex items-center gap-2 btn-secondary"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Regenerate</span>
                                </motion.button>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const mailtoLink = `mailto:?body=${encodeURIComponent(message)}`;
                                    window.location.href = mailtoLink;
                                }}
                                className="flex items-center gap-2 btn-secondary"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Email</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Copy Success Feedback */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg font-medium"
                    >
                        ✓ Copied to clipboard!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
