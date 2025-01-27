// a component that displays a message in the chat

'use client';

import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
}

// Utility function to get message icon
const MessageIcon = ({ role }: { role: string }) => {
  const Icon = role === 'assistant' ? Bot : User;
  return <Icon className="w-4 h-4" />;
};

// Markdown styles for consistent rendering
const markdownStyles = cn(
  "text-sm text-white/90 prose prose-invert max-w-none",
  "prose-p:leading-relaxed prose-p:my-1",
  "prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:p-3 prose-pre:rounded-lg",
  "prose-code:text-[#F6DF79] prose-code:bg-[#F6DF79]/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none",
  "prose-headings:text-white/90 prose-headings:font-medium prose-headings:my-2",
  "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
  "prose-hr:border-white/5 prose-hr:my-4",
  "prose-a:text-[#F6DF79] prose-a:no-underline hover:prose-a:underline",
  "prose-strong:text-white/90 prose-strong:font-medium",
  "prose-em:text-white/90",
  "prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4",
  "prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-4",
  "prose-li:my-0.5",
  "prose-blockquote:border-l-2 prose-blockquote:border-white/10 prose-blockquote:pl-4 prose-blockquote:text-white/70 prose-blockquote:italic",
  "prose-img:rounded-lg prose-img:my-2",
  "prose-table:border-collapse prose-table:my-2",
  "prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-2 prose-th:text-left",
  "prose-td:border prose-td:border-white/10 prose-td:p-2",
);

export function MessageItem({ message }: MessageItemProps) {
  // Skip empty messages and intermediate chunks
  if (
    !message.content?.trim() ||
    message.event === 'metadata' ||
    message.type === 'intermediate'
  ) {
    return null;
  }

  // Determine the role based on message type and metadata
  let role = message.role;
  
  // Handle AIMessageChunk type
  if (message.type === 'AIMessageChunk' || message.type === 'ai') {
    role = 'assistant';
  }
  
  // Handle streaming messages
  if (message.metadata?.streaming) {
    role = 'assistant';
  }

  const isAssistant = role === 'assistant';
  const sources = message.metadata?.sources as string[] | undefined;
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          isAssistant 
            ? "bg-[#F6DF79]/10 text-[#F6DF79]" 
            : "bg-white/5 text-white/70"
        )}>
          <MessageIcon role={role} />
        </div>
        <div className="flex-1 space-y-1.5 overflow-hidden">
          <div className="text-xs font-medium text-white/70">
            {role === 'assistant' ? 'Assistant' : 'You'}
          </div>
          <div className={markdownStyles}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Show sources if they exist */}
      {sources && sources.length > 0 && (
        <div className="ml-11 space-y-2">
          <div className="text-xs font-medium text-white/50">Sources:</div>
          {sources.map((source, index) => (
            <div key={index} className={cn(
              "p-3 rounded-lg bg-white/5 border border-white/10",
              markdownStyles,
              "text-sm text-white/70"
            )}>
              <ReactMarkdown>{source}</ReactMarkdown>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 