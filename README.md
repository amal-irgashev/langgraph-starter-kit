# LangGraph Starter Kit

<div align="center">

<img src="https://python.langchain.com/assets/images/langgraph-7903264087b881d3.svg" width="180" alt="LangGraph Logo">

<br/>

<img src="Starter-kit-photo.png" width="900" alt="LangGraph Starter Kit UI - Modern chat interface with real-time debug panel"/>

<br/>

[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-blue.svg?style=flat&logo=python&logoColor=white)](https://www.python.org)
[![Next.js 14+](https://img.shields.io/badge/Next.js-14+-black.svg?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![LangGraph](https://img.shields.io/badge/LangGraph-0.2.0-orange.svg?style=flat&logo=chainlink&logoColor=white)](https://python.langchain.com/docs/langgraph)
[![LangChain](https://img.shields.io/badge/LangChain-0.1.0-teal.svg?style=flat&logo=chainlink&logoColor=white)](https://python.langchain.com)

**A production-ready starter kit for building autonomous agents with LangGraph and Next.js**

[Documentation](https://python.langchain.com/docs/langgraph) | [LangGraph Client SDK](frontend/LangGraph%20Client%20JS%20SDK%20Draft.md) | [Examples](https://python.langchain.com/docs/langgraph/examples)

</div>

## 🎯 Overview

This starter kit provides a foundation for building autonomous agents using LangGraph and the LangGraph Client JS SDK. It serves as a practical implementation companion to the [LangGraph Client JS SDK documentation](frontend/LangGraph%20Client%20JS%20SDK%20Draft.md), demonstrating how to build production-ready agent applications.

### What's Inside

- 🤖 **ReAct Agent Implementation**: A complete example of a ReAct agent using GPT-4o and Tavily search
- 🎨 **Next.js Frontend**: Modern UI with real-time agent interactions and streaming responses
- 🔌 **SDK Integration**: Production-ready examples of the LangGraph Client JS SDK
- 📦 **React Hooks & Contexts**: Ready-to-use hooks and contexts for agent state management

## 🤖 Agent Architecture

The starter kit implements a ReAct agent (`backend/agent.py`) with the following capabilities:

- 🔍 **Web Search**: Integrated Tavily search for real-time information gathering
- 💾 **Thread-Level Persistence**: Maintains conversation context using LangGraph's MemorySaver
- 🔄 **State Graph Workflow**: Smart routing between agent and tool nodes based on agent decisions
- 🛠️ **Extensible Tools**: Easy to add new tools through LangChain's tool system

### Agent Implementation Details

```python
# backend/agent.py highlights
class AgentState(TypedDict):
    """The state of the agent."""
    messages: Annotated[Sequence[BaseMessage], add_messages]

# Initialize tools
def get_tools():
    """Get the tools available to the agent."""
    return [TavilySearchResults(max_results=3)]

tools = get_tools()
tool_node = ToolNode(tools)

# Initialize model with streaming
model = ChatOpenAI(
    model="gpt-4",
    temperature=0.1,
    streaming=True
).bind_tools(tools)

# Define system prompt
system_prompt = SystemMessage(content="""You are a helpful AI assistant with access to search tools.
Your goal is to help users by understanding their requests and using search when needed to provide accurate information.
Always think step by step and use the search tool when you need to find current or factual information.
When searching, be specific with your queries to get the most relevant results.""")
```

## 🔑 Required API Keys

The starter kit requires the following API keys:

- **OpenAI API Key** (Required)
  - Powers the GPT-4 model for agent reasoning
  - Get it from: [OpenAI Platform](https://platform.openai.com)
  ```env
  OPENAI_API_KEY=sk-...
  ```

- **Tavily API Key** (Required)
  - Enables web search capabilities
  - Get it from: [Tavily AI](https://tavily.com)
  ```env
  TAVILY_API_KEY=tvly-...
  ```

## 📁 Project Structure

```
langgraph-starter-kit/
├── frontend/                      # Next.js frontend application
│   ├── app/                      # Next.js app directory
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/             # React components
│   │   ├── ChatComponent.tsx  # Main chat component
│   │   ├── chat/             # Chat-related components
│   │   └── ui/              # Shared UI components
│   ├── contexts/              # React contexts
│   │   ├── ChatContext.tsx   # Chat state management
│   │   ├── ClientContext.tsx # LangGraph client provider
│   │   └── ThreadContext.tsx # Thread state management
│   ├── hooks/                # Custom React hooks
│   │   ├── useChatActions.ts     # Chat interaction hooks
│   │   ├── useChatStateActions.ts # Chat state management
│   │   └── useEventSource.ts     # SSE handling
│   ├── lib/                  # Utility functions
│   │   ├── animations.ts    # Animation utilities
│   │   └── utils.ts        # General utilities
│   ├── public/              # Static assets
│   │   └── *.svg           # SVG icons and images
│   ├── types/               # TypeScript types
│   │   ├── chat-context.ts # Chat context types
│   │   └── chat.ts        # Chat-related types
│   └── package.json        # Frontend dependencies
└── backend/                 # Python backend
    ├── agent.py           # Core ReAct agent implementation
    ├── langgraph.json    # LangGraph configuration
    └── requirements.txt  # Python dependencies
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. Start the LangGraph server:
   ```bash
   langgraph dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Required environment variables:
   ```env
   # Backend API URL (required)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   
   # LangGraph API URL (required)
   NEXT_PUBLIC_LANGGRAPH_API_URL=http://localhost:8123
   
   # LangGraph Graph ID (required)
   NEXT_PUBLIC_LANGGRAPH_GRAPH_ID=react_agent
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Visit http://localhost:3000 to see your agent in action!

## 🔨 Building with the SDK

This starter kit demonstrates practical usage of the LangGraph Client JS SDK. Here are some key examples from our implementation:

1. **Client Context Setup**
   ```typescript
   // contexts/ClientContext.tsx
   import { Client } from "@langchain/langgraph-sdk";
   
   interface ClientContextValue {
     client: Client | null;
     isInitialized: boolean;
     error: Error | null;
   }
   
   export function ClientProvider({ children, config }: ClientProviderProps) {
     const value = useMemo(() => {
       try {
         const client = new Client(config);
         return {
           client,
           isInitialized: true,
           error: null,
         };
       } catch (error) {
         return {
           client: null,
           isInitialized: false,
           error: error instanceof Error ? error : new Error('Failed to initialize client'),
         };
       }
     }, [config]);
   
     return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
   }
   ```

2. **Chat Actions with Streaming**
   ```typescript
   // hooks/useChatActions.ts
   export function useChatActions({ threadId: initialThreadId }: UseChatActionsProps = {}) {
     const client = useClient();
     const { loadThreadHistory } = useThread();
     const { setIsLoading, addMessage, setStreamingContent } = useChat();
   
     const sendMessage = useCallback(async (content: string) => {
       if (!client || !threadId) throw new Error('Chat not initialized');
       
       setIsLoading(true);
       let currentContent = '';
       let sources: string[] = [];
   
       try {
         // Create a streaming run with the message
         const stream = await client.runs.stream(threadId, getGraphId(), {
           input: { messages: [{ role: 'user', content }] },
           streamMode: ["messages-tuple", "messages"],
           streamSubgraphs: true
         });
   
         // Process the stream
         for await (const chunk of stream) {
           const { content, sources: sourceContent } = processStreamChunk(chunk);
           if (content) {
             currentContent += content;
             setStreamingContent(currentContent);
           }
           if (sourceContent) {
             sources.push(sourceContent);
           }
         }
   
         // Add the complete message after streaming
         if (currentContent.trim()) {
           addMessage({
             role: 'assistant',
             content: currentContent,
             metadata: sources.length ? { sources } : undefined
           });
         }
       } finally {
         setIsLoading(false);
         setStreamingContent('');
       }
     }, [client, threadId, addMessage, setStreamingContent]);
   
     return { sendMessage };
   }
   ```

3. **Processing Stream Chunks**
   ```typescript
   // Utility function to process stream chunks
   const processStreamChunk = (chunk: any): { content: string | null, sources: string | null } => {
     if (chunk.event !== "messages") return { content: null, sources: null };
     
     const [messageData, metadata] = chunk.data;
     
     // Handle tool messages (sources)
     if (metadata?.langgraph_node?.includes('tool') || 
         messageData.additional_kwargs?.tool_calls || 
         messageData.type === 'tool') {
       return { content: null, sources: messageData.content || null };
     }
     
     // Handle AI message chunks
     if ((messageData.type === 'AIMessageChunk' || messageData.type === 'ai') && 
         typeof messageData.content === 'string') {
       return { content: messageData.content || null, sources: null };
     }
     
     return { content: null, sources: null };
   };
   ```

For complete SDK documentation and more examples, see our [LangGraph Client JS SDK Guide](frontend/LangGraph%20Client%20JS%20SDK%20Draft.md).

## 📚 Additional Resources

- [LangGraph Documentation](https://python.langchain.com/docs/langgraph)
- [Building Agents with LangGraph](https://python.langchain.com/docs/langgraph/agents)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/UI Components](https://ui.shadcn.com/) - UI components used in this starter

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this starter kit for any purpose.

<p align="right">
  <a href="#top">⬆️ Back to Top</a>
</p>

