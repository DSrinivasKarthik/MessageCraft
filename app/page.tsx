// page.tsx
'use client'; // Important for interactive components

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';

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
        } catch (err: any) {
            setError(err.message || 'A network error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <ThemeToggle />
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <motion.h1 
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        MessageCraft
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        AI-Powered Message Composition
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300"
                >
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg"
                            >
                                <p className="text-red-600 dark:text-red-400">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Recipient
                                </label>
                                <input
                                    type="text"
                                    id="recipient"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    required
                                    className="input-field"
                                    placeholder="Who is this message for?"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tone
                                </label>
                                <select
                                    id="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    required
                                    className="input-field"
                                >
                                    <option value="formal">Formal</option>
                                    <option value="informal">Informal</option>
                                    <option value="friendly">Friendly</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label htmlFor="context" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Context/Purpose
                            </label>
                            <input
                                type="text"
                                id="context"
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                required
                                className="input-field"
                                placeholder="What is the purpose of this message?"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Key Details
                            </label>
                            <textarea
                                id="details"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="input-field h-32"
                                placeholder="Add any specific details or requirements..."
                            />
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full submit-button"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            {isLoading ? <LoadingSpinner /> : "Generate Message"}
                        </motion.button>
                    </form>

                    <AnimatePresence mode="wait">
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-300"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Generated Message
                                </h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="whitespace-pre-wrap">{message}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}