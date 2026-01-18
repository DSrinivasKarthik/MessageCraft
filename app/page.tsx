// page.tsx
'use client'; // Important for interactive components

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';
import MessageCard from './components/MessageCard';

function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    );
}

const tones = [
    { value: 'formal', label: 'Formal', icon: '👔', color: 'from-blue-500 to-indigo-500' },
    { value: 'informal', label: 'Casual', icon: '😊', color: 'from-green-500 to-teal-500' },
    { value: 'friendly', label: 'Friendly', icon: '🤝', color: 'from-yellow-500 to-orange-500' },
    { value: 'urgent', label: 'Urgent', icon: '⚡', color: 'from-red-500 to-pink-500' },
];

export default function Home() {
    const [recipient, setRecipient] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState('formal');
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipient, context, tone, details }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.error || 'An error occurred.');
            }
        } catch (err: unknown) {
            let errorMessage = 'A network error occurred.';
            if (isErrorWithMessage(err)) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerate = () => {
        handleSubmit(new Event('submit') as unknown as React.FormEvent);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Gradient Mesh Background */}
            <div className="gradient-mesh" />
            
            {/* Main Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 transition-colors duration-500">
                <ThemeToggle />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 backdrop-blur-sm border border-primary/20"
                        >
                            <span className="text-2xl">✨</span>
                            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                AI-Powered Writing Assistant
                            </span>
                        </motion.div>
                        
                        <motion.h1 
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary to-accent dark:from-gray-100 dark:via-primary-light dark:to-pink-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            MessageCraft
                        </motion.h1>
                        
                        <motion.p 
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Craft perfect messages with the power of AI. Professional, personal, or anything in between.
                        </motion.p>
                    </motion.div>
                    {/* Main Content - Split Layout for Desktop */}
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left Side - Input Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="glass-card p-6 md:p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Compose Message
                                </h2>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800/50 rounded-xl backdrop-blur-sm"
                                    >
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Recipient Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    <label htmlFor="recipient" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                        <span className="flex items-center gap-2">
                                            <span>To</span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Required</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="recipient"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        required
                                        className="input-floating"
                                        placeholder="Who will receive this message?"
                                    />
                                </motion.div>

                                {/* Context Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                >
                                    <label htmlFor="context" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                        <span className="flex items-center gap-2">
                                            <span>Purpose</span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Required</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="context"
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                        required
                                        className="input-floating"
                                        placeholder="What's the purpose of this message?"
                                    />
                                </motion.div>

                                {/* Tone Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.7 }}
                                >
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Tone
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {tones.map((t, index) => (
                                            <motion.button
                                                key={t.value}
                                                type="button"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setTone(t.value)}
                                                className={`tone-pill ${tone === t.value ? 'tone-pill-active' : ''}`}
                                            >
                                                <span className="text-xl mb-1">{t.icon}</span>
                                                <span className="text-sm font-semibold">{t.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Details Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 }}
                                >
                                    <label htmlFor="details" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                        <span className="flex items-center gap-2">
                                            <span>Additional Details</span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">Optional</span>
                                        </span>
                                    </label>
                                    <textarea
                                        id="details"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        className="input-floating min-h-[120px] resize-none"
                                        placeholder="Any specific points or requirements..."
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full submit-button"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.9 }}
                                >
                                    {isLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Generate Message
                                        </span>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Right Side - Generated Message or Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="lg:sticky lg:top-8 h-fit"
                        >
                            <AnimatePresence mode="wait">
                                {message ? (
                                    <MessageCard 
                                        key="message-result"
                                        message={message} 
                                        onRegenerate={handleRegenerate}
                                    />
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="glass-card p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
                                    >
                                        <motion.div
                                            animate={{ 
                                                y: [0, -10, 0],
                                                rotate: [0, 5, -5, 0]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="mb-6"
                                        >
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full" />
                                                <svg 
                                                    className="w-24 h-24 text-primary/30 dark:text-primary/20 relative z-10" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={1} 
                                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                                                    />
                                                </svg>
                                            </div>
                                        </motion.div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                            Your Message Appears Here
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                                            Fill in the details and click generate to craft your perfect message with AI assistance
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {['✨ AI-Powered', '⚡ Lightning Fast', '🎯 Perfect Tone'].map((feature, index) => (
                                                <motion.div
                                                    key={feature}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.8 + index * 0.1 }}
                                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    {feature}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                    
                    {/* Footer Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            💡 <span className="font-medium">Pro Tip:</span> Be specific with your context and details for the best results
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}