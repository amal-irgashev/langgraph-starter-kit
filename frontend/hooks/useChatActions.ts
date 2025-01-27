// This hook provides functionality for managing chat actions like sending messages and initializing threads.
// It handles thread creation, history loading, and message sending while managing loading states.
// Used by chat components to interact with the chat backend and maintain chat state.

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useClient } from '@/contexts/ClientContext';
import { useThread } from '@/contexts/ThreadContext';
import { useChat } from '@/contexts/ChatContext';
import { Message } from '@/types/chat';

interface UseChatActionsProps {
  threadId?: string;
}

// Utility function to get graph ID
const getGraphId = () => process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent';

// Process stream chunk to extract content
const processStreamChunk = (chunk: any): string | null => {
  if (chunk.event !== "messages") return null;
  
  const [messageData, metadata] = chunk.data;
  if (messageData.type !== 'AIMessageChunk' || 
      metadata?.langgraph_node?.includes('tool') || 
      typeof messageData.content !== 'string' || 
      messageData.additional_kwargs?.tool_calls || 
      messageData.additional_kwargs?.function_call) {
    return null;
  }
  
  return messageData.content || null;
};

export function useChatActions({ threadId: initialThreadId }: UseChatActionsProps = {}) {
  const client = useClient();
  const { loadThreadHistory } = useThread();
  const { setIsLoading, addMessage, setStreamingContent, addRawMessage } = useChat();
  const [threadId, setThreadId] = useState<string | undefined>(initialThreadId);
  const [ready, setReady] = useState(false);

  // Update threadId when initialThreadId changes
  useEffect(() => {
    setThreadId(initialThreadId);
  }, [initialThreadId]);

  useEffect(() => {
    async function init() {
      if (!client) return;

      try {
        // If no thread ID is provided, create a new one
        if (!threadId) {
          const thread = await client.threads.create({
            metadata: { graph_id: getGraphId() }
          });
          console.log('Created new thread:', thread.thread_id);
          setThreadId(thread.thread_id);
        }

        // Load thread history
        if (threadId) {
          console.log('Loading history for thread:', threadId);
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

  const sendMessage = useCallback(async (content: string) => {
    if (!client || !threadId) {
      throw new Error('Chat not initialized');
    }

    setIsLoading(true);
    let currentContent = '';

    try {
      console.log('Using thread ID for message:', threadId);
      
      // Add the user message immediately
      const userMessage: Message = { role: 'user', content };
      addMessage(userMessage);

      console.log('Starting stream with message:', userMessage);

      // Create a streaming run with the message
      const stream = await client.runs.stream(threadId, getGraphId(), {
        input: { messages: [userMessage] },
        streamMode: ["messages-tuple", "messages"],
        streamSubgraphs: true
      });

      // Process the stream
      for await (const chunk of stream) {
        console.log('Received stream chunk:', chunk);
        
        // Add every chunk to raw messages for debug panel
        addRawMessage(chunk);
        
        const content = processStreamChunk(chunk);
        if (content) {
          currentContent += content;
          console.log('Updated content:', currentContent);
          setStreamingContent(currentContent);
        }
      }

      console.log('Stream completed for thread:', threadId);
      
      // Add the complete assistant message only after streaming is done
      if (currentContent.trim()) {
        const assistantMessage: Message = {
          role: 'assistant' as const,
          content: currentContent
        };
        addMessage(assistantMessage);
      }
      setStreamingContent(''); // Clear streaming content

      // Load updated thread history
      await loadThreadHistory(threadId);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client, threadId, addMessage, setStreamingContent, loadThreadHistory, setIsLoading, addRawMessage]);

  return {
    threadId,
    ready,
    sendMessage,
  };
} 