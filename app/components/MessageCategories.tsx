'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCategory } from '../types';
import { storage } from '../utils/storage';
import { generateId } from '../utils/helpers';

export default function MessageCategories() {
    const [categories, setCategories] = useState<MessageCategory[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<MessageCategory | null>(null);
    const [formData, setFormData] = useState<Partial<MessageCategory>>({
        name: '',
        description: '',
        color: '#3B82F6' // Default blue color
    });

    useEffect(() => {
        setCategories(storage.categories.get());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        const newCategory: MessageCategory = {
            id: generateId(),
            name: formData.name,
            description: formData.description || '',
            color: formData.color || '#3B82F6',
            createdAt: new Date().toISOString()
        };

        storage.categories.add(newCategory);
        setCategories(storage.categories.get());
        setFormData({
            name: '',
            description: '',
            color: '#3B82F6'
        });
        setIsAdding(false);
    };

    const handleDelete = (id: string) => {
        storage.categories.delete(id);
        setCategories(storage.categories.get());
        setSelectedCategory(null);
    };

    return (
        <div className="fixed bottom-4 right-36 z-50">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-3 rounded-full shadow-lg"
                aria-label="Toggle categories"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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
                                Message Categories
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="text-primary hover:text-primary-dark"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isAdding ? (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Color
                                        </label>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <input
                                                type="color"
                                                value={formData.color}
                                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                                className="h-8 w-8 rounded cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={formData.color}
                                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsAdding(false)}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            Save Category
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    <AnimatePresence>
                                        {categories.map((category) => (
                                            <motion.div
                                                key={category.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center space-x-3">
                                                        <div
                                                            className="w-4 h-4 rounded-full"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {category.name}
                                                            </p>
                                                            {category.description && (
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {category.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(category.id);
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
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {selectedCategory && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.9 }}
                                        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-6 h-6 rounded-full"
                                                    style={{ backgroundColor: selectedCategory.color }}
                                                />
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {selectedCategory.name}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCategory(null)}
                                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        {selectedCategory.description && (
                                            <div className="prose dark:prose-invert max-w-none mb-4">
                                                <p>{selectedCategory.description}</p>
                                            </div>
                                        )}
                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    handleDelete(selectedCategory.id);
                                                    setSelectedCategory(null);
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