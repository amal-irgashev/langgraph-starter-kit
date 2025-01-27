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

// Process stream chunk to extract content and sources
const processStreamChunk = (chunk: any): { content: string | null, sources: string | null } => {
  if (chunk.event !== "messages") return { content: null, sources: null };
  
  const [messageData, metadata] = chunk.data;
  
  // Handle tool messages (sources)
  if (metadata?.langgraph_node?.includes('tool') || 
      messageData.additional_kwargs?.tool_calls || 
      messageData.type === 'tool') {
    return { 
      content: null, 
      sources: messageData.content || null 
    };
  }
  
  // Handle AI message chunks and streaming content
  if ((messageData.type === 'AIMessageChunk' || messageData.type === 'ai') && 
      typeof messageData.content === 'string') {
    return { 
      content: messageData.content || null,
      sources: null 
    };
  }
  
  return { content: null, sources: null };
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
        // Only load history if we have a threadId
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

  const sendMessage = useCallback(async (content: string) => {
    if (!client || !threadId) {
      throw new Error('Chat not initialized');
    }

    setIsLoading(true);
    let currentContent = '';
    let sources: string[] = [];

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
        
        const { content, sources: sourceContent } = processStreamChunk(chunk);
        if (content) {
          currentContent += content;
          console.log('Updated content:', currentContent);
          setStreamingContent(currentContent);
        }
        if (sourceContent) {
          sources.push(sourceContent);
        }
      }

      console.log('Stream completed for thread:', threadId);
      
      // Add the complete assistant message with sources only after streaming is done
      if (currentContent.trim()) {
        const assistantMessage: Message = {
          role: 'assistant' as const,
          content: currentContent,
          // If we have sources, add them as metadata
          metadata: sources.length ? {
            sources: sources
          } : undefined
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