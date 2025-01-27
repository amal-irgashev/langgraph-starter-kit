'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import { useChat } from '@/contexts/ChatContext';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChatInput } from './chat-input';
import { MessageItem } from './message-item';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => Promise<void>;
  isReady?: boolean;
}

// Empty state component
const EmptyState = () => (
  <div className="h-[300px] flex flex-col items-center justify-center text-center p-4">
    <div className="w-14 h-14 rounded-xl bg-[#F6DF79]/10 flex items-center justify-center mb-4">
      <MessageSquare className="w-7 h-7 text-[#F6DF79]" />
    </div>
    <p className="text-sm font-medium text-white/80">No messages yet</p>
    <p className="text-xs text-white/40 mt-1">Start a conversation to begin</p>
  </div>
);

// Loading indicator component
const LoadingIndicator = () => (
  <div className="group">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#F6DF79]/10 text-[#F6DF79] flex items-center justify-center flex-shrink-0">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="text-xs font-medium text-white/70">Assistant</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#F6DF79]/20 rounded-full animate-bounce" />
          <div className="w-1.5 h-1.5 bg-[#F6DF79]/20 rounded-full animate-bounce delay-150" />
          <div className="w-1.5 h-1.5 bg-[#F6DF79]/20 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  </div>
);

// Streaming message component
const StreamingMessage = ({ content }: { content: string }) => (
  <div className="group">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#F6DF79]/10 text-[#F6DF79] flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="text-xs font-medium text-white/70">Assistant</div>
        <div className="text-white/90">
          <div className={cn(
            "text-sm text-white/90 prose prose-invert max-w-none",
            "prose-p:leading-relaxed prose-p:my-1",
            "prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10",
            "prose-code:text-[#F6DF79]"
          )}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function ChatWindow({ messages, isLoading, onSendMessage, isReady = true }: ChatWindowProps) {
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
    <div className="flex flex-col h-full bg-[#0F0F0F] rounded-xl overflow-hidden shadow-xl border border-white/5">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && !isLoading && <EmptyState />}

          {messages.map((message, index) => (
            <div key={index} className="group">
              <MessageItem message={message} />
            </div>
          ))}

          {isLoading && streamingContent && (
            <div>
              <StreamingMessage content={streamingContent} />
            </div>
          )}

          {isLoading && !streamingContent && (
            <div>
              <LoadingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none bg-gradient-to-t from-[#0F0F0F] to-transparent backdrop-blur-xl pt-6">
        <ChatInput 
          onSendMessage={onSendMessage} 
          isLoading={isLoading} 
          isReady={isReady}
        />
      </div>
    </div>
  );
} 