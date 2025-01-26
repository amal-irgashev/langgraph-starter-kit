'use client';

import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatThreadProps {
  threads: Thread[];
  onNewChat: () => void;
  onSelectThread: (threadId: string) => void;
  activeThreadId?: string;
}

export function ChatThread({ threads, onNewChat, onSelectThread, activeThreadId }: ChatThreadProps) {
  return (
    <div className="w-[300px] h-full bg-[#141414] border-r border-[#262626] flex flex-col">
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-[#262626] hover:bg-[#333333] text-white"
          variant="ghost"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {threads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={cn(
              "w-full p-3 text-left transition-colors flex items-start gap-3",
              "hover:bg-[#262626]",
              activeThreadId === thread.id ? "bg-[#262626]" : "bg-transparent"
            )}
          >
            <div className="w-5 h-5 mt-1 flex-shrink-0">
              <MessageSquare className="w-full h-full text-gray-400" />
            </div>
            <div className="flex-1 min-w-0 text-sm">
              <p className="text-gray-200 truncate">
                {thread.title}
              </p>
              <p className="text-gray-500 text-xs truncate mt-0.5">
                {thread.lastMessage}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                {thread.timestamp}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 