import React from 'react';
import { 
  PenTool, 
  Target, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp, 
  Mail, 
  Video,
  Users
} from 'lucide-react';
import { IPromptTemplate } from './types';

// ==========================================
// ⭐ BRAND CONFIGURATION (MAKE IT YOURS) ⭐
// ==========================================
export const APP_NAME = "Helio"; 
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/4gM14meCI8gp8bvd5VaAw00";
// ==========================================

export const HELIO_SYSTEM_INSTRUCTION = `You are ${APP_NAME}, an Elite AI Marketing Director designed specifically for small and medium-sized businesses.

YOUR MISSION: Grow the business, increase revenue, and strengthen branding.

*** CRITICAL SUBSCRIPTION LOGIC (READ CAREFULLY) ***

You must check the "SUBSCRIPTION STATUS" provided in the context.

MODE A: FREE USER (Status: FREE)
1. RESTRICTIONS: 
   - Keep answers short (max 3 sentences).
   - NEVER provide full strategies, calendars, or long-form copy.
   - If asked for a premium task (strategy, calendar, campaign), give a 1-sentence teaser and say: "To generate the full comprehensive strategy, please upgrade to ${APP_NAME} Pro."
2. GOAL: Give a small taste of value, then sell the upgrade.

MODE B: PRO USER (Status: PRO)
1. UNLOCKED: Provide detailed, expert, long-form strategies.
2. BEHAVIOR: Be the best marketing consultant they have ever met. Deep analysis, specific steps.

*** END SUBSCRIPTION LOGIC ***

ADVANCED BEHAVIOR:
1. Adaptive Understanding: Analyze the business profile (provided in context) before answering. Adapt tone and strategy accordingly.
2. High-Quality Output: Answers must be structured, actionable, professional, and instantly usable. No generic fluff.

RESPONSE STRUCTURE (For PRO Users):
1. Main Answer (High-quality, strategic)
2. Short Version (Summary)
3. Suggested Next Steps

FINAL PRINCIPLES:
- Save them time.
- Make them money.
- Output tailored to their Brand Tone.
`;

export const QUICK_TOOLS: IPromptTemplate[] = [
  {
    id: 'customer-avatar',
    title: 'Deep Customer Avatar',
    description: 'Define your perfect customer: demographics, pain points, and desires.',
    prompt: `As ${APP_NAME}, an Elite AI Marketing Director, create a detailed customer avatar for my business. Include demographics, psychographics, pain points, goals, and where they typically seek information about my industry. The tone should be warm, inviting, and aligned with my brand voice.`,
    icon: <Users className="w-5 h-5" />,
    category: 'strategy',
    isPremium: true
  },
  {
    id: 'monthly-content-cal',
    title: '1-Month Content Calendar',
    description: 'A complete 30-day social media plan with hooks and ideas.',
    prompt: `As ${APP_NAME}, an Elite AI Marketing Director, generate a 1-month social media content calendar for my business. Include a mix of posts for Instagram, Facebook, and Google Business, focusing on engagement, showcasing products, behind-the-scenes glimpses, and customer testimonials. Suggest post types (e.g., carousel, single image, video script idea) and provide a brief description for each day.`,
    icon: <TrendingUp className="w-5 h-5" />,
    category: 'social',
    isPremium: true
  },
  {
    id: 'insta-caption',
    title: 'Viral Instagram Caption',
    description: 'Write a high-engagement caption for a product photo.',
    prompt: 'Write a high-engagement Instagram caption for a photo of our main product/service. Include a strong hook, value prop, and CTA.',
    icon: <Video className="w-5 h-5" />,
    category: 'social',
    isPremium: false
  },
  {
    id: 'email-blast',
    title: 'Sales Email Blast',
    description: 'Draft a persuasive email to your current customers.',
    prompt: 'Draft a persuasive sales email to my existing customer list announcing a new special offer. Focus on urgency and value.',
    icon: <Mail className="w-5 h-5" />,
    category: 'copy',
    isPremium: true
  },
  {
    id: 'competitor-analysis',
    title: 'Quick Competitor Check',
    description: 'Analyze how to stand out in your market.',
    prompt: 'Based on my business type, list 3 ways I can differentiate myself from standard competitors in this market immediately.',
    icon: <Target className="w-5 h-5" />,
    category: 'strategy',
    isPremium: true
  },
  {
    id: 'customer-reply',
    title: 'Handle Negative Review',
    description: 'Professional response to an angry customer.',
    prompt: 'Write a professional, empathetic, but brand-protecting response to a customer who left a negative review complaining about wait times.',
    icon: <MessageSquare className="w-5 h-5" />,
    category: 'strategy',
    isPremium: false
  },
  {
    id: 'creative-campaign',
    title: 'Viral Campaign Idea',
    description: 'A unique, out-of-the-box marketing stunt.',
    prompt: 'Give me one unique, "out-of-the-box" viral marketing campaign idea that would get people talking about my brand locally.',
    icon: <Lightbulb className="w-5 h-5" />,
    category: 'creative',
    isPremium: true
  }
];