import { GoogleGenerativeAI } from '@google/generative-ai';

// Character limits
export const CHAR_LIMITS = {
  USER_MESSAGE: 1000,
  TOTAL_CONTEXT: 10000,
} as const;

// Initialize Gemini AI
const getGeminiAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not configured in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CourseContext {
  title?: string;
  description?: string;
  level?: string;
  tags?: string;
  currentTopic?: string;
}

// Truncate text to specified limit
const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit - 3) + '...';
};

// Build context prompt for Gemini
const buildContextPrompt = (courseContext: CourseContext, recentMessages: ChatMessage[]): string => {
  let prompt = `You are an AI tutor helping with a course. Here's the course context:

Course Details:
- Title: ${courseContext.title || 'N/A'}
- Description: ${courseContext.description || 'N/A'}
- Level: ${courseContext.level || 'N/A'}
- Tags: ${courseContext.tags || 'N/A'}
- Current Topic: ${courseContext.currentTopic || 'General'}

Recent Conversation:
`;

  // Add recent messages for context (last 5 messages)
  const contextMessages = recentMessages.slice(-5);
  contextMessages.forEach(msg => {
    prompt += `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}\n`;
  });

  prompt += `
Please respond as a helpful AI tutor. Keep responses concise, educational, and relevant to the course context. If the question is not related to the course, gently redirect to course topics.`;

  // Truncate if too long
  return truncateText(prompt, CHAR_LIMITS.TOTAL_CONTEXT);
};

// Call Gemini API
export const callGeminiAPI = async (
  userMessage: string,
  courseContext: CourseContext,
  recentMessages: ChatMessage[] = []
): Promise<string> => {
  try {
    // Validate and truncate user message
    if (!userMessage.trim()) {
      throw new Error('Message cannot be empty');
    }

    const truncatedMessage = truncateText(userMessage.trim(), CHAR_LIMITS.USER_MESSAGE);
    
    // Initialize Gemini
    const genAI = getGeminiAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build context
    const contextPrompt = buildContextPrompt(courseContext, recentMessages);
    
    // Create the full prompt
    const fullPrompt = `${contextPrompt}

Current Student Question: ${truncatedMessage}

Please provide a helpful response:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    return text.trim();

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return 'Configuration Error: Gemini API key is not properly configured. Please check your environment settings.';
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return 'API Limit Reached: The Gemini API quota has been exceeded. Please try again later.';
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return 'Network Error: Unable to connect to Gemini API. Please check your internet connection.';
      }
      return `Error: ${error.message}`;
    }
    
    return 'An unexpected error occurred while getting response from AI tutor. Please try again.';
  }
};

// Generate unique message ID
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validate message before sending
export const validateMessage = (message: string): { isValid: boolean; error?: string } => {
  if (!message.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (message.length > CHAR_LIMITS.USER_MESSAGE) {
    return { 
      isValid: false, 
      error: `Message too long. Maximum ${CHAR_LIMITS.USER_MESSAGE} characters allowed. Current: ${message.length}` 
    };
  }

  return { isValid: true };
};

// Format timestamp for display
export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};