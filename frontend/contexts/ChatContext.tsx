'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { ChatState, ChatContextType, initialChatState } from '@/types/chat-context';
import { useChatStateActions } from '@/hooks/useChatStateActions';

// Create context with undefined default to ensure proper provider usage
const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * ChatProvider component that manages chat state and provides context
 */
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ChatState>(initialChatState);
  const actions = useChatStateActions(setState);

  const value = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

/**
 * Custom hook to access chat context
 */
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
