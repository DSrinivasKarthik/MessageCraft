import { Message, MessageTemplate, MessageCategory } from '../types';

const STORAGE_KEYS = {
    MESSAGES: 'messagecraft_messages',
    TEMPLATES: 'messagecraft_templates',
    CATEGORIES: 'messagecraft_categories',
} as const;

export const storage = {
    messages: {
        get: (): Message[] => {
            if (typeof window === 'undefined') return [];
            const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
            return data ? JSON.parse(data) : [];
        },
        set: (messages: Message[]) => {
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
        },
        add: (message: Message) => {
            const messages = storage.messages.get();
            storage.messages.set([message, ...messages]);
        },
        delete: (id: string) => {
            const messages = storage.messages.get();
            storage.messages.set(messages.filter(msg => msg.id !== id));
        },
        clear: () => {
            localStorage.removeItem(STORAGE_KEYS.MESSAGES);
        },
    },
    templates: {
        get: (): MessageTemplate[] => {
            if (typeof window === 'undefined') return [];
            const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
            return data ? JSON.parse(data) : [];
        },
        set: (templates: MessageTemplate[]) => {
            localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
        },
        add: (template: MessageTemplate) => {
            const templates = storage.templates.get();
            storage.templates.set([template, ...templates]);
        },
        delete: (id: string) => {
            const templates = storage.templates.get();
            storage.templates.set(templates.filter(t => t.id !== id));
        },
        clear: () => {
            localStorage.removeItem(STORAGE_KEYS.TEMPLATES);
        },
    },
    categories: {
        get: (): MessageCategory[] => {
            if (typeof window === 'undefined') return [];
            const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
            return data ? JSON.parse(data) : [];
        },
        set: (categories: MessageCategory[]) => {
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
        },
        add: (category: MessageCategory) => {
            const categories = storage.categories.get();
            storage.categories.set([...categories, category]);
        },
        delete: (id: string) => {
            const categories = storage.categories.get();
            storage.categories.set(categories.filter(c => c.id !== id));
        },
        clear: () => {
            localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
        },
    },
}; 