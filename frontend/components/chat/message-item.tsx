// a component that displays a message in the chat

'use client';

import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="w-8 h-8 rounded-md bg-[#262626] flex items-center justify-center flex-shrink-0">
          {message.role === 'user' ? (
            <User className="w-4 h-4 text-gray-400" />
          ) : (
            <Bot className="w-4 h-4 text-gray-400" />
          )}
        </div>
        <div className={`rounded-lg px-4 py-3 ${
          message.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-[#262626] text-gray-200'
        }`}>
          <ReactMarkdown className="text-sm whitespace-pre-wrap prose prose-invert">
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 