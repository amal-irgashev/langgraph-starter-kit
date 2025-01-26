'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface RawMessage {
  event: string;
  data: any;
}

interface ChatContextType {
  messages: Message[];
  rawMessages: RawMessage[];
  addMessage: (message: Message) => void;
  addRawMessage: (message: RawMessage) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  streamingContent: string;
  setStreamingContent: (content: string) => void;
  clearRawMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rawMessages, setRawMessages] = useState<RawMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState<string>('');

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      // For user messages, always add them
      if (message.role === 'user') {
        return [...prev, message];
      }

      // For assistant messages, check if it's a duplicate
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.role === 'assistant' && lastMessage?.content === message.content) {
        return prev;
      }

      return [...prev, message];
    });
  };

  const addRawMessage = (message: RawMessage) => {
    setRawMessages(prev => [...prev, message]);
  };

  const clearRawMessages = () => {
    setRawMessages([]);
  };

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        rawMessages,
        addMessage,
        addRawMessage,
        isLoading, 
        setIsLoading,
        streamingContent,
        setStreamingContent,
        clearRawMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
