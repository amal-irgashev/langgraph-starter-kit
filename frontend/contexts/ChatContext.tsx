'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Message, RawMessage } from '@/types/chat';

// Types
interface ChatState {
  messages: Message[];
  rawMessages: RawMessage[];
  isLoading: boolean;
  streamingContent: string;
}

interface ChatContextType extends ChatState {
  addMessage: (message: Message) => void;
  addRawMessage: (message: RawMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setStreamingContent: (content: string) => void;
  clearRawMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

// Initial state
const initialState: ChatState = {
  messages: [],
  rawMessages: [],
  isLoading: false,
  streamingContent: '',
};

// Create context with a default value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Custom hook for actions
const useChatActions = (state: ChatState, setState: React.Dispatch<React.SetStateAction<ChatState>>) => {
  const addMessage = useCallback((message: Message) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }, [setState]);

  const addRawMessage = useCallback((message: RawMessage) => {
    setState(prev => ({
      ...prev,
      rawMessages: [...prev.rawMessages, message]
    }));
  }, [setState]);

  const setIsLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, [setState]);

  const setStreamingContent = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      streamingContent: content
    }));
  }, [setState]);

  const clearRawMessages = useCallback(() => {
    setState(prev => ({
      ...prev,
      rawMessages: []
    }));
  }, [setState]);

  const setMessages = useCallback((messages: Message[]) => {
    setState(prev => ({
      ...prev,
      messages
    }));
  }, [setState]);

  return {
    addMessage,
    addRawMessage,
    setIsLoading,
    setStreamingContent,
    clearRawMessages,
    setMessages,
  };
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ChatState>(initialState);
  const actions = useChatActions(state, setState);

  const value = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
