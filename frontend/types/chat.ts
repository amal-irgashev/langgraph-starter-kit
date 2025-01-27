export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface LangGraphMessage {
  type: 'human' | 'ai';
  content: string;
  additional_kwargs: Record<string, any>;
  response_metadata?: {
    finish_reason?: string;
  };
  tool_calls?: any[];
}

export interface MessageMetadata {
  thread_id?: string;
  graph_id?: string;
  langgraph_node?: string;
  ls_model_name?: string;
  ls_temperature?: number;
  [key: string]: any;
}

export interface RawMessage {
  event: string;
  data: any;
}

export interface Thread {
  thread_id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface StreamPayload {
  input: {
    messages: LangGraphMessage[];
  };
  streamMode: string[];
  streamSubgraphs?: boolean;
}

// Chat Context Types
export interface ChatContextType {
  messages: Message[];
  rawMessages: RawMessage[];
  addMessage: (message: Message) => void;
  addRawMessage: (message: RawMessage) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  streamingContent: string;
  setStreamingContent: (content: string) => void;
  clearRawMessages: () => void;
}

// Component Props Types
export interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  isReady: boolean;
}

export interface ThreadsSidebarProps {
  threads: Thread[];
  isOpen: boolean;
  onNewChat?: () => void;
  onSelectThread?: (threadId: string) => void;
}

export interface MessageItemProps {
  message: Message;
}

export interface DebugPanelProps {
  messages: RawMessage[];
}

export interface ThreadSummary {
  thread_id: string;
  message_count: number;
  last_message: Message | null;
}

export interface ThreadContextType {
  threads: Thread[];
  currentThreadId: string | null;
  createNewThread: () => Promise<string>;
  loadThreadHistory: (threadId: string) => Promise<void>;
  deleteThread: (threadId: string) => Promise<boolean>;
  setCurrentThreadId: (threadId: string | null) => void;
  loadThreads: () => Promise<void>;
  isLoading: boolean;
} 