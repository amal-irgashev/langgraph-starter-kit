/**
 * Custom hook for processing LangGraph message streams
 * Handles the extraction and processing of content and sources from stream chunks
 * Maintains consistent processing logic across different stream types
 */

'use client';

import { useCallback } from 'react';
import { Message } from '@/types/chat';

interface StreamChunkResult {
  content: string | null;
  sources: string | null;
}

interface UseStreamProcessorProps {
  onContent: (content: string) => void;
  onSources: (sources: string) => void;
  onRawMessage: (message: any) => void;
}

export function useStreamProcessor({
  onContent,
  onSources,
  onRawMessage,
}: UseStreamProcessorProps) {
  /**
   * Processes a single stream chunk to extract content and sources
   * @param chunk - Raw stream chunk from LangGraph
   * @returns Object containing processed content and sources
   */
  const processStreamChunk = useCallback((chunk: any): StreamChunkResult => {
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
  }, []);

  /**
   * Processes an entire stream, handling content and sources
   * @param stream - AsyncIterable stream from LangGraph
   * @returns Accumulated content and sources
   */
  const processStream = useCallback(async (stream: AsyncIterable<any>) => {
    let currentContent = '';
    const sources: string[] = [];

    try {
      for await (const chunk of stream) {
        // Process raw message first
        onRawMessage(chunk);
        
        // Process content and sources
        const { content, sources: sourceContent } = processStreamChunk(chunk);
        if (content) {
          currentContent += content;
          onContent(currentContent);
        }
        if (sourceContent) {
          sources.push(sourceContent);
          onSources(sourceContent);
        }
      }

      return {
        finalContent: currentContent,
        allSources: sources
      };
    } catch (error) {
      console.error('Error processing stream:', error);
      throw error;
    }
  }, [processStreamChunk, onContent, onSources, onRawMessage]);

  return {
    processStream,
    processStreamChunk
  };
} 