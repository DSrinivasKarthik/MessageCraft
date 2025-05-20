// page.tsx
'use client'; // Important for interactive components

import { useState } from 'react';
import { motion } from 'framer-motion';
import MessageHistory from './components/MessageHistory';
import MessageTemplates from './components/MessageTemplates';
import MessageCategories from './components/MessageCategories';
import MessageForm from './components/MessageForm';

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <main className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        MessageCraft
                    </h1>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Welcome to MessageCraft
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your AI-powered message writing assistant. Use the floating buttons at the bottom right to manage your messages, templates, and categories.
                    </p>
                </motion.div>

                <MessageForm />
            </div>

            <MessageHistory />
            <MessageTemplates />
            <MessageCategories />
        </main>
    );
}