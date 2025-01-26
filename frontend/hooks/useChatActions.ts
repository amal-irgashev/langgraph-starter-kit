'use client';

import { useClient } from '../contexts/ClientContext';
import { useChat, Message } from '../contexts/ChatContext';
import { useCallback, useEffect, useState } from 'react';

interface StreamPayload {
  input: {
    messages: Message[];
  };
  streamMode: "messages-tuple";
}

interface MessageChunk {
  content: string | Array<{ text: string; type: string; index: number }>;
  type: string;
  tool_calls?: any[];
  tool_call_id?: string;
  response_metadata?: {
    finish_reason?: string;
  };
}

interface MessageMetadata {
  graph_id: string;
  langgraph_node: string;
}

type MessageTuple = [MessageChunk, MessageMetadata];

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
      // Create the stream with messages-tuple mode
      const stream = await client.runs.stream(threadId, assistantId, {
        input: {
          messages: [userMessage]
        },
        streamMode: "messages-tuple"
      });

      let currentContent = '';
      let isComplete = false;

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
        } else if (chunk.event === 'messages') {
          const [message, metadata] = chunk.data as MessageTuple;
          
          if (message.type === 'AIMessageChunk') {
            // Handle content which can be either string or array of chunks
            let newContent = '';
            if (Array.isArray(message.content)) {
              // Content is an array of text chunks
              newContent = message.content.map((c: { text: string }) => c.text).join('');
            } else {
              // Content is a string
              newContent = message.content;
            }

            // Only append if we have new content
            if (newContent.trim()) {
              currentContent += newContent;
              setStreamingContent(currentContent);
            }

            // Check for completion
            if (message.response_metadata?.finish_reason === 'stop' || 
                (metadata.langgraph_node === 'agent' && !message.tool_calls)) {
              isComplete = true;
            }
          } else if (message.type === 'tool') {
            // Handle tool response if needed
            console.log('Tool response:', message.content);
          }
        }
      }

      // After the stream is done, if we have content and it's complete, add it as a message
      if (currentContent && isComplete) {
        addMessage({
          role: 'assistant',
          content: currentContent
        });
      }
      setStreamingContent('');
      
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