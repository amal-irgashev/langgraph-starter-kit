'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Client } from '@langchain/langgraph-sdk';

interface ClientContextType {
  client: Client | null;
}

const ClientContext = createContext<ClientContextType>({ client: null });

interface ClientProviderProps {
  children: ReactNode;
  config: {
    apiUrl: string;
    apiKey?: string;
  };
}

export function ClientProvider({ children, config }: ClientProviderProps) {
  // Memoize the client instance to prevent unnecessary re-renders
  const client = useMemo(() => new Client(config), [config]);

  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context.client;
}
