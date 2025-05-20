'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageTemplate, MessageCategory } from '../types';
import { storage } from '../utils/storage';
import { generateId } from '../utils/helpers';

export default function MessageTemplates() {
    const [templates, setTemplates] = useState<MessageTemplate[]>([]);
    const [categories, setCategories] = useState<MessageCategory[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
    const [formData, setFormData] = useState<Partial<MessageTemplate>>({
        title: '',
        content: '',
        categoryId: '',
        tone: 'formal'
    });

    useEffect(() => {
        setTemplates(storage.templates.get());
        setCategories(storage.categories.get());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content || !formData.categoryId) return;

        const newTemplate: MessageTemplate = {
            id: generateId(),
            title: formData.title,
            content: formData.content,
            categoryId: formData.categoryId,
            tone: formData.tone || 'formal',
            createdAt: new Date().toISOString()
        };

        storage.templates.add(newTemplate);
        setTemplates(storage.templates.get());
        setFormData({
            title: '',
            content: '',
            categoryId: '',
            tone: 'formal'
        });
        setIsAdding(false);
    };

    const handleDelete = (id: string) => {
        storage.templates.delete(id);
        setTemplates(storage.templates.get());
        setSelectedTemplate(null);
    };

    return (
        <div className="fixed bottom-4 right-20 z-50">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-3 rounded-full shadow-lg"
                aria-label="Toggle templates"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
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
                                Message Templates
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
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Category
                                        </label>
                                        <select
                                            value={formData.categoryId}
                                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Tone
                                        </label>
                                        <select
                                            value={formData.tone}
                                            onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="formal">Formal</option>
                                            <option value="informal">Informal</option>
                                            <option value="friendly">Friendly</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Content
                                        </label>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={4}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
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
                                            Save Template
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    <AnimatePresence>
                                        {templates.map((template) => (
                                            <motion.div
                                                key={template.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                onClick={() => setSelectedTemplate(template)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {template.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {categories.find(c => c.id === template.categoryId)?.name}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(template.id);
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
                            {selectedTemplate && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                                    onClick={() => setSelectedTemplate(null)}
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
                                                    {selectedTemplate.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {categories.find(c => c.id === selectedTemplate.categoryId)?.name} • {selectedTemplate.tone}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedTemplate(null)}
                                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="whitespace-pre-wrap">{selectedTemplate.content}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    handleDelete(selectedTemplate.id);
                                                    setSelectedTemplate(null);
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