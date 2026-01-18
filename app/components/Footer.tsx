// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative mt-20 pb-8 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Decorative Line */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-gradient-to-r from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
                            <svg className="w-6 h-6 text-primary/30" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="glass-card p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Left Section - Branding */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3"
                        >
                            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    MessageCraft
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    © {new Date().getFullYear()} — Developed by DSK
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Section - Links */}
                        <div className="flex items-center gap-4">
                            <motion.a
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://github.com/DSrinivasKarthik/messagecraft"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-200 group"
                                aria-label="GitHub Repository"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">GitHub</span>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:dsrinivaskarthik@gmail.com"
                                className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-200"
                                aria-label="Email Contact"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="sr-only">Email</span>
                            </motion.a>
                        </div>
                    </div>

                    {/* Tech Stack Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>Built with</span>
                            {['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Groq AI'].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.05 }}
                                    className="px-2 py-1 rounded-md bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 font-medium"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
}
