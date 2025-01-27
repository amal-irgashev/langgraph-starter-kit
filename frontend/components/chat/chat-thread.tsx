'use client';

import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useThread } from '@/contexts/ThreadContext';
import { useClient } from '@/contexts/ClientContext';
import { useState } from 'react';

interface Thread {
  thread_id: string;
  created_at: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
}

interface ChatThreadProps {
  threads: Thread[];
  onNewChat: () => void;
  onSelectThread: (threadId: string) => void;
  activeThreadId?: string;
}

export function ChatThread({ threads, onNewChat, onSelectThread, activeThreadId }: ChatThreadProps) {
  const { deleteThread, deleteAllThreads } = useThread();
  const client = useClient();
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Group threads by date category
  const groupedThreads = threads.reduce((acc, thread) => {
    const date = new Date(thread.created_at);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    let category = 'previous';
    if (date.toDateString() === now.toDateString()) {
      category = 'today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      category = 'yesterday';
    } else if (date > weekAgo) {
      category = 'previous';
    }

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(thread);
    return acc;
  }, {} as Record<string, Thread[]>);

  const categories = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'previous', label: 'Previous 7 Days' },
  ];

  const handleNewChat = async () => {
    if (!client || isCreating) return;
    setIsCreating(true);
    try {
      onNewChat();
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteThread = async (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation();
    try {
      await deleteThread(threadId);
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  const handleDeleteAll = async () => {
    if (!client || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteAllThreads();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0F0F0F]">
      <div className="p-4 border-b border-white/5">
        <Button 
          onClick={handleNewChat}
          className="w-full bg-white/10 hover:bg-white/15 text-white/90 rounded-lg py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
          disabled={isCreating}
        >
          <Plus className="w-4 h-4" />
          {isCreating ? 'Creating...' : 'New Chat'}
        </Button>
        
        {threads.length > 0 && (
          <Button 
            onClick={handleDeleteAll}
            className="w-full mt-2 justify-center gap-2 bg-transparent hover:bg-white/5 text-white/60 hover:text-white/80 rounded-lg py-2.5 transition-all duration-200"
            variant="ghost"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Clear All'}
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {categories.map((category) => (
          <div key={category.id} className="px-3 pt-4">
            {groupedThreads[category.id]?.length > 0 && (
              <>
                <div className="text-xs font-medium text-white/60 px-3 pb-2">{category.label}</div>
                {groupedThreads[category.id].map((thread) => (
                  <div
                    key={thread.thread_id}
                    className="group relative animate-in slide-in-from-left-5 duration-200"
                  >
                    <button
                      onClick={() => onSelectThread(thread.thread_id)}
                      className={cn(
                        "w-full p-3 text-left rounded-lg transition-all flex items-start gap-3",
                        "hover:bg-white/5",
                        activeThreadId === thread.thread_id ? "bg-white/5" : ""
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        "bg-white/5 group-hover:bg-white/10 transition-colors"
                      )}>
                        <MessageSquare className="w-4 h-4 text-white/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-white/90">
                          {thread.messages[0]?.content?.slice(0, 50) || 'New Chat'}
                        </p>
                        <p className="text-xs text-white/50">
                          {new Date(thread.created_at).toLocaleString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={(e) => handleDeleteThread(e, thread.thread_id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-white/40 hover:text-white/80 transition-colors" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}

        {threads.length === 0 && (
          <div className="h-[300px] flex flex-col items-center justify-center text-center p-4">
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 text-white/60" />
            </div>
            <p className="text-sm font-medium text-white/80">No chats yet</p>
            <p className="text-xs text-white/40 mt-1">Start a new conversation to begin</p>
          </div>
        )}
      </div>
    </div>
  );
} 