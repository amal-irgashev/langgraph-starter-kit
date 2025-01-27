'use client';

import { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { useChatActions } from '@/hooks/useChatActions';
import { ChatThread } from './chat/chat-thread';
import { ChatWindow } from './chat/chat-window';
import { Menu, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Thread } from '@/types/chat';
import { DebugPanel } from './chat/debug-panel';

export function ChatComponent() {
  const { messages, rawMessages, isLoading, streamingContent } = useChat();
  const { sendMessage, ready } = useChatActions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>();



  const handleNewChat = () => {
    // In a real app, you would create a new thread here
    console.log('Creating new chat...');
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    // In a real app, you would load the thread messages here
  };

  return (
    <div className="flex h-screen bg-[#1A1A1A] overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30 w-64',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ChatThread
          threads={threads}
          onNewChat={handleNewChat}
          onSelectThread={handleSelectThread}
          activeThreadId={activeThreadId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 border-b border-[#262626] flex items-center justify-between px-4 bg-[#1A1A1A]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#262626] rounded-lg transition-colors md:hidden"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
            <div className="text-gray-200">
              {activeThreadId ? threads.find(t => t.id === activeThreadId)?.title : 'New Chat'}
            </div>
          </div>
          
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className={cn(
              "p-2 rounded-lg transition-colors flex items-center gap-2",
              showDebug ? "bg-blue-500 text-white" : "bg-[#262626] text-gray-400 hover:bg-[#333333]"
            )}
          >
            <Code className="w-4 h-4" />
            {showDebug ? 'Hide Debug' : 'Show Debug'}
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className={cn(
            "flex-1 flex flex-col min-w-0",
            showDebug && "w-1/2 border-r border-[#262626]"
          )}>
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              onSendMessage={sendMessage}
            />
          </div>

          {/* Debug Panel */}
          {showDebug && (
            <div className="w-1/2 overflow-y-auto">
              <DebugPanel messages={rawMessages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
