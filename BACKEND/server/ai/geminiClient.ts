import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!ENV.GEMINI_API_KEY || ENV.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: ENV.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    } catch (err) {
      logger.error('Failed to initialize GoogleGenAI client:', err);
      aiClient = null;
    }
  }
  return aiClient;
}

export async function callAgent(systemPrompt: string, userContext: string): Promise<string | null> {
  const client = getGeminiClient();
  if (!client) {
    logger.info('Gemini API key not configured or demo key used. Falling back to built-in domain AI generator.');
    return null;
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userContext,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        topP: 0.95
      }
    });

    return response.text || null;
  } catch (error) {
    logger.warn('Gemini API call failed, using graceful domain generator:', error);
    return null;
  }
}
