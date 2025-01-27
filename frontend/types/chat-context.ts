import { Message, RawMessage } from './chat';

/**
 * Base state interface for chat functionality
 */
export interface ChatState {
  messages: Message[];        // Processed chat messages
  rawMessages: RawMessage[]; // Raw message data before processing
  isLoading: boolean;        // Loading state for async operations
  streamingContent: string;  // Content being streamed in real-time
}

/**
 * Extended interface that includes state management functions
 */
export interface ChatContextType extends ChatState {
  addMessage: (message: Message) => void;
  addRawMessage: (message: RawMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setStreamingContent: (content: string) => void;
  clearRawMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

/**
 * Default initial state for the chat context
 */
export const initialChatState: ChatState = {
  messages: [],
  rawMessages: [],
  isLoading: false,
  streamingContent: '',
}; 