'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Message, RawMessage } from '@/types/chat';

// Types for managing chat state and messages
interface ChatState {
  messages: Message[];        // Processed chat messages
  rawMessages: RawMessage[]; // Raw message data before processing
  isLoading: boolean;        // Loading state for async operations
  streamingContent: string;  // Content being streamed in real-time
}

// Extended interface that includes state management functions
interface ChatContextType extends ChatState {
  addMessage: (message: Message) => void;
  addRawMessage: (message: RawMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setStreamingContent: (content: string) => void;
  clearRawMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

// Default initial state for the chat context
const initialState: ChatState = {
  messages: [],
  rawMessages: [],
  isLoading: false,
  streamingContent: '',
};

// Create context with undefined default to ensure proper provider usage
const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * Custom hook that manages chat actions and state updates
 * Provides memoized functions to modify chat state
 */
const useChatActions = (state: ChatState, setState: React.Dispatch<React.SetStateAction<ChatState>>) => {
  // Add a new processed message to the chat
  const addMessage = useCallback((message: Message) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }, [setState]);

  // Add a new raw message to the chat
  const addRawMessage = useCallback((message: RawMessage) => {
    setState(prev => ({
      ...prev,
      rawMessages: [...prev.rawMessages, message]
    }));
  }, [setState]);

  // Update loading state for async operations
  const setIsLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, [setState]);

  // Update streaming content during real-time message delivery
  const setStreamingContent = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      streamingContent: content
    }));
  }, [setState]);

  // Clear all raw messages from state
  const clearRawMessages = useCallback(() => {
    setState(prev => ({
      ...prev,
      rawMessages: []
    }));
  }, [setState]);

  // Replace all messages with a new array
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

/**
 * ChatProvider component that manages chat state and provides context
 * Combines state and actions into a single context value
 */
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ChatState>(initialState);
  const actions = useChatActions(state, setState);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

/**
 * Custom hook to access chat context
 * Throws error if used outside ChatProvider
 */
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
