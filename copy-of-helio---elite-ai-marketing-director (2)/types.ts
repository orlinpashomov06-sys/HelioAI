import React from 'react';

export type ViewState = 'dashboard' | 'chat' | 'profile';

export interface IBusinessProfile {
  name: string;
  type: string; // e.g., "Coffee Shop", "SaaS", "Consultant"
  targetAudience: string;
  tone: string; // e.g., "Professional", "Friendly", "Edgy"
  uniqueSellingPoint: string;
  subscriptionStatus: 'free' | 'pro';
}

export interface IMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface IPromptTemplate {
    id: string;
    title: string;
    description: string;
    prompt: string;
    icon: React.ReactNode;
    category: 'strategy' | 'social' | 'copy' | 'creative';
    isPremium?: boolean;
}