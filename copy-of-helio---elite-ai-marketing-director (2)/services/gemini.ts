import { GoogleGenAI } from "@google/genai";
import { HELIO_SYSTEM_INSTRUCTION } from '../constants';
import { IBusinessProfile, IMessage } from '../types';

// Initialize client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToHelio = async (
  history: IMessage[],
  newMessage: string,
  profile: IBusinessProfile
): Promise<string> => {
  
  // Construct the context string from the business profile
  // We explicitly inject the Subscription Status here.
  const profileContext = `
  CURRENT BUSINESS CONTEXT:
  - Business Name: ${profile.name}
  - Industry/Type: ${profile.type}
  - Target Audience: ${profile.targetAudience}
  - Brand Tone: ${profile.tone}
  - Unique Selling Point: ${profile.uniqueSellingPoint}
  
  *** SUBSCRIPTION STATUS: ${profile.subscriptionStatus ? profile.subscriptionStatus.toUpperCase() : 'FREE'} ***
  
  Use the SUBSCRIPTION STATUS to determine the depth and length of your response based on your system instructions.
  `;

  try {
    // We use gemini-2.5-flash for speed and efficiency in this interactive chat agent
    const modelId = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        {
            role: 'user',
            parts: [{ text: `[System Context]\n${profileContext}\n\n[User Message]\n${newMessage}` }]
        }
      ],
      config: {
        systemInstruction: HELIO_SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance creativity and professionalism
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my strategy servers right now. Please check your API key or try again in a moment.";
  }
};