'use client';

import React from 'react';
import { useClient } from './ClientContext';
import { useChat } from './ChatContext';
import { Message } from '@/types/chat';

interface Thread {
  thread_id: string;
  created_at: string;
  messages: Message[];
}

interface ThreadContextType {
  threads: Thread[];
  currentThreadId: string | null;
  isLoading: boolean;
  loadThreads: () => Promise<void>;
  createNewThread: () => Promise<string>;
  loadThreadHistory: (threadId: string) => Promise<void>;
  deleteThread: (threadId: string) => Promise<void>;
  deleteAllThreads: () => Promise<void>;
  setCurrentThreadId: (threadId: string | null) => void;
}

const ThreadContext = React.createContext<ThreadContextType | null>(null);

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const client = useClient();
  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [currentThreadId, setCurrentThreadId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addMessage, setMessages } = useChat();

  const loadThreads = React.useCallback(async () => {
    if (!client) return;
    
    try {
      setIsLoading(true);
      console.log('Loading threads from backend');
      const response = await client.threads.search({
        metadata: {
          graph_id: process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent'
        },
        limit: 10 // Limit to 10 most recent threads
      });
      
      // Log the full thread details for debugging
      console.log('Raw thread response:', JSON.stringify(response, null, 2));
      
      // Filter out any threads that don't have valid IDs and sort by creation date
      const validThreads = response
        .filter(thread => {
          if (!thread.thread_id) {
            console.warn('Found thread without ID:', thread);
            return false;
          }
          return true;
        })
        .sort((a, b) => {
          // Sort by creation date, newest first
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      
      const formattedThreads = validThreads.map(thread => ({
        thread_id: thread.thread_id,
        created_at: thread.created_at || new Date().toISOString(),
        messages: []
      }));
      
      console.log('Formatted threads:', formattedThreads.map(t => ({
        id: t.thread_id,
        created: t.created_at
      })));
      
      setThreads(formattedThreads);
      
      // Load messages for each thread
      await Promise.all(formattedThreads.map(thread => 
        loadThreadHistory(thread.thread_id)
      ));
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  const createNewThread = React.useCallback(async () => {
    if (!client) throw new Error('Client not initialized');

    try {
      setIsLoading(true);
      console.log('Creating new thread');
      const response = await client.threads.create({
        metadata: {
          graph_id: process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent'
        }
      });
      console.log('Thread created:', response.thread_id);
      
      const newThread: Thread = {
        thread_id: response.thread_id,
        created_at: new Date().toISOString(),
        messages: []
      };
      
      // Update threads list with the new thread at the beginning
      setThreads(prev => [newThread, ...prev]);
      
      // Set as current thread
      setCurrentThreadId(newThread.thread_id);
      
      return newThread.thread_id;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  const loadThreadHistory = React.useCallback(async (threadId: string) => {
    if (!client) return;

    try {
      const state = await client.threads.getState(threadId);
      console.log('Thread state:', state);
      
      // Handle both direct message array and nested message array in values
      let messages: Message[] = [];
      
      // Type assertion to handle potential message locations
      const rawState = state as any;
      if (rawState?.values?.messages && Array.isArray(rawState.values.messages)) {
        // Convert LangGraph message format to our format
        messages = rawState.values.messages.map((msg: { type: string; content: string }) => ({
          role: msg.type === 'human' ? 'user' : 'assistant' as const,
          content: msg.content
        }));
      } else if (rawState?.messages && Array.isArray(rawState.messages)) {
        messages = rawState.messages.map((msg: { role: string; content: string }) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));
      }
      
      console.log('Thread messages:', messages);
      
      // Always update thread with latest messages, even if empty
      setThreads(prev => prev.map(thread => {
        if (thread.thread_id === threadId) {
          return {
            ...thread,
            messages
          };
        }
        return thread;
      }));

      // Sync messages with chat context
      setMessages(messages);
    } catch (error) {
      console.error(`Error loading thread history for ${threadId}:`, error);
    }
  }, [client, setMessages]);

  const deleteThread = React.useCallback(async (threadId: string): Promise<void> => {
    if (!client) return;

    try {
      setIsLoading(true);
      console.log('Deleting thread:', threadId);
      
      // Delete from backend
      await client.threads.delete(threadId);
      console.log('Backend deletion successful');
      
      // Update local state immediately
      setThreads(prev => {
        console.log('Updating local state, removing thread:', threadId);
        return prev.filter(t => t.thread_id !== threadId);
      });
      
      // Reset current thread if deleted
      if (currentThreadId === threadId) {
        console.log('Resetting current thread');
        setCurrentThreadId(null);
      }
      
      // Verify deletion and refresh thread list
      try {
        await client.threads.getState(threadId);
        console.error('Thread still exists after deletion');
      } catch (error) {
        console.log('Verified thread deletion');
        // Only refresh the list if deletion is verified
        await loadThreads();
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client, currentThreadId, loadThreads]);

  const deleteAllThreads = React.useCallback(async () => {
    if (!client) return;

    try {
      setIsLoading(true);
      console.log('Fetching all threads for deletion');
      
      // Get all threads without limit
      const allThreads = await client.threads.search({
        metadata: {
          graph_id: process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent'
        }
      });
      
      console.log(`Found ${allThreads.length} threads to delete`);
      
      // Delete all threads in parallel
      await Promise.all(allThreads.map(async (thread) => {
        try {
          await client.threads.delete(thread.thread_id);
          console.log('Deleted thread:', thread.thread_id);
        } catch (error) {
          console.error(`Error deleting thread ${thread.thread_id}:`, error);
        }
      }));
      
      // Clear local state
      setThreads([]);
      setCurrentThreadId(null);
      
      // Verify deletion by refreshing the list
      const remainingThreads = await client.threads.search({
        metadata: {
          graph_id: process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent'
        }
      });
      
      if (remainingThreads.length > 0) {
        console.warn(`${remainingThreads.length} threads still remain after deletion`);
        // Try to delete remaining threads
        await Promise.all(remainingThreads.map(async (thread) => {
          try {
            await client.threads.delete(thread.thread_id);
            console.log('Deleted remaining thread:', thread.thread_id);
          } catch (error) {
            console.error(`Error deleting remaining thread ${thread.thread_id}:`, error);
          }
        }));
      }
      
      // Final refresh
      await loadThreads();
      
      console.log('All threads deleted');
    } catch (error) {
      console.error('Error deleting all threads:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client, loadThreads]);

  React.useEffect(() => {
    if (client) {
      loadThreads();
    }
  }, [client]);

  const value = React.useMemo(() => ({
    threads,
    currentThreadId,
    isLoading,
    loadThreads,
    createNewThread,
    loadThreadHistory,
    deleteThread,
    deleteAllThreads,
    setCurrentThreadId
  }), [threads, currentThreadId, isLoading, loadThreads, createNewThread, loadThreadHistory, deleteThread, deleteAllThreads]);

  return (
    <ThreadContext.Provider value={value}>
      {children}
    </ThreadContext.Provider>
  );
}

export function useThread() {
  const context = React.useContext(ThreadContext);
  if (!context) {
    throw new Error('useThread must be used within a ThreadProvider');
  }
  return context;
}
