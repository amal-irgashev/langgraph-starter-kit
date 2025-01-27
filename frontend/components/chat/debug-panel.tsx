// a component that displays the raw messages in the chat

'use client';

import { RawMessage } from '@/types/chat';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bug, ChevronRight } from 'lucide-react';
import { useMemo, useRef, useEffect } from 'react';

interface DebugPanelProps {
  messages: RawMessage[];
}

interface Metadata {
  thread_id?: string;
  langgraph_node?: string;
  ls_model_name?: string;
  ls_temperature?: number;
  [key: string]: any;
}

interface MessageData {
  type?: string;
  content?: string;
  [key: string]: any;
}

const messageVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

function consolidateStreamingContent(messages: RawMessage[]) {
  const consolidated: RawMessage[] = [];
  let currentContent = '';
  let currentMetadata: Metadata | null = null;
  let currentThreadId: string | null = null;
  let lastEventType = '';
  let currentState: any = null;

  // Helper function to normalize content
  const normalizeContent = (content: string) => {
    return content.replace(/\s+/g, ' ').trim();
  };

  // Helper function to flush current content
  const flushCurrentContent = () => {
    if (currentContent || currentState) {
      consolidated.push({
        event: 'stream_state',
        data: {
          content: currentContent ? normalizeContent(currentContent) : '',
          metadata: currentMetadata,
          state: currentState,
          timestamp: new Date().toISOString()
        }
      });
      currentContent = '';
      currentState = null;
    }
  };

  messages.forEach((msg) => {
    if (msg.event === 'metadata') {
      const newThreadId = (msg.data as Metadata)?.thread_id;
      if (newThreadId !== currentThreadId) {
        flushCurrentContent();
        
        if (consolidated.length > 0) {
          consolidated.push({
            event: 'separator',
            data: { timestamp: new Date().toISOString() }
          });
        }
        currentThreadId = newThreadId || null;
      }
      consolidated.push(msg);
      lastEventType = 'metadata';
    } else if (msg.event === 'messages') {
      const messageData = msg.data[0] as MessageData;
      const metadata = msg.data[1] as Metadata;
      const threadId = metadata?.thread_id;
      
      if (messageData?.type === 'AIMessageChunk') {
        if (lastEventType !== 'streaming' || threadId !== currentThreadId) {
          flushCurrentContent();
          currentContent = messageData.content || '';
          currentMetadata = metadata;
        } else {
          const newContent = messageData.content || '';
          if (newContent) {
            currentContent += (currentContent && !currentContent.endsWith(' ') ? ' ' : '') + newContent;
          }
          currentMetadata = metadata;
        }
        lastEventType = 'streaming';
        currentThreadId = threadId || null;
      } else {
        flushCurrentContent();
        consolidated.push({
          event: 'messages',
          data: [
            { ...messageData, content: messageData.content ? normalizeContent(messageData.content) : '' },
            metadata
          ]
        });
        lastEventType = 'message';
      }
    } else if (msg.event === 'updates') {
      // Handle state updates
      currentState = msg.data;
      consolidated.push({
        event: 'state_update',
        data: {
          state: msg.data,
          timestamp: new Date().toISOString()
        }
      });
      lastEventType = 'state';
    } else if (msg.event === 'events') {
      // Handle events
      consolidated.push({
        event: 'event',
        data: {
          event: msg.data,
          timestamp: new Date().toISOString()
        }
      });
      lastEventType = 'event';
    } else {
      // Handle any other events
      consolidated.push({
        event: msg.event,
        data: {
          content: msg.data,
          timestamp: new Date().toISOString()
        }
      });
      lastEventType = 'other';
    }
  });

  flushCurrentContent();
  return consolidated;
}

