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

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 }
};

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
      {/* Header */}
      <div className="flex-none bg-[#0F0F0F]/95 backdrop-blur-lg px-6 py-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white/80" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white/90">AI Assistant</h2>
              <p className="text-[10px] text-white/40">Powered by Claude</p>
            </div>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5">
              <Loader2 className="w-3 h-3 text-white/70 animate-spin" />
              <span className="text-[10px] font-medium text-white/60">Processing...</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="h-[300px] flex flex-col items-center justify-center text-center p-4">
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <MessageSquare className="w-7 h-7 text-white/60" />
              </div>
              <p className="text-sm font-medium text-white/80">No messages yet</p>
              <p className="text-xs text-white/40 mt-1">Start a conversation to begin</p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="group"
              >
                <div className="flex items-start gap-3 rounded-xl p-3 hover:bg-white/5 transition-all duration-200">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
                    message.role === 'assistant' 
                      ? "bg-white/5 text-white/80" 
                      : "bg-white/5 text-white/70"
                  )}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5 overflow-hidden">
                    <div className="text-xs font-medium text-white/70">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    <div className="text-white/90">
                      <div className="prose prose-invert max-w-none break-words prose-p:leading-relaxed prose-p:text-white/90 prose-p:my-1 prose-headings:text-white/90 prose-strong:text-white/90 prose-ul:text-white/90 prose-ol:text-white/90 prose-li:text-white/90 prose-pre:bg-[#161616] prose-pre:text-sm prose-code:text-white/90 prose-a:text-white/80">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Streaming Message */}
          <AnimatePresence>
            {isLoading && streamingContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group"
              >
                <div className="flex items-start gap-3 rounded-xl p-3 bg-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-white/80 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1.5 overflow-hidden">
                    <div className="text-xs font-medium text-white/70">Assistant</div>
                    <div className="text-white/90">
                      <div className="prose prose-invert max-w-none break-words prose-p:leading-relaxed prose-p:text-white/90 prose-p:my-1 prose-headings:text-white/90 prose-strong:text-white/90 prose-ul:text-white/90 prose-ol:text-white/90 prose-li:text-white/90 prose-pre:bg-[#161616] prose-pre:text-sm prose-code:text-white/90 prose-a:text-white/80">
                        <ReactMarkdown>{streamingContent}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Indicator */}
          <AnimatePresence>
            {isLoading && !streamingContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group"
              >
                <div className="flex items-start gap-3 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-white/80 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="text-xs font-medium text-white/70">Assistant</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-150" />
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none bg-gradient-to-t from-[#0A0A0A] to-transparent backdrop-blur-xl pt-6">
        <ChatInput 
          onSendMessage={onSendMessage} 
          isLoading={isLoading} 
          isReady={isReady}
        />
      </div>
    </div>
  );
} 