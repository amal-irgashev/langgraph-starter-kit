'use client';

// Import statements and module declarations
import React from 'react';
import { useClient } from './ClientContext';
import { useChat } from './ChatContext';
import { Message } from '@/types/chat';

// Type for thread state values
interface ThreadState {
  values?: {
    messages?: Message[];
  };
}

// Represents a chat thread with messages
interface Thread {
  thread_id: string;
  created_at: string;
  messages: Message[];
}

// Context type definition for thread management
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

// Create context for thread management
const ThreadContext = React.createContext<ThreadContextType | null>(null);

// Helper function to get the graph ID from environment variables
const getGraphId = () => process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent';

/**
 * ThreadProvider component that manages chat thread state and operations
 * Provides context for thread management to child components
 */
export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const client = useClient();
  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [currentThreadId, setCurrentThreadId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setMessages } = useChat();

  /**
   * Loads all threads from the backend
   * Filters and sorts threads by creation date
   */
  const loadThreads = React.useCallback(async () => {
    if (!client) return;
    
    try {
      setIsLoading(true);
      const response = await client.threads.search({
        metadata: { graph_id: getGraphId() }
      });
      
      const validThreads = await Promise.all(
        response
          .filter(thread => thread.thread_id)
          .map(async thread => {
            try {
              const state = await client.threads.getState(thread.thread_id) as ThreadState;
              return {
                thread_id: thread.thread_id,
                created_at: thread.created_at || new Date().toISOString(),
                messages: state?.values?.messages || []
              };
            } catch (error) {
              console.error(`Thread ${thread.thread_id} not found:`, error);
              return null;
            }
          })
      );

      // Filter out null threads and sort by creation date
      const activeThreads = validThreads
        .filter((thread): thread is Thread => thread !== null)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setThreads(activeThreads);
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  // Initialize threads when component mounts
  React.useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  /**
   * Loads message history for a specific thread
   * Updates both thread messages and current chat messages
   */
  const loadThreadHistory = React.useCallback(async (threadId: string) => {
    if (!client) return;

    try {
      const state = await client.threads.getState(threadId) as ThreadState;
      const messages = state?.values?.messages || [];
      
      // Update thread messages in state
      setThreads(prev => prev.map(thread => 
        thread.thread_id === threadId ? { ...thread, messages } : thread
      ));
      setMessages(messages);
    } catch (error) {
      console.error(`Error loading thread history:`, error);
    }
  }, [client, setMessages]);

  /**
   * Creates a new chat thread
   * Returns the new thread ID
   */
  const createNewThread = React.useCallback(async () => {
    if (!client) throw new Error('Client not initialized');

    try {
      setIsLoading(true);
      const thread = await client.threads.create({
        metadata: { graph_id: getGraphId() }
      });
      
      const newThread = {
        thread_id: thread.thread_id,
        created_at: thread.created_at || new Date().toISOString(),
        messages: []
      };

      // Add new thread to beginning of threads list
      setThreads(prev => [newThread, ...prev]);
      setCurrentThreadId(newThread.thread_id);
      return newThread.thread_id;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  /**
   * Deletes a specific thread
   * If current thread is deleted, resets current thread state
   */
  const deleteThread = React.useCallback(async (threadId: string) => {
    if (!client) return;

    try {
      setIsLoading(true);
      await client.threads.delete(threadId);
      await loadThreads();
      
      // Reset current thread if it was deleted
      if (currentThreadId === threadId) {
        setCurrentThreadId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client, currentThreadId, setMessages, loadThreads]);

  /**
   * Deletes all threads associated with current graph
   * Resets all thread-related state
   */
  const deleteAllThreads = React.useCallback(async () => {
    if (!client) return;

    try {
      setIsLoading(true);
      const allThreads = await client.threads.search({
        metadata: { graph_id: getGraphId() }
      });
      
      // Delete all threads in parallel
      await Promise.all(
        allThreads.map(thread => 
          client.threads.delete(thread.thread_id)
            .catch(error => console.error(`Error deleting thread ${thread.thread_id}:`, error))
        )
      );
      
      await loadThreads();
      setCurrentThreadId(null);
      setMessages([]);
    } catch (error) {
      console.error('Error deleting all threads:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client, setMessages, loadThreads]);

  // Context value containing all thread management functions and state
  const value = {
    threads,
    currentThreadId,
    isLoading,
    loadThreads,
    createNewThread,
    loadThreadHistory,
    deleteThread,
    deleteAllThreads,
    setCurrentThreadId
  };

  return (
    <ThreadContext.Provider value={value}>
      {children}
    </ThreadContext.Provider>
  );
}

/**
 * Custom hook to access thread context
 * Throws error if used outside ThreadProvider
 */
export function useThread() {
  const context = React.useContext(ThreadContext);
  if (!context) {
    throw new Error('useThread must be used within a ThreadProvider');
  }
  return context;
}