export function DebugPanel({ messages }: DebugPanelProps) {
  const consolidatedMessages = useMemo(() => consolidateStreamingContent(messages), [messages]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consolidatedMessages]);

  const renderEventData = (msg: RawMessage) => {
    if (msg.event === 'stream_state') {
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-[#F6DF79] text-xs font-medium">Streaming State</div>
            <div className="text-white/70 text-xs break-words pl-2 space-y-2 max-w-full">
              {msg.data.content && (
                <div className="break-words">
                  <span className="text-blue-300/90">Content:</span> {msg.data.content}
                </div>
              )}
              {msg.data.state && (
                <div>
                  <span className="text-blue-300/90">State:</span>
                  <pre className="text-xs bg-white/5 p-2 rounded-lg mt-1 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                    <JsonSyntax>{msg.data.state}</JsonSyntax>
                  </pre>
                </div>
              )}
              {msg.data.metadata && (
                <div>
                  <span className="text-blue-300/90">Metadata:</span>
                  <pre className="text-xs bg-white/5 p-2 rounded-lg mt-1 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                    <JsonSyntax>{msg.data.metadata}</JsonSyntax>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (msg.event === 'messages') {
      return (
        <div className="space-y-3">
          {msg.data.map((item: any, mIdx: number) => (
            <div key={mIdx} className="space-y-2">
              {item.type && (
                <div className="text-[#F6DF79] text-xs font-medium">
                  Type: {item.type}
                </div>
              )}
              {item.content && (
                <div className="text-white/70 text-xs break-words pl-2">
                  <span className="text-blue-300/90">Content:</span> {item.content}
                </div>
              )}
              {mIdx === 1 && item && (
                <pre className="text-xs bg-white/5 p-2 rounded-lg mt-2 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                  <JsonSyntax>{item}</JsonSyntax>
                </pre>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (msg.event === 'state_update' || msg.event === 'updates') {
      const state = msg.data.state || msg.data;
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-[#F6DF79] text-xs font-medium">Thread State</div>
            
            {/* Checkpoint Info */}
            {state.checkpoint && (
              <div className="space-y-2">
                <div className="text-blue-300/90 text-xs">Checkpoint</div>
                <div className="pl-2 space-y-1 text-xs">
                  <div className="text-white/70 break-words">
                    <span className="text-emerald-300/90">ID:</span> {state.checkpoint.checkpoint_id}
                  </div>
                  <div className="text-white/70 break-words">
                    <span className="text-emerald-300/90">Created:</span> {new Date(state.checkpoint.created_at).toLocaleString()}
                  </div>
                  {state.checkpoint.parent_checkpoint_id && (
                    <div className="text-white/70 break-words">
                      <span className="text-emerald-300/90">Parent:</span> {state.checkpoint.parent_checkpoint_id}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Values */}
            {state.values && (
              <div className="space-y-2">
                <div className="text-blue-300/90 text-xs">Values</div>
                <pre className="text-xs bg-white/5 p-2 rounded-lg mt-1 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                  <JsonSyntax>{state.values}</JsonSyntax>
                </pre>
              </div>
            )}

            {/* Tasks */}
            {state.tasks && (
              <div className="space-y-2">
                <div className="text-blue-300/90 text-xs">Tasks {state.tasks.length > 0 ? `(${state.tasks.length})` : ''}</div>
                {state.tasks.length > 0 ? (
                  <pre className="text-xs bg-white/5 p-2 rounded-lg mt-1 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                    <JsonSyntax>{state.tasks}</JsonSyntax>
                  </pre>
                ) : (
                  <div className="text-white/40 text-xs pl-2">No active tasks</div>
                )}
              </div>
            )}

            {/* Next Steps */}
            {state.next && (
              <div className="space-y-2">
                <div className="text-blue-300/90 text-xs">Next Steps {state.next.length > 0 ? `(${state.next.length})` : ''}</div>
                {state.next.length > 0 ? (
                  <pre className="text-xs bg-white/5 p-2 rounded-lg mt-1 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                    <JsonSyntax>{state.next}</JsonSyntax>
                  </pre>
                ) : (
                  <div className="text-white/40 text-xs pl-2">No pending steps</div>
                )}
              </div>
            )}

            {/* Metadata */}
            {state.metadata && (
              <div className="space-y-2">
                <div className="text-blue-300/90 text-xs">Metadata</div>
                <pre className="text-xs bg-white/5 p-2 rounded-lg mt-1 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                  <JsonSyntax>{state.metadata}</JsonSyntax>
                </pre>
              </div>
            )}

            {/* Raw State (Collapsed) */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <details>
                <summary className="text-white/40 text-xs cursor-pointer hover:text-white/60">
                  Raw State
                </summary>
                <pre className="text-xs bg-white/5 p-2 rounded-lg mt-2 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                  <JsonSyntax>{state}</JsonSyntax>
                </pre>
              </details>
            </div>

            <div className="text-white/40 text-xs mt-2">
              {new Date(msg.data.timestamp || new Date()).toLocaleString()}
            </div>
          </div>
        </div>
      );
    }

    return (
      <pre className="text-white/70 text-xs whitespace-pre-wrap overflow-x-auto font-mono break-words">
        <JsonSyntax>{msg.data}</JsonSyntax>
      </pre>
    );
  };

  // Add JsonSyntax component for colorful JSON formatting
  const JsonSyntax = ({ children }: { children: any }) => {
    const jsonString = JSON.stringify(children, null, 2);
    const coloredJson = jsonString.replace(
      /"([^"]+)":/g,
      '<span class="text-emerald-300/90">"$1"</span>:'
    ).replace(
      /: "(.*?)"/g,
      ': <span class="text-amber-300/90">"$1"</span>'
    ).replace(
      /: (true|false|null|\d+)/g,
      ': <span class="text-blue-300/90">$1</span>'
    );

    return (
      <div 
        className="text-white/70"
        dangerouslySetInnerHTML={{ __html: coloredJson }} 
      />
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#0F0F0F] rounded-xl overflow-hidden shadow-xl border border-white/5">
      <div className="flex-none p-4 border-b border-white/5 bg-[#0F0F0F]/95 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Bug className="w-4 h-4 text-white/80" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-white/90">Debug Panel</h2>
            <p className="text-[10px] text-white/40">Real-time thread state</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent p-4 space-y-4">
        {consolidatedMessages.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-center p-4">
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Bug className="w-7 h-7 text-white/60" />
            </div>
            <p className="text-sm font-medium text-white/80">No debug data</p>
            <p className="text-xs text-white/40 mt-1">Start a conversation to see the thread state</p>
          </div>
        ) : (
          consolidatedMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="group"
            >
              {msg.event === 'separator' ? (
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-white/5" />
                  <div className="text-xs text-white/40">New Interaction</div>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden border border-white/5 bg-white/5">
                  <div className={cn(
                    "px-3 py-2 text-xs font-medium flex items-center gap-2 bg-white/5",
                    msg.event === 'metadata' ? "text-emerald-300/90" :
                    msg.event === 'stream_state' ? "text-amber-300/90" :
                    msg.event === 'messages' ? "text-blue-300/90" :
                    msg.event === 'state_update' ? "text-purple-300/90" :
                    msg.event === 'updates' ? "text-purple-300/90" :
                    msg.event === 'events' ? "text-rose-300/90" :
                    "text-white/80"
                  )}>
                    <ChevronRight className={cn(
                      "w-3 h-3",
                      msg.event === 'metadata' ? "text-emerald-300/90" :
                      msg.event === 'stream_state' ? "text-amber-300/90" :
                      msg.event === 'messages' ? "text-blue-300/90" :
                      msg.event === 'state_update' ? "text-purple-300/90" :
                      msg.event === 'updates' ? "text-purple-300/90" :
                      msg.event === 'events' ? "text-rose-300/90" :
                      "text-white/80"
                    )} />
                    <span>event: {msg.event}</span>
                  </div>

                  <div className="p-3">
                    {renderEventData(msg)}
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 