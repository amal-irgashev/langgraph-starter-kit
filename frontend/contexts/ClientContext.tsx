/**
 * ClientContext provides a React context for managing a LangGraph client instance.
 * It handles client initialization, error states, and provides access to the client
 * throughout the application via the useClient hook.
 */


'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Client } from '@langchain/langgraph-sdk';

// Types
interface ClientConfig {
  apiUrl: string;
  apiKey?: string;
}

interface ClientContextValue {
  client: Client | null;
  isInitialized: boolean;
  error: Error | null;
}

interface ClientProviderProps {
  children: ReactNode;
  config: ClientConfig;
}

// Initial context value
const initialContextValue: ClientContextValue = {
  client: null,
  isInitialized: false,
  error: null,
};

// Create context with initial value
const ClientContext = createContext<ClientContextValue>(initialContextValue);

// Utility function to create client
const createClient = (config: ClientConfig): Client => {
  try {
    return new Client(config);
  } catch (error) {
    console.error('Failed to initialize client:', error);
    throw error;
  }
};

export function ClientProvider({ children, config }: ClientProviderProps) {
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => {
    try {
      const client = createClient(config);
      return {
        client,
        isInitialized: true,
        error: null,
      };
    } catch (error) {
      return {
        client: null,
        isInitialized: false,
        error: error instanceof Error ? error : new Error('Failed to initialize client'),
      };
    }
  }, [config]);

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }

  if (context.error) {
    throw context.error;
  }

  if (!context.isInitialized) {
    throw new Error('Client is not initialized');
  }

  return context.client;
}
