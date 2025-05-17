'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </motion.div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-3 text-gray-600 dark:text-gray-300"
            >
                Generating...
            </motion.span>
        </div>
    );
} 