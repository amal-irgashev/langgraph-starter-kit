/**
 * Hook for managing chat interactions and message handling
 * Provides functionality for sending messages and managing chat state
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useClient } from '@/contexts/ClientContext';
import { useThread } from '@/contexts/ThreadContext';
import { useChat } from '@/contexts/ChatContext';
import { useStreamProcessor } from './useStreamProcessor';
import { Message } from '@/types/chat';

interface UseChatActionsProps {
  threadId?: string;
}

/**
 * Utility function to get the LangGraph graph ID from environment variables
 * @returns The configured graph ID or default value
 */
const getGraphId = () => process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent';

export function useChatActions({ threadId: initialThreadId }: UseChatActionsProps = {}) {
  const client = useClient();
  const { loadThreadHistory, createNewThread } = useThread();
  const { 
    setIsLoading, 
    addMessage, 
    setStreamingContent, 
    addRawMessage 
  } = useChat();
  
  const [threadId, setThreadId] = useState<string | undefined>(initialThreadId);
  const [ready, setReady] = useState(false);

  // Initialize stream processor with callbacks
  const { processStream } = useStreamProcessor({
    onContent: setStreamingContent,
    onSources: (source) => console.log('Source received:', source),
    onRawMessage: addRawMessage
  });

  // Update threadId when initialThreadId changes
  useEffect(() => {
    setThreadId(initialThreadId);
  }, [initialThreadId]);

  // Initialize chat and load history if needed
  useEffect(() => {
    async function init() {
      if (!client) return;

      try {
        if (threadId) {
          await loadThreadHistory(threadId);
        }
        setReady(true);
      } catch (error) {
        console.error('Error initializing chat:', error);
        setReady(false);
      }
    }

    init();
  }, [client, threadId, loadThreadHistory]);

  /**
   * Sends a message to the chat and processes the response stream
   * Creates a new thread if none exists
   * @param content - The message content to send
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!client) {
      throw new Error('Chat not initialized');
    }

    setIsLoading(true);

    try {
      // Create a new thread if none exists
      let currentThreadId = threadId;
      if (!currentThreadId) {
        currentThreadId = await createNewThread();
        setThreadId(currentThreadId);
      }

      // Add the user message immediately
      const userMessage: Message = { role: 'user', content };
      addMessage(userMessage);

      // Create a streaming run with the message
      const stream = await client.runs.stream(currentThreadId, getGraphId(), {
        input: { messages: [userMessage] },
        streamMode: ["messages-tuple", "messages"],
        streamSubgraphs: true
      });

      // Process the stream and get final results
      const { finalContent, allSources } = await processStream(stream);

      // Add the complete assistant message with sources
      if (finalContent.trim()) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: finalContent,
          metadata: allSources.length ? { sources: allSources } : undefined
        };
        addMessage(assistantMessage);
      }
      
      setStreamingContent(''); // Clear streaming content
      await loadThreadHistory(currentThreadId);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client, threadId, addMessage, processStream, setStreamingContent, loadThreadHistory, setIsLoading, createNewThread]);

  return {
    threadId,
    ready,
    sendMessage,
  };
} 