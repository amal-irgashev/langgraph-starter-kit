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
  setThreads: (threads: Thread[]) => void;
}

const ThreadContext = React.createContext<ThreadContextType | null>(null);

// Utility functions to keep the code DRY
const getGraphId = () => process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID || 'react_agent';

const formatThread = (thread: any): Thread => ({
  thread_id: thread.thread_id,
  created_at: thread.created_at || new Date().toISOString(),
  messages: []
});

const formatMessages = (state: any): Message[] => {
  if (!state) return [];
  
  const rawState = state as any;
  if (rawState?.values?.messages && Array.isArray(rawState.values.messages)) {
    return rawState.values.messages.map((msg: { type: string; content: string }) => ({
      role: msg.type === 'human' ? 'user' : 'assistant' as const,
      content: msg.content
    }));
  }
  if (rawState?.messages && Array.isArray(rawState.messages)) {
    return rawState.messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }));
  }
  return [];
};

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const client = useClient();
  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [currentThreadId, setCurrentThreadId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setMessages } = useChat();

  const loadThreads = React.useCallback(async () => {
    if (!client) return;
    
    try {
      setIsLoading(true);
      const response = await client.threads.search({
        metadata: { graph_id: getGraphId() },
        limit: 10
      });
      
      const validThreads = response
        .filter(thread => thread.thread_id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(formatThread);
      
      setThreads(validThreads);
      await Promise.all(validThreads.map(thread => loadThreadHistory(thread.thread_id)));
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
      const response = await client.threads.create({
        metadata: { graph_id: getGraphId() }
      });
      
      const newThread = formatThread(response);
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

  const loadThreadHistory = React.useCallback(async (threadId: string) => {
    if (!client) return;

    try {
      const state = await client.threads.getState(threadId);
      const messages = formatMessages(state);
      
      setThreads(prev => prev.map(thread => 
        thread.thread_id === threadId ? { ...thread, messages } : thread
      ));
      setMessages(messages);
    } catch (error) {
      console.error(`Error loading thread history for ${threadId}:`, error);
    }
  }, [client, setMessages]);

  const deleteThread = React.useCallback(async (threadId: string) => {
    if (!client) return;

    try {
      setIsLoading(true);
      await client.threads.delete(threadId);
      
      setThreads(prev => prev.filter(t => t.thread_id !== threadId));
      if (currentThreadId === threadId) {
        setCurrentThreadId(null);
      }
      
      await loadThreads();
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
      const allThreads = await client.threads.search({
        metadata: { graph_id: getGraphId() }
      });
      
      await Promise.all(allThreads.map(thread => 
        client.threads.delete(thread.thread_id).catch(error => 
          console.error(`Error deleting thread ${thread.thread_id}:`, error)
        )
      ));
      
      setThreads([]);
      setCurrentThreadId(null);
    } catch (error) {
      console.error('Error deleting all threads:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  const value = {
    threads,
    currentThreadId,
    isLoading,
    loadThreads,
    createNewThread,
    loadThreadHistory,
    deleteThread,
    deleteAllThreads,
    setCurrentThreadId,
    setThreads
  };

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
