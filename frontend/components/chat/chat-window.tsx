'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/contexts/ChatContext';
import { useChat } from '@/contexts/ChatContext';
import ReactMarkdown from 'react-markdown';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ messages, isLoading, onSendMessage }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { streamingContent } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col flex-1 bg-[#1A1A1A]">
      {/* Messages Area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-4 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-up"
            >
              <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center">
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-gray-400" />
                ) : (
                  <User className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-sm text-gray-400">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </div>
                <div className="text-gray-200 prose prose-invert max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Streaming Message */}
          {isLoading && streamingContent && (
            <div className="flex items-start gap-4 animate-fade-up">
              <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-sm text-gray-400">Assistant</div>
                <div className="text-gray-200 prose prose-invert max-w-none">
                  <ReactMarkdown>{streamingContent}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && !streamingContent && (
            <div className="flex items-center gap-4 animate-fade-up">
              <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-sm text-gray-400">Assistant</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#262626]">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#262626] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
} 