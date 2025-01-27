// Main chat component that handles the chat interface, thread management, and debug panel
// Includes sidebar for thread navigation and main chat window with optional debug panel

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { useThread } from '@/contexts/ThreadContext';
import { useChatActions } from '@/hooks/useChatActions';
import { ChatThread } from './chat-thread';
import { ChatWindow } from './chat-window';
import { DebugPanel } from './debug-panel';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHeader } from './chat-header';
import { springTransition } from '@/lib/animations';

/**
 * Main Chat component that orchestrates the entire chat interface
 * Manages thread state, message filtering, and UI layout
 */
export function Chat() {
  const { messages, isLoading: chatLoading, rawMessages } = useChat();
  const { threads, currentThreadId, createNewThread, loadThreadHistory, setCurrentThreadId } = useThread();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const { sendMessage } = useChatActions({
    threadId: currentThreadId || undefined,
  });

  // Filter out system/tool messages
  const filteredMessages = useMemo(() => messages.filter(message => 
    !(message.event === 'messages' || 
      (message.content && message.content.startsWith('[{') && message.content.endsWith('}]')))
  ), [messages]);

  const handleNewChat = useCallback(async () => {
    try {
      const newThreadId = await createNewThread();
      await loadThreadHistory(newThreadId);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  }, [createNewThread, loadThreadHistory]);

  const handleSelectThread = useCallback(async (threadId: string) => {
    try {
      setCurrentThreadId(threadId);
      await loadThreadHistory(threadId);
    } catch (error) {
      console.error('Error loading thread:', error);
    }
  }, [setCurrentThreadId, loadThreadHistory]);

  // Load thread history when current thread changes
  useEffect(() => {
    if (currentThreadId) {
      loadThreadHistory(currentThreadId).catch(console.error);
    }
  }, [currentThreadId, loadThreadHistory]);

  const threadInfo = useMemo(() => {
    const currentThread = threads.find(t => t.thread_id === currentThreadId);
    return {
      title: currentThread?.messages[0]?.content?.slice(0, 50) || 'New Chat',
      timestamp: currentThread ? new Date(currentThread.created_at).toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
      }) : ''
    };
  }, [currentThreadId, threads]);

  return (
    <div className="flex h-screen bg-[#0F0F0F] relative overflow-hidden">
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black md:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Animated sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isSidebarOpen ? '320px' : '0px',
          x: isSidebarOpen ? 0 : -320
        }}
        transition={springTransition}
        className="fixed md:relative h-full z-30 overflow-hidden"
      >
        <ChatThread
          threads={threads}
          onNewChat={handleNewChat}
          onSelectThread={handleSelectThread}
          activeThreadId={currentThreadId || undefined}
        />
      </motion.div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDebugOpen={isDebugOpen}
          setIsDebugOpen={setIsDebugOpen}
          threadInfo={threadInfo}
          ready={true}
        />

        <motion.div className="flex-1 overflow-hidden flex" layout>
          <motion.div
            layout
            className="flex-1 overflow-hidden p-4"
            animate={{ width: isDebugOpen ? '50%' : '100%' }}
            transition={springTransition}
          >
            <ChatWindow
              messages={filteredMessages}
              isLoading={chatLoading}
              onSendMessage={sendMessage}
              isReady={true}
            />
          </motion.div>

          <motion.div
            layout
            initial={{ width: 0 }}
            animate={{ width: isDebugOpen ? '50%' : 0 }}
            transition={springTransition}
            className="overflow-hidden"
          >
            {isDebugOpen && (
              <div className="h-full p-4">
                <DebugPanel messages={rawMessages} />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 