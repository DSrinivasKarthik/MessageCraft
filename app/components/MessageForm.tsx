'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, MessageTemplate, MessageCategory, MessageTone } from '../types';
import { storage } from '../utils/storage';
import { generateId } from '../utils/helpers';

export default function MessageForm() {
    const [recipient, setRecipient] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState<MessageTone>('formal');
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<MessageCategory | null>(null);

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
                
                // Save the message to local storage
                const newMessage: Message = {
                    id: generateId(),
                    recipient,
                    context,
                    tone,
                    details,
                    generatedMessage: data.message,
                    createdAt: new Date().toISOString()
                };
                storage.messages.add(newMessage);
            } else {
                setError(data.error || 'An error occurred.');
            }
        } catch (err: any) {
            setError(err.message || 'A network error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTemplateSelect = (template: MessageTemplate) => {
        setSelectedTemplate(template);
        setTone(template.tone);
        setDetails(template.context);
    };

    const handleCategorySelect = (category: MessageCategory) => {
        setSelectedCategory(category);
        // You could filter templates by category here
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
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
                    >
                        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tone
                        </label>
                        <select
                            id="tone"
                            value={tone}
                            onChange={(e) => setTone(e.target.value as MessageTone)}
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
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </div>
                    ) : (
                        "Generate Message"
                    )}
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
    );
} 