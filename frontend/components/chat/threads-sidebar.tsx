// a component that displays a list of threads on the left side of the chat

'use client';

import { Thread } from '@/types/chat';
import { MessageSquare, Plus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ThreadsSidebarProps {
  threads: Thread[];
  isOpen: boolean;
  onNewChat?: () => void;
  onSelectThread?: (threadId: string) => void;
  activeThreadId?: string;
}

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function ThreadsSidebar({ threads, isOpen, onNewChat, onSelectThread, activeThreadId }: ThreadsSidebarProps) {
  return (
    <div className="h-full w-80 flex flex-col bg-[#0F0F0F] border-r border-white/5">
      {/* Header */}
      <div className="flex-none p-4 border-b border-white/5">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="w-full px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white/90 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </motion.button>
      </div>
      
      {/* Scrollable threads list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {threads.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-2">
              <MessageSquare className="w-7 h-7 text-white/60" />
            </div>
            <p className="text-sm font-medium text-white/80">No chats yet</p>
            <p className="text-xs text-white/40">Start a new conversation to begin</p>
          </div>
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="py-2"
          >
            {threads.map((thread) => (
              <motion.div
                key={thread.thread_id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                onClick={() => onSelectThread?.(thread.thread_id)}
                className={cn(
                  "mx-2 p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-start gap-3 group",
                  activeThreadId === thread.thread_id 
                    ? "bg-white/10 text-white/90" 
                    : "hover:bg-white/5 text-white/70"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  activeThreadId === thread.thread_id ? "bg-white/10" : "bg-white/5"
                )}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {thread.title || 'New Chat'}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {thread.lastMessage || 'No messages yet'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>{thread.timestamp || thread.created_at}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 