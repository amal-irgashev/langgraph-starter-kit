// component for the chat interface

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

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export function Chat() {
  const { messages, isLoading: chatLoading, rawMessages } = useChat();
  const { threads, currentThreadId, createNewThread, loadThreadHistory, setCurrentThreadId } = useThread();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Initialize chat actions with current thread
  const { sendMessage, ready } = useChatActions({
    threadId: currentThreadId || undefined,
  });

  const handleNewChat = async () => {
    try {
      const newThreadId = await createNewThread();
      await loadThreadHistory(newThreadId);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleSelectThread = async (threadId: string) => {
    try {
      setCurrentThreadId(threadId);
      await loadThreadHistory(threadId);
    } catch (error) {
      console.error('Error loading thread:', error);
    }
  };

  // Load thread history when currentThreadId changes
  useEffect(() => {
    if (currentThreadId) {
      loadThreadHistory(currentThreadId).catch(console.error);
    }
  }, [currentThreadId, loadThreadHistory]);

  return (
    <div className="flex h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Backdrop for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black md:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isSidebarOpen ? '320px' : '0px',
          x: isSidebarOpen ? 0 : -320
        }}
        transition={springTransition}
        className="fixed md:relative h-full z-30 overflow-hidden shadow-2xl"
      >
        <ChatThread
          threads={threads}
          onNewChat={handleNewChat}
          onSelectThread={handleSelectThread}
          activeThreadId={currentThreadId || undefined}
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        {/* Header */}
        <div className="flex-none h-14 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10">
          <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-[#161616] rounded-xl transition-all duration-200 ease-in-out ring-1 ring-amber-500/10"
              >
                <motion.div
                  animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSidebarOpen ? 
                    <X className="w-5 h-5 text-amber-400" /> : 
                    <Menu className="w-5 h-5 text-amber-400" />
                  }
                </motion.div>
              </motion.button>
              <div className="text-amber-200/70 font-medium text-sm">
                {currentThreadId ? 
                  new Date(threads.find(t => t.thread_id === currentThreadId)?.created_at || '').toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 
                  'New Chat'
                }
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDebugOpen(!isDebugOpen)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-xl transition-all duration-200 flex items-center gap-2 ring-1",
                isDebugOpen 
                  ? "text-amber-400 bg-amber-500/10 ring-amber-500/20 hover:bg-amber-500/20" 
                  : "text-gray-400 hover:bg-[#161616] ring-amber-500/10"
              )}
            >
              <Bug className="w-4 h-4" />
              <span className="hidden sm:inline">{isDebugOpen ? 'Hide Debug' : 'Show Debug'}</span>
            </motion.button>
          </div>
        </div>

        {/* Chat and Debug Panel Container */}
        <motion.div 
          className="flex-1 overflow-hidden flex"
          layout
        >
          {/* Chat Window */}
          <motion.div
            layout
            className="flex-1 overflow-hidden p-4"
            animate={{
              width: isDebugOpen ? '50%' : '100%'
            }}
            transition={springTransition}
          >
            <ChatWindow
              messages={messages}
              isLoading={chatLoading}
              onSendMessage={sendMessage}
              isReady={ready}
            />
          </motion.div>

          {/* Debug Panel */}
          <motion.div
            layout
            initial={{ width: 0 }}
            animate={{
              width: isDebugOpen ? '50%' : 0
            }}
            transition={springTransition}
            className="overflow-hidden bg-[#0A0A0A] border-l border-[#262626]/10"
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