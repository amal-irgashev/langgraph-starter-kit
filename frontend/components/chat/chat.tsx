'use client';

import { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { useChatActions } from '@/hooks/useChatActions';
import { ChatThread } from './chat-thread';
import { ChatWindow } from './chat-window';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Chat() {
  const { messages, isLoading } = useChat();
  const { sendMessage, ready } = useChatActions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>();

  // Mock threads data - in real app, this would come from your backend
  const [threads] = useState([
    {
      id: '1',
      title: 'Why Did the DJ Quit?',
      lastMessage: 'He lost his mix-tape! Help me not do the same...',
      timestamp: '2m ago'
    },
    {
      id: '2',
      title: 'Songwriter\'s Block 911', 
      lastMessage: 'My lyrics are so bad even my cat left the room',
      timestamp: '1h ago'
    },
    {
      id: '3',
      title: 'Jazz Hands Emergency',
      lastMessage: 'Need chord progressions smoother than my coffee',
      timestamp: '2h ago'
    },
    {
      id: '4',
      title: 'Poetic Detective Work',
      lastMessage: 'Is "Baby, baby, baby, ooh" really that deep?',
      timestamp: '1d ago'
    }
  ]);

  const handleNewChat = () => {
    // In a real app, you would create a new thread here
    console.log('Creating new chat...');
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    // In a real app, you would load the thread messages here
  };

  return (
    <div className="flex h-screen bg-[#1A1A1A]">
      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30',
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
        <div className="h-14 border-b border-[#262626] flex items-center gap-4 px-4 bg-[#1A1A1A]">
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

        {/* Chat Window */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
} 