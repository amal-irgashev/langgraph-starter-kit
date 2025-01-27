'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Message, RawMessage } from '@/types/chat';
import { useEventSource } from '@/hooks/useEventSource';

interface ChatContextType {
  messages: Message[];
  rawMessages: RawMessage[];
  isLoading: boolean;
  streamingContent: string;
  addMessage: (message: Message) => void;
  addRawMessage: (message: RawMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setStreamingContent: (content: string) => void;
  clearRawMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rawMessages, setRawMessages] = useState<RawMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const addRawMessage = useCallback((message: RawMessage) => {
    setRawMessages(prev => [...prev, message]);
  }, []);

  const clearRawMessages = useCallback(() => {
    setRawMessages([]);
  }, []);

  const value = {
    messages,
    rawMessages,
    isLoading,
    streamingContent,
    addMessage,
    addRawMessage,
    setIsLoading,
    setStreamingContent,
    clearRawMessages,
    setMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
