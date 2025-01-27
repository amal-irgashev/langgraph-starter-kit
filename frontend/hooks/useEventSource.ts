// manage the event source connection

import { useState, useEffect, useRef } from 'react';

interface UseEventSourceProps {
  threadId: string;
  message: string;
  onMessage?: (event: MessageEvent) => void;
  onError?: (error: Event) => void;
}

export function useEventSource({ threadId, message, onMessage, onError }: UseEventSourceProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectCountRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 3;

  useEffect(() => {
    if (!threadId) {
      console.log('Missing required params:', { threadId });
      return;
    }

    // Reset reconnect count on new connection attempt
    reconnectCountRef.current = 0;

    function connect() {
      if (reconnectCountRef.current >= MAX_RECONNECT_ATTEMPTS) {
        console.log('Max reconnection attempts reached');
        setError(new Error('Max reconnection attempts reached'));
        return;
      }

      if (eventSourceRef.current) {
        console.log('Closing existing connection before reconnecting');
        eventSourceRef.current.close();
      }

      const url = new URL('/api/stream', window.location.origin);
      const eventSource = new EventSource(url, {
        withCredentials: true
      });
      eventSourceRef.current = eventSource;

      // Send the POST request to start the stream
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          message,
        }),
      }).catch(err => {
        console.error('Error sending message:', err);
        eventSource.close();
        setError(err instanceof Error ? err : new Error('Failed to send message'));
      });

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setIsConnected(true);
        setError(null);
        reconnectCountRef.current = 0; // Reset count on successful connection
      };

      eventSource.onmessage = (event) => {
        console.log('SSE message received:', event.data);
        try {
          const data = JSON.parse(event.data);
          if (data.error) {
            console.error('SSE message error:', data.error);
            setError(new Error(data.message || 'Stream error'));
            eventSource.close();
            return;
          }
          onMessage?.(event);
        } catch (err) {
          console.error('Error handling SSE message:', err);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setIsConnected(false);
        setError(new Error('SSE connection failed'));
        eventSource.close();
        onError?.(error);
        
        // Only attempt reconnect if we haven't reached the limit
        if (reconnectCountRef.current < MAX_RECONNECT_ATTEMPTS) {
          console.log(`Reconnect attempt ${reconnectCountRef.current + 1}/${MAX_RECONNECT_ATTEMPTS}`);
          reconnectCountRef.current++;
          setTimeout(connect, 1000 * Math.pow(2, reconnectCountRef.current)); // Exponential backoff
        }
      };
    }

    connect();

    return () => {
      console.log('Cleaning up SSE connection');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [threadId, message, onMessage, onError]);

  const closeConnection = () => {
    if (eventSourceRef.current) {
      console.log('Manually closing SSE connection');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  };

  return {
    isConnected,
    error,
    closeConnection
  };
} 