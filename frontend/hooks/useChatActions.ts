'use client';

import { useClient } from '../contexts/ClientContext';
import { useChat, Message } from '../contexts/ChatContext';
import { useCallback, useEffect, useState } from 'react';

interface StreamPayload {
  input: {
    messages: Message[];
  };
}

interface LangGraphMessage {
  content: string;
  type: 'human' | 'ai';
  additional_kwargs: Record<string, any>;
  response_metadata?: {
    finish_reason?: string;
  };
  tool_calls?: any[];
}

interface ValuesEvent {
  messages: LangGraphMessage[];
}

export function useChatActions() {
  const client = useClient();
  const { addMessage, addRawMessage, clearRawMessages, setIsLoading, setStreamingContent } = useChat();
  const [threadId, setThreadId] = useState<string | null>(null);
  const [assistantId, setAssistantId] = useState<string | null>(null);

  // Initialize thread and assistant on component mount
  useEffect(() => {
    async function init() {
      if (!client) return;
      
      try {
        // Create a new thread
        const thread = await client.threads.create();
        setThreadId(thread.thread_id);

        // Get the first available assistant
        const assistants = await client.assistants.search();
        if (assistants.length > 0) {
          setAssistantId(assistants[0].assistant_id);
        } else {
          console.error('No assistants available');
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    }

    init();
  }, [client]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !client || !threadId || !assistantId) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content
    };
    addMessage(userMessage);
    setIsLoading(true);
    clearRawMessages(); // Clear previous raw messages

    try {
      // Create the stream with messages mode
      const stream = await client.runs.stream(threadId, assistantId, {
        input: {
          messages: [userMessage]
        }
      });

      // Process the stream
      for await (const chunk of stream) {
        // Store raw message for debugging
        addRawMessage({
          event: chunk.event,
          data: chunk.data
        });

        // Handle different event types
        if (chunk.event === 'metadata') {
          // Run started
          console.log('Run started:', chunk.data);
        } else if (chunk.event === 'values') {
          const valuesData = chunk.data as ValuesEvent;
          const messages = valuesData.messages;
          
          // Get the last message
          const lastMessage = messages[messages.length - 1];
          
          if (lastMessage.type === 'ai') {
            // Update streaming content
            setStreamingContent(lastMessage.content);

            // If this is the final message
            if (lastMessage.response_metadata?.finish_reason === 'stop') {
              addMessage({
                role: 'assistant',
                content: lastMessage.content
              });
              setStreamingContent('');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [client, threadId, assistantId, addMessage, addRawMessage, clearRawMessages, setIsLoading, setStreamingContent]);

  const ready = Boolean(client && threadId && assistantId);

  return {
    sendMessage,
    ready,
    threadId,
    assistantId
  };
} 