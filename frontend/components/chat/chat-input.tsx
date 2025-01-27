'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  isReady?: boolean;
}

export function ChatInput({ onSendMessage, isLoading, isReady = true }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isReady) return;

    try {
      await onSendMessage(input.trim());
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isReady ? "Type a message..." : "Select or create a chat to start"}
            className={cn(
              "w-full bg-white/5 text-white/90 rounded-lg pl-4 pr-10 py-3",
              "focus:outline-none focus:ring-1 focus:ring-[#F6DF79]/20 focus:bg-white/10",
              "placeholder-white/40 transition-all duration-200",
              (!isReady || isLoading) && "opacity-50 cursor-not-allowed"
            )}
            disabled={!isReady || isLoading}
          />
          {input.trim() && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-[#F6DF79]/40 bg-[#F6DF79]/5 rounded-md border border-[#F6DF79]/10">⌘ ↵</kbd>
            </div>
          )}
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            type="submit" 
            disabled={!isReady || isLoading || !input.trim()}
            className={cn(
              "bg-[#F6DF79] hover:bg-[#F6DF79]/90 text-black font-medium rounded-lg px-3.5 py-3 transition-all duration-200",
              (!isReady || isLoading) && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </form>
  );
} 