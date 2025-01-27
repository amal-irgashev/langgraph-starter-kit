import { motion } from 'framer-motion';
import { Menu, X, Bug } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isDebugOpen: boolean;
  setIsDebugOpen: (open: boolean) => void;
  threadInfo: { title: string; timestamp: string };
  ready: boolean;
}

/**
 * Header component that displays thread info and controls for sidebar/debug panel
 * Includes status indicator, thread title, timestamp and toggle buttons
 */
export function ChatHeader({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  isDebugOpen, 
  setIsDebugOpen,
  threadInfo,
  ready 
}: ChatHeaderProps) {
  return (
    <div className="flex-none h-14 bg-[#0F0F0F]/95 backdrop-blur-lg border-b border-white/5 z-10">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
              isSidebarOpen 
                ? "bg-[#F6DF79]/10 text-[#F6DF79]" 
                : "bg-white/5 text-white/70 hover:bg-white/10"
            )}
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              ready ? "bg-[#F6DF79]" : "bg-white/20"
            )} />
            <div className="text-sm font-medium text-white/90">
              {threadInfo.title}
            </div>
            <div className="text-xs text-white/50">
              {threadInfo.timestamp}
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDebugOpen(!isDebugOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
            isDebugOpen 
              ? "bg-[#F6DF79]/10 text-[#F6DF79]" 
              : "text-white/70 hover:bg-white/5"
          )}
        >
          <Bug className="w-4 h-4" />
          <span className="text-xs font-medium hidden sm:inline">
            {isDebugOpen ? 'Hide Debug' : 'Show Debug'}
          </span>
        </motion.button>
      </div>
    </div>
  );
} 