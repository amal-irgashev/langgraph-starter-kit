import { useCallback } from 'react';
import { Message, RawMessage } from '@/types/chat';
import { ChatState } from '@/types/chat-context';

type SetState = React.Dispatch<React.SetStateAction<ChatState>>;

/**
 * Custom hook that manages chat actions and state updates
 * Provides memoized functions to modify chat state
 */
export function useChatStateActions(setState: SetState) {
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
} 