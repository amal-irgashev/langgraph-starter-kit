'use client';

import { useChat } from '../contexts/ChatContext';
import { useChatActions } from '../hooks/useChatActions';
import { useState } from 'react';
import { Send, Plus, MessageSquare, Bot, User, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export function ChatComponent() {
  const { messages, rawMessages, isLoading, streamingContent } = useChat();
  const { sendMessage, ready } = useChatActions();
  const [userInput, setUserInput] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  
  // Mock threads data - in real app, this would come from your backend
  const [threads] = useState<Thread[]>([
    {
      id: '1',
      title: 'Understanding LangGraph',
      lastMessage: 'Tell me about LangGraph architecture',
      timestamp: '2m ago'
    },
    {
      id: '2',
      title: 'Building Agents',
      lastMessage: 'How do I create a custom agent?',
      timestamp: '1h ago'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || !userInput.trim()) return;
    await sendMessage(userInput);
    setUserInput('');
  };

  return (
    <div className="flex h-screen bg-[#1A1A1A]">
      {/* Threads Sidebar */}
      <div className={cn(
        "w-64 bg-[#141414] border-r border-[#262626] flex flex-col",
        !isSidebarOpen && "hidden"
      )}>
        <div className="p-4 border-b border-[#262626]">
          <button className="w-full px-4 py-2 bg-[#262626] text-white rounded-lg hover:bg-[#333333] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="p-3 hover:bg-[#262626] cursor-pointer border-b border-[#262626] flex items-start gap-3"
            >
              <div className="w-5 h-5 mt-1 flex-shrink-0">
                <MessageSquare className="w-full h-full text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-gray-200 truncate">
                  {thread.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {thread.lastMessage}
                </p>
                <span className="text-xs text-gray-600 mt-1">
                  {thread.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-[#262626] p-4 flex justify-between items-center">
          <h2 className="text-gray-200">Chat</h2>
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

        <div className="flex-1 flex">
          {/* Chat Messages */}
          <div className={cn(
            "flex-1 flex flex-col overflow-hidden",
            showDebug && "w-1/2 border-r border-[#262626]"
          )}>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-2xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center flex-shrink-0">
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-[#262626] text-gray-200'
                    }`}>
                      <ReactMarkdown className="text-sm whitespace-pre-wrap prose prose-invert">
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming Message */}
              {isLoading && streamingContent && (
                <div className="flex items-start gap-4">
                  <div className="flex items-start gap-3 max-w-2xl">
                    <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="rounded-lg px-4 py-3 bg-[#262626] text-gray-200">
                      <ReactMarkdown className="text-sm whitespace-pre-wrap prose prose-invert">
                        {streamingContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && !streamingContent && (
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-gray-400">Loading...</div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#262626] p-4">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#262626] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!ready || isLoading}
                />
                <button
                  type="submit"
                  disabled={!ready || isLoading || !userInput.trim()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Debug Panel */}
          {showDebug && (
            <div className="w-1/2 flex flex-col bg-[#141414] overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                {rawMessages.map((msg, idx) => (
                  <div key={idx} className="mb-6 border-b border-[#262626] pb-4">
                    <div className={cn(
                      "px-2 py-1 rounded mb-2 inline-block",
                      msg.event === 'metadata' ? "bg-purple-500/20 text-purple-300" :
                      msg.event === 'values' ? "bg-green-500/20 text-green-300" :
                      "bg-blue-500/20 text-blue-300"
                    )}>
                      event: {msg.event}
                    </div>
                    <div className="pl-4">
                      {msg.event === 'values' ? (
                        // Special handling for values events
                        msg.data.messages?.map((message: any, mIdx: number) => (
                          <div key={mIdx} className="mb-2">
                            <div className="text-yellow-300 mb-1">Message {mIdx + 1} ({message.type}):</div>
                            <div className="pl-4">
                              <div className="text-gray-300 mb-1">content: {message.content}</div>
                              {message.response_metadata && (
                                <div className="text-gray-400 text-xs">
                                  metadata: {JSON.stringify(message.response_metadata, null, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        // Default JSON display for other events
                        <pre className="text-gray-300 whitespace-pre-wrap overflow-x-auto">
                          {JSON.stringify(msg.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
