'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center gap-3">
            <div className="relative">
                {/* Outer rotating ring */}
                <motion.div
                    className="relative w-8 h-8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-0 border-[3px] border-white/30 rounded-full" />
                    <div className="absolute inset-0 border-[3px] border-transparent border-t-white rounded-full" />
                </motion.div>
                
                {/* Inner pulsing circle */}
                <motion.div
                    className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-white font-medium"
            >
                Crafting your message
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                    ...
                </motion.span>
            </motion.span>
        </div>
    );
}
