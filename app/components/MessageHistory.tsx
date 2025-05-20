'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../types';
import { storage } from '../utils/storage';
import { formatDate, truncateText, copyToClipboard } from '../utils/helpers';

export default function MessageHistory() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMessages(storage.messages.get());
    }, []);

    const handleDelete = (id: string) => {
        storage.messages.delete(id);
        setMessages(storage.messages.get());
    };

    const handleCopy = async (text: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            // You could add a toast notification here
            console.log('Message copied to clipboard');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-3 rounded-full shadow-lg"
                aria-label="Toggle message history"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-16 right-0 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Message History
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        onClick={() => setSelectedMessage(message)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {truncateText(message.recipient, 20)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(new Date(message.createdAt))}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(message.id);
                                                }}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {selectedMessage && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                                    onClick={() => setSelectedMessage(null)}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.9 }}
                                        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Message to {selectedMessage.recipient}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(new Date(selectedMessage.createdAt))}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedMessage(null)}
                                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="whitespace-pre-wrap">{selectedMessage.generatedMessage}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleCopy(selectedMessage.generatedMessage)}
                                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                Copy
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDelete(selectedMessage.id);
                                                    setSelectedMessage(null);
                                                }}
                                                className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 