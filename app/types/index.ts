export type MessageTone = 'formal' | 'informal' | 'friendly' | 'urgent';

export interface Message {
    id: string;
    recipient: string;
    context: string;
    tone: MessageTone;
    details: string;
    generatedMessage: string;
    createdAt: string;
}

export interface MessageTemplate {
    id: string;
    name: string;
    context: string;
    tone: MessageTone;
    details: string;
    createdAt: string;
}

export interface MessageCategory {
    id: string;
    name: string;
    description: string;
    color: string;
}

export interface ApiResponse {
    message: string;
    error?: string;
} 