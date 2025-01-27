// Main chat component that handles the chat interface, thread management, and debug panel
// Includes sidebar for thread navigation and main chat window with optional debug panel

'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { useThread } from '@/contexts/ThreadContext';
import { useChatActions } from '@/hooks/useChatActions';
import { ChatThread } from './chat-thread';
import { ChatWindow } from './chat-window';
import { DebugPanel } from './debug-panel';
import { Menu, X, Bug } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useClient } from '@/contexts/ClientContext';
import { Thread } from '@/types/chat';

// Animation configuration for smooth transitions
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

/**
 * Header component that displays thread info and controls for sidebar/debug panel
 * Includes status indicator, thread title, timestamp and toggle buttons
 */
const ChatHeader = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  isDebugOpen, 
  setIsDebugOpen,
  threadInfo,
  ready 
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isDebugOpen: boolean;
  setIsDebugOpen: (open: boolean) => void;
  threadInfo: { title: string; timestamp: string };
  ready: boolean;
}) => (
  <div className="flex-none h-14 bg-[#0F0F0F]/95 backdrop-blur-lg border-b border-white/5 z-10">
    <div className="h-full flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
            isSidebarOpen 
              ? "bg-[#F6DF79]/10 text-[#F6DF79]" 
              : "bg-white/5 text-white/70 hover:bg-white/10"
          )}
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </motion.button>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            ready ? "bg-[#F6DF79]" : "bg-white/20"
          )} />
          <div className="text-sm font-medium text-white/90">
            {threadInfo.title}
          </div>
          <div className="text-xs text-white/50">
            {threadInfo.timestamp}
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDebugOpen(!isDebugOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
          isDebugOpen 
            ? "bg-[#F6DF79]/10 text-[#F6DF79]" 
            : "text-white/70 hover:bg-white/5"
        )}
      >
        <Bug className="w-4 h-4" />
        <span className="text-xs font-medium hidden sm:inline">
          {isDebugOpen ? 'Hide Debug' : 'Show Debug'}
        </span>
      </motion.button>
    </div>
  </div>
);

/**
 * Main Chat component that orchestrates the entire chat interface
 * Manages thread state, message filtering, and UI layout
 */
export function Chat() {
  // Hooks for managing chat state and functionality
  const { messages, isLoading: chatLoading, rawMessages } = useChat();
  const { threads, currentThreadId, createNewThread, loadThreadHistory, setCurrentThreadId } = useThread();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const client = useClient();

  // Filter out system/tool messages to show only relevant chat messages
  const filteredMessages = messages.filter(message => {
    return !(
      message.event === 'messages' ||
      (message.content && message.content.startsWith('[{') && message.content.endsWith('}]'))
    );
  });

  const { sendMessage, ready } = useChatActions({
    threadId: currentThreadId || undefined,
  });

  /**
   * Creates a new chat thread and loads its history
   */
  const handleNewChat = async () => {
    try {
      const newThreadId = await createNewThread();
      await loadThreadHistory(newThreadId);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  /**
   * Handles thread selection and loads its message history
   */
  const handleSelectThread = async (threadId: string) => {
    try {
      setCurrentThreadId(threadId);
      await loadThreadHistory(threadId);
    } catch (error) {
      console.error('Error loading thread:', error);
    }
  };

  // Load thread history when current thread changes
  useEffect(() => {
    if (currentThreadId) {
      loadThreadHistory(currentThreadId).catch(console.error);
    }
  }, [currentThreadId, loadThreadHistory]);

  // Prepare thread info for display in header
  const currentThread = threads.find(t => t.thread_id === currentThreadId);
  const threadInfo = {
    title: currentThread?.messages[0]?.content?.slice(0, 50) || 'New Chat',
    timestamp: currentThread ? new Date(currentThread.created_at).toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    }) : ''
  };

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

      {/* Main chat area with header and message window */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDebugOpen={isDebugOpen}
          setIsDebugOpen={setIsDebugOpen}
          threadInfo={threadInfo}
          ready={ready}
        />

        {/* Animated layout for chat window and debug panel */}
        <motion.div className="flex-1 overflow-hidden flex" layout>
          <motion.div
            layout
            className="flex-1 overflow-hidden p-4"
            animate={{
              width: isDebugOpen ? '50%' : '100%'
            }}
            transition={springTransition}
          >
            <ChatWindow
              messages={filteredMessages}
              isLoading={chatLoading}
              onSendMessage={sendMessage}
              isReady={ready}
            />
          </motion.div>

          {/* Animated debug panel */}
          <motion.div
            layout
            initial={{ width: 0 }}
            animate={{
              width: isDebugOpen ? '50%' : 0
            }}
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