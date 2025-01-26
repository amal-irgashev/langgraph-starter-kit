# Introduction to the SDK

The **LangGraph JavaScript/TypeScript SDK** is your toolkit for interacting with a running LangGraph application from a JavaScript or TypeScript environment – think web browsers, Node.js servers, or even other applications. It's like a remote control that lets you talk to your LangGraph application from the outside.

**What's the point?**

This SDK opens up a world of possibilities because it allows you to integrate LangGraph's capabilities into a wider range of applications and services. You're no longer limited to interacting with LangGraph solely through its Python interface or CLI. Instead, you can build rich user interfaces, connect to external services, and create entirely new kinds of applications powered by your LangGraph workflows.

## **Installation**

[npm package reference](https://www.npmjs.com/package/@langchain/langgraph-sdk)

[GitHub Repository](https://github.com/langchain-ai/langgraph/tree/main/libs/sdk-js)

```
yarn add @langchain/langgraph-sdk
npm install @langchain/langgraph-sdk
```

## **Capabilities**

1. **Control your LangGraph application:**  
   * Start new conversations (threads).  
   * Send messages to existing threads and trigger agent actions.  
   * Get the current state of a thread, including all messages and agent actions.  
   * Manage assistants, which are like blueprints for your AI agents. You can create, update, delete and configure them.  
   * Manage runs, which are instances of your assistants actively doing something within a thread.  
   * Even schedule tasks to happen automatically using cron jobs.  
2. **Get data in real-time:**  
   * Instead of just asking for the final result, you can get a live stream of what's happening inside your LangGraph application as it runs. This lets you build interactive experiences where the user sees what the AI is "thinking" step-by-step.  
3. **Store and retrieve data:**  
   * The SDK gives you access to a simple key-value store. This is useful for storing things like user preferences, application settings, or data that your agents need to access.

## **Key Use Cases \- What can you actually build?**

* **Web-based Chatbots:** Build interactive chatbots that run on LangGraph. The SDK handles communication with the LangGraph backend, while you focus on the user interface in your web application.  
* **Automated workflows that need to be triggered or that need to report back to a frontend in real time:** You could have a LangGraph application that processes data, analyzes documents, or performs other complex tasks, triggered from a web interface. The SDK allows you to kick off these workflows, monitor their progress in real time, and display results to the user.  
* **Integration with other services:** Connect your LangGraph application to external services like databases, APIs, or messaging platforms. For example, you could have an agent that retrieves information from a database, then sends a summary to the user via a messaging service, all orchestrated through the SDK.  
* **Scheduled tasks and background processes:** Use the SDK to manage cron jobs that trigger actions in your LangGraph application at specific times. This could be anything from generating daily reports to sending reminders to users.  
* **Interactive dashboards:** Create dashboards that display the state of your LangGraph application in real time. You can use the streaming capabilities to show live updates as agents work on tasks.

**In essence, the LangGraph JS/TS SDK empowers you to:**

* **Bridge the gap:** Connect your LangGraph applications to the JavaScript/TypeScript world.  
* **Build interactive experiences:** Create dynamic, real-time applications powered by LangGraph.  
* **Extend LangGraph's reach:** Integrate LangGraph into a wider ecosystem of applications and services.

**Think of it this way:**

* **LangGraph:** The engine that powers your AI workflows.  
* **LangGraph JS/TS SDK:** The steering wheel, pedals, and dashboard that let you control and interact with that engine from a JavaScript/TypeScript environment.

## Core Concepts

### **1\. The** Client **\- Your Gateway**

The Client class is the central hub. When you instantiate it, you're establishing a connection to your LangGraph API server.

```javascript
import { Client } from "@langchain/langgraph-sdk";
const client = new Client({
  apiUrl: "http://your-langgraph-api-url", // Or process.env.LANGGRAPH_API_URL
  apiKey: "your-api-key", // Or process.env.LANGGRAPH_API_KEY
});
```

**Important Considerations:**

* **API URL:** The apiUrl is crucial. It points to your running LangGraph instance. If you're running locally with langgraph dev, it defaults to http://localhost:8123.  
* **API Key:** If your LangGraph server is secured, you'll need to provide an API key. The SDK will then include this key in the headers of all requests. The getApiKey() helper function can help retrieve it from environment variables or function parameters.  
* Client **as a Singleton:** You'll typically create a single Client instance and reuse it throughout your application.

### 

### **2\. Working with Assistants (**AssistantsClient**)**

Assistants are the configurations that define how your agents behave. The AssistantsClient lets you manage them remotely.

**Advanced Techniques:**

* **Dynamic Assistant Creation:** Instead of hardcoding assistant creation in your LangGraph Python code, you can use the SDK to create assistants on-the-fly based on user input or other runtime conditions. This enables greater flexibility and customization.  
* **Version Control:** The SDK allows you to manage assistant versions. You can retrieve a list of all versions of an assistant using getVersions() and switch between them using setLatest(). This is extremely useful for A/B testing different agent configurations or rolling back to previous versions if needed.  
* **Schema Introspection:** Using getSchemas() or getSubgraphs(), you can introspect the input, output, and state schemas of your assistants directly from the client. This enables you to build dynamic UIs or validation logic based on the structure of your agents.

### **3\. Threads and Runs \- The Heart of Interaction**

**Threads (**ThreadsClient**)** represent ongoing conversations or interactions.

* **Creating Threads with Metadata:** When creating threads with create(), you can attach metadata using key-value pairs. This metadata can store any information relevant to the thread, such as user IDs, session details, or context information. You can then use search() to filter and retrieve threads based on this metadata, making it easy to manage and organize conversations. For example:

```javascript
const thread = await client.threads.create({
metadata: { userId: 123, sessionId: 'abc' }
});
```

  

* **Fine-Grained State Management:** The updateState() function allows for very granular control over the thread's state. You can target specific parts of the state to update, which is more efficient than replacing the entire state each time. The asNode parameter in the updateState method provides even more control, allowing you to update state as if it were updated from within a given node, enabling complex transitions and updates from the client side.

**Runs (**RunsClient**)** are executions of assistants within threads.

* **Asynchronous Execution with** wait()**:** For synchronous-like behavior, the wait() method is crucial. It allows you to start a run and block execution until the run completes, returning the final result. This simplifies the flow when you need a result before proceeding. Using null as the threadId allows you to create runs without explicit threads, simplifying fire-and-forget use cases.

* **Real-time Interaction with** stream()**:** The stream() method is your key to building dynamic, interactive experiences. It returns an async generator that yields data as it becomes available.

```javascript
const stream = client.runs.stream(thread.thread_id, assistant.assistant_id, {
  input: { messages: [{ role: "user", content: "Explain quantum physics" }] },
  streamMode: ["messages", "updates"], // Stream both messages and state updates
});

for await (const chunk of stream) {
  if (chunk.event === "messages/complete") {
    console.log("New message:", chunk.data);
  } else if (chunk.event === "updates") {
    console.log("State updated:", chunk.data);
  }
}
```

* **Advanced Streaming:** The streamSubgraphs option in both stream() and create() lets you control whether to receive streaming data from subgraphs. streamMode lets you specify precisely what data you want to receive.

* **Cancelling and Joining Runs:** You can cancel runs using cancel(), optionally blocking until cancellation is complete. join() lets you wait for a run to finish without getting intermediate results. joinStream() provides a stream that only starts yielding data once the run is complete, useful for seeing the final state changes in a streamed fashion.

### **4\. Crons \- Automating Tasks**

The CronsClient allows you to schedule tasks to run at specific intervals.

* **Precise Scheduling:** You have full control over the cron schedule, allowing you to define very specific execution times.  
* **Contextual Execution:** You can associate crons with threads using createForThread(), allowing scheduled tasks to operate within a specific conversation context.

### **5\. Store \- Persistent Data**

The StoreClient provides a simple key-value store for persistent data.

* **Namespaces:** Namespaces allow you to organize your data. You can think of them like folders or directories.  
* **Filtering and Searching:** searchItems() lets you filter and search for items based on various criteria, including a full-text search query.  
* **Namespace Management:** listNamespaces() allows you to manage and discover namespaces within your store.

**Example: Storing and Retrieving User Preferences**

```javascript
// Store user preferences
await client.store.putItem(["users", userId], "preferences", {
  theme: "dark",
  notifications: "enabled",
});
// Retrieve user preferences
const preferences = await client.store.getItem(["users", userId], "preferences");
```

# Advanced Concepts

## **1\. Leveraging** Command **for Complex Interactions**

The Command object, used within the RunsClient's create(), stream(), and wait() methods, offers a way to exert finer control over the execution flow of your graph. Instead of simply providing input, you can send a set of instructions to be processed.

* **Precise State Updates:** The update property of Command allows for very specific changes to the thread state. Instead of replacing the whole state, you can provide an object representing only the fields you want to modify. You can even provide an array of \[key, value\] tuples to update multiple fields at once, potentially scattered across different paths in the state object.

```javascript
// ... inside a stream() or wait() call ...
command: {
    update: {
      "messages.0.content": "Revised message content", // Modify a specific message
      "metadata.status": "processing", // Update a metadata field
      "newField": "This is a new field" //Add a new field
    }
}
// ... or using an array of tuples
command: {
    update: [
        ["messages.0.content", "Revised message content"],
        ["metadata.status", "processing"],
        ["newField", "This is a new field"]
    ]
}
```

* **Conditional Execution with** goto**:** The goto property opens possibilities for dynamic branching within your graph.  
  * **Direct Node Jumps:** You can specify the name of a node (or an array of node names) to jump to directly. This is similar to LangGraph's conditional edges but controlled from the client-side.

```
command: {
    goto: "error_handling_node"
}
```

    

  * **Input-Driven Node Execution:** You can use a Send object within goto to not only specify the target node but also provide it with input, effectively triggering a specific part of your graph with custom data.

```
command: {
    goto: {
      node: "data_processing_node",
      input: { data: someComplexDataObject }
    }
}
```

  * **Multiple** Send **Objects:** An array of Send objects within goto will cause those nodes to be executed in parallel (as allowed by the graph).

* **Responding to** interrupt **Calls:** When your LangGraph application calls the interrupt() function, the execution pauses. You can capture this in your stream() or wait() call and use the resume property in the command to provide a value back to the interrupt() function, allowing your LangGraph application to continue. You're effectively creating a two-way communication channel between your JavaScript/TypeScript code and your running LangGraph instance.

## **2\. Fine-Tuning Streaming with** streamMode **and** streamSubgraphs

You have fine-grained control over what data you receive when using stream().

* **Targeted Streaming with** streamMode**:** Instead of just getting "values" or "messages", you can be more specific. For instance, "messages-tuple" gives you each message chunk along with its associated metadata. updates gives you information about how the state is changing at each step, while debug provides a wealth of information for debugging purposes.

```javascript
const stream = client.runs.stream(thread.thread_id, assistant.assistant_id, {
  streamMode: ["messages-tuple", "debug"],
});
```


* **Controlling Subgraph Streaming:** The streamSubgraphs boolean flag dictates whether you receive data from nested graphs (subgraphs) within your main graph. This is useful when you have complex, modular graphs, and you only want to focus on the output of specific parts.

## **3\. Advanced** RunsClient **Options**

* interruptBefore **and** interruptAfter**:** These options give you precise control over when to pause execution. You can specify an array of node names or use "\*" to interrupt before or after every node. This is powerful for debugging, implementing manual checkpoints, or dynamically injecting data at specific points in the graph's execution.  
* checkpoint **and** checkpointId **in** RunsCreatePayload**:** Using these, you can start new runs from a specific checkpoint, allowing for sophisticated resumption and state management.  
* webhook**:** Provide a URL to receive a POST request when the run completes. This enables event-driven architectures, where your LangGraph application can notify other services about the completion of tasks.  
* afterSeconds: Schedule a run to begin after a specified delay, expressed in seconds.  
* ifNotExists: When creating a run, specify whether to create a new one or reuse an existing one if one matching the provided parameters is found.

## **4\.** ThreadsClient **\-** getHistory() **Deep Dive**

The getHistory() function is more powerful than it initially seems.

* **Time Travel with** before**:** You can provide a Config object to the before option to retrieve the history up to a specific point in time, effectively rewinding the thread's state.  
* **Checkpoint-Based Retrieval:** Use the checkpoint option to retrieve history up to a specific checkpoint.  
* **Metadata Filtering in History:** You can filter historical states based on metadata, allowing you to find specific points in the thread's past based on contextual information.

**Example: Retrieving History Before a Specific Checkpoint**

```javascript
const history = await client.threads.getHistory(thread.thread_id, {
  checkpoint: { checkpoint_ns: "my_namespace", checkpoint_id: "my_checkpoint" },
});
```

## **5\. Harnessing the Power of** configurable **in** Config

The configurable field in the Config object is your gateway to parameterizing your LangGraph applications. By marking certain attributes of your nodes as configurable in your Python code (using configurable\_fields or configurable\_fields\_async on RunnableConfig), you can then set their values at runtime through the SDK. This allows you to:

* **Customize agent behavior:** Change the model used by an LLM, modify prompt templates, or adjust other parameters without redeploying your LangGraph application.  
* **Personalize user experiences:** Tailor the behavior of your agents to individual users based on their preferences or past interactions.  
* **A/B test different configurations:** Easily experiment with different settings to optimize the performance of your application.

**Example: Setting a Configurable Field**

```javascript
// Assuming you have a node in your LangGraph application with a configurable field named "model"
const run = await client.runs.create(thread.thread_id, assistant.assistant_id, {
  config: {
    configurable: { model: "gpt-4-turbo" }, // Set the model to be used
  },
});
```

# 

# React Contexts and Hooks with the Client SDK

This section will guide you through creating a React frontend that interacts seamlessly with your LangGraph application. We'll use React Context and Hooks to manage state and build a dynamic UI.

### 1\. Setting up a Global Client Context

Instead of creating a new Client instance every time you need to interact with LangGraph, it's more efficient to create it once and share it across your application using React Context.

#### 1.1 Create the Context (e.g., ClientContext.tsx):

```javascript
import React, { createContext, useContext, useMemo } from "react";
import { Client, ClientConfig } from "@langchain/langgraph-sdk";

// Define the shape of the context value
interface ClientContextValue {
  client: Client;
}

// Create the context with an initial undefined value
const ClientContext = createContext<ClientContextValue | undefined>(undefined);
```

* ClientContextValue**:** This interface defines what data our context will hold. Here, it's just the Client instance.  
* createContext**:** This creates a new context object. We set the initial value to undefined because the client won't be available immediately.

#### 1.2 Create a Provider Component:

```javascript
interface ClientProviderProps {
  children: React.ReactNode;
  config?: ClientConfig;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({
  children,
  config,
}) => {
  // Create the client instance, only once
  const client = useMemo(() => new Client(config), [config]);

  const value: ClientContextValue = { client };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};
```

* ClientProviderProps**:** This defines the props for our provider component. We accept an optional config for the Client and children to render within the provider.  
* useMemo**:** This hook ensures that the Client is created only once, even if the ClientProvider re-renders. The \[config\] dependency array means the client will be recreated only if the config changes.  
* ClientContext.Provider**:** This component makes the value (our Client instance) available to all components nested within it.


#### 1.3 Create a Helper Hook to Consume the Context:

```javascript
export function useClient(): Client {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context.client;
}
```

* useContext**:** This hook retrieves the current value of the ClientContext.  
* **Error Handling:** We throw an error if useClient is used outside of a ClientProvider to prevent unexpected behavior.  
* useClient**:** This custom hook simplifies accessing the Client instance in your components.

#### 1.4 Using the ClientProvider:

Wrap your application's root component with the ClientProvider:

```javascript
import { ClientProvider } from "./ClientContext";

function App() {
  return (
    <ClientProvider config={{ apiUrl: "your-langgraph-api-url" }}>
      {/* Rest of your application */}
    </ClientProvider>
  );
}
```

Now, any component within App can access the Client using the useClient hook.

### 2\. Creating Custom Hooks for Core Operations

Custom hooks encapsulate specific LangGraph operations, making your code more organized and reusable.

#### 2.1. Listing Assistants (useAssistants)

This hook fetches and manages the list of assistants.

```javascript
import { useState, useEffect } from "react";
import { Assistant, Metadata } from "@langchain/langgraph-sdk";
import { useClient } from "./ClientContext"; // Our client context hook

interface UseAssistantsOptions {
  metadata?: Metadata;
  limit?: number;
  offset?: number;
}

export function useAssistants(options?: UseAssistantsOptions) {
  const client = useClient(); // Access the client
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await client.assistants.search({
          metadata: options?.metadata,
          limit: options?.limit,
          offset: options?.offset,
        });
        setAssistants(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [client, options]); // Re-fetch when client or options change

  return { assistants, loading, error };
}
```

* useClient**:** We use our custom hook to get the Client instance.  
* useState**:** We manage the assistants array, loading state, and error state.  
* useEffect**:** We fetch the assistants when the component mounts or when the client or options change.  
* async/await**:** We use async/await for cleaner asynchronous code.  
* **Error Handling:** We catch potential errors and set the error state.  
* UseAssistantsOptions**:** This interface defines the optional parameters for the hook (filtering by metadata, limit, offset).

**Using** useAssistants **in a Component:**

```javascript
function AssistantList() {
  const { assistants, loading, error } = useAssistants({ limit: 5 });

  if (loading) return <p>Loading assistants...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {assistants.map((assistant) => (
        <li key={assistant.assistant_id}>{assistant.name}</li>
      ))}
    </ul>
  );
}
```

**![][image1]**

#### 2.2. Creating and Fetching Threads (useThread)

This hook manages a thread, either creating a new one or fetching an existing one by ID.

```javascript
import { useState, useEffect, useCallback } from "react";
import { Thread } from "@langchain/langgraph-sdk";
import { useClient } from "./ClientContext";

export function useThread(threadId?: string) {
  const client = useClient();
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to create a new thread
  const createThread = useCallback(async () => {
    try {
      setLoading(true);
      const newThread = await client.threads.create();
      setThread(newThread);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [client]);

  // Fetch the thread if threadId is provided
  useEffect(() => {
    const fetchThread = async () => {
      if (!threadId) {
        return;
      }
      try {
        setLoading(true);
        const existingThread = await client.threads.get(threadId);
        setThread(existingThread);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    if (threadId) {
      fetchThread();
    } else {
      createThread();
    }
  }, [client, threadId, createThread]);

  return { thread, loading, error };
}
```

* useCallback**:** We use useCallback for createThread to prevent unnecessary re-creations of the function.  
* useEffect**:**  
  * If threadId is provided, we fetch the thread.  
  * If threadId is not provided, we call createThread to create a new one.  
* **Conditional Logic:** The hook behaves differently based on whether threadId is provided.

**Using** useThread **in a Component:**

```javascript
function ThreadView({ threadId }: { threadId?: string }) {
  const { thread, loading, error } = useThread(threadId);

  if (loading) return <p>Loading thread...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!thread) return <p>Thread not found.</p>;

  return (
    <div>
      <p>Thread ID: {thread.thread_id}</p>
      {/* ... display other thread information ... */}
    </div>
  );
}
```

**![][image2]**

### 3\. Managing Streaming Runs in React

Streaming runs provide real-time updates from your LangGraph application. Let's create a hook to manage them.

#### 3.1. Building a useRunStream Hook

```javascript
import { useClient } from "./ClientContext";
import { useState, useEffect, useRef, useCallback } from "react";
import { StreamEvent } from "@langchain/langgraph-sdk";

interface UseRunStreamOptions {
  assistantId: string;
  input: Record<string, any>;
  streamMode?: string | string[];
  streamSubgraphs?: boolean;
  autoStart?: boolean;
}

export function useRunStream(threadId: string, opts: UseRunStreamOptions) {
  const client = useClient();
  const [events, setEvents] = useState<{ event: StreamEvent; data: any }[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Ref to store the AbortController for cancellation
  const cancelRef = useRef<AbortController | null>(null);

  // Function to start the stream
  const startStream = useCallback(async () => {
    if (running) return; // Prevent restarting if already running
    setRunning(true);
    setError(null);
    setEvents([]);

    const abortController = new AbortController();
    cancelRef.current = abortController;

    try {
      const generator = client.runs.stream(threadId, opts.assistantId, {
        input: opts.input,
        streamMode: opts.streamMode,
        streamSubgraphs: opts.streamSubgraphs,
        signal: abortController.signal,
      });

      for await (const chunk of generator) {
        setEvents((prev) => [...prev, chunk]);
      }
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setRunning(false);
      cancelRef.current = null;
    }
  }, [client, threadId, opts, running]);

  // Auto-start if autoStart option is true
  useEffect(() => {
    if (opts.autoStart) {
      startStream();
    }
  }, [opts.autoStart, startStream]);

  // Function to cancel the stream
  const cancelStream = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current.abort();
    }
  }, []);

  return { events, running, error, startStream, cancelStream };
}
```

* useClient**:** We get the Client instance.  
* useState**:** We manage events (an array of stream events), running state, and error state.  
* useRef**:** We use cancelRef to store the AbortController instance so we can cancel the stream.  
* useCallback**:** We use useCallback for startStream and cancelStream to prevent unnecessary re-creations.  
* startStream**:**  
  * Sets running to true.  
  * Resets error and events.  
  * Creates a new AbortController.  
  * Calls client.runs.stream() with the provided options and the AbortController.signal.  
  * Iterates through the stream using for await...of.  
  * Appends each chunk to the events state.  
  * Handles errors, ignoring abort errors.  
  * Sets running to false and clears cancelRef.  
* useEffect**:** Auto-starts the stream if opts.autoStart is true.  
* cancelStream**:** Aborts the stream using the AbortController.

**Using** useRunStream **in a Component:**

```javascript
function StreamedRunView({
  threadId,
  assistantId,
  input,
}: {
  threadId: string;
  assistantId: string;
  input: Record<string, any>;
}) {
  const { events, running, error, startStream, cancelStream } = useRunStream(
    threadId,
    {
      assistantId,
      input,
      streamMode: "messages",
      autoStart: false, // Start manually
    }
  );

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <button onClick={startStream} disabled={running}>
        Start Stream
      </button>
      <button onClick={cancelStream} disabled={!running}>
        Cancel Stream
      </button>
      <div>
        {events.map((evt, idx) => (
          <p key={idx}>
            [{evt.event}] =&gt; {JSON.stringify(evt.data)}
          </p>
        ))}
      </div>
    </div>
  );
}
```

**![][image3]**

### 4\. Handling Thread States and Subgraphs Dynamically

You might need to access the state of a thread, including the state of its subgraphs, to display detailed information in your UI.

#### 4.1 Creating a useThreadState Hook

```javascript
import { useState, useEffect } from "react";
import { ThreadState } from "@langchain/langgraph-sdk";
import { useClient } from "./ClientContext";

export function useThreadState(
  threadId: string,
  checkpoint?: string,
  includeSubgraphs = false
) {
  const client = useClient();
  const [state, setState] = useState<ThreadState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        setLoading(true);
        const fetchedState = await client.threads.getState(threadId, checkpoint, {
          subgraphs: includeSubgraphs,
        });
        setState(fetchedState);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, [client, threadId, checkpoint, includeSubgraphs]);

  return { state, loading, error };
}
```

* useClient**:** We get the Client instance.  
* useState**:** We manage state (the ThreadState object), loading state, and error state.  
* useEffect**:** We fetch the thread state when the component mounts or when the dependencies change.  
* client.threads.getState()**:** We call the SDK method to fetch the state, passing includeSubgraphs to control whether to include subgraph states.

**Using** useThreadState **in a Component:**

```javascript
function ThreadStateView({ threadId }: { threadId: string }) {
  const { state, loading, error } = useThreadState(threadId, undefined, true); // Get state with subgraphs

  if (loading) return <p>Loading thread state...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!state) return null;

  return (
    <pre>{JSON.stringify(state, null, 2)}</pre> // Display the state (for debugging)
  );
}
```

**![][image4]**

### 5\. Scheduling and Cron Jobs in React Apps

If your application allows users to schedule tasks using cron jobs, you can create hooks to interact with the CronsClient.

#### 5.1 Creating a useCronOperations Hook

```javascript
import { useClient } from "./ClientContext";
import { useState } from "react";

export function useCronOperations() {
  const client = useClient();
  const [error, setError] = useState<Error | null>(null);

  async function createCronForThread(
    threadId: string,
    assistantId: string,
    schedule: string
  ) {
    try {
      setError(null);
      await client.crons.createForThread(threadId, assistantId, {
        schedule,
        input: { messages: [{ role: "system", content: "Scheduled check." }] },
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    
 }

  async function deleteCron(cronId: string) {
    try {
      setError(null);
      await client.crons.delete(cronId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  return { createCronForThread, deleteCron, error };
}
```

* useClient**:** We get the Client instance.  
* useState**:** We manage the error state.  
* createCronForThread**:** This function calls client.crons.createForThread to create a new cron job associated with a thread.  
* deleteCron**:** This function calls client.crons.delete to delete a cron job.

**Using** useCronOperations **in a Component:**

```javascript
function CronScheduler({
  threadId,
  assistantId,
}: {
  threadId: string;
  assistantId: string;
}) {
  const { createCronForThread, deleteCron, error } = useCronOperations();
  const [schedule, setSchedule] = useState("*/30 * * * *"); // Default: every 30 minutes

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <input
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        placeholder="Cron expression"
      />
      <button
        onClick={() => createCronForThread(threadId, assistantId, schedule)}
      >
        Create Cron
      </button>
      {/* You would likely add UI elements to list and delete crons here */}
    </div>
  );
}
```

**![][image5]**

### 6\. Advanced Techniques

#### 6.1. Handling Concurrency Conflicts

When multiple components or users try to modify the same thread simultaneously, you might encounter concurrency conflicts. The multitaskStrategy option helps manage these situations.

* **Where to Use:** You can pass multitaskStrategy when creating runs using client.runs.create(), client.runs.stream(), or client.runs.wait().

* **Example (in** useRunStream**):**

```javascript
// ... inside useRunStream ...

const startStream = useCallback(async () => {
  // ... other code ...

  try {
    const generator = client.runs.stream(threadId, opts.assistantId, {
      input: opts.input,
      streamMode: opts.streamMode,
      streamSubgraphs: opts.streamSubgraphs,
      signal: abortController.signal,
      multitaskStrategy: "rollback", // Handle concurrency by rolling back
    });

    // ... rest of the code ...
  } catch (err) {
    // ... error handling ...
  }
}, [client, threadId, opts, running]);

// ... rest of the hook ...
```

#### 6.2. Error Boundaries

React Error Boundaries allow you to catch errors that occur within a part of your component tree and prevent the entire application from crashing.

* **Creating an Error Boundary:**

```javascript
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```


* **Using the Error Boundary:**

```javascript
import ErrorBoundary from "./ErrorBoundary";

function MyComponent() {
  return (
    <ErrorBoundary>
      <MyLangGraphComponent /> {/* A component that uses LangGraph hooks */}
    </ErrorBoundary>
  );
}
```

### 7\. Putting It All Together \- Example Application Structure

Here's a high-level example of how you might structure a React application using these contexts and hooks:

```
src/
├── contexts/
│   └── LangGraphContext.tsx  // Client context, provider, and basic hooks
├── hooks/
│   ├── useAssistants.ts      // Hook to fetch and manage assistants
│   ├── useThread.ts         // Hook to create or fetch a thread
│   ├── useRunStream.ts      // Hook to manage streaming runs
│   ├── useThreadState.ts   // Hook to fetch thread state
│   └── useCronOperations.ts // Hook to manage cron jobs
├── components/
│   ├── AssistantList.tsx    // Component to display a list of assistants
│   ├── ChatComponent.tsx    // Component for the main chat interface
│   ├── ThreadDebugger.tsx  // Component to display thread state (for debugging)
│   └── CronScheduler.tsx    // Component to manage cron jobs
├── App.tsx                  // Main application component
└── index.tsx                // Entry point
```

# Building Agentic User Interfaces

In this section, we'll explore how to leverage the hooks and contexts we created to build user interfaces that are not just interactive but are inherently AI-native, meaning they are deeply integrated with the capabilities and behaviors of your LangGraph-powered agents.

### What are AI-Native User Interfaces?

AI-native UIs go beyond simply displaying data fetched from an AI backend. They are characterized by:

* **Dynamic Updates:** They react in real-time to the actions and outputs of AI agents.  
* **Context Awareness:** They maintain and display the context of ongoing conversations or workflows, allowing users to understand the state of the AI.  
* **Interactivity:** They allow users to interact with the AI in natural and intuitive ways, often going beyond simple text input/output.  
* **Adaptability:** They can change their structure or behavior based on the capabilities and responses of the AI.  
* **Agent-Driven Actions:** They can display and execute actions suggested by the agents themselves.

### Leveraging Our Hooks and Contexts

The hooks and contexts we created in the previous chapter provide the building blocks for creating these AI-native experiences:

* useClient**:** Provides access to the LangGraph Client instance, enabling communication with your LangGraph application.  
* useAssistants**:** Allows you to fetch and display a list of available assistants, letting users choose which agent to interact with.  
* useThread**:** Manages the creation or retrieval of threads, representing ongoing conversations or workflows.  
* useRunStream**:** Enables real-time streaming of data from runs, providing dynamic updates to the UI.  
* useThreadState**:** Provides access to the thread's state, including the state of subgraphs, for displaying context or debugging information.  
* useCronOperations**:** Allows users to schedule tasks and interact with cron jobs.

### Building AI-Native UI Components

Let's explore how to build specific UI components using these hooks:

#### 1\. Dynamic Assistant Selection

You can use useAssistants to create a dropdown or list that allows users to select which assistant they want to interact with.

```javascript
import { useAssistants } from "../hooks/useAssistants";
function AssistantSelector() {
  const { assistants, loading, error } = useAssistants();
  const [selectedAssistantId, setSelectedAssistantId] = useState<string | null>(
    null
  );
  if (loading) return <p>Loading assistants...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <select
        value={selectedAssistantId || ""}
        onChange={(e) => setSelectedAssistantId(e.target.value)}
      >
        <option value="">Select an Assistant</option>
        {assistants.map((assistant) => (
          <option key={assistant.assistant_id} value={assistant.assistant_id}>
            {assistant.name}
          </option>
        ))}
      </select>
      {selectedAssistantId && (
        <p>You have selected: {selectedAssistantId}</p>
      )}
    </div>
  );
}
```

* useAssistants**:** Fetches the list of assistants.  
* useState**:** Manages the selectedAssistantId.  
* **Dropdown:** A simple select element lets the user choose an assistant.  
* **Dynamic Display:** The selected assistant's ID is displayed below the dropdown.

![][image6]

#### 2\. Real-time Chat Interface

The useThread and useRunStream hooks are essential for building a chat interface that updates in real-time.

```javascript
import { useThread } from "../hooks/useThread";
import { useRunStream } from "../hooks/useRunStream";
import { useState } from "react";

function ChatInterface({ assistantId }: { assistantId: string }) {
  const { thread } = useThread();
  const [newMessage, setNewMessage] = useState("");
  const { events, running, error, startStream } = useRunStream(
    thread?.thread_id ?? "",
    {
      assistantId: assistantId,
      input: {}, // Input will be updated when sending a message
      streamMode: "messages",
      autoStart: false,
    }
  );

  const handleSendMessage = () => {
    startStream({
      input: { messages: [{ role: "user", content: newMessage }] },
    });
    setNewMessage("");
  };

  return (
    <div>
      {/* Display messages from events */}
      <ul>
        {events
          .filter((evt) => evt.event === "messages/complete")
          .map((evt, index) => {
            const message = evt.data;
            return (
              <li key={index}>
                {message.role}: {message.content}
              </li>
            );
          })}
      </ul>

      {/* Input and send button */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage} disabled={running}>
        Send
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

* useThread**:** Manages the thread.  
* useRunStream**:** Handles streaming messages from the run.  
  * autoStart: false: We set autoStart to false because we want to trigger the run when the user sends a message.  
  * input: When handleSendMessage is called, we update the input to the useRunStream hook to send the user's message.  
* useState**:** Manages the newMessage input field.  
* **Message Display:** We filter the events for "messages/complete" events and display them.  
* handleSendMessage**:** Starts the stream with the user's message.

#### 3\. Displaying Thread State and Subgraph Information

The useThreadState hook can be used to display the thread's state, including subgraph data, for debugging or informational purposes.

```javascript
import { useThreadState } from "../hooks/useThreadState";
function ThreadStateView({ threadId }: { threadId: string }) {
  const { state, loading, error } = useThreadState(threadId, undefined, true); // Include subgraphs
  if (loading) return <p>Loading state...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!state) return null;
  return (
    <div>
      <h3>Thread State:</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
```

* useThreadState**:** Fetches the thread state with includeSubgraphs set to true.  
* **Display:** The state is displayed in a pre tag for easy viewing (you would likely format this more nicely in a real application).

#### 4\. Agent-Driven Actions

One of the hallmarks of AI-native UIs is the ability for agents to suggest actions that users can take. These actions can be displayed as buttons, links, or other interactive elements.

* **Example Scenario:** Imagine your LangGraph agent has a tool that allows it to generate a report. When the agent determines that a report should be generated, it could add a message like this to the thread:

```
{
  "role": "assistant",
  "content": "I recommend generating a report.",
  "actions": [
    {
      "type": "generate_report",
      "label": "Generate Report"
    }
  ]
}
```


* **UI Implementation:** You can modify your ChatInterface component to detect these actions and render appropriate UI elements:

```javascript
// ... inside ChatInterface ...
<ul>
  {events
    .filter((evt) => evt.event === "messages/complete")
    .map((evt, index) => {
      const message = evt.data;
      return (
        <li key={index}>
          {message.role}: {message.content}
          {/* Render buttons for actions */}
          {message.actions &&
            message.actions.map((action: any, actionIndex: number) => (
              <button
                key={actionIndex}
                onClick={() => handleActionClick(action)}
              >
                {action.label}
              </button>
            ))}
        </li>
      );
    })}
</ul>

// ...

function handleActionClick(action: any) {
    if (action.type === "generate_report") {
        // Trigger a new run with input that tells the agent to generate the report
        startStream({
          input: { messages: [{ role: "user", content: "generate the report" }] },
        });
    }
}
```

#### 5\. Dynamic Forms Based on Schemas

You can use the getSchemas() or getSubgraphs() methods of the AssistantsClient to retrieve the input schemas of your assistants or subgraphs and dynamically generate forms based on those schemas.

* **Example:** If a subgraph has an input schema that defines a field of type "number," you can render a number input field in your UI.

#### 

#### 6\. Cron Job Management

The useCronOperations hook allows you to build UI components for creating and managing cron jobs.

```javascript
// ... (CronScheduler component from the previous chapter) ...
```

You could enhance this component to fetch and display a list of existing cron jobs, allowing users to delete them or modify their schedules.

#### 7\. Integrating with Third-Party Libraries

You can integrate third-party libraries to enhance the functionality of your AI-native UIs:

* **Data Fetching:** Use React Query or SWR for caching and efficiently managing the fetching of data like assistants, thread states, or data from the KV store.  
* **UI Component Libraries:** Use libraries like Material UI, Ant Design, or Chakra UI to create visually appealing and consistent UI elements.  
* **Charting Libraries:** Use libraries like Chart.js or Recharts to visualize data generated by your LangGraph application.

#### Putting It All Together \- Example Application

Here's a simplified example of how you might structure a complete application:

```javascript
import { ClientProvider } from "./contexts/ClientContext";
import { useAssistants } from "./hooks/useAssistants";
import { useThread } from "./hooks/useThread";
import { useState } from 'react'
import ChatInterface from "./components/ChatInterface";
import AssistantSelector from "./components/AssistantSelector";

function App() {
  return (
    <ClientProvider config={{ apiUrl: "your-langgraph-api-url" }}>
      <MainUI />
    </ClientProvider>
  );
}

function MainUI() {
    const { assistants, loading, error } = useAssistants();
    const [selectedAssistantId, setSelectedAssistantId] = useState<string | null>(
        null
    );

    const { thread } = useThread();
    if (!selectedAssistantId && assistants && assistants.length > 0) {
        setSelectedAssistantId(assistants[0].assistant_id)
    }

    return (
        <div>
            <AssistantSelector
                assistants={assistants}
                onAssistantSelect={setSelectedAssistantId}
                selectedAssistantId={selectedAssistantId}
            />

            {selectedAssistantId && thread && (
                <ChatInterface
                    assistantId={selectedAssistantId}
                    threadId={thread.thread_id}
                />
            )}
        </div>
    );
}

export default App;
```

* ClientProvider**:** Provides the Client instance to the entire application.  
* useAssistants**:** Fetches the list of assistants.  
* useThread**:** Creates or retrieves a thread.  
* AssistantSelector**:** Allows the user to choose an assistant.  
* ChatInterface**:** Displays the chat interface for the selected assistant and thread.

# Building Advanced Agentic UIs

### 1\. Agent-Driven UI Composition and Modification

Instead of hardcoding UI structures, you can empower your LangGraph agents to directly influence the composition and behavior of the UI itself. This creates a dynamic, adaptive interface that can change based on the agent's reasoning and the evolving context of the interaction.

#### 1.1. Sending UI Directives from LangGraph

Your LangGraph agents can send specific messages or update the thread state with data that instructs the UI to modify itself. For example:

* **Adding UI Elements:** An agent could suggest adding a new button, a form, or even a complex visualization based on the current task.  
* **Modifying Existing Elements:** An agent could dynamically change the text of a label, the options in a dropdown, or the visibility of a section.  
* **Triggering UI Actions:** An agent could instruct the UI to open a modal, play a sound, or navigate to a different view.

**Example: Agent Suggests Adding a Button**

In your LangGraph application (Python):

```py
# ... inside a LangGraph node ...
state["ui_directives"] = [
    {"action": "add_button", "label": "Summarize", "node_to_trigger": "summarization_node"}
]
return {"messages": [{"role": "assistant", "content": "Would you like me to summarize the document?"}], "ui_directives": state["ui_directives"]}
```

#### 1.2. Interpreting UI Directives in React

In your React application, you can use the useRunStream or useThreadState hooks to listen for these directives and update the UI accordingly.

```javascript
import { useRunStream } from "../hooks/useRunStream";
// ... other imports

function DynamicUIComponent({ threadId, assistantId }: { threadId: string, assistantId: string }) {
  const { events, running, error, startStream } = useRunStream(
    threadId,
    {
      assistantId: assistantId,
      input: {},
      streamMode: ["updates"], // Listen for state updates
      autoStart: true,
    }
  );

  const [uiElements, setUIElements] = useState<any[]>([]);

  useEffect(() => {
    //find the latest update
    const latestUpdate = events.filter(
        (evt) => evt.event === "updates"
    ).slice(-1)[0];

    if (!latestUpdate) return;

    const uiDirectives = latestUpdate.data.ui_directives;
    if (uiDirectives) {
        uiDirectives.forEach((directive: any) => {
            if (directive.action === "add_button") {
                setUIElements((prevElements) => [
                  ...prevElements,
                  {
                    type: "button",
                    label: directive.label,
                    onClick: () => {
                      // Trigger the specified node in the graph
                      startStream({
                        input: {},
                        command: {
                            goto: directive.node_to_trigger
                        }
                      });
                    },
                  },
                ]);
            }
        })
    }
  }, [events]);

  return (
    <div>
      {/* ... other UI elements ... */}
      {uiElements.map((element, index) => {
        if (element.type === "button") {
          return (
            <button key={index} onClick={element.onClick}>
              {element.label}
            </button>
          );
        }
        // ... handle other element types ...
        return null;
      })}
    </div>
  );
}
```

* useRunStream**:** We listen for "updates" events to get changes to the thread state.  
* useEffect**:** We use an effect to watch for changes to the events array. When a new "updates" event arrives, we check for ui\_directives in the state.  
* uiDirectives**:** We process the directives, dynamically adding UI elements based on the agent's instructions.  
* onClick**:** In this example, clicking the button triggers the summarization\_node in the LangGraph application using the command: {goto: ...} functionality.

### 2\. Advanced State Visualization and Debugging

Visualizing the internal state of a complex LangGraph application, especially with subgraphs, can be challenging but is crucial for understanding and debugging.

#### 2.1. Interactive State Tree

You can build a component that displays the thread state as an interactive tree, allowing users to expand and collapse nodes, inspect subgraph states, and even modify values directly.

* **Leverage** useThreadState**:** Use the useThreadState hook with includeSubgraphs: true to fetch the complete state, including nested subgraphs.  
* **Recursive Rendering:** Create a recursive component that renders each level of the state tree.  
* **Expand/Collapse:** Implement expand/collapse functionality using React state to control the visibility of nested elements.  
* **State Modification (Optional):** For advanced debugging, you could allow users to directly modify the state values through the UI. This should be done with caution and is primarily useful during development.

#### 2.2. Visualizing Graph Execution

You can create a visual representation of your LangGraph graph and highlight the currently active nodes during a run.

* **Fetch Graph Structure:** Use client.assistants.getGraph() to get the graph structure (nodes and edges).  
* **Render the Graph:** Use a library like react-flow-renderer or vis-network to render the graph in your UI.  
* **Track Active Nodes:** Use useRunStream and listen for "events" or "updates" events to identify which nodes are currently active.  
* **Highlight Active Nodes:** Update the styling of the rendered graph nodes to visually highlight the active ones.

### 

### 3\. Contextual Input and Output

Enhance the user experience by providing contextually relevant input options and displaying outputs in formats that are most appropriate for the data type.

#### 3.1. Schema-Driven Input Components

Use the getSchemas() or getSubgraphs() methods to retrieve the input schemas of your assistants or subgraphs. Based on the schema, you can render different input types:

* number**:** Render a number input field.  
* boolean**:** Render a checkbox or toggle.  
* string **with** enum**:** Render a dropdown.  
* object**:** Render a form with nested fields.

#### 3.2. Formatted Output Display

Instead of simply displaying raw JSON output, format the output based on its type and context:

* **Tables:** If the output is an array of objects, render it as a table.  
* **Charts:** If the output is numerical data, consider using a charting library to visualize it.  
* **Images:** If the output is an image URL, display the image directly.  
* **Code Blocks:** If the output is code, use syntax highlighting.

### 4\. Agent-Initiated Interactions and Notifications

Your agents can proactively interact with the user through the UI, going beyond responding to user input.

#### 4.1. Push Notifications

Use a real-time communication mechanism (e.g., WebSockets, Server-Sent Events) in combination with webhook (when creating runs) to enable your LangGraph application to send push notifications to the UI.

* **Server-Side:** When creating a run, you can add a webhook as part of the payload. The webhook will be triggered at the end of the run. The webhook can then send a message to your client.  
* **Client-Side:** The client listens for these notifications and displays them to the user.

#### 4.2. Agent-Requested Input

An agent can pause execution using interrupt() and request specific input from the user through the UI.

* **UI Prompt:** When an interrupt is detected (e.g., in useRunStream), display a prompt to the user based on the information provided by the agent in the interrupt.  
* resume **with Input:** Use the command: { resume: ... } functionality to send the user's response back to the LangGraph application, allowing the agent to continue.

**Example: Agent Requests User Confirmation**

In LangGraph (Python):

```py
# ... inside a LangGraph node ...
state["confirmation_needed"] = True
return {"messages": [{"role": "assistant", "content": "Are you sure you want to proceed?"}], "interrupt": True}
```

In React:

```javascript
// ... inside a component using useRunStream ...

const [confirmationPrompt, setConfirmationPrompt] = useState<string | null>(null);

useEffect(() => {
  //find latest updates event
  const latestUpdate = events
    .filter((evt) => evt.event === "updates")
    .slice(-1)[0];

  if (latestUpdate && latestUpdate.data && latestUpdate.data.interrupt === true) {
      setConfirmationPrompt(latestUpdate.data.messages.slice(-1)[0].content);
  }
}, [events]);

const handleConfirmation = (confirmed: boolean) => {
  setConfirmationPrompt(null);
  startStream({
      input: {},
      command: { resume: confirmed }
  })
};

return (
  <div>
    {/* ... other UI elements ... */}
    {confirmationPrompt && (
      <div>
        <p>{confirmationPrompt}</p>
        <button onClick={() => handleConfirmation(true)}>Yes</button>
        <button onClick={() => handleConfirmation(false)}>No</button>
      </div>
    )}
  </div>
);
```

### 5\. Concurrency and Background Task Management

The LangGraph SDK provides tools for managing concurrency, which is essential for building responsive and efficient UIs.

* multitaskStrategy**:** Use this option when creating runs to define how to handle concurrent runs on the same thread ("reject", "interrupt", "rollback", or "enqueue"). Choose the strategy that best suits your application's needs.  
* RunsClient.createBatch()**:** If the tasks are independent, you can start multiple runs in parallel using createBatch(). Be mindful of potential race conditions if these runs access shared resources.  
* onDisconnect**:** This option allows you to decide whether a run should be canceled or continued in the background when a client disconnects.

### 6\. Caching and Performance Optimization

* **React Query/SWR:** As mentioned before, integrate these libraries for efficient data fetching, caching, and re-fetching. This can significantly improve the performance of your UI, especially when dealing with frequently accessed data like assistant lists or thread states.  
* **Memoization:** Use useMemo and useCallback to prevent unnecessary re-renders of components, especially those that display streamed data or complex state visualizations.

# 

# Interfacing with Subgraphs

In LangGraph, subgraphs are a powerful mechanism for building complex, modular, and reusable components. They allow you to encapsulate a portion of a larger graph within its own self-contained unit, promoting organization, reusability, and easier debugging. 

## Understanding Subgraphs in the LangGraph Ecosystem

Before we dive into the SDK specifics, let's quickly recap what subgraphs are in the context of LangGraph:

* **Encapsulation:** A subgraph is essentially a graph within a graph. It has its own nodes, edges, and internal state, but it's embedded within a larger parent graph.  
* **Modularity:** Subgraphs promote modularity by allowing you to break down complex logic into smaller, manageable units. Each subgraph can focus on a specific task or sub-process.  
* **Reusability:** Subgraphs can be reused multiple times within the same graph or even across different graphs, saving development time and effort.  
* **Abstraction:** Subgraphs abstract away internal complexity. When interacting with a subgraph from the parent graph, you only need to be concerned with its inputs and outputs, not its internal workings.

**The JS/TS SDK and Subgraphs: A Powerful Combination**

The LangGraph JS/TS SDK provides several features that empower you to interact with subgraphs in meaningful ways. These features fall into a few main categories:

1. **Introspection:** Examining the structure and schemas of subgraphs.  
2. **Targeted Execution:** Triggering specific subgraphs within a larger graph.  
3. **Data Extraction:** Accessing the state and outputs of subgraphs.  
4. **Streaming Control:** Managing the flow of data from subgraphs during streaming.

## 

## **1\. Introspection: Peering into Subgraphs with AssistantsClient**

The AssistantsClient provides the tools to understand the structure and requirements of your subgraphs.

* getGraph() **with** xray**:** When you fetch the graph of an assistant using getGraph(), the xray option allows you to peek into any subgraphs. If xray is true, the response will include a serialized representation of all subgraphs. If xray is a number, only subgraphs up to that depth will be included. This enables you to visualize and understand the complete structure of your assistant, including its nested components, from your JavaScript/TypeScript client.

  * For example:

```javascript
const graph = await client.assistants.getGraph(assistantId, { xray: true });
// Now you can inspect `graph` to see the structure of subgraphs
console.log(graph);
```

    

* getSubgraphs()**:** This method is your primary tool for introspection. It allows you to retrieve the schemas of subgraphs associated with an assistant. The schema information includes the input, output, and state schemas, giving you a clear picture of what data the subgraph expects, what it produces, and how it manages its internal state.  
  * namespace **parameter:** This parameter allows you to target a specific subgraph by its namespace. The namespace is a hierarchical identifier that reflects the subgraph's position within the larger graph. For example, if you have a subgraph named process\_data nested within a subgraph named main\_task, its namespace might be main\_task.process\_data.  
  * recurse **parameter:** Setting recurse to true retrieves not only the specified subgraph but also any subgraphs nested within it, recursively. This provides a complete picture of a particular branch of your graph.  
  * Example: Retrieving the schema of a specific subgraph.

```javascript
const subgraphSchema = await client.assistants.getSubgraphs(
    assistantId,
    { namespace: "main_task.process_data" }
);
console.log("Input Schema:", subgraphSchema.input_schema);
console.log("Output Schema:", subgraphSchema.output_schema);
```

* **Why is introspection important?**  
  * **Dynamic UI Generation:** You can use schema information to automatically generate user interface elements for interacting with subgraphs, ensuring that users provide valid input.  
  * **Validation:** You can validate the data passed to and received from subgraphs, improving the robustness of your application.  
  * **Understanding Complex Graphs:** Introspection helps you understand and debug complex graphs by providing insights into the structure and data flow within subgraphs.

## **2\. Targeted Execution: Triggering Subgraphs with** Command

The Command object, specifically the goto property combined with Send, enables you to trigger the execution of specific subgraphs.

* goto **with** Send**:** You can specify the namespace of a subgraph within the node property of a Send object and then use that Send object inside goto. This tells LangGraph to execute that particular subgraph.

* **Example: Executing a specific subgraph.**

```javascript
const result = await client.runs.wait(threadId, assistantId, {
  command: {
    goto: {
      node: "main_task.process_data", // Target the subgraph by its namespace
      input: { data: "some_data_to_process" },
    },
  },
});
```

* **Why is targeted execution important?**  
  * **Modular Development:** You can develop and test subgraphs independently, then integrate them into larger workflows.  
  * **Dynamic Workflows:** You can create workflows that adapt to user input or changing conditions by selectively executing different subgraphs.  
  * **Debugging:** You can isolate and debug specific parts of your graph by triggering them directly.

## 

## **3\. Data Extraction: Accessing Subgraph State and Output**

Once a subgraph has executed, you might need to access its internal state or the data it produced. The SDK provides ways to do this.

* getState()**:** When using getState(), you can get a complete picture of the thread state. When executed with option subgraphs: true, all subgraphs' states will be present in the response.

* **Streaming with** stream() **and** joinStream()**:** When a run is in progress, you can use the stream() method to receive a stream of events. By carefully examining the streamMode you are using and combining it with the updates stream mode, you can track changes in the state of your subgraphs in real time. Similarly, you can select a streamMode that will send a stream of messages, and by looking at the metadata of each message, determine which message came from which subgraph. This is because the metadata associated with states and messages will contain information on which subgraph it belongs to, inside the parents field. Using joinStream() provides similar functionality to stream() but will wait until the run is complete before sending the final state.

  * Example: Tracking state changes in a subgraph using stream().

```javascript
const stream = client.runs.stream(threadId, assistantId, {
  input: { start: "value" },
  streamMode: ["updates", "messages"],
});

for await (const chunk of stream) {
    if (chunk.event === "updates") {
        const update = chunk.data
        //find the update that corresponds to your subgraph
        //the update will contain a "parents" field in the metadata
        //that indicates which subgraph it belongs to
    }
    if (chunk.event === "messages/complete") {
        const message = chunk.data
        //similarly, the message will contain a "parents" field in the metadata
    }
}
```

* **Why is data extraction important?**  
  * **Monitoring and Debugging:** You can monitor the internal workings of your subgraphs to understand their behavior and identify potential issues.  
  * **Building User Interfaces:** You can use the output of subgraphs to update user interfaces, providing real-time feedback to users.  
  * **Integrating with Other Systems:** You can extract data from subgraphs and pass it to other parts of your application or to external services.

## **4\. Streaming Control: Managing Data Flow from Subgraphs**

The SDK gives you control over how data is streamed from subgraphs during a run.

* streamSubgraphs**:** This option, available in create(), stream(), and wait(), is a boolean flag that determines whether you receive streaming data from subgraphs. By default, it's false, meaning you only get data from the top-level graph. Setting it to true enables streaming from all subgraphs.  
* **Why is streaming control important?**  
  * **Performance:** Streaming data from all subgraphs can be resource-intensive. You can optimize performance by only streaming from the subgraphs you need.  
  * **Focus:** In complex graphs, you might only be interested in the output of specific subgraphs. Streaming control allows you to focus on the relevant data.

**Example: Selectively Streaming from Subgraphs**

```javascript
// Stream only from the top-level graph
const stream1 = client.runs.stream(threadId, assistantId, {
  input: { start: "value" },
  streamSubgraphs: false, // Default behavior
});

// Stream from all subgraphs
const stream2 = client.runs.stream(threadId, assistantId, {
  input: { start: "value" },
  streamSubgraphs: true,
});
```

# Appendix: Key Functions Reference

## **I.** Client

The Client class is your main entry point for interacting with the LangGraph API.

* **Constructor:**

```javascript
new Client(config?: ClientConfig);
```


  * config (optional):  
    * apiUrl (string): The URL of your LangGraph API server (defaults to http://localhost:8123).  
    * apiKey (string): Your API key for authentication.  
    * callerOptions (AsyncCallerParams): Options for the underlying HTTP client (e.g., retries, concurrency).  
    * timeoutMs (number): The default timeout for API calls in milliseconds.  
    * defaultHeaders (Record\<string, string | null | undefined\>): Default headers to include in all API requests.  
* **Properties:**  
  * assistants: An instance of AssistantsClient.  
  * threads: An instance of ThreadsClient.  
  * runs: An instance of RunsClient.  
  * crons: An instance of CronsClient.  
  * store: An instance of StoreClient.

## **II.** AssistantsClient

Manages assistants.

* create(payload: { graphId: string; config?: Config; metadata?: Metadata; assistantId?: string; ifExists?: OnConflictBehavior; name?: string; }): Promise\<Assistant\>  
  * Creates a new assistant.  
      
* update(assistantId: string, payload: { graphId?: string; config?: Config; metadata?: Metadata; name?: string; }): Promise\<Assistant\>  
  * Updates an existing assistant.


* delete(assistantId: string): Promise\<void\>  
  * Deletes an assistant.  
      
* get(assistantId: string): Promise\<Assistant\>  
  * Retrieves an assistant by ID.  
      
* getGraph(assistantId: string, options?: { xray?: boolean | number }): Promise\<AssistantGraph\>  
  * Retrieves the graph associated with an assistant.  
  * options.xray: If true, includes all subgraphs. If a number, includes subgraphs up to that depth.  
      
* getSchemas(assistantId: string): Promise\<GraphSchema\>  
  * Retrieves the input, output, and state schemas for an assistant.  
      
* getSubgraphs(assistantId: string, options?: { namespace?: string; recurse?: boolean }): Promise\<Subgraphs\>  
  * Retrieves the schemas of subgraphs.  
  * options.namespace: The namespace of the subgraph to retrieve.  
  * options.recurse: If true, recursively retrieves all nested subgraphs.  
      
* search(query?: { graphId?: string; metadata?: Metadata; limit?: number; offset?: number }): Promise\<Assistant\[\]\>  
  * Searches for assistants based on a query.  
      
* getVersions(assistantId: string, payload?: { metadata?: Metadata; limit?: number; offset?: number }): Promise\<AssistantVersion\[\]\>  
  * Retrieves a list of versions for an assistant.  
      
* setLatest(assistantId: string, version: number): Promise\<Assistant\>  
  * Sets the latest version of an assistant.  
    

## **III.** ThreadsClient

Manages threads.

* create(payload?: { metadata?: Metadata; threadId?: string; ifExists?: OnConflictBehavior }): Promise\<Thread\>  
  * Creates a new thread.  
      
* get(threadId: string): Promise\<Thread\>  
  * Retrieves a thread by ID.  
      
* update(threadId: string, payload?: { metadata?: Metadata }): Promise\<Thread\>  
  * Updates a thread's metadata.  
      
* delete(threadId: string): Promise\<void\>  
  * Deletes a thread.  
      
* copy(threadId: string): Promise\<Thread\>  
  * Copies an existing thread.  
      
* search(query?: { metadata?: Metadata; limit?: number; offset?: number; status?: ThreadStatus }): Promise\<Thread\[\]\>  
  * Searches for threads based on a query.  
      
* getState(threadId: string, checkpoint?: string | Checkpoint, options?: { subgraphs?: boolean }): Promise\<ThreadState\>  
  * Retrieves the state of a thread.  
  * checkpoint: The ID of a specific checkpoint or a Checkpoint object.  
  * options.subgraphs: If true, includes the states of subgraphs.  
      
* updateState(threadId: string, options: { values: any; checkpoint?: Checkpoint; checkpointId?: string; asNode?: string }): Promise\<Pick\<Config, "configurable"\>\>  
  * Updates the state of a thread.  
  * options.asNode: Update state as if executed in this node.  
      
* patchState(threadIdOrConfig: string | Config, metadata: Metadata): Promise\<void\>  
  * Patches the metadata of a thread.  
      
* getHistory(threadId: string, options?: { limit?: number; before?: Config; checkpoint?: Partial\<Omit\<Checkpoint, "thread\_id"\>\>; metadata?: Metadata }): Promise\<ThreadState\[\]\>  
  * Retrieves the history of a thread.  
    

## **IV.** RunsClient

Manages runs.

* create(threadId: string, assistantId: string, payload?: RunsCreatePayload): Promise\<Run\>  
  * Creates a new run.  
      
* createBatch(payloads: (RunsCreatePayload & { assistantId: string })\[\]): Promise\<Run\[\]\>  
  * Creates a batch of runs.  
      
* stream(threadId: string | null, assistantId: string, payload?: RunsStreamPayload): AsyncGenerator\<{ event: StreamEvent; data: any }\>  
  * stream(threadId: null, assistantId: string, payload?: Omit\<RunsStreamPayload, "multitaskStrategy" | "onCompletion"\>): AsyncGenerator\<{ event: StreamEvent; data: any }\>  
  * Creates a run and returns a stream of events.  
  * Using threadId: null creates a run without a thread.  
      
* wait(threadId: string | null, assistantId: string, payload?: RunsWaitPayload): Promise\<DefaultValues\>  
  * wait(threadId: null, assistantId: string, payload?: Omit\<RunsWaitPayload, "multitaskStrategy" | "onCompletion"\>): Promise\<DefaultValues\>  
  * Creates a run and waits for it to complete.  
  * Using threadId: null creates a run without a thread.

* get(threadId: string, runId: string): Promise\<Run\>  
  * Retrieves a run by ID.  
      
* list(threadId: string, options?: { limit?: number; offset?: number; status?: RunStatus }): Promise\<Run\[\]\>  
  * Lists runs for a thread.  
      
* cancel(threadId: string, runId: string, wait: boolean \= false, action: CancelAction \= "interrupt"): Promise\<void\>  
  * Cancels a run.  
  * wait: If true, blocks until the cancellation is complete.  
  * action: The cancellation action to perform ("interrupt" or "rollback").  
      
* join(threadId: string, runId: string, options?: { signal?: AbortSignal }): Promise\<void\>  
  * Blocks until a run is complete.  
      
* joinStream(threadId: string, runId: string, options?: { signal?: AbortSignal } | AbortSignal): AsyncGenerator\<{ event: StreamEvent; data: any }\>  
  * Streams output from a run until it's complete.  
      
* delete(threadId: string, runId: string): Promise\<void\>  
  * Deletes a run.  
    

## **V.** CronsClient

Manages cron jobs.

* createForThread(threadId: string, assistantId: string, payload?: CronsCreatePayload): Promise\<CronCreateForThreadResponse\>  
  * Creates a cron job associated with a thread.  
      
* create(assistantId: string, payload?: CronsCreatePayload): Promise\<CronCreateResponse\>  
  * Creates a cron job (not associated with a thread).  
      
* delete(cronId: string): Promise\<void\>  
  * Deletes a cron job.  
      
* search(query?: { assistantId?: string; threadId?: string; limit?: number; offset?: number }): Promise\<Cron\[\]\>  
  * Searches for cron jobs based on a query.  
    

## **VI.** StoreClient

Manages the KV store.

* putItem(namespace: string\[\], key: string, value: Record\<string, any\>): Promise\<void\>  
  * Stores or updates an item.  
      
* getItem(namespace: string\[\], key: string): Promise\<Item | null\>  
  * Retrieves an item.  
      
* deleteItem(namespace: string\[\], key: string): Promise\<void\>  
  * Deletes an item.  
      
* searchItems(namespacePrefix: string\[\], options?: { filter?: Record\<string, any\>; limit?: number; offset?: number; query?: string }): Promise\<SearchItemsResponse\>  
  * Searches for items within a namespace prefix.  
      
* listNamespaces(options?: { prefix?: string\[\]; suffix?: string\[\]; maxDepth?: number; limit?: number; offset?: number }): Promise\<ListNamespaceResponse\>  
  * Lists namespaces.  
    

## **VII. Helper Functions**

* getApiKey(apiKey?: string): string | undefined  
  * Retrieves the API key from the environment variables or the provided argument.  
    

## **VIII. Key Types and Interfaces**

* StreamMode**:** "values", "messages", "messages-tuple", "updates", "events", "debug", "custom".  
* MultitaskStrategy**:** "reject", "interrupt", "rollback", "enqueue".  
* OnConflictBehavior**:** "raise", "do\_nothing".  
* OnCompletionBehavior**:** "complete", "continue".  
* DisconnectMode**:** "cancel", "continue".  
* StreamEvent**:** "events", "metadata", "debug", "updates", "values", "messages/partial", "messages/metadata", "messages/complete", (string & {})  
* Command**:** { update?: Record\<string, unknown\> | \[string, unknown\]\[\]; resume?: unknown; goto?: Send | Send\[\] | string | string\[\]; }  
* Send**:** { node: string; input: Record\<string, unknown\> | null; }  
* RunsCreatePayload**:** See documentation for detailed properties.  
* RunsStreamPayload**:** See documentation for detailed properties.  
* RunsWaitPayload**:** See documentation for detailed properties.  
* CronsCreatePayload**:** See documentation for detailed properties.  
* Config**:** See documentation for detailed properties.  
* GraphSchema**:** See documentation for detailed properties.  
* Subgraphs**:** Record\<string, GraphSchema\>  
* Metadata**:** See documentation for detailed properties.  
* AssistantBase**:** See documentation for detailed properties.  
* Assistant**:** See documentation for detailed properties.  
* AssistantGraph**:** See documentation for detailed properties.  
* Thread**:** See documentation for detailed properties.  
* Cron**:** See documentation for detailed properties.  
* ThreadState**:** See documentation for detailed properties.  
* ThreadTask**:** See documentation for detailed properties.  
* Run**:** See documentation for detailed properties.  
* Checkpoint**:** See documentation for detailed properties.  
* ListNamespaceResponse**:** See documentation for detailed properties.  
* Item**:** See documentation for detailed properties.  
* SearchItemsResponse**:** See documentation for detailed properties.  
* CronCreateResponse**:** See documentation for detailed properties.  
* CronCreateForThreadResponse**:** See documentation for detailed properties.  
* ThreadStatus**:** "idle", "busy", "interrupted", "error".  
* RunStatus**:** "pending", "running", "error", "success", "timeout", "interrupted".  
* CancelAction**:** "interrupt", "rollback".  
* Interrupt**:** See documentation for detailed properties.  
* ClientConfig**:** See documentation for detailed properties.  
* AsyncCallerParams**:** See documentation for detailed properties.  
* DefaultValues**:** Record\<string, unknown\>\[\] | Record\<string, unknown\>

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,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>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABXIAAAIUCAYAAAC3uNRRAACAAElEQVR4Xuzd2bMcZ3rn9/kbfOUrXznmam5mIiYcmghP2FZYYY9C0Z4ZRUvukTRSS+5pd0vdYi/sbqopNpv7Du4kSIIkAIIgQCwkdoDYN2InNmIHse/rAc7BRjKNX9Jv8cmn3szKOqfOqarM7yfiCYKVS2VlZlWe91dvvfkvEgAAAAAAAABAT/sX/gEAAAAAAAAAQG8hyAUAAAAAAACAHkeQCwAAAAAAAAA9jiAXAAAAAAAAAHocQS4AIPXV118nGzd/lsxftCwZHBzykwEAAAAAQBcR5AI1dPnK1WTz1h3J+9M/SmZ+vDDZtXtfMjR0w8/WUecvXEz+4H/9vxp1+fJVP0tl3b59Oxm6cSPd76O9n0di0pQZjePz/R/+wk8GAAAAAABdRJAL1MiSZauT73z3bzOBqq2//sHPkn37D/nFOuLM2XOZ57pw8bKfpbJ+fM9vM6/90OGjfpaeoPDWbqfCdwAAAAAA0BsIcoEa+PLLL5OXx09sCm7zasHi5X4VI9brQa56Jf+H//hfG6V91gmnz2Rft+r1t97zs/WE9z6Y1djGTvbIvXPny8y+3b1nv5+lZ/zT755sbOe0mXP9ZAAAAAAAuoYgF6iBcS+91RQm3v/Q08nbk6anoeLPfvX7pukaK7WTej3I3bJtR2b7FD52wqT3ZzbtW4WEX331lZ+1677++ut0PyxdsTYdCqJTNLSEff1bP9vlZ+kZP/zJfY3tnDDxAz8ZAAAAAICuIcgFKu7ipcuZEE09LU+dPutnS7Zt35UGjGG+3z36nJ9lROoa5P7ZX/4os95QvRxmdhpBLgAAAAAAI0eQC1ScetbaEE2BbZ6P5i7OzHt9cNDP0jAwcC29YdrcBUvToRgUhBbN306Qe/vOnWTHrj3JkqWrk4/nLUnWb9ianDt/wc+W69q163e3Z2eycPGKtA4c+iI3mL1ydSA5euzE3dfxSWb7NI6tHlcNd5iFvfsPZdb5zPPjG/9+7OmX/ey5bty8mezZeyDd18tXrU+OHC2/Tdrva9dvTubM/yT5bMfu9PXmuXZ9sPGai8bH1XN/ceR4Ouay9q9eZ6wHr7Zb69L+t/tBryM8T945ox7LJ0+dSdZt2JKelwp/dbO4IsdPnGqsNxxvbavGfdbr1344dvyUW+qbnsh6XMv95d/+Y2M7nxr3emN9RecrAAAAAABjgSAXqDiFbTZEKwroFLwplA0VC+cUssaGagj12puTk6++/tovVjrIVWhnewbb0vilVweu+UUa1PPThqW+fn3/403LP/vCG03z+RruDeBeeu2dxjoefuKFdGxYu17t7yLaVm2z355Qk6bMyB2iYfnKdckf/vH/3bSMSje1UzjpTf3w48Y8f/+z+/3kNBQdP2FK0/pCPfDws2mIHmgb/Dy+ps+aZ57hm1BVQW/etv/n7/23ZNfn+zLLiLbNzqdwWa8ntp5f3vdI5n2gc9HP40vHAQAAAACAbiLIBSpOvTdtIPXG21P8LKUpZFMg6UMuXy+//q5ftFSQqwDPr8vXf/uHXyc3b97yi6aBpsb99fP7UhCo3qTBaAW5ChZtiKiepdp/3/nu3zYeW7ZirV+sQcfNzptXP/3FA01hbtkb223YtC2zXFGQOzR0I33Mr8OXtvnM2fPpMsMJcn/zwBNN88Rq1ZoNmeV8kPv8yxOalrH1vb/+h0avZoJcAAAAAEA/IMgFKk7hoe+V+NsHn0o2bdle+uf5wZvvTM2sRzdJUxD3wYdz0kDRTvtw1vzMsq2CXD8EhH7irjFKNbTCg4+Oy0xTz1wfXj77YjaQVVCnG7mp1+rf/fjepnUHGmpC2//4M69k5nnvg1np46qi4QjyKCQN69L+V29hecWErOoZmufJZ1/NbI/2s3r0Kvz1+0NDTwRnz13ITNMx0rZoqIopH8zOhMMaL9kqCnI1zIVd7wuvTEg+2/F5ety0n+20V9+YlC5z4uTpdP9NnjorM12vLexbDbsQaDgMO5/Gq5149/ipl7bOWTtNr8PyQW4oBcNTpn2U9hT37wOtV27dut3YHtsbXPsgPK5hGQAAAAAA6CaCXKAG5i9a1hRwqRRsKUxUWKYxWIsoCLTLqten58NH+/P1oiBXQwzYkE0BnsI1a/HSVZnll5rerD4EVu9JBdjWwiUrM/Pop/dWp292ZsPWR558sfG49rN9nsuXm8d99b15FaJ6Nti0N6ab8dGCxuPqfez3gx+3Vz1/g6IgV+F5mKbj7NnnVRhqn7fszc40NEOYRwG0/6JBx9yuR2PoBrEgV72gLZ2Pdr/q+TxudgYAAAAA6FUEuUBNlBm24M/+8kdpD1Y7zmlgx8VVD9fYOLgKP22PT4V7QVGQu2L1+sy0vB6wDz3+fGMeBYuB7U2rEDG2/QoWFfBqukq9RK1OBrmDg0OZddlA0Q+vYPdRoGEM7PIKocuyY9jqeIaewGUUBbm2V3M7N2qTskGuzin1tFb5AFq0HhvE2jDfB7kaMiPGDjuhsYI9glwAAAAAQK8iyAVqRGHqpPdnpgGfDb18KeC6fCXbU1TDEYTp6pE5MHAtWnaIBRv4FQW5+pl+eFy9SP06Q6nncJjP/rRewyjEnrMdnQxybe9fO6xCoKEHwnQ/vEGgY2C3R2O+qle0X5enIQDsclrP3AWfpEMutFIU5GrcY7teheJr1m2KhuZe2SA3jwLe64ODTcNGqKd54INc9eCOsV9oKND3CHIBAAAAAL2KIBeoqYOHjiRz5n+SPPrUS01jh6oUjtpxaGPztKqf/+ahxvJFQW6Zm5TFKvTatNs2bebcxnrb0ckg9x/vfbCxHv1br9WWAlD7XEePfTu8QbB8VbaXsq0f3/PbdAxiP86waJgK3RDOL6NS+K3eyxqL1o8xLEVBrrYx7xxQyK9xcg9/cTSzTNBOkKtAVj1tnxr3enoO5j2nqijIzRsqZNXaDY15CHIBAAAAAP2EIBdAGuqtXrcx85N/lcJeUWDqQ7QypVAsKApybfDZTikg9Ntmf27fjk4FuRqH1W9nq3rr3XhgqGNiexvHSgGqH4ZAvVcV0Pt5bannsw+Qi4Jc+eLI8ZbHSmPbamgIq2yQqyE1Wq3fVlGQ68dADghyAQAAAAD9iiAXQIOCWxuGzZ6zqDHN9ozUDdI0rm2sFixenvYm1b+379zTWL4oyLU3uVL5dYZatmJtsnDxivTfq9ZsaASYCuTCsu++92Fjve3oVJBrw9CypQDdh7HWvv2HkrcnTc8NOd+ZPN0vklKgqyEG1As3NpyGjqkdQqNVkBucOXs+7RGsG67ZfZ+3bNkg1/ck1nmmkFvnoQL6DZu2ZaYT5AIAAAAA6oQgF6i4KdM+SsdXVSkIa8UGtranqB2zVeOltqsoyLXjr8ZuQNWK3TaFwkXCDbV8cNqpINeOJaxSz9hY+WBV49+Wod6uH81dnAlQta4yFAj70Fyhe1A2yLW0LzUur8b6teu9eOnb41smyL10+UpmHvslQqBjZl83QS4AAAAAoE4IcoGKu/e3jzaCKQV+CjLz+B65ujFU8PL4iZn1aCzWGP1cX6Goyt5gqyjI9TfoOnb8VGOapXAwrDsM+yCvvTk5s/zxE83LK+izYePkqbMy032Qe/LUmcz0Mvz+27j5Mz9LhoY3CPM+8/z4xuMaYkChq+rI0ebxc2XGRwsyz3Xz5q30cW1DWPba9UG3VJIG1DYMffOdqY1peUGugtiwTlVsfF2Nj2u3Z/PWHY1pPshVr2rPBqyq2LYfOPRFZp7RDnIVuAMAAAAA0CsIcoGK84Hfg4+OS3s/egoA/XisJ06ebkxXgGen/fr+x9PwzNINpmyPXtursijIvXXrdmY5BZx+GzW/7XmrG6QFPuBTr1gNKxCoJ+fbk6Zl5rGvTfbsO5iZrlCzXa++MamxvF5Pq169b7w9JTO/Ak/R0BF2W9Zt2OKWTNIe1nbZwB5DhZK379wxSyXJufMXMutW794gL8i9cOFSZhm9Ts9vs8bTDfw4xrFzxwfB9ksE0XAO/vwcjSBXwznY6YODQ34WAAAAAAC6giAXqDiFpLbnp0rBn25K9cKrb6eB4I/v+W1muirWG3HWxwsz8yjoUjA8fsKUTM/fMM322i0KckUhsN+Gn//moeTNd95PHn7ihaZpCpatj+ctaZpHoZyW9eO4ar3ewMC1puXV81jjwCpEbEW9VO3zPPnsq36WJgcOZgNohYzie82qtJ8VjM+8ewy0/XaaeksHCmbtNIXfOj7qBavetzYwV9njkBfkih+SQdvw3gez0sD1qedey0xTz2c/dIUN4VXajn/63ZON4T78sAmqn/7igXR4D4X2frtVoxHk2mE+Quk80hAlAAAAAAB0E0EuUAOXL19Ng1sfUOWVgr/Yz+dFYaCf35dCNw2xYLUKcsXfzCqvlq9c5xdN+V63sVJorf0R89jTLzfNr/KhcYwfmmHTlu1+ligbsivYDDTcRCy89KXA3QbmQzdupD1e/Xy+FGLa4Q+kKMjVcBe+R2ysFOLGhqVYuGRl07yq6bPmNebRDc38dFsKj+0YxKMR5Op1+udVaZ8CAAAAANBNBLlATSiYnTRlRvKd7/5tU0gVSiGZvflVjHpOqmeuv1mXSsHj62+9l1wduOYXa/pJf16YqgBUIaJft0q9Qn1A7KlHamzbFEJqLN2i4Q4Ugk68u498D2YN3dDKuJfeasyv/eCHDsjjg3H1oA60z9QjOBboKjBdvHSVWVOWesrGgtfQi9rejCxQqBrm+8d7H/ST03F41fs3dg5pn2uoCD+Ug6UQ1fcm/nDW/Mw827bvarpxmko9s3V87DQ71q4PctXbOcaOx6zXEaMQ+PFnXsms7zcPPOFnAwAAAABgTBHkAjV07dr1ZMeuPWmPRoVhCirD+KxlKdDV2KkaEkE9VmPB4EhoqANt1+49+5PTZ86VDkalsW37DqbrUADYLgXfGh/VBqvdpOBbr0dBdjv7QsG1xqtVOBkL2IdraOhGGpZq/+bd+C6Ptkn7VuvIo3UeOnw0vXFdO6+3k3QOaBs13rIfKgIAAAAAgLFGkAsAAAAAAAAAPY4gFwAAAAAAAAB6HEEuAAAAAAAAAPQ4glwAAAAAAAAA6HEEuQAAAAAAAADQ4whyAQAAAAAAAKDHEeQCAAAAAAAAQI8jyAUAAAAAAACAHkeQCwAAAAAAAAA9jiAXAAAAAAAAAHocQS4AAAAAAAAA9DiCXAAAAAAAAADocQS5AAAAAAAAANDjCHIBJOeufJXsOnInWbXzVjJ3w81k+uobyfvLbyRTKIqiKIqiKIqiqDEptcHUFlObTG0ztdHUVgOAgCAXqKmBoa+TbYfuJLPX3Wz6A4KiKIqiKIqiKIrqjVKbTW03teEA1BtBLlAzN259nWzad7vpjwOKoiiKoiiKoiiqt0ttObXpANQTQS5QIwdPfZn+VMf/MUBRFEVRFEVRFEX1R6lNp7YdgPohyAVqoqgX7tQVg8m8dReSFZtPJhs+O5Js3Xkw2b77QLJj936KoiiKoiiKoihqDEptMLXF1CZT20xtNLXVfPstlNp4AOqFIBeoAQ2U7y/6qhmrrqZ/IBDaUhRFURRFURRF9V6praY2m9puvj2nUlsPQH0Q5AIVFwtx31s2lCzdeDrzB8LhIyeS8xcuJ4ODN5I7d/iZDgAAAACMNbXF1CZT20xtNNtmUxtObTnfviPMBeqDIBeosNhwCvomVz/VCX8MnDh1Nrl5kws/AAAAAPQatdXUZgvtN7XlYr1zGWYBqAeCXKCiNPi9v7jPXn05HXNJfwAcOHQs/aYXAAAAANDb1HZTG05tObXp1Lbz7T1ugAZUH0EuUEE3bn2d3snU98QNIe7R46f9IgAAAACAHqe2XAhzfc9ctQHVFgRQXQS5QAX5IRU0jlIYToEQFwAAAAD6Vwhz1cbzY+YyxAJQbQS5QMUMDH3dFOIu3XiqMZwCAAAAAKC/hWEW1NbzYa7ahACqiSAXqJhth+5kQlz93CYMjM+YuAAAAADQ/9S2C+08tflsmKs2IYBqIsgFKmb2upuZIHfF5pPpxV13OgUAAAAAVIPaeGrrqc1ng1y1CQFUE0EuUCHnrnyVCXHfXz6YbN99IL2437x5y88OAAAAAOhTauOprac2n9p+NsxV2xBA9RDkAhWy60h2WIW5686nF/bDR074WQEAAAAAfU5tPbX51PazQa7ahgCqhyAXqJBVO29Fh1U4f+GynxUAAAAA0OfU1osNr6C2IYDqIcgFKmTuhm/Gx9UFfPLSweTTz45wkzMAAAAAqKhw0zO1/dQGDGGu2oYAqocgF6iQ6au/7Y2ri/jWnQfTi/qdO1/6WQEAAAAAfU5tPbX51PazQa7ahgCqhyAXqJD3zbAKuoiHG50BAAAAAKop3PDMBrlqGwKoHoJcoELs+Li6iOuCTpALAAAAANUV2n02yFUBqB6CXKBCCHIBAAAAoF4IcoH6IMgFKoQgFwAAAADqhSAXqA+CXKBCCHIBAAAAoF4IcoH6IMgFKoQgFwAAAADqhSAXqA+CXKBCCHIBAAAAoF4IcoH6IMgFKoQgFwAAAADqhSAXqA+CXKBCCHIBAAAAoF4IcoH6IMgFKoQgFwAAAADqhSAXqA+CXKBCCHIBAAAAoF4IcoH6IMgFKoQgFwAAAADqhSAXqA+CXKBCCHIBAAAAoF4IcoH6IMgFKoQgFwAAAADqhSAXqA+CXKBCqhLkHjtxOtm0dVeyfPXGtPRvPdbKqTPn0wIAAACAuiDIBeqDIBeokH4Pcg8cOppMn70oeWvSzGhpmuaJmb94VWM+/ZtAFwAAAEAdEOQC9UGQC1RIPwe56zdubwpu80rzejbIDbV1++d+NgAAAACoFIJcoD4IcoEK6dcgV0Mn+BD2g5kLkyXL16elf/vpWsZSD1w/j0oBLwAAAABUFUEuUB8EuUCF9GOQ6wPYSVPnJAcPH/OzpY9pmp03NnyCX5+KnrnA2Dh95lxy69Zt/zAAAABGEUEuUB8EuUCF9GOQqx63NnQ9e/6in6VB0+y8WjYmFuZ2y/ETp5Mt23Ymy1auS5auWJds3rrj7mOn/GyjZsmyNck99z6U1ozZC/1koCO+/vrr5PFnXkv+/mcPJD/5xYPJnr0H/SwAAAAYJQS5QH0Q5AIV0m9Brnru2bB12/Y9fpYmmscuk9f7T71wuxnkLl2+NvnlfY+lwVasNG3ZyngQ3Umz5yxuPOc7k2f4yUBH7N13KHN+j3v5bT8LAAAARglBLlAfBLlAhfRbkOt7zl65es3P0kTz2GViwyuIX3fefJ12+86dZPyE95uC27x6/a0puWF0J/RbkDt/0fJk8tTZaZ04edpPRo86c/Z85ryeOKXzX56oZ3s4N/TvftGv2w0AAPoHQS5QHwS5QIX0W5D7xdETw+o1a5fROvKMdZA7NHQjeeDhcU1hrR574+2pacWm3//Qs8nNmzf96jqi34Lc3/zzk43t3bh5u5+MHqZhPH774DPJK+MnJxcvXfaTR0znbz+dy0G/bjcAAOgfBLlAfRDkAhXSb0HusROnM2HrzZu3/CxNNI9dRuvIM9ZB7sfzPskEtE88+3py+cpVP1ty8eLl5LGnX83MO/Oj0Rm/liAXVdGvgWi/bjcAAOgfBLlAfRDkAhXSb0HuwMD1TNh68PAxP0sTzWOX0Tpi/NAKY+FX9z/RCGwefeqV9AZQeTTtkSdfbsz/89884mfpCIJcVEW/BqL9ut0AAFSV2gm6n0aVEOQC9UGQC1RIvwW5Mmvu0kbYqn+3Unb++YtXjWmQ++WXXzbCGlWZG5lt37kns8zg4JCfJePQ4aPJmvWb056/i5euTrZ+tisZuBYPsoN2g9zhPIenfbFn78Fk5ZoNyUdzl6TrO3HqTPLVV1/5WVNXB64lh784lpYC7bC9s+5ue3j8SMEQGmVcuTqQ7Pp8f7Lok1XJgsUrkt179ifXWrwuHY/w/OcvXGw8rl7hWtec+UuTFas/TfYfOJzcuNG5oTHu3LmTHD9xKlm/YWu6/9Z+uqVw/8VorGZt97KV65K5C5Yl27bvTl9D0ZcLll67jqH2lfaZ/j0wUDyG9anTZxv7q2jcZ22D5l1393Xp9X26cVs6HrLOG0/rCet87qUJjXND/w6Pq/J68+u5zp67kGzZtiuZs2Bpuj8O3j3Hb92Kzx+o13xY97Xrg43Hr949jzZt2Z5ut7Zf5+VobDcAABgdto2gf1cFQS5QHwS5QIX0Y5C7Z9/hTOC6ZMX6aLihxzTNzqtlY/QNu51vLL5xV3BjQ1mFU60oZDp95lxaullUHoVwGnvUrt/WhInTk8GhIb9YqmyQO5LnCPR65i9akQljfb325ntNx9duY1Ep4GyXAlGNQezXFUq9qL84ctwvllJIG+Z7/pV30vDv6XFvNK1D9ZNfPJgGryOhQFDhtV+3rYnvzSwMdLVvi26298v7Hkv2HYi/b0Rh7+8fe6FpuVDqaa6QM8b2ps57joWLVzat05aCVkvr8fPEatfn+zLLyaYtO5J77n2oad5QGt4k70sKjfMb5tMXGnqP2tdnS+8bfw6NZLsBAMDo8B09qhTmEuQC9UGQC1RIPwa5suCTNZk/qCZNnZN8unlHOoyCSv/WY3YeLeP5ADfUWHnw0ecbAY0Cv1hPvXbNX7S8KfyJ1X2/ezq5dPmKX7xUkDvS5xAFiLbnYVEp+LI9XEcryF26Yl3TOvJKvaM9G+TqtZV5fQr9hkO9kosCZ1vPvvhWtEepep4WhfG25i1c5hdPdu7amwbSfl5fmkc9kr2iIFfnx0uvT2xaV6y0n0NYPZxAVF8o6AsDP0+sFOSfO//tuRjYIHf6zPlpAO6X9XX02MnG8sPZbgAAMHpiIW6oKoS5BLlAfRDkAhXSr0Hu4NCNzJAJrUrzahkr74+zsbjJWfD+tI8zIc1Tz43PBJbt0rAGdn0K0BSGLV2+Npk2c17ywMPjMtPVw9D/dL5VkNuJ5xA7DmhYj8KwVWs2poGoerTa6QrGQlinXrOaR2WDxDfentp4XMM0xJ43j3pa2udTz8w33/kgHfJCPWenzZjXFFr64QBskOtfl3qOapu0Tj89r5dnkakfzsmsR/t5xuyFyYZNn6XPZcdTVs38eJFfRVNPWr1GBa679xxI51cQb6drmIBA22z3h/6tUHr/wS+SLdt2JpOnzs70blVg7BUFuQpD7XO/+Oq76XoPHDqSDt2gGwPa6Zom2q5wDjz0+IuN6fp3eFxlX4sfskSvW9uvISpWr92UvP7WlMx09TL2bJAbSueszvO16zcnS5atSR5/5rXMdB2jYDjbDQAARodvJ+j/Y4/1M4JcoD4IcoEK6dcgVxSiLV+9sSmI9aV5fOAmfr6xGE7B08+vYz/lVsCmn5RrTMyyvXTVg9EOUaB/X75y1c/WFB77IR2KgtxOPYfCODtdPUtjx2jNuk2Z+UJYZ3XqZmczZi9orEehZGzoCvVgteGlxoG1fJCreW2vy8CH4WXGR7Y0Hq3dDoWOMTYs9+GjXovdhti+VbjoxyAOFErb5WPnge9lunf/ocz0oiDXPm/s9Smk1xcfYR4F2V7Zm4bZ4FS95GPnogJy+1r8PD7IVXDtx7DWNk9x7w2N/euV3W4AANB5RYFt0bR+Q5AL1AdBLlAh/RzkBqfOnEtWr9+STJ+9KHl78qy09G89pml51PNWf3x1I8C1FOTEwlxb6smnnoE3b+bfIEs3VArzK+Q7fuK0nyWlMMn+5F9DOlhFQW6nnmPCxGmZ9Vy4eCkz3bLr0X7wOhXkqiepbrKmUo/fPG9Pmt54vlmul6sPcj/b8XlmumV7Zyr4bofOg7Ct6i2cNwauwlW7PbqhWaAQ2k7L+8JAXzaE59IXC8HMjxY2lrU9Sz2Ft2F5P1ZuXpCr12O3TT2EY3TzOb1+rVtjNntlA1GNjRu2UUNW5NGwCmF9e/dlQ2kf5Ob1nNVN7mwIHztHym43AADorDJBbZl5+gFBLlAfBLlAhVQhyK2Cs2fPJ6+Mn5QJgvJKP82PBbp2ef27iP8puR0/tSjI7cRzKOS1QZZudlZEYZ16sKp8r03pVJBblr35lsI7ywe5RWP0auiCMN+4l9/2kzvGbo9C2UBjF9tpC5esNEu1pgDVLq8gvF15Qa7Y0PTF194t3Jd5Oh2IaqzhsD4da8sGub73s6fpYV4NE+F1ersBAEBr7QS07czbqwhygfogyAUqhCC3t6gH5crVG9LgqqiXroZeGBwayixrxzN99Y330l6leeVDVgXJQVGQ24nnUI9H+3heb8uyRjPIVWB+8dLltOexgkr1nrRjABcFuZqviB2aQOO9jpR6sQ7c3bcaEkI9Z3fv2Z/2NLX72ga54m/IpWEFNJareom3Gl9Yvajtsir1nlbAGxtmIaYoyPVjCWtbNQbwwcNHc3sPe8MNRPXar18fTMer1tAY6n27ZVt2OIyiIFfjFxexN1abM3+pnzzs7QYAAMMznGB2OMv0EoJcoD4IcoEKIcjtbQoRFfg988KbmRBJpTDX8jfiaqdsb8qiILcTz3Hs+KnM4wofR6LTQa7CT900zY7RmldFQa5u1lbE9mgdbpB76dKVdHgH28OzqHyQq8A375jqiwQFjrs+35c7dIPG9vXLhVKPWo0HWzRMRVGQq/F5Nc6sX28ojY+rm4hp3OY87QSiGvNWN2tT7+i8fWKrKMjVeopMmPjt8BwEuQAAdNdIAtmRLNttBLlAfRDkAhXSj0GuxrYN49uWLY2Dq9JyrWiebo+bG6PQzf7cXGV7PvqgqZ1SWBcUBbl+uXYqPMeBg19kHm/V87OVTgW5CgT9OKetqptBrvZnmcDRlg9yRb2N1bvaz2tLoXbe0Akam9aO9xsrfelwJTJmbFGQKxpWQ+MHF/VOV6kXcUzZQPTc+YvpDff8eouKIBcAgP7XiSC2E+voBoJcoD4IcoEK6acgN4S39g+l4ZTWkRfoKsC18/VaoKvejTZMssGlDbsUKikoLCoFUeHf6v0YFAW5nXgOhYn2NdhhHYajU0GuHf9UpdBcN2Wbu2BZ+jp0ozcNV2B/Ft+tIFehvt1WlYY1mDZzXhpqrv10SzoMhMJXO08syA2Ghm6ky+k1+y8MQu2PhK2BhlpQgPniq/FhQbROfwOwVkFuoKEUNFSHQl0N/+DXrdLYxV6ZQFRj7/pA/KHHX0wmT52djhusmwxu2bYzHV7BDkVBkAsAQH+zf/eHv/2Hy7dR8toavYQgF6gPglygQvolyPV/aHWiYiGt/yMsb75OUICpXpWqooDNs+HXzI8WNh63P0P/eN4nZon2FAW5nXgOBYZhHarNW3f6WdrSiSBXN2Kz26RwLa+nsN0/3QpyddzDsgoXNQRHjAJQ+7raOc/OnruQTJsxL7P8S69P9LNFad9pLFvtA7v80hXrMvOVDXK9a9cH03XZwFj/9sesTCC6Z+/BzDYWjdn82NOvNuYjyAUAoL8pbA1/748kxA1sO2K02g+dRJAL1AdBLlAh/RDk5oW4fviEVuWXj/2RVfRcnabxQ0NYo4C0DB84Ll2+tjFt/IT3G4+rd+ZwFQW5nXoO2+NTPR+L6IZT6m25YPGKaFBrw8BPN27zk0uxN2bTMAJFHnny5ca83Qpyba9UjaGcR6FkmE/VTpAb6PiE5RWWtkPBqg3/fRA83CA3UE9Z+/p0kzbLBqJvT5qemRbYsFq9rfNo6A37XGMV5OZtNwAAGLmyQ6+V1en1jSaCXKA+CHKBCumHINeHqj58bUcsqI39sVV2vpHQT/VtMKQwsZU16zdnltFP/QP9lN5O27x1h1kyS0M0KDxU6UZq9mZWRUFup55jxuxve5Sq7Bi9lnqUPvDwuMZ8PgiU+373dGO6fgo/HLrBWVhHUZB78tSZzHZ3K8i1r3nVmo1+ckohqh/71ga5Chu1P1W+p6xlt1NDEAQKI7XsK+Mnpb1a89jQ0of/eUGuzuuwbQqS8262pqEa7Os7cvREZvrEKTNznzuw87z+1hQ/ucEeW9VoBrllttv64sjxtJdyHr2PNDa1/punzDwAAKA6CHKB+iDIBSqk14NcH6iOJMQN7M+oVEW9bcvONxzq4efHEtVwBbEgRUGWDVhV6tVqAy6N9enHNt25e1/Tz80PHDqSGetTY8NaRUFup57j4sXLmXFJ9W+FUZZ6H9veoCqNDes9Pe6NxnTdsMreAK4shWD2eRTE+dek8Wb9WKrdCnLtflEY6see1Tlkx/INZYPcT5avzUxT71ZPNyizvX81dmygsXDD49ovumGYp+Nl99mM2Qsy0/OC3BMnT2e2LdZrW+eixvO18+k9Zc1buCwz3Qe9smXbrsw8Onc9jTts51GNZpBbZrtF+8DepG3Nuk1+lvRmduFzRv/VFyxemXkAAEC1EOQC9UGQC1RIrwe5nQ5xAx8Q5yk733D5n4aHIOWp58an4ZVuXqXerOol6ueLjS3rb24V1jfu5beTN9/5IPn9Yy80TT967GRmHUVBrnTiOUS9QP18Cn+1DjsWaajHn3nNryKlG2D5eTX8gXpz5vXkjPE30dJreuPtqXf3wYeZ4QFsdSvI3blrb9O2KGR9f/qc9HzxgXMoG+TeuHGzaT7tg6kfzkkWfbIqPfZ+uu01rpt/+fXrdXw0d0kaRNpgU6V1KRi28oJcefSpVzLLf3PzuelpSKrXaZdVabs934Ncpd7MOjZhGAbtBz+P1q33n3o02y8kbI1mkFtmu0VDifjt9jQ0g51H57NXZh4AAFAtBLlAfRDkAhXST0FuJ4c28L1y89Zddr6RUE/UvLAor5atXO9X06CA18+fVwrjvFZBroz0OYL5i1Y0zR8r9f70vS0DhYM+cAylHotlKeRsdRw0zMOcBUsb/9+tIFe9hdW71W+fLwV9dt/4MXIVCPte4bHSOtRz1Zu/aHnTvLFSCKlhKbyiIPfM2fNN4Xpezbp7zsZCe+2n2BcLKjuch++VGyuFm/bmbaMZ5Jbdbh/4qneu57/o0P97ZeYBAADVQpAL1AdBLlAhvRzk+hC108oGtGXnG4nBwaGmHoyx0niZ/oZOMZpHPVv98iqFcurReHXgml8spWApzBv7SXswkuew1MNXvXn9OlQK8nSjMz/MgXf27Pn0plU+lGwnyJWBa9fT0DgWDE+fNT/tvWl7EvsxVTVebZgWG8/X0o3bwrwaHmI4NGZyrLew9tve/d8E6HafxIY/uHb3NavncazXt4JtvQ4NhZEnjIUc22cKcHVTPw2TEWO3PTakQRhSxPe+Ven59LxFXxTI9euDaQ9jO66watfn2c85faFib2QXSvtFx1XnoPZFeNyPTaxzIUwrGnNY7M3MFIbHlNlu7Z/w3tFxjo2zrZsFhuEX9F/9v1dmHgAAUC0EuUB9EOQCFUKQ2zqgLTtfJ6jXqcKYZSvXpePlKlTVv9XzTiFiu27fuZP2bNRNjBSU+bFUO6FTz3Hz5s10bFT1zDxx6ky0h2UrWkbhsQLZvB68ZZ09dyHZf3db1Is1Nm5xL9Fr1Xi0B+/ufwWzwzU0dCM5ePhouq7BoSE/uSWNT6xt0JiuOi86SaH8seOn0vPs0uUrfnIpGgt54O75oS9O8ugc0lAgeh0XL11u+SXCWGi13TpWrc7RMudFmXkAAEA1EOQC9UGQC1QIQW7rgLbsfAAAAADQDwhygfogyAUqhCC3dUBbdj4AAAAA6AcEuUB9EOQCFdIvQe78xav85BHTOsuExGXnAwAAAIB+QJAL1AdBLlAhvRzkytbtn6c1Wj1hy6677HwAAAAA0OsIcoH6IMgFKqTXg1wAAAAAQGcR5AL1QZALVAhBLgAAAADUC0EuUB8EuUCFEOQCAAAAQL0Q5AL1QZALVAhBLgAAAADUC0EuUB8EuUCFEOQCAAAAQL0Q5AL1QZALVAhBLgAAAADUC0EuUB8EuUCFEOQCAAAAQL0Q5AL1QZALVAhBLgAAAADUC0EuUB8EuUCFEOQCAAAAQL0Q5AL1QZALVAhBLgAAAADUC0EuUB8EuUCFEOQCAAAAQL0Q5AL1QZALVAhBLgAAAADUC0EuUB8EuUCFEOQCAAAAQL0Q5AL1QZALVIgPcrfvPkCQCwAAAAAVpjaf2n4EuUD1EeQCFTJ9VTbI3brzYHpRv3PnSz8rAAAAAKDPqa2nNp/afjbIVdsQQPUQ5AIVMnfDzUyQ++lnX6QX9cFBLuIAAAAAUDVq66nNp7afDXLVNgRQPQS5QIWs2nkrE+Qu33Qivaifv3DZzwoAAAAA6HNq66nNp7afDXLVNgRQPQS5QIXsOnInE+TOXXs+vagfPnLCzwoAAAAA6HNq66nNp7afDXLVNgRQPQS5QIWcu/JVJsh9b+m1xg3Pbt7kG1kAAAAAqAq18cKNztT2s0Gu2oYAqocgF6iYWWu/DXInfXK9MbzCiVNn/awAAAAAgD6lNl4YVkFtvxDkqk0IoJoIcoGK2XrwdqZX7vQVV9KLOzc9AwAAAIBqCDc5U6nNZ3vjqk0IoJoIcoGKGRj6OhPk6pvZTzacSi/wBw4d87MDAAAAAPqM2nZq46mtZ3vjqi2oNiGAaiLIBSpo477b6UU8hLkTl1xLPt32RXqhP3r8tJ8dAAAAANAn1KZT205tPLX1QoirUlsQQHUR5AIVNHTzq2T6qmyv3GkrLidbdx4kzAUAAACAPhVCXLXt1MazvXHVBlRbEEB1EeQCFXXw5J1Mr1xd4GesvNgIc/VTHMbMBQAAAIDep7ZbGE5BbTq17WyIq1IbEEC1EeQCFRaGWNDF3fbMDcMsqHSn05s3b/lFAQAAAABdpraa2myh/aa2nO2JG4JchlQA6oEgF6iwr7/+Olm541amV65K4yh9suFk448B1eEjJ5LzFy6n3/TeufOlXxUAAAAAYJSpLaY2mdpmaqPZNpvacGrLhXZdCHHV5lPbD0D1EeQCFefD3BDo6g+AacsvJcs3nki27z6Q+QOBoiiKoiiKoiiK6n6praY2m9puIcS1PXEJcYF6IcgFakAX9tgwC/pDIL3L6ZKryZw1Z9M/EPRTHY25RLhLURRFURRFURQ1dqU2mNpiapOpbaY2mtpqod3mQ1y18QhxgXohyAVqQhd4DX4/bdW3N0Dzwy2EenfxAEVRFEVRFEVRFNWFsm0zO4xCCHDVplPbjhAXqB+CXKBGdKEfuvlVsmHvN0MtxALdWLBLURRFURRFURRFjX75dpkNcFVqy6lNR4gL1BNBLlBDuugPDH6VbD1wK5m19kYm0KUoiqIoiqIoiqJ6o9RWU5tNbTe14QhwgXojyAVqSn8AhDp7+ctkx+HbyYodN5M5n95Ipq385tteiqIoiqIoiqIoauxKbTG1ydQ2UxtNbTXbdgNQbwS5ADJ/GMTqq6++oiiKoiiKoiiKokahfPvLFwAEBLkAGvwfDIS4FEVRFEVRFEVRo1++HUaACyCGIBeoOf/HAkVRFEVRFEVRFNVbBQBCkAvUlP/DgKIoiqIoiqIoiurtAlBvBLlAzfg/BFT6Kc/g0I3k8pWB5NyFS8npsxeSU6fPJycpiqIoiqIoiqKoMSm1wdQWU5tMbTO10Rh2AYBFkAvUhL/wq27fvpP+gUBoS1EURVEURVEU1XultprabGq7+fYcgS5QPwS5QMX5C32oq1evZf5AuHDxSnL9+lBy69bt9FtfAAAAAMDYUltMbTK1zdRGs202teF8u45AF6gXglygovyFPZS+ydVPdcIfA1fu/jFw586XfnEAAAAAQJepraY2W2i/qS2X1zuXQBeoPoJcoGL8hdzWzVu30jGXvvkD4HL6TS8AAAAAoLep7aY2nNpyatOpbefbewS6QPUR5AIV4S/cvvStbQhxL10e8IsDAAAAAHqc2nIhzC3qmUugC1QTQS7Q5/yFOq/CcAqEuAAAAADQv0KYqzaeb/flFYBqIMgF+pi/OOdVuLGZfooDAAAAAOhvYZiFohug+QLQ/whygT7lL8p5pZ/bhIHxGRMXAAAAAPqf2nahnVdmiIVQAPobQS7Qh/zFuKguX/nmZze60ykAAAAAoBrUxlNbT20+3w4sKgD9iyAX6DP+IlxUX331VXLq//+W9s6dL/2qAAAAAAB9Sm08tfXU5lPbz7cHiwpAfyLIBfqIv/i2qsGhG+mF/cLFK35VAAAAAIA+p7ae2nxq+/n2YKsC0H8IcoE+4S+6ZSoMq3D9+pBfHQAAAACgz6mtN5zhFUIB6C8EuUAf8BfbMqWf1pw7f4mbnAEAAABARYWbnqnt1+7wCqEA9A+CXKAP+Attq9IF/Msvv0xOn7mQXtT1/wAAAACAalFbT20+tf3UBhxOmAugfxDkAj3OX2RblS7cIcgNNzoDAAAAAFRTuOFZCHIJc4HqIsgFepy/wBaVDXFVuqAT5AIAAABAdYV2X2gHDifMBdAfCHKBHuYvrkUVLtYEuQAAAABQH3lBLmEuUD0EuUAP8xfWvIqFuAS5AAAAAFB9PsgdbpgLoPcR5AI9yl9U88peoG2Qe+fOHYJcAAAAAKi40O5TGzAW5BLmAtVBkAv0KH9BjZW/OIcgVxdwglwAAAAAqD4b5IYw17cTy4a5AHobQS7Qg/zFNK/8hVkVLt4EuQAAAABQfT7IVfl2YtkgVwWgdxHkAj3IX0hj5S/KPsQlyAUAAACA6osFuSMJcwH0LoJcoMf4i2is/MVYZYdUUN2+fZsgFwAAAAAqLrT71Aa0bUKGWACqhyAX6DH+AhorfyGOBbm3bt0iyAUAAACAigvtPrUBCXKBaiPIBXqIv3jGyl+EQ4hrg1x9E0uQCwAAAADVZ4Nc2ys3tBN9+5EwF+hfBLlAD/EXTl/+4hsLcnXhJsgFAAAAgHrwQW4Ic4uC3DJhLoDeQ5AL9Ah/0YyVv/DaEJcgFwAAAADqp1WQmxfm+vZmrAD0FoJcoEf4C6Yvf9H1Ia4qXLRVN2/eJMgFAAAAgIoL7T61AW2b0LcXfXuyTJgLoLcQ5AI9wF8sY+UvuAS5AAAAAIDRDHJVAHoHQS7QA/yFMlb+gusvyn5YBYJcAAAAAKg+G+QWDa8QC3N9uzNWAHoHQS7QA/yFMlb+gusvyAS5AAAAAFA/BLlAfRDkAl3mL5Kx8hdbH+TqAh2CXF24CXIBAAAAoB58kBvC3NBOLApyCXOB/kKQC3SZv0DGyl9o/beqsSD3xo0bBLkAAAAAUHGh3ac2YKsgNxbm+vZnrAD0BoJcoMv8BTJW/kIbC3FV4aJNkAuMnrNnzycT3p2SbN+xy08CAAAAxlwsyFXZtiJBLlANBLlAl/kLpC9/kS0T5OonNb0Y5GqbBgeHckuvB933b//dHyX/3X//L9Oav+ATP3lU6FzXOTAwcC25dPlKcvv2HT9LT7h+fTD5H/7Hf93YP0uWrvSzAAAAAGPKBrl2eIWyQW6ZMBdAbyDIBbrMXyB9+QusvQDbINePj9uLQa4NwPLqO3/6V8kjj49LVq5a5xfHGPlX//rfN47Hx3MX+smjYs26DZnz4Ps/+KmfpScsW7E6s5333vd7PwsAAAAwpvKC3E4OrwCgNxDkAl3mL5C+/AU2FuJWKci19dzzr/lVYAx0I8i95xf3Nx3/y1eu+tm6bmhoKHMef7JslZ9l2DZt3pb8y3/1B426c6c3e6irt7Tdzi1bt/tZAAAAMIbKBLk+zPXtTN8O9QWgNxDkAl3kL46x8hfYVkGuLtwqBU69HOQqAPrD/+M/N+p//t/+pCnIU/3uoSf9ajDKxjrI1bnqj7vqvfc/9LP2hPPnLyRTps5Idu7a4yeNyOo1n2Zef68OL3Hz7ueM3U71pgYAAED3hHaf/q4O7cFOB7kqAN1HkAt0kb8w+vIX17wgVxfofgtyp06b5Senr1ljjirktUGRxkzF2BnrIFfPYY93qD/5T3/hZ600glwAAAAMR1GQmze8gm9nlglzAXQfQS7QRf7C6MtfWGMhbpWC3GDDxq2ZoGjh4mV+lgb9/H7V6vVpD8kPps9OwzDdMKus4ydOJouWLE8mT/kwWffppuTipct+llzHjp9Mg+eJk6clM2fPS38aX/bn8DqGXxw51lheYdiFi5f8bBmHDx9JDhw8nFYI+XScw+vfvnO3W+IbJ06eSocA0GucM29R+rxFf4jFglzNv3ffgfR5NE5sJ4c9+C9//f82nu+B3z+ZOfZHj53ws+ca7rHUPtz22c70tWn/7D9wqPA4av+F46BQM4++gNBx1fHV/tf2xfa7tlPrUg9k+9o/37O/8Tx526Nzfeu2Hem5P/vjBekxyptXdNzCOs+e/faz4fyFi+mN7fS+1Hkcew9pP2m5Xbv3ZrZT+y2sM7YcAAAARlfZILdVmOvbo74AdB9BLtBF/sLoy19YWwW54aKtsZH6OcgVGyYq3PNu3X29993/SCZQsvXQY8+m+yyPAsq8MXv/l//9P6ahVJ6Tp05nwkdb2u4Zs+b6RRp0XBV85T33v/mf/jDZvOUzv1gaztn5Ptu+K73Rln3s5/c+kFlGweGf/8UPmp5Dpef//aPPREM/H+R+NCe+rzQkhg0Dh0MBol3n4S+OZrZ53Ivj/SJNhnssFbT+5d/8uGkZ+9x6r3l2HgXG3u7P9yV/8O//Q9P6VOptrrDZ+tU/PdQ0ny8f0usczDu2ql/++nfRHr1PP/dyYx6dw2fOnEv3kV9e+/ODDz/KLJvXc9rWG29NyiwDAACA0WeD3DBOroogF6geglygi/yF0Ze/sNYpyLXh0o9+8qvMNO2bH//0100hkq+88XUffPippnljpZ6n3tWrA7khna0Fi5b6RVP/9W//oWneWKl3pOWD3Njrt0Guenn+23/3R03z+FIYqNdk2SDXh8W+NLbxSHrnTnh3SmNdOuai3qXhMb2GIsM9lup1a19nXv2nP/ubpjDXTvdB7tz5i5vWESsFqkG7Qa56rOcF17b+9M+/n1y7dr2xnNggV0NXxEJcW+rlGxDkAgAA9CaCXKA+CHKBLvIXRl/+wlqXIPf69cFMOPTkMy9lpj/x9IuZ6d/93t+lAdJr499Ngzc77c0JkzPLqiejX1Yhn8Kxl159KxPuqceppV7Afv0KmfVTfm2TD3h9z9o1azdkpv/xd76XPPfC6+lP77//g59mpmk7LB/khlIPz7/74T1pD0ytRwYHh5I/+uPvZuZTaPfCy2+kwad6/dppvsdzLODUflIPVR0LP/2pZ78NJdulfRzWo/0v6ilr16/exzEjOZYKve2yOn+2bN2e9j7+4d//MjNNwyJYdpoPcu2+1b8VhGrYhknvTU/+zz/588yyYezntes3pufuPb+4PzP9xVfeTB9X2WEidN6EefSeUtiuYRkefWJc000Dfa9aG+SGUliuc+Dl1yY09fLVPtR5L+otrW3ReWTn0b4M26lhFwAAADC2CHKB+iDIBbrIXxiLQty8IDc2Pm4/B7kKLH3IpnFvAz9+roJJzy9/+vTZxrS33pnSeFxBm/+DZPuOXZll1XMzUJBpp/mfyCuAtj0cfW/SH/zo541pCh39sAYK/ez6jxw93pgWC3IVAsc89uTzmfkUsHn/+PPfNqbruOi8CXxQ+86kqWbJJO3laXv7fu+vfpiZXtahQ0cyz6OxZwOtMzx+/+8eN0t9a7jHUvvSnouxoTBssP7DH/8iM82u0wa5GlLBTlPQbKnnsw16Fe5aZW52tm//wcw89r0h2gf22PzkZ/dlpvsg9zt/+leZYy8acsPOo+e0uNkZAABAb8kLcmPj5BYFua3CXADdR5ALdIm/KPryF1R7wS0T5A4ODvZ0kKuhAdRbMJTGjY31avU9Ke24uOp1qn3jKQCzYaQCv0C9FsPjCryKblbl2W37/SNP+8kp3ZDMbr/CvcAex9gfQtoWu4/sz9p9kKv9F6P12rBQ46DGnku9QfX61aNXtX7D5sY0u+8UOMe8O/mDxjza5uFQ796wDn+cdU7Y9fvQW4Z7LH2P72kzPvazFLLL2iB3xcq1mWnt3KhNygS5Yj8HYtS7OKxD54Llg9zYGMdXrl7NzOO/sCDIBQAA6C2h3ac2YDtBbizM9e1SXwC6iyAX6BJ/QfTlL6j+gpsX5OrC3Q9BbplScKpem5b96bh63mp81ljZIRDU+zRQKGWfQz1o9bN033vS00/b7XLqxemfM5Sdr0xIqOM7MHCtaagA22vZB7mxXqRy/vyFtp/fs0GuHcvV0nAA9nl0zrVD57gNnF95/e3MdL8f/Ri3MtxjKX5s2H/650fT3t5lwmC7nA1y/TYrIFcv7r37DkS/cPDKBrl59P7XzeNeHf9OZhssG+T64TssLRfm873nCXIBAAB6iw9yQ5hLkAtUD0Eu0CX+gujLX1BjIW6Vg1yNuxrG5hzuOkJp3M9APzfyY5WGUrClcUo1lq3v7agwzs9fpsK4r4ECWfW01Zi2CqqLXk9RkKthA2I+37M/O5+5SVZZNsi1vYItjYVqn6fdINcPkaH/V+9QWza017i13nCPpcyZt6hpmVAaT1hjK8d6q4qd14+Rq0DYr0+l4/yXf/PjdH9qu2PaCXL1BYfGqlWPaRu6+ioKcouGxLD7niAXAACgt7UT5Pow17c7fbvUF4DuIsgFusRfEH35C2rVgtx/uOc3maEV/I2e5s5f7BdP94sPqsqUbg5lqferxg7189lSb9EDBw83lvHBY9myN2pTr94//fPvN82TV8MJcv122vGBy7JB7sdzF/rJqZEGubpBl3+9rUpj83rDOZbBgkVLm4by8PXI4+Oa/mC1032Qq3nVC7coXFUtWLg0s5yUDXJ1cz2/vrwqCnI17EYeglwAAID+QZAL1AdBLtAl/oLoy19Qqxbk+nBocHAoE34pfGvVI1c9ChX4xuqD6bPTXpf696cbt/jVpBQCfjhzThoi2xtEhdJzXbh4KZ1XN8qy0zQUgH9O+9zh3zZA9L1Htf0KenUzMfXU1PABdvpwglw9n50v77UXGe0g148FXLYU+Odp51h66rX8zLhXckP2Z8e9mpnfTvNBbqDjpeP5u4eeTMf/9etU+QC0TJDrzxG9Z371Tw+lN7TTeaeA2PYKJsgFAACoPoJcoD4IcoEu8RdEX/6C2k6Qq59u91uQK29PfD8TENmblAV2bFOFZJ2kQO8HP/p5ZhsUBosf/9TfAKoVP3atwltPxz1vbNKyQa6/UZVuSpYnnGc6p6zRDnIVNtplNZSBetXGys6ncY/LKjqWRXQjtImTp2WOg4Jhy64zL8j1Tp0+k97Mzy77698+nJmnTJBrQ1odJ73nPY0THOYhyAUAAKg+G+SqLUiQC1QXQS7QJf6C6MtfUOsQ5KoHrr0Blua/enUgM8+DDz/VmK6ALW+8UfVMVTCmsje/2v35vjTkU/l1i8IzG+IpfAtsiKyhIfJs2ryt8dzqaSw+vIw9tw9HhxPkiu0BqkAuFrJqn9jjoW0ORjvI/Zv/5yeN5f7oj7/rJ2fopm72eRSIBsM9lhriIiynntYx+hIh7/XZx22Qe/TYicZ67XZa9rWrh7blg9wjR49nposNWPVeiLHPMRZBblFPaQAAAIw+glygPghygS7xF0Rf/oJaFOTqAl2FIFd8cPfYk89npisks9N1AymFnNa2z3Zmnsv2frVjomrsXD98gwI4u37bo1U3wLLTXn5tglnyG5Pem56ZZ8/e/enj+q99fMrUGZnlTpw81TRe63CD3AnvTsnM+/N7H8jsIwWcdhgBBbe2V+5oBrm+Z/Mbb03ys2QooLXza0iLYLjHUkNe2MeXLF2ZWU5sz1edS5Zd1ga5993/SGYZHVNL708bsqvHsPXZ9l2Zdb86/p3MdPn+D37amK7j5Hvtav/YdYxGkKvPJ/scsfcgAAAAxk5RkBvCXIJcoBoIcoEu8RdEX/6CGgtybW9cVRgPqZ+DXL0+GyKpfO9GPwSDwqof/v0vk0efGJeGU36a7bWrMM9OVy9bLadeheqx6cduPXv22/2n4+B/rq9ewRqjVL0j1bvUTlPPyEDH1N8AS0MFaIzcv/vhPU3PqxpukKvt/NFPfpWZX+vXYwrd/PP4QHo0g1x/oy4fdsbYbda5EQz3WPqeuiqdPwr8FYL/+V/8IDPN93y102yQu3ffgcw0PYdu6qbj+NKrbzUF9X54Dh9yq3R+KbwN+8kOm6DSsdJz5I3FOxpBrtje6Srta53vGsMXAAAAYysW5KpskGvDXIJcoH8R5AJd4i+IvvwFtS5BrqiHpA2JNFaq58cbjZWez95sTDTUQSzM9KUAbNXq9ZllRT8rVwDr5/eln82HYRUC3dDMz2dLAWJegNZOkCvqnfrd7/1d03P4Ui9S35tyNINc9ZwNy/ihBfLMnD0v81x6bhnJsVSI6oPeWOnc88N32Ol+jFwblBaVbk4W848//23TvCr1RBf1ULb7MFajfbMzmTbj46bnVbXqYQ0AAIDOI8gF6oMgF+gSf0H05S+oVQtyW42r6cMqjT9qaR+pZ656LPowSc/zyOPjkkuXr2SWsTS0ge8hqQq9e8+dy99vAwPXkt8/+kw0CNQYvxpewf/kPVi7fmO05+TjT72QBpN2mt1HPsjduWuPWWucbtyl/RDbTvUe/mD6bL9Iyo5TPG/BEj855YeKUMDdir/hm4aqKEP72y73zLhXMtOHeyzV01u9XWP7R8fhw5lz/CIpO9+GjVv95HS8YX/+qvQ8GtKiKITXOfDcC69njoEqhNein8mpF67vVaxt1vaoV2x4TKG8pXWHaQrB89getwptYzTus++9XPaYAgAAoHMIcoH6IMgFusRfEH35C2oVgtzRoH115sy5dFxc9VrMC+3yKHDdt/9gGq4VBb8xWlYBs8Y2VbAau+FWHh2jz/fsTw4fPtLUI7bTtP5jx0+m26kAdrSfr1tGcizPX7iY7h/14O7U/tH7Vvt967Yd6c3l2v3DV+/1a9eup8FtnuMnTqY3fWv39XaS9ru2U18cAAAAYOwR5AL1QZALdIm/IPryF1SCXAAAAACAR5AL1AdBLtAl/oJYFOIS5AIAAAAAYjoZ5LYKcwF0F0Eu0CX+glgU5NoLLUEuAAAAACAYSZAbC3N9+5QgF+gdBLlAl/gLIkEuAAAAAKBdBLlAfRDkAl3iL4gEuQAAAACAdhHkAvVBkAt0ib8gEuQCAAAAANpFkAvUB0Eu0CX+gkiQCwAAAABoF0EuUB8EuUCX+Atip4Pc69evE+QCAAAAQMWFdp/agAS5QLUR5AJd4i+IBLkAAAAAgHYR5AL1QZALdIm/IBLkAgAAAADaRZAL1AdBLtAl/oJIkAsAAAAAaBdBLlAfBLlAl/gLIkEuAAAAAKBdBLlAfRDkAl3iL4gEuQAAAACAdhHkAvVBkAt0ib8gEuQCAAAAANpFkAvUB0Eu0CX+gkiQCwAAAABoF0EuUB8EuUCX+AsiQS4AAAAAoF0EuUB9EOQCXeIviAS5AAAAAIB2EeQC9UGQC3SJvyAS5KKbdN6dPXfBPwy0dO3a9WRwcMg/DGAU9MtnNZ8LADC2CHKB+iDIBbrEXxDrEORqG2/evJn+tyy9Xi2j6rSnnhuf3HPvQ8kDD4/zk2pF+/i3Dz6T/P3PHkgefPT5Yf2BtnvP/nRfqjZs+sxPRgu/+ecn03334qvv+kk9bc36zel5o9q0ZYefjIqaPWdx4/1+8dJlP7kWVq7Z0NgHBw8f9ZNHRSc+q8cCnwsAMPYIcoH6IMgFusRfEOsQ5P78N4+kDTv9t6y3J01vNAhPnDrjJ4/I/Q892/b2VNGuz/c19rFqOKHEtu27G8sr4EB7fvKLB9N99+hTr/hJPe33j73QOO76YgT1MGXax43j3g+9Q0fDok9WNfbBnr0H/eRR0YnP6rHA5wIAjD2CXKA+CHKBLvEXRILcuAkTTZB78rSfPCIEud/Qz1/DPlag6HtMK7D45X2PpXUoJzggyB2Zfg1yZ8xe0Dju8xYu85NRUQS53QlyO/FZPVJlnoPPBQAYewS5QH0Q5AJd4i+IBLlxBLlj48rVgXRIhIFr1/2ku43yhY1jsHvPAT85RZA7Mv0a5OrzSiHW3v2H/CRUGEFud4JcGeln9UiVeQ4+FwBg7BHkAvVBkAt0ib8gEuTGEeR2X5mGO0HuyPRrkIt6IsjtXpBbpMxn9UiNxXMAANpHkAvUB0Eu0CX+gkiQG9dOkHv16kBy4OAXyWc7Pk+OHjuZ3LxZfFO1vCBXx2Dw7j5UaX8H164PJvvvrn/7zj3JqdNn02NTlnpP6YZgWl7rHY5bt26nyw4N3fCTGjRN8/if3Aba5vDa7PZrX+kxu8/CY++b0GbLtp3RfZMX5OqnwBrX8djxU23tr1bUK00hwr4Dhwv3R8zAwLV0bEmdJ2fOnm/rD1K9746fOJUue/rMubaW1b4Iz6vzx+6/skGuljl56kx6Dio8On/hop8lQ/OH42W3VduudWj52GvQHee1b/UcN27k32jQnk+x9Vh6rr37DiU7d+9L36sjoZsf+vNc26lzbeeuvZl9G2j7zp2/mJ43mscfg1b0fjhw6Ej6HJevXPWTc430eds55/I+u7S9Wl7bH6N5tV06NjrurW4umRfkXrx4uXFedYpek55D6z1y9ES6P4rEzg2dp4e/OJYeuwsXLxXuQ0vzaZ/ruKl3qd4XQaeCXJ1Xul7p+Oj1tTo3RvpZ7el9c/DueaFjX3Ret/McbX8u3N234bpd9Hkj4Tro5wufae2+v/T8Wk7PfbvFuQUAvYwgF6gPglygS/wF0Za/kPoLLUFulkLCp8e90ZjP1sT3ZuYGunlBrhp0YflZcxand2V/6fWJTevWGIGfbtyWWdYL4wnGlt2ybZefvdDrb01pLH/p8hU/OW2Eh+m6o3nMspXrG/OoER6EY6N9Etz3u6ebttvWx/M+aczrg1yFVuHu6qEUVj730oQ00BwOnfs6HiH0tPWr+59IFi9d7RfJOH7idPLMC282Lav16fxR2JZHQdpDj7/YtKzqiWdfTy5daj4egUKHN9/5oGk5Pe8ny9em7/FWQa4+F+bMX5rcc+9DTevRMVMIE2PDJoUlS+8+XzjWdvnw3lKoMe7lt6PPoaDEW7VmY2MeBTExOs/Ce82WtkPv77z3Z5Gwvx57+tV0m+3NlVQ+kNq8dWf0fNY2aB8VUUjnz2WVtmH23fOx6AuKkTzvcM45/9mlgOo3//xk4zG9T6z0vFoQP6+03ILFKzLzBz7IXbhkZdPnnNap0G+4DT59+fXK+MlN26XS+aQvBWLsuaH3nj5z/PLa/9o3RfT5bPddqGdffCt9L4w0yL1+fTBzM09b+vzOe0+P9LM62LRlR3o++Hl13PS+9IF5O89R5nNBzx97X6l0rdOXdTH280nn1vvT50TPX527ee9N/b2k1xi7luizpNM3VgWAsUCQC9QHQS7QJf6CaMtfSP2FliD3WwpxYo04W2rIx/7oKBPkKgj2AYWvWCCg4xQLf319MGOuXzTX6rWbGsut37DVT07WrPt2uio2hqINRtTDOIiFA7EQw9ZHc5c05rVB7sQpM6MN5FBqKLcb3qnXbSwM9KWAKXasFdK2Ok+0zeo17dlQIq+0/2Lnp96/eV8yhFIQ0SrInfrhnKblfKk3umfDJtuTzpf2jbbfh7y2NM33tFRoH6brHPC2fraraT2+FOb49bYS9pcCr9h5YYNcBUl+uq+8wFIBpZ/X1yNPvpy+372RPO9wzzn72aXPH/8+9EGuzj2/Xl+vjJ/U1MPfBrnTZ85vWsbW5KmzM8uWoZ6prd6vKo0V64XXrM8Zhbl+GVv2yyxLX3r4eW3pOfS6wv+3G+Sq56fOG79eX/MXNZ8fI/2slgkTpzXN40ufRQrCg3aeo9XnwuatO5qW96XX53vdig3mh3Pu6YvZvADZlr6EAYB+QpAL1AdBLtAl/oJIkBtXFOSqkWl7Cam3pQIQ/TR47oJlmd5G733wUWZZKRPkhlLDTz3XFJYtX7U+eeq58Y1patT73ooKd8N0rV+BloJV9R624ZpKP0cuw/a4VU8uz/dei4W9IRzxPXZj4YB6sOont6+9+V5jnQq29JjK9piyQW4ohUTaD18cOZ72lrWh0syPFjaWLUPHMyyrYF37UD8TV+Azf9HyzLr1E2pL+92eC+rlqO3RsVRQ4gMVG14ocLbrVgCinmQ6F/XaHn/mtcY0nX/etBnzGtND+KPldD7EeuPFgtwVqz9tTNfxmz5rftrjWSHW+AnvZ9bvexX7c03L6zHdbX7tp1uiX1Jo/6y7O037UYGMDdQUnFhFgY3OEbteBYt6ToVe02bOazom7fABpUImbZsCIvWSD70J/Xv5nckfpuGdfiqvY2PX40M99Ry3y+qc0XtVP81fs35zZvv9e20kzzuSc84/r0rzz1u4LD0+tnekPTf0fPrSKpybek67DTrnLBvkqnSO6D2q95SGj9HnrZ3ebtBpP18VxupzXa9N639n8ozMdusaaflzQ72X9SWXltc+eODhcY1pOv99CK9jbM95Pb96zuu5Fbzrs9Ouv93Xp2v8i6++21hW55E+DxUe68u65195J7PuXZ9nv1wa6We1hnex61fPbQ05oXXofW/Paxskt/McRZ8L++9en+3za316Xj2uXr32mq5j54+P72Gt7dW5rM8rHYdX3/h2+1QaasHSl6dhmj5vtT/UO1r7f9L7szLrJawA0E8IcoH6IMgFusRfEOsU5KpmzF5QqmzPGR/k2galQkz/h4VvkCtQtMoGuQqJYmNGvvjat41xNfYt+1N6hWaewrkQOLT6ibUV9oe2ydJr9wGGQj5L48GGaTM/XpSZFgsHgjI3t/FBroIuT8uG6Qpq2hEa9zqeeh2ewruwbt/L0YYmarj74Ef0c+kwjz0eCujC47HeXXo/hmPiQyV/HsV+Cq6Azs7jg1yFEHa6gmvP9krzwZ4P6xTGWBqiw64/1ltaAUmYrlDQygtstB8yAbALAkWBuf1M0P4qy57rCnv8Nou2wQbVGlbEs1+4+OO39u45HKYpCPX0pUx4jTrHgpE+byfPOR+8Bxq2wc4X+xm/Pe56nfan9jbI/ea8OmWW/Ib93NCXYGWpx2Q4vgr4fW9gUTAe1u0/1+25od7wPgjU/9vjo+No2Z/u69zy1xX1prVhsKqdIFehcFhO+zU2TM7CxSsb82h7rJF+VocgXPtp05btfnLaOz6sw3+eSJnnyPtc0L63nwsaLsZTqGqPj5/HBrmaL7b/7JeafsidsG69fj98hLzx9tTGsrHPWwDoVQS5QH0Q5AJd4i+ItvyF1F9oqxDkDqdskKvXGx5XwyzWIBONcxjmW7piXWZa2SDX9+gJFO7aBqf9w8b+nL6dgKoV25vI3jDKhi4a2kD/VYPZbtPK1d82rtWDyhppOGCD3KLeleHnuWpEd5KCvPD86tEWaEiG8Lie8+rANbPUt9TbWSGqtj0WnhWxx8QGWrYnrcZSzWN7gfkgV73lwrRYICg6xuFc1jG3bJCb97oUVoV5Nm5uDnYkhC/+uOUFNurhZ19T3h/9mk/7XKXeiGXZsE7BX4z9ebyGB8hjfyKvG8kFCm/D4+182TLS5y0j75yzn136bMpjw3+9v/Ool204PjbwtEGuvnCL0edTmMcG3Z1gg3Af1NlzI2/IDoWDYR714rbCua7/2pubWfqSMCyvaifIteM5532e6v2iMFL73X/5NNLP6jJCr2P/fpcyz5H3uaAvDMLj+jIv73PBnsf60sKyQW7eZ4Z+rRHm0edroOcLj+v4cnMzAFVCkAvUB0Eu0CX+gmjLX0j9hZYgN0l7N4bH1eDNY8ME9ZK1ygS5vhHp2d47dngFBXfhcTUYFeqpp9FIKTAI67W9qcLzqeeqbtQS5rEhcujB7HvxyUjDARvkaizWPPZmY7HxD4fLBvu2t6/tBawAoNO0H22oZgNy+xNw3+vPssfUB7n6/zDND99h2eeywaYNcmPjiYodLzNvmI8w/IQPdvICG3vOtBOClhXCOj/mqzXr40WNbdBwKHm0X8J8Gvoh0BAt4XGVXpNu7NXKSJ+3laJzzn52aViaPHY4keF80WSD3LybWUmYJ/a5Mly6RtovCnxv33Bu+C81LLvv7Rd89nrhe8J6dh+WDXJ1/Q7LaDuH0xge6Wd1K9rGcG1UeWWeo8zngg/gPfv3gr6QC2yQm/cFiD2OGtLFsuMmK7DWUCJ5XwQDQD8hyAXqgyAX6BJ/QaxTkKv/+teYV3aIAhvk2p8fq9Roz6swjw9lywS5Gm+viP0JrA3K9HPP2B3B9ZwaP1Lj8g2HjntYl3reBuHu9uHmaWFfq0ddEB7zDVs7bbjhgA1yFVrnscNh2MZ5Gep1qx6jCi3VANf+tcc3lA1yNfZieLyo52Er6vWosXgVROs80v6yPf9C2VDN9rwrCgoGBq415vNBrj2H/HkdO8dV6oUe2CA3NrSD2CBX2xITAuWyQa5dZ945MxJh3/v9ZdnxtVV+n8X2ne21rM9aO+RGKPV01Rc42s+axxvp8wbDOefsZ5cC5Tz2vBpOr0Qb5MaGOgmKPldaUS95fZboizotr/0ee/15Qa6C1jy2Z+jS5Wujj7f6vNCYwmHeskHupUvfDmVStH1FivZpmc9q0d8ZurGjembrPaRfSvhzMpRX5jnKfC602mf2Vy32Sywb5OpvhBid02EeDYFk2S/ObCng1Ri9eb24AaDXEeQC9UGQC3SJvyDWLcgtK+9mZ3acwbLlQ6gyQW5sbE/LjnHqAwWFufZmVL7UeNYNXtoVwiX1vhV7U6bQOA49NMPYvXbcQ904yBtpOGCDXDXi8ww3yNXwFvYmOEVlg1yFNOHxooA5j96PdniDVmVDtRCM+PMrJizvg8lYcNWqlixb01i+W0GuHZe4KOgbrjJBrt2GsuWHANDnrcKuvJBLj/shW0b6vCM558oGuWV6rRaxQW5RL+Wiz5Ui6iVZ9tz3n7tlzo28IHfZynWNxzUUTRHdCCzM2yqUDOyvJVp9SZinaJ+W+azW2NR2HOBW5ZV5jjKfC2dbfC7Ym0HaceZtkJsXJhQFuaIb19kb6vnSWOD6IgEA+glBLlAfBLlAl/gLoi1/IfUXWoLcbI9c9UZVwz+v1FNW/9XPca0yQW7RGJeiHnNhXoW6MRpLVzfjUrga66Xrx6ttxYaTGsNRQyzo3wowdH6Ifu4c5tHzr1m3qfH/sZvDjDQcGM0g99at25lQRwH41A/npGPGqoeu7upuxwi2Qa69CVrordwOO5amSr0D1ctZN8LSa1YQb2+sY49l6CWt0mvIo7u9h/l8+GTPly3bdjad26E0zufmrd9Mt8MjdCvItTej0nimnVYmrLOfHRrH1e+z2GdE3s2N9Dms80yhrj2uoezPxEf6vCM558oGuWGsalXsRo6tjGaQq5DNvn6FajM/Wph+AaVzXKGpwvMwvZNBrnqphsfzbhQX2HO8bJBr3+v6VcFwFO3TMp/Vdkxs7Stdl3T+6pqq96rOp/AcKq/Mc+R9LthwVu+nInY7bejbiSA3UA9pXUcUqvsva/TZe60DwyEBwFghyAXqgyAX6BJ/QSTIjcsLcu3PI4vGyC1SJsgNvV7zvP7WlMa8rXoYBdp2GwapcdsOPU9YVuFeCOJsrz578y8FRWEs37zXM9JwYDSDXBu6aLiC2B+QanCHeWyQa8c5tY+XZYdHyAsk7U2rbKgWbjqnygsIRYFGmM+HT3YczqIxcvN0K8i1Y0T7oK0TyoR1Cv/CNgynN3YRHQvb296O1TvS5x3JOVc2yLXjhLb7RZKMZpBrb8Q2bcY8Pzmlz70wjz+/ypwbeUHuwLXrjcdbjaltP8PLBrm6nodlVPr/dhXt01af1Qrt7fPr9cZoKI8wj9fqOSTvc2GmGT+61djZNli1XzZ0Msi19DeVxqq2Iba+CASAfkGQC9QHQS7QJf6CSJAblxfk2qBS69P/59GwAufOX2wKqcoEuaq8mwEpPAyNTYUH9g8bNZBVOi4x+rl5WH+sQd5K6KmpQCfsV/9T4NCjST2uNL6k/q2erDFlwwH1gI0ZzSDXBjvqNRZje97awFYN+hDs6L95oZN+RqtwS+FM2Ec6dmGdRTfVsr1mbShmw4xpM+OBlNhxoH34VPbmQBpeQ+e4yoZD3Qpyba9KnVP6vIpRL3ntc4WX7YQmZcI6e6O75195x09u0DkS9p0NjLRP9R7OO0+1n23oE+YbyfOO9JwrG+RqLNAwnz4f8qgncDg+9ouE0QxybZCd9/N227Ozk0GuhG3WevKeX/siLK8qG+SK7Wma93mqc0u9RLXvNb+9thTt01af1fZ1630fo9dsX5vX6jkk73PBfgGrL6nygmz7+fHAw+My00YS5Orvp3Btzntu3aAwLKvzHAD6BUEuUB8EuUCX+AuiLX8h9RdagtxvaNiDME03Rok1zOyYh77hWjbIVQh63f3EUsfJ3ozFhod2zFoFvbGhDGxD1W9XGaG3px1ywD9PCPHsPHk9qIrCgXkLlzWW18+JY0YzyFWvxrCMD21EQZINtnzPWxuUqqeZH+ZAx1I/3w7z6JwJwn7RcYxtrx/L1IZquqO6nRbrXbl67bdDXqh8+GTH1FTFAiOdb/an8hcvdX9oBe1Te0z0Pvau3n0u2+su7w70MWXCOh+0asgCT9tphymwXxQoQAqPKwDz9OVR2A4buo70eUdyzpUNcvWeseuIfUFiQzdtk649wWgGuQowY68t0PvIbrv/TChzbhQFuboZZJimINW+btFx9+N1x96XedTrMyynbY31tLfH2N+csmiftvqstl8g+s9J0WvTzfXsa/NaPYfkfS7490asx/XVqwOZzwXfc3ckQa4dckhf3MX+ZrBfcsTeFwDQqwhygfogyAW6xF8QbfkLqb/QEuR+Q+GqDbA05qAaYerlpwaYesOFaSofFJUNclUKatTo1BiNasjaXmNqjPs7XdswQOGhxnQ8fuJ0WrpRmw1XW40VGGMbpOE5PN9rTJXXM7IoHND4q3YdGqZh3adbMgHEaAa5GvPVPr+CRx0HhTEKPPzYhj6gUDhhQzmFMPr5uwIhhWz2J9I6LrYXtQ+Bdew1RqnG64zdMMgHTzYUUOnn+BrrVAGuPUdCxcIn+2WEtk/bpP2/c9fedHvs6/c3UOpWkCu6QZ09zxWWq1exzl31erZBr8KjdpQJ6+SLI8cbz6HSMdP7T2Oh6guC8Bmg0hc2NrTz+13nir6AURim94T97PE3RRzJ847knCsb5IodZ1ylL8YUMqpntM4Je+x0Yy9rNINcvT/CunVu63NX+01jkE96f1bT6+90kKsg0YaN2na9j/WZozGP7XEP1U6QK3Z8Xb3Gie/NTIfA0Tnnb5an8b+ton1a5rM6/DpDpS8j9UsODUGjzwp7XobyyjxH0eeCzlF7bum9rxs06vi+f/e8stunfeEDg5EEuXqf2WOrG4fqfaDhig4ePpq8P31O5rXduNH++NEA0C0EuUB9EOQCXeIviAS5cUVBrly4eKkpyIuVGp9emSBXQxfEblBmK9aIV2hsG6R5pYajjnG77NASqrwb85QNy4rCAT2XbfyG+mjuksY8oxnkynsffNT0/LYUAIR/+yBXFM60Oh46jxSYWeoRG3vtdhkbhPogV+/nWGBrSz9fbxU+2eEl8ko/VfZDjHQzyBU7RnFe6QsY35u8lVb7y/I9OGOl4+h7Rmpf2p7aeaXzTTcd9Ib7vCM559oJcsX2rswrBcv+C6DRDHIVnoXzLa8U7oZ/dzrIFR/E+9Lrsu/J2DWgiD7zFSL69fqKbVvRPi3zWa3hEPx0W/piy+5/r8xztPpcsOOC55U+zxTIeiMJckWBsQ2S84reuAD6DUEuUB8EuUCX+AtinYJcBWplafzG0LBSD78YPZ4XlunxWAAsoZem3x4fhugn4DZQDqXecupdmEfjXmr7Y41e9eiN/dS+HTZk8gFkYG+KpB6BeULI6ccjDBQ2qdeYbQDbhrsNrdas22SWzAo3XVPZ8UjLUKjhQ3WFWurNpfdNeEy9zGI0Fqm9OZ1dh3p+5YWJelxhnV9OQYz2i3orhsd87zlR8KGg2YcH2udhXNgwTT/3jdHrU29W//rDetTj24dtomXCfHnniB1vNO8u7eFc80GujnVYNu98VoAcC0T1WnR+xsKaVsL+0nrL0LbZntehtJ4PZszNDbCL9rt6ds9ftLywQTPc5x3uOXf8xKnG4/b9WUQ9hGO9TBUU2mFGLPWoDvP5XyNY4XNFYX07dC7rs9N/Sad9rhBWrzk8pmNglTk37DjGGhM1RuGsttvvF30ZpXFk9bkTHtMXFu3S54LCYP+5oP9XkJr3fh3pZ7Vo3bHet3o/aqgWO7xCTKvnKPO5oDA3FthrndoOP5xRYH9pk/fe0/kT5ondDFXXAr3G2L7X4/7LFQDoBwS5QH0Q5AJd4i+ItvyF1F9o+zXIHW3aBwp11cj3N31qhw9yA+17hcLqAXfl6oBZojU1jo8cPZE2EPv5DyDtAzWw1QOxW69Dz61jrABpONugMXJ1HLQO9dQtS+eTelrr/BjOT271ng3Pm3cTpVb0erWsziVtx+Dd93q/0LYeO34q3e52Q/xO0bmr59f+a/cY6LxRUKrhUdoNn4f7vCM958rSeaX3grZPn3F6n/cKvc/VQ7ad92on6Ys87X8d+3aPexk6xvpliT4X9BP/4XymxZT5rNY1U69N51jsi6BWyjxHK7o2at+Gz/SxPvf0pclIPpMBoFcQ5AL1QZALdIm/INryF1J/oSXIHV15QS4AAAAA9BqCXKA+CHKBLvEXRILc3kGQCwAAAKBfEOQC9UGQC3SJvyAS5PYOglwAAAAA/YIgF6gPglygS/wFkSC3d2i8QN1kR7Vw8Uo/GQAAAAB6BkEuUB8EuUCX+AsiQS4AAAAAoF0EuUB9EOQCXeIviAS5AAAAAIB2EeQC9UGQC3SJvyAS5AIAAAAA2kWQC9QHQS7QJf6CSJALAAAAAGgXQS5QHwS5QJf4CyJBLgAAAACgXQS5QH0Q5AJd4i+IBLn/H3t39ivHed55/H+Yq7maq0GucpMAg8ADxAhixEhsCEYcwxE8jmfkcQxN7CiRN9myFFn7LlPWTlGiJFJcRYoSSZEiRYoUSUkUN1EktZDivi+HO2VKDtDDX9Fv8amn36qu6tN96nTX9wM8kNi1dHVVdb+nfv32WwAAAACAqghygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkEuAAAAAKAqglygOQhygZr4BpEgFwAAAABQFUEu0BwEuUBNfINIkAsAAAAAqIogF2gOglygJr5BJMgFAAAAAFRFkAs0B0EuUBPfIBLkAgAAAACqIsgFmoMgF6iJbxAJcgEAAAAAVRHkAs1BkAvUxDeIBLkAAAAAgKoIcoHmIMgFauIbRIJcAAAAAEBVBLlAcxDkAjXxDSJBLgAAAACgKoJcoDkIcoGa+AaRIBcAAAAAUBVBLtAcBLlATXyDSJALAAAAAKiKIBdoDoJcoCa+QSTIBQAAAABURZALNAdBLlAT3yAS5AIAAAAAqiLIBZqDIBeoiW8QCXIBAAAAAFUR5ALNQZAL1MQ3iAS5AAAAAICqCHKB5iDIBWriG0SCXAAAAABAVQS5QHMQ5AI18Q0iQS4AAAAAoCqCXKA5CHKBmvgGkSAXAAAAAFAVQS7QHAS5QE18g0iQCwAAAACoiiAXaA6CXKAmvkEkyAUAAAAAVEWQCzQHQS5QE98gEuQCAAAAAKoiyAWagyAXqIlvEAlyAQAAAABVEeQCzUGQC9TEN4gEuQAAAACAqghygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkEuAAAAAKAqglygOQhygZr4BpEgFwAAAABQFUEu0BwEuUBNfINIkAsAAAAAqIogF2gOglygJr5BJMgFAAAAAFRFkAs0B0EuUBPfIBLkAgAAAACqIsgFmoMgF6iJbxAJcgEAAAAAVRHkAs1BkAvUxDeIBLkAAAAAgKoIcoHmIMgFauIbRIJcAAAAAEBVBLlAcxDkAjXxDSJBLgAAAACgKoJcoDkIcoGa+AaRIBcAAAAAUBVBLtAcBLlATXyDSJALAAAAAKiKIBdoDoJcoCa+QSTIBQAAAABURZALNAdBLlAT3yAS5AIAAAAAqiLIBZqDIBeoiW8QCXIBAAAAAFUR5ALNQZAL1MQ3iAS5AAAAAICqCHKB5iDIBWriG8SmBrm7du9tLV6yvDVp8outhyY80Zry4uzWipVrWhcvXvSz1uae+3/X+i//9U+S+tG//dJP7qvPLx3fCxc+S0r/X8Yf/vCf6TK93o+HDx9N94Xq+IkRPwsAAACAMUSQCzQHQS5QE98gNi3IXbX63da3rv5+JhS09d/++5+1br/7oSSUrNttdz2YbtcP/+WnfnJf6fnCc1/3kxv95KjHnnw2XeZLX/6anzwq+w8czByno0fH5/kFAAAANAVBLtAcBLlATXyD2KQg95HHJ7UFt3n1zX+8pnXy1Gm/ijFVZ5D7/R/+W/rcZXsD2/37P/7nV/3kUSHIBQAAAMYXglygOQhygZr4BrEpQe7Djz7dFtYqbLzh17e3brvzgSS49dP//C++0tq9Z59f1ZghyL2CIBcAAAAYXwhygeYgyAVq4hvEJgS5Oz7d1RbSvjj9peQ1WqdOn2l953vXZua7+rs/zMwzlghyryDIBQAAAMYXglygOQhygZr4BrEJQe4/XfOjTAiogDSPXrcdH1a1ecs2P1vq3LnzrdVvr23NfOmV5IZpS5etbO3bf9DPlkvLv/3uumT5Ra8va+3atSedViXI1XPquV+YOqs1d97C1rr1m1qjGee330GuQvO3Vr3TmjZjTmvm7HnJ2MVnz57zs6U6BbnabwrsVV988YfkMZ2Tm97f0prz8oLWqwsWJ8ex7B+BusHb2vc2JsvquL6x/K3WocNH/GwZsW3QeyK8zqLzCAAAABg0BLlAcxDkAjXxDeKwB7kKB20A+PVvfKdjwLlz557MMo8+8YyfJQnqfv0fd2Xms6Ubqu3avdcvlqGbg+nman7Zb3/nB8k2lAlyDx463Ppf/+f/ta1D9ad/9uUkiOxGv4JcBaQ33nxn27aG0o3mdO55RUGujqedtvmDra1X5i9u/cmffqlt/X/511e1NmzcbNbc7vmpM6PLqq755+uiYyf7bXh/89bWL268LfPYT39xi18MAAAAGFgEuUBzEOQCNfEN4rAHuQr0bJi2fMUqP0uUelA+NOGJpBYvWZ6Zpn3zL9fd0Bby+dIYu77naKD1+/ltKUi0zxELcs+cOdv60pe/1rasL/X0raofQa7OMa3Lb5+v39x+n1+0UpCrMY/9Om0pPD9w8JBZ+xWdjovq7666OjnfLb8NsddJkAsAAIBhQpALNAdBLlAT3yAOe5B734OPZsK0vACvipt/c09mnQpT1ZNUPWzVE9dOUw9QBa6WeoT6kE89he++7+G2YSBC+SBXPVv9DdoU/E6d9lLr3gceaQt41294P7N8J/0IcrVddpvU8/jpZ6a0npz4fNtrmfTs1MyyVYLcUArD1StWPYAVqttpX/nbf2gLY1esXJOZR8fu/oceS4ZWuPbHP89MU89cvSeCom34wbXXt37+y98kw14AAAAAw4IgF2gOglygJr5BHPYg92c33JKGauqJOdo/AlavWZsJ6hS8+nXOmPVyZh4NwWApRLTTV771dmb6kSPH2n7a74PcCY9MzEx/fembmennz19o/dXf/H06PRasFrFBrrZFwWWn0nPkPZ/Gm7Xbe+sd92emi3qs2nkOHz6aTqsa5Gp/+eOiMNXOY8Ninbt2mAsF6xcvXjRLt1ovzZ2fWX7eq4vSabFt+O3vnjJLAwAAAMOFIBdoDoJcoCa+QbTlG1Lf0A5ikGt7uOon8aNlg2EFnKfPnPGzJOywCJovjMursXVt2PfghMfdkpe9+96GzHw+yLU9bjWUQIxuvmXXse3DT/wsuWyQ2035INeOi/vVr387Ob887RuN6xvme+a5aem0KkGunvvChc/S6cHFS+eqDbdtT+MFry3JrGPk5Cmz5BX2uCq8Dvw2lO3FDAAAAAwqglygOQhygZr4BpEgtxoboF73kxv95JTGpbXBnkJV+ejj7ZnHd+/Z55a8wg4HYINchYx2Hbqh2anTZ6Jl55s151Wz9mK9DnI1TEGYpp63fjtD2SEW/v2nN6XLVwlyNZxGHjv8g45lcNMtd6ePa7/77QqlXrZhPoXOgd+Gbm8yBwAAAAwKglygOQhygZr4BnHYg1z/c3q9rtGwP79//KnJfnJq585sb1gNLSBz5y0svT3q8Rnms0Hux5/syKyjbD36xDNm7cVskKtxfzXGbqeyQyP4INfut7J19Xd/mC5fJch9dcHidJq3dNnKzLw6b0Xj2PrnL1Phj0q/DZs/2GqfFgAAABg6BLlAcxDkAjXxDeKwB7m6WZUN2PbuO+BnKU37yK5LoWwejVFr51WAKJ1uCGbZXqI2yPXjzZatop6qXi9vdub3W9nSOLVBlSB33fpN6TRv67aPM/OGHtH+JnVlS8M1iN8GglwAAAAMO4JcoDkIcoGa+AZx2IPchYuWZgK2EKh2osBXY8qqjh278lpsz9Kim1l9+FF2CIUNGzcnj7+26I3M4xoXNs93vndtOp8Ncrfv2JlZh3oGa4zXWM2cPS/9/x2f7jJrL9bLIFfsftPr8ttpt3f+wteT/9c4wUGVILdoCAl/PoT9r/1rH/fbFeqV+YtbM196Jfl/HcvwR6XfBoJcAAAADDuCXKA5CHKBmvgGcdiDXN8z9it/+w9pL8o8GgvVBo933jMhnWZvlnXtj35mlspS4GefV0Gk7Nq9N/O4Qtk8uklamM8GuX7s29eXvnlloR7pdZBr99tvbr8vM62MKkHurXfcb5bM0s3lwnw6FwJtU3hc21qV3waCXAAAAAw7glygOQhygZr4BnHYg1zxN+765U13+FkyFATa+VevWZtOu+3OB9LHFfbGhmpQqGdv2qWbZwXar3bd9oZelm6WZeezQa7YYPRfr/9VZpqlYQZWrX43qQsXPvOTc/U6yLX7VNN0rsSo13DY3oOHDqePVwlyFYAfPnw0nR7oJnG6QVmYT2P6BgrD7To0xnGMemeH7VNv7cBvA0EuAAAAhh1BLtAcBLlATXyD2IQgV+Og2pBN9eTE59uGNTh79lwSitr5FJjqtQdbtn6Uma5enTYg1X67+76HM/OoF6j17e/8IDN90uQXkyAwUPjqt9cHuZOenZqZ/tiTz2amy5QXZ2fm+ejj7X6WXL0Ocjdv2ZbZln+65keZ1yyb3t+S6Qn93JQZ6bQqQa7q7666unXy1Ol0Hh1b3TzNzjNtxpx0+sWLFzPPrfD9+PET6XTRc9oAXTdIC/w2EOQCAABg2BHkAs1BkAvUxDeITQhyxQefKvXO/Jfrbmhd/7ObW1d987tt0xXsxQK556fObJtX474qbLXDIYTHfWCpUNKGhuG5FDQqQPTrVvkgV8fHj+uq8PSGX9+e9H796te/nZl2zT9fl1m+k14HuTL5hemZbdK+uvbHP2/dde+E1v/6P/+vbZrttVs1yA2lQFc3TfOP67jYgF4UJPv5dEzuuf93yT7w0xROB34bYucNAAAAMEwIcoHmIMgFauIbxKYEuRILYPNKPW337b88rm2MHWs1rxQi5g0hsOad99rmt6Wenwplw799kCsa69cO4ZBX2o4qwypIP4JcufeBR9q2z5dCbX9jtipBrno4+3Xa0radOXPWrP2K5StWtc0fq1cXLM4s57eBIBcAAADDjiAXaA6CXKAmvkFsUpArGzd90DZmri31iNWNr/RT+05emDqr9aUvf61tHQoib7ntvuSmZEWWLluZ+al+qJtuuTtZVj1Vw2PquRqjIQNuu+vBth6+4bVoeAU/hEQZupFbWM91P7nRT456/KnJ6TJ/+ddX+ckJnWfqmasw1W+vXoNuLGeHRAgOHT6Smff4iZF0WixE3brt49Y3vvW9tudQIL5n736z5nYr33o7umxY3ofM4rdBQ3AAAAAAw4wgF2gOglygJr5BbFqQG6hH5+q317ZmvvRKEnbq/zsFrzHab1rX+5u3Jj/NV0hYNTjVWKy6cZZusOWHYShLz6kbr2k7FCLm9TgdL7Tfjhw5luwzDVGgm4h1y4eotjfs+fMXWh9/siMZH7hqr2SdDwqEN2zcnPTO7vbYAAAAAMOIIBdoDoJcoCa+QWxqkIvhURTkAgAAAOgPglygOQhygZr4BpEgF4OOIBcAAAAYewS5QHMQ5AI18Q0iQS4GHUEuAAAAMPYIcoHmIMgFauIbRIJcDDoFubpRWiiNNwwAAACgvwhygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkEuAAAAAKAqglygOQhygZr4BpEgFwAAAABQFUEu0BwEuUBNfINIkAsAAAAAqIogF2gOglygJr5BJMgFAAAAAFRFkAs0B0EuUBPfIBLkAgAAAACqIsgFmoMgF6iJbxAJcgEAAAAAVRHkAs1BkAvUxDeIBLkAAAAAgKoIcoHmIMgFauIbRIJcAAAAAEBVBLlAcxDkAjXxDSJBLgAAAACgKoJcoDkIcoGa+AaRIBcAAAAAUBVBLtAcBLlATXyDSJALAAAAAKiKIBdoDoJcoCa+QSTIBQAAAABURZALNAdBLlAT3yAS5I5v586db1248Jl/GM7IyKnkHAUGhT5zjx474R8GYHxx6W+OkydP+4cBAOMEQS7QHAS5QE18g9jUIFev9+LFi62zZ88lr2k8Wv3O+taPf3JLUus2fOAn448mT5md7KPrf3F769jxET+5o4sXP0+WVU2dMc9PBnpOn6c33fpgct7eetfDXJz0waTnZqbv637s30OHj6brX7xkpZ88KvPmL0nXPXLylJ/cGAcOHm5d97Nbk/fJ9Nnz/WQAwDhAkAs0B0EuUBPfINryDalvaIcpyF2x6t00JL3t7t/5yeOCtits4/2/negno3U5hA37SLVg0XI/S0efffb7dPknJ73oJwM9t/XDTzLn7ae79vpZMEoTHpuc7t9+XPzt3XcwXf/cV1/3k0dl2qxX03U3udf27LmvZd4n/TiOAIDRIcgFmoMgF6iJbxCbGuTeed9jmQvEbnpy9tuceYvS7Vu4uHpAmef1N95q/fzGu5PaOQQB0u33PJIbiOk8vuHme5PX+vjEKZlpAUEuxpqGSwnnnHoc6nMUvUWQO/i2frg93Q8PTHjaTwYAjAMEuUBzEOQCNfENYhODXF0Yh4vDUC/3+EK8F3RMPvr409bH23f6SaMyZ97i9HVv+2iHnzxwdA5u2LQl+amzp/M4vFaF9zEEuajD6TNnW2vXvd86e+68n4QeIMgdDvsPHGpt2rxt3A6BBABNR5ALNAdBLlAT3yA2MchVaOuDXPXYbMofCMMW5BYhyAWaiSAXAID+I8gFmoMgF6iJbxCbFuTqdSq0DeGtDXW3f7rbz17o+ImR1uYtHyUX9Lqzdllll9MxuHBpn6o6/fFSZp0aT1brmm5CAvVkDc+hYxyj7dh/4HCy/iNHj3fclhgtE54nr2eVHu/0esNr0H8DvV49pkA2CPvu3Lnz6WvVTaXC+nWjuyAvyNX26JxQff75F+njVWm/xl6X7sSunw6r1/XISPENjfT8Wv73v7+y3Vrvjp17Wu9/8GFy074YPa7hM9Sj7dNL8545c9bPUkjbqB7hW7Z+nJxjYfvt8fTnTbfbqv2t3nea5/CRY7nngOQ9/5lL69Z5qpsk+e0SnTd79h5I5jl1+oyfnKFzROu3wx5o+W0fbU+G8LDnYKDzTj3Dtf5OryF2Lkve+aJjp/Vq+/0yRbo5hlVoPQobw7blvb+D2H7Vftu1e18ydvCJkZOF+83SubZv/+VzZvee/Zn90qsg9+SpS/vvk0v7b9snyfs0rKtKkKv3gvaNtlPvw7z3QBALcvW84XP+kx27Op6/+lzTfi46HmXbGLufdZzsfo6932O6XUfeOZq3jN532kd6H/pl8ui1azkdYx1re3zy3o8AgMsIcoHmIMgFauIbRFu+IfUN7TAEudsvXQCHC2SNQauLt/DvZ1+Y5Wdvo9f77Auz0ztp29LNyQ4cOuIXSXSz3Fur30vn0cWvV3WdN/7mgbb5bL268I3M/ApU7n3oqbb5VI9PnHrpWF/IzF9EYxCHZfP283NTX0rn0YV4jO7iruk33fpg+thTz0xLlwsX9es2bG7bZl+BD3IV3Nz9wBNt8ysIVnhTlcYkDutQoKZA85Y7JrStXz2GFfbE2FBKwfWjT72QWfbd9zZl5td2akxJ/xyqex58MglSimj52D741X/cl/TiViATHvPDklTdVoW3dpxjWzr/FER6NkR7ef6S5H2tc8Iuq3NFX1SIQqNZcxa2rf+nv7qztX7j5Xm88L7SflBArP3ml39lwdL0omPlqrXp+RlK65j98mt+1Qk9t+a5+faHMo/78+Xtdzck4zz755703MwkXMozmmNYhoaE0OeAX79Kr0mBWIzdr9r+3z76bNvy2jd5nwHB/NeWRT/7ps6Yl4xBPNogV18GxI65PkcVOJcJcvVFkj6j/TpUet36YizGB7n6/I+dA3qPx9Zhv8DK+7yV5SvfSefTa/K033Ru5O1nfXZ22s+jWYdtN/QFpOWXmT57ftv7T7VoyYrkPZrnvfWbc/et9v2SZavSx/LOaQBoMoJcoDkIcoGa+AbRlm9IfUM7DEGuLmrDRdnBPwadIVS7fNOh/J6XIydPtYVFsfLBULfLrVy9Np2mHpVWN+tUgOOn21IoFaiXaOzC25bCFgXhZYXgShfNMaGntEoX+J4N3e10ha/h8dArVxfnfnt9BTbIfeiRZwr3q4KC2Fi8RWwwp7Dcr9OvX8fWs2GXPYdD2XBUwU4s0LClY6ugKkYBfqflFaKF//chVpVttV9W5JXOG7+tNkR7evKMwu1Vr+e8UDtU7IuScP7rSxF/c0Rbev12f8Rq9tzX/OpLBbkz5yxoW5ctLRsLqUZ7DDvRFw6d1q/SGMCe3a+xoNlWCOK9Tvtb67bHvOrFn4L7cHzySl8ghP+P7T+1lUXnjUqfebHeuTbI1eeyX86WPk8VXFsK2cN0Bf55lq14O51PPba92JcftvT6HvzdpPTfsf08mnXY8ey1Tyz7OaP3l1+vrVh7Inrf+3lt6Ry3x0LtIgAgiyAXaA6CXKAmvkG05RtS39AOepCrkDaECLZH5+KlK9MLtVjwENhQ5a77H09+Xq1eqeo1N2X6y+k0XVjbPza6Xa4oyO1mnRoeQT/rtcGnXrseU+nmS4F6n4Z5nps6JwkvFThsfH9r6/7fTkynFfX28iZPudIzzf8s2Ia0Ybu9FaveTafb0CEW5Kqnn16TfoIcpqknXXittkeqDXJDPfLE80ngqMDQ99jKG2s3jw3mQilk0uvRsA0KpWx4rHDOf6Hgey3qPH5h2tykt6Z6H4fwVz+/t4G4grKly1cnr1mhjT12Cqp8b1ftC9tzW9s1f9Gy1o5L27n6nfWtxydOaXstPsQqu63qJWu/LNC5tG7DB0loq96Ytjekgh7LBrmhFOaoZ67eK7GelHq92hc69noee44r+PP8FxnqfartUpjzwotz29av0r7QOaefaNvzUuWHQygT5Kq0HerRqOfV+9wGiCqdR1YvjmEn9jzSOaZAXsdEz6HPC7vtPmj2+1W9rle/vS5ZXsfO9lbXuay2x/Lhm/bzO2s3JvtH50AsgK1y8afnswGsvgDTPtdxXbVmXevhx59rW7/ff3q+J56+cvx1DNQzVO/3N996J/nMDtN07vnhcGx4GEo929dcOn76jJ/7yuLMZ5KOh93PvQhybfsT1qPPQvVK9c8fyu/n0a6jbJCr0rr03tH7W+eC3f8q/wWceqTbc1GfyTo2+sWE1hP7lQBBLgC0I8gFmoMgF6iJbxBt+YbUN7SDHuQqmAsXZAsXL08f10/p7cVcnhCQ6eJP+8FTz8CwHvsT+W6XKwpyu12ndLrZmXrzFe0PjXGp8EnT1WPJBzV51Ds4rNcH5vbnq6E0HqRlL8x13gWxIDfQtoVpeQGsD3IVNvg/Fs+dv5C56C/7msUHc7Ebqil4tqHGvPlLMtNtaKFjH/s5tdifG+vY+dehf9sgSiGapecN0xRg+f0p/maBPsQqu60K38J8sR5z+swJAbcPBH2Qq4DS0rI2qNV56rdDvRht6OcDQ3u8Y2GYttlug+9Rr31texr6MbjLBrmx8Mh+qaFjbvXiGBZREB/2jcIu+14M7DApGrvW8uGZ3+/6t/0yQoFboH1ql7e/IggU/vmw2L8PitjPIp03sXGl9cWEXb/ff/azW8fA95jVa7RhrkJeywe5sR7dOg62V7TC9GC0Qa7aFPv8Cjg9tZs+NLf7uRfrKBvk6nzRujw79IeOq2V7g2s+T583fmih2HsRAJqOIBdoDoJcoCa+QbTlG1Lf0A56kGt/autvLmUv6mzP1ED7J0zXxbPvQZWn2+UkL8gdzTqlU5Crm2OF6bpY7hUbmKrXnhWOjULOEMIsX/l2Zp5wwa/eZ1avg1zfGzawPQ3Vu7ksG8wp1IkFX2LHLPU9UG1osebdDZlpgX0dOi/yxjDWOMI2PLE/7bbBo+/BFuj8sz0yfYhVZlvLsj3PNZZuYINc27vessNY+PMtsOP3+jGlbRioMUc99T4N03VcY3QOh3mWvbkmM61MkDvx2emZaYE+j8M86n1r9eIYjpZ6Lod1+wDN7lf/ZU1gh05Yv/GD9HHbc1+9rvMu6rRMmE+VN1+MDf/UCzdG+z98mRXbf7Y9yTsGdhxbnYeWDXL1uZX3xZHdz/rFQzDaIFfhe3hcPbjzqPdqmE9l93Mv1lE2yFVP6Ri7bv1SJdBzhPNQIXDeZ76+YLNhOUEuALQjyAWagyAXqIlvEG35htQ3tIMc5CqcDRdjsUDP9nBbvGSln5ywF+fq7adhBmK9Yb1ul8sLcqXbdUqnINf3pFKwoZ909+IPqPCTZRs+KYgOz6WfvD/y5PPJ/9uehvaCXkGX1csg14dqlnrNhfliY6rmscFcrOepFXoiKjywbGjhh6UIdCzDPOp1W8TuM3tuhdBCIWMR22vRh1hltrUMHTsb5Gp4iMAGuXkhrYZyCPPoJ+kx9r3gb2QXgp68kFbDUoRl88Iye0z8eVsmyFXQlieMee3PlV4cw9HQ54RunBXWrWEdrLBf/XZb6rEf2wf2cR8QW/4zrMpnV9iv2s4iGhogtv/sZ07Ra5TwXHrfWzbIfe31bG9dyz6X2oFgtEGu/QIiLyQV7VcbzNv93It1lA1yw3j3nnpTh3lsWK5wPTye92VJYH/lQJALAO0IcoHmIMgFauIbRFu+IfUN7SAHuQpnw8WYenupp40t9QwL0/N6+OkiLsxjS6Gqev/l9S7rdrmiILfbdUqnIFcWLFretm5dbOuiVj+R9T8VLsv2kgw9QXUzqvCYQlVd9Ifn03kn9qZY/qK9l0Guhm/Is3JV/vEoYoM5P56pp5uthXntT7ptaJH3h6wdqkAhUxENLeK3ST/VDo916omtYQLS5yoIcvO21VJP29defzPpSar3ngJI/9N4VV6Qq2ECYmyQq7F5Y+wQA3lBrn4CH2ODXI2ZG6OxQMM83QS5RcGRxlbVPDZw7NUxLEMhvc4dfdGj16AwMnbc8oLcvPejaIzhsLztyWxvapX32RXYcYLLnIeicYzDMkXbJzqnYvtP+8W+foW5eWXnsz3obZDrx6717Pja+ryT0Qa5WiY87t8Xnh2P2u7nXqyjbJAbXrdnvyTUF4SBfikQHvfvS8+2WUXvRwBoKoJcoDkIcoGa+AbRlm9IfUM7yEGuvdgtU3ZcRq/4glkAAEPtSURBVEs/p7Y/SfalC9JYL8RulisKcqWbdUqZIFcUqBbtN42DGYLWsjReb1g+/GR6+h9DixCY2SBEN/YR9ZrSv2O9DHsZ5MbGrw16EeQqtC5ix960wWWZcPSNN9ek82hbi8TGi7ZjRStQLqLjEub1IWCZbRVN8zfuKqomBrlaPk8syO3VMexEvwCIhbaxygty8/ar5AW5diiMozljLwd2KJ2i89CyPTWLPgtEN9UK89r9p5v1+X1QpuxwLTbIzRuaIbDvt3DzwtEGubrxYHjcj7Hu2V+H2P3ci3WUDXLzjm9ekGu/9Mr7BU5gP6MIcgGgHUEu0BwEuUBNfINoyzekvqEd1CDX3xipTPmLRk8XzMtXvpP04PQ9q3TTKt0cK6bKcp2C3KDKOqVskBto/ynss2NvhvI3WupE51nYxjDMQOg5Z29AF8afDDf5CUMOPPvClXEgg0EKcnWcitjwSWFMUCa0sOHs7Jdf85Mz7BikNvQt+7P8xUuv9HD3IWCZbRW7DSr17FRPcA2DoP27fceuzHilBLlZsSBXenEMi9ixgVX6wkg9wNVrXjd8U9hlA8JeBrlz5i1KH9fwDUXCsAWqovPQ0lipYRnt3yL2/VbUI1ehd15pqIjw/+oNHNggV+PgFon1PC4b5Novf2yQq19dhMeLvhTS8+UNi9CLdfQryLVjLRd95ot9HoJcAGhHkAs0B0EuUBPfINryDalvaAc1yLUXxQrKdAEeKxvUKQzRPihD+0Q/1bQ3kNL6Oum0XNkg1+q0Tqka5Fq6QY+CmbC8Ktbrt0gIXtXb14ZhtkdaCGwUcp0YOZnOY298FAxSkJsX+AXhuPkQrkxoYYfb6PSzehuQ2qDIDu3gg81A+1QhXJjPh4BltlVCEOm3wVLYH+YhyM3KC3J7cQyL2OENZs1Z6CcnNmzaks7TyyBXY2iHxxVE57GBrKroPPRCMKrtLFpOX5bE9p/ayvB4pzFy89g2S19u5LHPZYNneyO1ovGydfzCfDbItb+cKPossWNAq+z+6sU6+hXkav5wHup9qBtAxpw5ey4TMhPkAkA7glygOQhygZr4BtGWb0h9QzuIQa5eh+2levFi/IItUK/WMK8Nl/T61ctJlRfw2h5I4aKz2+UkL8gdzTrFBrnvrW8PuNQzTOtWT968P5psEFgl1BQbsIWxWn1wae82rvFTw/9rPGOvbJCbd9OqsQxy1bPYb2OgoDLM538WXya0sON7KnzQDf5iFPLY94Qdm9OOB6ltDeMYWzZcVfkQsMy26nMjzKNe43k0LcxHkJuVF+T24hgWsQF83pc4k6fMTufpZZBrg73b73kk9/NPvbrt68s7D2Ps50ne+LQKim1PWL//wk0dVRoDOo/237HjI62RkVOZx22Qq5uY6TM/xo7Ta2/6p9cb9nPemO9it9O+VhsQq+yvJQINbWFDTpXdz71YR7+CXLHj8urXJn4dOsb2XFcR5AJAO4JcoDkIcoGa+AbRlm9IfUM7iEGuwthwEWbvWp0nb/73P/gwfVzj+cUCBBugaAw+6XY5yQtyR7NOsTe60ji33vTZ89PpeT/Rv/ehp9J5wriMZamXU1g2XMT7IRP0msK08N+8HrVFQa7O6zBNFQs3xzLIVWk4Cv/HqIJz24vah19lQguxAbv2lw+AtF/tsfM95RQGh2EtVAoCX5z5StKr+7XXV2TCj1A+xCq7reH1KlT2x038+LkEuVl5QW4vjmER+2WXPSaB/QxV+XO5036VvCBX55P9EmLmnAVmqctiY9QWnYfe8pVXhoXQtuoGcl4YszuU338aQiVM0/6PBd62x6r/MsMGuSqNne35ENR/ztse1/pizNOwDvY5fGhth45Q6X2toRj0iw+1G34YH5Xfz6NdRz+DXI09bPefAvNXFixN9ot6ndugPhRBLgC0I8gFmoMgF6iJbxBt+YbUN7SDGOTam+NoHMJO9DrtxV3oAarHbdCmHpO6cNbF9Ke79mbCT1X4qWa3y0lekDuadYqGJ7DTn548Iwm9NG6gHDx0JDNdvfcUzhw/MZL8DNaOlatecd2wQZNqw6b2Y2NDSZXC6ZiiIFfsBbl6pynMskM0jHWQq9J+U09jbYfCqDAGcJjmA9gyoYVcuPBZ5vVqP8+bvyTZv9p/CivCNIVHdhzeQKGTPb9itWTZqvT/fYhVdlvtXe11XPQFg8bF1VirCrv9cxLkZuUFuTLaY1jE9nZVEKef52/7aHsy7MGU6S+3PU8vg1yxN2lT6fNIY/IqNFSv1E7hYCdq++xNJLUfFYTrHNKxsTfmCuX3n57Pfn7p/a2bOupzQ8NOaH12+RWr3s0s74NclbZJx0y/otBnsn2djzzxfNtrnPHSlXZA+1zbrn2n57c9pkP5IFf02eHns6UvBTR0Q/i334bRrqOfQa74YR18aR/bITQIcgGgHUEu0BwEuUBNfINoyzekvqEdtCBXIWy4ANOFrLa9DPUUCsvZC2wFFf5noLHyPaO6XS4vyJVu1ynqsRcLedQbKbBjJ+aVgkAffpVlL45VsSEvbBCn2r1nv58l0SnItYGVrWAsg1zbGzpWOi5nIr2Gy4QWgQLG2PG1pYBCP+nOo95qCof8cgqZ9WWBpofHfIhVdlsPHDpSuJ3aRnvne4LcrKIgV0ZzDIvoiyHb2zNW9vOj10Gu6DH/nLYU7tqxgovOwxh9IWKH9YhVpyBc7U0s9PXlA0qxQa69IVms9MWNvVFaoMfsFzexsl+mxIJc0fno36c6huoxr+ewX5bm7edu19HvIFf0umP76alnpiW9sW0PbYJcAGhHkAs0B0EuUBPfINryDalvaActyFWIGS7AFAiV9cmOXely6gVlKfxSSOBDVP1bj4derV43y61+e106X+xmUN2sM9A0hU92WRvkinrZ3XLHhMy6VepdpqEQfE/fKtTzMqxPPbJi7J3XFerl/QGnHsVhvlggrHNZvTz9eIeBlgmPaV15Oh2PPD6YU2AY+3m7gif1ho7J67GW58jR45mfwNtSoKEQtQyFLNombbPdtwrVw/p8kFplW0+eOp3p/Wj3hc5R9Z4Oj+3avS9dTuOOhsf9eRvYn3Wv37jFT05o2TCPH8s0vDfyzk/1eg3LqodkjD3PFfxZoRe23mOWDQi1fJ4wvmmnG2p1cww7UTsQ6/2qUFEhrI5VeEw9z61O+1VsT0mN9x2jgM2Hgyr1ANX4pjbE7nQexujzVe8Vv34F4Xp9ujmjfc4YfZmoANJ/Rqv0eZT3OWJ70+qXENs/3R39LFav39jQD4HGw9Z+8MdJXx6ondMXleExfd7n0f7T+a7XrZtP2v1pf6FRtJ+7WYdee3hc+8Qq8zmj89TuqyIaE17vEX3Bob93gkVLrnwGFX2xAgBNRZALNAdBLlAT3yDa8g2pb2gHLcjtN4VQuiiNjX9YpNvlinS7Th1X3exKF/x5fyDpXFCopjEdYzcbGyTqfavXqvN2rPggN1CopmPWz/2qQEvHbucfe2DGeu5ZGr9Y812etz0UD2wAVGbIkk50joWwcTRfEGDsj6HCNoXCsZ7k/abPLIWCeh9paBmdR72m81Hnparb96k+Z7WftJ36EkXvy27os1qfF/rSoejYxujLHb2G2HAqnvZjOIe03Xm0//N6lvdiHf2kbQrbl9f2if1CzN4YEgBwGUEu0BwEuUBNfINoyzekvqElyAWqywtyxyN7kyb1PIwNR6IvC2wPv6qBEvqLY4jRUvtvezvrBpsxdmgS3SDM6sU6+unxiVPS5/W9fQPbM1w9qAEA7QhygeYgyAVq4htEglygvwYpyFVPQRvwqYecbsamGyzpbu76f/szcQ2BgPGFY4hesEMKqNQzVcN+KJDVlwVhaI9QduiTXq6jX+zQIioN76AbQqp3+up31mfGXlctXrLSrwIA0CLIBZqEIBeoiW8QCXKB/hqkIFcUssTG9PSlMSfHcogKlMcxxGhpGJbYzfJ86TzL+1zrxTr6SWMb+22JlQJpAEAcQS7QHAS5QE18g0iQC/SXxiJVD0nVp7v2+snjksZZ1R3tb7j53kygodegnmvLVrztF8E4wzFEL+imgRqiw38xoJ7euomobgrXSS/W0S8ac/iBCU+33ThP7xsNv7D1w/ybwAEACHKBJiHIBWriG0SCXABF9J7XjZIUDGIwcQzRC7qhnc4j/T3QrV6so190Y7syN4UEAFxBkAs0B0EuUBPfIBLkAgAAAACqIsgFmoMgF6iJbxAJcgEAAAAAVRHkAs1BkAvUxDeIBLkAAAAAgKoIcoHmIMgFauIbRIJcAAAAAEBVBLlAcxDkAjXxDSJBLgAAAACgKoJcoDkIcoGa+AaRIBcAAAAAUBVBLtAcBLlATXyDSJALAAAAAKiKIBdoDoJcoCa+QSTIBQAAAABURZALNAdBLlAT3yAS5AIAAAAAqiLIBZqDIBeoiW8QCXIBAAAAAFUR5ALNQZAL1MQ3iAS5AAAAAICqCHKB5iDIBWriG0SCXAAAAABAVQS5QHMQ5AI18Q0iQS4AAAAAoCqCXKA5CHKBmvgGkSAXAAAAAFAVQS7QHAS5QE18g0iQCwAAAACoiiAXaA6CXKAmvkEkyAUAAAAAVEWQCzQHQS5QE98gEuQCAAAAAKoiyAWagyAXqIlvEAlyAQAAAABVEeQCzUGQC9TEN4gEuQAAAACAqghygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkEuAAAAAKAqglygOQhygZr4BpEgFwAAAABQFUEu0BwEuUBNfINIkAsAAAAAqIogF2gOglygJr5BJMgFAAAAAFRFkAs0B0EuUBPfIBLkAgAAAACqIsgFmoMgF6iJbxAJcgEAAAAAVRHkAs1BkAvUxDeIBLkAAAAAgKoIcoHmIMgFauIbRIJcAAAAAEBVBLlAcxDkAjXxDSJBLgAAAACgKoJcoDkIcoGa+AaRIBcAAAAAUBVBLtAcBLlATXyDSJALAAAAAKiKIBdoDoJcoCa+QSTIBQAAAABURZALNAdBLlAT3yAS5AIAAAAAqiLIBZqDIBeoiW8QCXIBAAAAAFUR5ALNQZAL1MQ3iAS5AAAAAICqCHKB5iDIBWriG0SCXAAAAABAVQS5QHMQ5AI18Q0iQS4AAAAAoCqCXKA5CHKBmvgGkSAXAAAAAFAVQS7QHAS5QE18g0iQCwAAAACoiiAXaA6CXKAmvkEkyAUAAAAAVEWQCzQHQS5QE98gEuQCAAAAAKoiyAWagyAXqIlvEAlyAQAAAABVEeQCzUGQC9TEN4gEuQAAAACAqghygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkFuPY4ePd569vlprc0fbPWTStP+fmnu/NbrS9+8dFz+009Gn7H/AQAA0GQEuUBzEOQCNfEN4rAHuRcufJaWXkMevX47b9EfCwrt7LxVnT9/ofXf/vuftf7Lf/2TpJYuW+lnKeVbV38/Xcetd9zvJw8snUfarydGTibn1Xg1rPsfAAAAKIMgF2gOglygJr5BHOYg99ix42nQppo2Y46fJbVx0weZeTdv2eZnSWk9dt6Rk6f8LIWWr1iVWf4XN97mZ+lIYbBdx//4n1/1swwk/7r+5E+/NC57u/rtHJb9DwAAAJRFkAs0B0EuUBPfIA5zkCsK2ELYdt1PbvSTUxMemZgJ5h578lk/S+pfr/9VOt+Xvvw1P7kj7SfbI/eN5W9lpn/xxR+SADPUho2bM9ODb3/nB+k6brvrQT95IGmoAnscVAq+x6N+7f+yx388uOafr0u3c+KkF/xkAAAADDGCXKA5CHKBmvgGcdiD3F//x11p2Pbnf/EVPzl11Te/mwkPv/mP1/hZUn/6Z19O5/vN7ff5yaUcP34i6dm7ZetHflLr4qV9ardl9dtr/SwJ7fP5C19PgmAdn2FghysIde2Pf+5nGxf6tf/LHv/x4Ovf+E66nfc/9JifDAAAgCFGkAs0B0EuUBPfIA57kKsbUdlQ7PDho36Wtp/Jh9Lr8Q4dPpKZpx+9RQcpyOslHRt/DEKdO3fezz60Bun4E+QCAAA0F0Eu0BwEuUBNfIM47EHu2bPnMqGYelB66lHpg0PVipVr/KytVxcszsxjb3amIHLHp7uS0vOK9tvmD7YmvW/tTc1279mXzqvgTrT/9O+t2z7OPIeW9euVo0ePp4+fPnMmfVxi2yK7du9tzXzplda8Vxclz/P5peNYxvYdO1uLlyxvzZw9r7X2vY3Zde7akz6XXm+3npz4fPqaNWzBX/3N36f/njXnVT97rpOnTifh5wtTZyXHdv+Bg6X++NNYvJ9s/7Q1d97CZB/puBXdzK5o/1s6rpve35IcR51/2pexcX+rHn9L59CHH21vvTJ/cTK/xnyOfRERaP6wTp2LgZZZvWZta8qLs1tvrXqndeTIMbPUZdqXO3dePuZ/+ddXpdv581/+Jl2n9g0AAACGG0Eu0BwEuUBNfIM47EGu2F6DGmrB0/AIYbodu/a2Ox/ws2aGavjGt76XmWaHZ1AoqdDTrs8O7RAeU7397rrkMR8Sx+rpZ6ak6/jO965NH39wwuPp4+K3Zc077yXjmPr1aQzh9RvezyxrKZSz+y+UXtekyS+2Tp0+k3lc83fLhoIzZr3cevSJZ9J/a8iFTrZ9+EkyZrHfVpVeu3pnxyhUveveCW3LhPrhv/w0GtQW7X9RoPxP1/yobX2hNC6zDb6rHn/Re+6W266cv750Huimf57OBzuf9sG1P/pZ2/IqvQ/0/g4U0vp5fOl1AwAAYLgR5ALNQZAL1MQ3iE0Ich+a8EQaMKmXp2fDP/X8DP+vYNGzYePDjz6dmWbD0x9ce31buFVXkKubvNlAOVZ79u7PLC8jJ08l2+zntaWbfNl/dxvkqjepXY9CUPUeto/FhsUIFry2pG3bYvXAb7M//9ewGgrk/Xy+NC7ygYOHMssW7X/1urVjKeeVxmIOYW7V43/8xEjmZn55pe3wx8UHuepN65fz0wOCXAAAAAhBLtAcBLlATXyD2IQgVz1Obch05szZdJodl1WBl1637blqfyKuXpl2Pfq5vOVvmKZSgKphAm749e2Z3sB2nhDkKrhU79nfPfZ0ZvpPf3FL8rhKP7sPioLE2LboMQWZCrZtIK1Sr1NLQy74dSjUvfHmO1t33jMhM+yBLR8YlnX73Q+l67j6uz9MH//K3/5D+vgTE58zS2TZwFn/r6EjdHw0RMDfXXV1ZhsVEgdzXl6QmXbTLXe33lm7PhlWQ6/TTlNobRXtfx0zu6wC2A0bNydDH+jmbXaahn+Qqsf/vgcfzcynYzjp2amtx5+a3BZOK8y3fJCr0rmq+fQ8fvtVH3+yI1n24sWL6fbY94qeMzye1/sZAAAAw4MgF2gOglygJr5BbEKQq5+N2x6pduzbl+bOTx//xY23JY/ZEEtBX6DlbOjlxzn1wad6JdqfpFt2vhDkBmVvdlUUJPpt0dABlp7DDpmg12P53qHqYez/gFJoaOdRdRPk6tyygaCGpAgUSobHYz2kRUMq2G04eOhwZrqCexv0KtwNrvnn69LHddy9Z56blk7XNtp9kLf//flmz6Hg+z/8t3S6hjSwyhx/bYd9Dn/8RedzmK4vKSwf5Oq17dt/MDOPHzv6+akzM9OFm50BAAA0F0Eu0BwEuUBNfINoyzekvqEd1CBXbGB37wOPpI//6N9+mT4eehEuWrwsfcz2ZNRy4XEFm54NTxWc+aDXsgFZv4Nc/fw+9sePbr5mn8eOA2uHTFAImnfTL7v/VN0Eubq5ll2Hxt0NNOSDnabQ1rMBu2rvvgN+llxf/fq30+X+/ac3+cmF8va/hmuw21PlRm1S9vjb92bM5i3bMuuxQ1P4IFfBfYzteX3rHff7yQS5AAAADUaQCzQHQS5QE98gNiXIVW/CEDgp5BS9ZtsTVAGcnD17Ln3M9sK04eiL019K1x3Y6bHenVaYT9XvIPf6n92cmRbs2rUn8zz6aX+gsVvD47EbxAUKv+06uglyFaCG5fWaPDu8goZg8PwN13TMdCMxDQWg87iIvdGdSr2oFy9ZHr25mVe0//3QE9qHa9/bmBzbTsoe/zz6AkH7ZMvWjzLrscfXB7n7D2R74wY2qNf/ewS5AAAAzUWQCzQHQS5QE98gNiXI9aGlwjJ7g61vXf39zPx2jNGPPt7eFq7Fbg5mw1ONE1rErqvfQa6GJ4jRzczs84SgT+eC/dn+tBlz3JJXaBgDu46qQa7OGbu8AliNS2zrltuuhK0KaXUuegpK7XpC6XUonNWYuXouT9ubdyM4DeWgcXJ1/GOK9v/8ha+3rS+Ujo2GpbDjL1tlj79ovF99SaHxcTvdXK0oyM2jMYPDPAS5AAAAsAhygeYgyAVq4hvEpgS5YoOudes3JTegCv9WsGbpxlp2muYP/9ZQAzHjNcjN25ayQe7Uae29jwONq2rXUTXI1c2/7PJlatXqd/1qkm1WCGx7WMdKw2Z4n2z/NAny/by2dMO60GM7KNr/suj1Za0vfflrbeuypaDY/2Fa9vjrnOwU3toiyAUAAEAvEeQCzUGQC9TEN4i2fEPqG9pBD3J/dsOVm5g99uSzmSDOB5D6WX6YpvnsTbdu+PXtmXmDMuFpEOZTjbcgV2ywmfd6xY4nrPL7sRP7GsqWHbfY07ACy1esSoZMsEMy2MrbnwcOHkpCe92ILBYIq5e2VbT/LY1Vq+l5YfFDE57IzF/m+GvoB78eBa0PP/p0EryrR7C/YR1BLgAAAHqJIBdoDoJcoCa+QWxSkGt/7m5DNfVqjLG9He38sV6dUiY8DcJ8qvEY5N5938Pp49oP9gZkgc4ZexM5VZUg9/jxE5llVQppY+Xniw2TEHPo8JHMTepUv7zpDj9bG53vGv/Xh8HHjl05r4v2fx716n1h6qxMUKyb0Vlljv/CRUsz88SGf9i5M38MZIJcAAAAjBZBLtAcBLlATXyD2KQg98TIyUx4FerGm+/0syZ+ceNtbfOqYqGmlAlPA7u+TkHuzJdeyUwPioLEMttSFOT6nrYaWuCLL/6QTtf5ct+Dj2bmUVUJcp95blpm2TNnzvpZUroZl51XY94Ge/cdSHq9qhTcxtjA+e+uujp5TPs5LKfSOe4pILXP+9aqd9Jpeftf+zWsc/uOnenjln/tev8EZY6/DVh1Y7WYSZNfzKyn30FuUU9pAAAADB+CXKA5CHKBmvgGsUlBrvgelqo3lr/lZ0uoR6af96tf/7afLVUmPA3sOn2Qq2Nhp+tmXRoywMsLEqXMthQFuTreel47XePmatiBa3/88+jQA6oqQa49FnquThTAhvn12gMF8XYbNUSCdfHixcxz6cZgcuTIscy233bXg5nlZMFrSzLzaDzdIG//+2WWLluZTgvszdm0zVaZ4z/5hemZefx+Vy9efxO3fgS5dh/onDh37ryfBQAAAEOKIBdoDoJcoCa+QWxakGuHDAiV9zN9/Qzez6teqHnKhKeBXacPckW9LO08CuXUq1TjvwZ5QaKU2ZaiIFcuXPisbTt8PfrEM5l/+0Axj+azy815eYGfpY3Gr7XLaGgGseMZqxQoqjf1jFkvJ9vnbzimgD5QqGunXf3dH7YeeXxSa9qMOZkxlVUKg+0fkXn7Xz2XfdCt8Pu5KTNazz4/LXkOO+3WO+5Plw38fvfH3w+boOl6Lffc/7uk97SdFqofQa7GIvbPo/2iMagBAAAw3AhygeYgyAVq4hvEpgW56qloQyeFakV8KPbuexv8LKky4Wlg1xkLcmfNebUtIFM9/cyUdJ68IFHKbEunIFfUa/Vfr/9V23b8+V98JRlzWGGvfbxskOuHZTh79pyfpc3BQ4czy2jogOCB3z7Wto2x8vtCgagPemOlEHfP3v2ZZYv2v8Ji3yM2VhqOIPZFQpnjb3v1xsqHrP0Icn2gHKpMD2sAAAAMNoJcoDkIcoGa+AaxaUGufmZvAyeNVVrE9wL9/NLrzvPNf7wmnU/LFbHrXPveRj85oXFqfe9Nu1479MGERyaaJctti8b6tevet/+gnyWl3skaL3bzB1tbhw8fTf+Y8uMO79q1xy0ZZ8PT//1//9VPzmWHV/jGt76XmbZu/abMmK2hFKjqZnXa9hidu+oVa29uF0o3IlMv7thxL9r/ovF6NRRFLNBVMPzS3Pl+kYxOx1/0b4Xqdh71BlZvZIXj9nGNJRzonLPT8tgw+N9/epOfnNB+vf5nN2fWV+WYAgAAYDAR5ALNQZAL1MQ3iE0LcgeRfqqvsUcVpo6Vo0ePJ8GoatP7W/zk1IqVazIBXpmetf2mc1eh9MZNHyS9eKv84ad9vGXrR62t2z6O9pTt1vETI633N29Neiz78W47KXP8T546nWyzDdnHmj4jtI06B+raBgAAAIwdglygOQhygZr4BtGWb0h9Q0uQ2xwa7sEGtI8/NdnPkgy7oB6rYR71sgUAAADQDAS5QHMQ5AI18Q0iQS7y6Of/Nsz9y7++KrkBmMaj1Xipdprq1QWL/SoAAAAADCmCXKA5CHKBmvgGkSAXeTTEgO1xm1caA3bR68v84gAAAACGGEEu0BwEuUBNfINIkIsiOq662Zd64/oA96/+5u+Tm1zt3FnuBmcAAAAAhgdBLtAcBLlATXyDSJCLsnSTrt179rV27drT0g24AAAAADQXQS7QHAS5QE18g0iQCwAAAACoiiAXaA6CXKAmvkEkyAUAAAAAVEWQCzQHQS5QE98gEuQCAAAAAKoiyAWagyAXqIlvEAlyAQAAAABVEeQCzUGQC9TEN4gEuQAAAACAqghygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkEuAAAAAKAqglygOQhygZr4BpEgFwAAAABQFUEu0BwEuUBNfINIkAsAAAAAqIogF2gOglygJr5BJMgFAAAAAFRFkAs0B0EuUBPfIBLkAgAAAACqIsgFmoMgF6iJbxAJcgEAAAAAVRHkAs1BkAvUxDeIBLnVnDt3vnXhwmf+4XHti0vH7OTJ0/5hAM4gvr8xNkZGTiXtYLf4HAYADCOCXKA5CHKBmvgGsalBrl7vxYsXW2fPnkteUxmr31nf+vFPbklq3YYP/ORSJj03s3X9L25Paiz+IDlw8HDrup/dmmzz9Nnz/WQAf9SL9zfyrVy9Nv3s+3TXXj+5docOH023b/GSlZlpk6fMTs4LTTt2fCQzrQw+hwEAw4ogF2gOglygJr5BbGqQu2LVu2loc9vdv/OTozRfWOb+3070k0uZ8NjkdB1j8QfJ7Lmvpc83Vs8JDKJevL+R7/U33kr370cff+on127vvoPp9s199fX08YsXP898hi5YtNwsVQ6fwwCAYUWQCzQHQS5QE98g2vINqW9ohynIvfO+xzIX1mV6Wc2Ztyidf+Hi6hfzMtZB7tYPt6fP98CEp/1kFNi5a2/r5zfenZRCqPHq8YlT0u3U+xbtyhzLXry/kW9Qg1y5/Z5H0mm+N7HeczfcfG9ybum9GMPnMABgWBHkAs1BkAvUxDeITQxyjx47kV5Uh3rZXbjHaB8pgPh4+04/qbSxDnJl/4FDrU2bt5UeQgKXbftoR3qs5sxb7CePG/ZLCYLcuDLHshfvb+Qb5CBX7dyGTVuS4Rc8vefCcnov5uFzGAAwjAhygeYgyAVq4htEW74h9Q3tsAS5Cm3DhXco9aYaiz8Q6ghy0Z0y4d94QJDb2aAcy2E2yEFukbJBLgAAw4ggF2gOglygJr5BbFqQq9ep0DaEtzbU3f7pbj97hvbJhUuvUVX0x8Tnn3/R2rf/UOv9Dz5s7d6zPxljMSgb5Oq59h843Nq85aPWkaPHC+ftJGyzjqGlf8dez5kzZ5Pn3bP3QGbbR+v4iZHWx5/sbG3Z9knyHFVoOxS0aJ9qHZ2GwtDrib1urUch0vYdu1pnz503S1yhc1zLqQdeOFbTZ72ark/HN8/vf38x2W/azk937klupldEN9y7vM4r+1nHftfufa2tH37SOjFyMvfYf/bZ75Nlb73r4XQ7z116TbFjWoXd13ot/rzxYq9B+0Hbv2Xrx9HltW06hgpYNY96Osbmy6P1a//qXDp1+oyfnKpyLMu+v0XHVcM1qIeltqPT+TyW7zWtX786COvt1ANU+0DbpX1qHT5yLFlHlWOj59ZyOqbq2azzMehVkKttOXjoSLJtWo8+V6o4eep0+jk0MnIqPR5FQe4XfzyP9J4Lwvmi1xiW03sxHGe9L6zwuN+XvT43Tp48nex7HQPtm7DOvM9EAABGgyAXaA6CXKAmvkG05RtS39AOQ5CrAC9cdGtMTIUO4d/PvjDLz57x1ur30nkVcsXMf21ZendyW1NnzGtduPBZxyBXwd29Dz3Vtrzq8YlTL+3fC36RQgrLwvIKsCwbrOjC/+13NyRjPfrnnfTczOTiv1sK0W6+/aG29f70V3de2uezC0OKc5der46LX1b1q/+4L9nmGBvKvDx/SfJvG3iG0tiXOgesF16c2zafrXsefDIzvyjM0Wvx86p+++izSRgfE86Vux94ItnHmtcvr/2kQMdSkOjn89XpiwlP59bkKfHXoH2n4CvGvgYFR/amYSoftK7fuKV1428eaHsOvc688WuDdRs+iJ6j1//i9mT/+9CyyrEs8/7WeaQxTv16wroUwMeMxXtNX0zoM8KvU6X3n8LLGP+ZNH32/GR/+nUsWrIiaRfybNi0NXlP+uUeeuSZ5D022iBX26bP19i26fXlnZ/BgYOHk2Pkl9W5qC8dioLcp56Zlk4Lgfe6DZvb1uUrGIvPYW2/3oN+OR0TfWGiLxfDY2WGEgIAoAyCXKA5CHKBmvgG0ZZvSH1DOwxBrg0F1atLbrljQvJvBVJFvS1Xrl6bLqueeJ5CBn8RbUsBlw2B/B8kCjdiIbAthV0+eCxixwOeVhAgzJyzoO25bCkoKQpx8mx8f2vbunzddOuD0V51Ord8KBirNZEw14YyT0+eEQ1/bKkXW/Dc1Dlt0235IFfvCX/zPF/q/R3rnRuOt15nLISxpUA8OFMmyN2xyzxTMfU47PQaVK+9vsIvmr4Ghb2xwN4GuQpI/XRfCgxj8gJ9W3fd/3gm7KpyLDu9vxXGdzqPtC8UGHr9fq+p12anbVOtXfe+XzTz5cHsua+1LWNLX0jFKID089rSftGy4d/dBLkzXprftl5fO3K+vND7RZ+dfn5b+sIn/L8Pcp+c9GI6LfTKfW99+SC335/D+gKw0/G37ZN/fQAAdIsgF2gOglygJr5BbFKQq5A2hE4KD4PFS1emF7ixoCMoCnp8QKUL/3fWbkwCC4UjsRDB/0Fie4wqgNJPmhX+KQy9/7cT02mdeg5bZQMElfaNemppm3VndhtsqFasejezfCf6ybld/tGnXkhCV61/1tyFmV5n6hlr6fyzAZN6lWl7Ptmxq/Xue5uScNauWz3qLBvkhlKPTfUa1DQdSxt8PPH0i+my+rm1tt2eFzqeekxlg3QdQy0b5tN5pSBSvWHffOudJFgM0xTWKjC1fHCv3tir316XbKPOsfAlg0phsN6H4XnD9tjerdo/4fGins6W1vXIE8+n69BxmfvK4iScW7VmXevhx5/LbOPWD7dnlvevQcdK5/z6jR8kxyr0kvXH5LmpLyXhtH4CPmvOwsx6bGgtOh/tsjoXdMw1/IjvwWjD5irHsuj9rZ+5hyFZVArdly5fnaxj2Yq3M+9PvdftFwPS7/eafX5tm3oXa38r2LRhtp7XB4G+F7j2pbZXvYu1ffb8Vvkbfmkf2/eSnv+NN9ckz633QqwnfNUgV/sjLKvnmv3ya0kvU31eT3x2eub1+WFX9J6xX1LYz5LY+a3yQWcsyNUXBjr+Wk+YpvdiOLds7+x+fg5re+xngD6D5i9aluz/1e+sbz0+cUpmeZV/fQAAdIsgF2gOglygJr5BtOUbUt/QDnqQq1ApXMguXLw8fVxjJobH1WM2T17Qo31nQ6hXFiw1S12mC3kfeNk/SNSjqmgbNN5i6O2oIMOHMXmqBAixcMUGKPoJdlnaPhvuKHjxFITYgFvBU7Bk2ar0cc2jHnWenUf71vam9qHhqwvfMEtepkDKLu+VuUGWPScUEGn4DEvvGxvm+t6m9pzQcQ9BbaB/2wBRP4/2RnuzM4VuYXkdM70fvMVLrgSh/jywr0FBdCxA1nbZ17F85Tt+lmT4iDDdB44hjNTj+km7px7dYdkHfzfJT658LH2Qa4cf0HHyFxP6tw0EtR+sfr7XRk6eSo+BvhDRZ7Kn0DysW+N2WzbI1TGKHX87ZIPed5bdN3rdft/oywv7hUTe689j36cq9T72bE9if/zt54TO79h4xi9Myw7B4YPOWJAb6DwN0/JudtbPz+F5JujVZ5DfPvE3+PSvDwCAbhHkAs1BkAvUxDeItnxD6hvaQQ9y7bAG6kVm2Z+1n45c6Ete0GPH2dVPtfP+0FAPRXsxbefTjZPC4wpWeqVsgKBebTE67mEe9foqS70lw3IKMvP2ieZT+KRS77jADqmwY+ces0SWDZE09mpgg1yFU3nseMT2xkxSJvyz543vqRjYmyGpV7JlQ9DY8BJifxKtc8gbbZBr97Vec4yOn8I8HScdT/s89jUoVIyxP71XD8E89uf3YeiTskLPz16E8vb9rWAsPK4gMG+cao2dar+YsENp9PO9VoYNyX0Qa4Nc+x609B4M80yZ/nJmWvjCRv/176FAn7dheVUsrMxje6TGvgAQnZ/2iy7LhtDqPRujfW+HBfFB51gFud2cGwquw7S8zyDtH9tr278+AAC6RZALNAdBLlAT3yDa8g2pb2gHOchVOFt0sW17PKn3YUxe0KOf94bHfUhiad+F+VT2DxI/TeGDflY72j9aygYI+nl4nnADIx+QFFFYFtat56nChhaxUM6yx8S+Phvk+vDUsj8798Fhp/DPBjid9k3Yhz5UDiFo0fL2/Iodp9EEuX5fd3O+hdegn+TnsT0CNeREHvtaY2Mf5/FBnNfpWEre+9suq163RWzgZ9fRz/daJzqm9osV/ezeskGufw8E6sUa5rHvJ/u47ynq2fO0SpBre7QXjQ9u38v2C4WwTzt9lmg4kbC8DzrHKsjt5twIQbq+RChieyb71wcAQLcIcoHmIMgFauIbRFu+IfUN7SAHufan4erhqJ/127I/zbbj51p5QY/9WW9ej8bAjmXo/yBZsGh5Oi2UwgcFJAq//M/2yygbIBQFK6HHZqcgxLI3puq0Tzw71EVeMBLYnswKv4PMHehfiQd3Yo/dgYpBrm7iFaarFKjklZ3P9ugMIWjR69yy7UoIt+zNNX7yqIJcjeUali3ahiLhNShwy6PxicvsKzuPv7GW3i/bPtqeHDM9l4Itv0wor9OxlLz3t8a6Do8XnUuiIVvCvHYs036+1wKdj3pOvQ8UautLA9tbOlRRkJt3/mh4hDDPI08+nz5uz828/Rq88OKV4QuK9oFnxz/250veuaOxsEXDfITHOp3fGrIjzOuDzrEKcov2S+zcUGAdlu30Sw6N2533+gAA6BZBLtAcBLlATXyD2JQgV+FsuIgtU7GxSPOCHvVQC48fPVr8uu3wDrE/SPTT5qJt1ViXOhZllQ0QPv5kZ2aaFQsQOrE3zzrSYZ94Bw4eTpdVgFLEhql2bGEb5Ko3aJ7RBLl2O6uUbtAVlAlB+xnk6jWHZe0N36oo8xrs+VC2tEygL1vsMBqdyut0LCXv/W3HEF65aq1Zol3eONz9fK+JbogYC21jVRTkxj6TJC/IXb7y7fTxTvtGN6EL8xYFll7Z12VLN6ITO75up88S3ZwszOuDzrEKcqueG/ZLr4ceecbM3c4Ob+JfHwAA3SLIBZqDIBeoiW8QmxDk+htflSl/sS15Qc+ceYvSx/UT5iLh57Gqoj9ItM0Kguz4h6E6/YTZ6leA0Im9uZLG56zChrMak7WIHbvTBjVjEeT6HrkK0/JKQwaE/7c3AysTgvYzyLVDjmiM2W6UeQ22R67eL37/xPaVvamVHctYz6ef0eun4uotq/Pr00vngR2f1ut0LCXv/W3D2dhN+yw7nrENNvv5XtthelqqNE63eg6/tfq9ZNxohab6yX6Y3ssgVz2k031z6b1UxH4mVAlybY/cDZu2tJ0voTR+tF6v/j+Mga4bIIZltW+L2OPsg87xGuRK6I3caWiFxUuv/CrFvz4AALpFkAs0B0EuUBPfIDYhyNWFc7iAVa9NXbDHSsFLmE8Xxz4Uywt61m34IH1cF8t5bKigKvsHiW4gpPDFLqsQsYx+BghF7J3UfXDUiQ1GOj2nhpwI806fPT99fCyCXL0nwnSdL90oE4L2M8i1+7qb5aXMa7Djj9ohB8q4ePFiZhvP5txQy/Zk9zodS8l7fyt0DI93+vm6vbGW/QKjn+81ew7PmrPQT04oAA3z+PfjaIJcHYuy+0ZfyoR5qwS59vwuGiM3TxjORvs07/WJQvrwPD7oHM9BrnrihuX1uRejbbRjDfvXBwBAtwhygeYgyAVq4htEW74h9Q3tIAa5eh12/ESFQkX08/Iwr+9Jmhf02It0hRV5Ydiad9an86nsHyTqpalQ5Nz5C7l/qNiQyD5/kX4GCEVsL0GN16nzJkY9mLXP9BwK0wMbOuT1ctZ+sndif/+DD9NpvQ5y1QM0xoZM+w+0D8cRKHg/dnwk7SkYlAlBqwS5Z86e85M7sr1d31u/2U9O6JzWe0PHSvPbc7TMayh7wzAFhtpPqvBeta9fYy/H+N7RXpljmff+tuOs6rWqF3OMvnCxnzV2LOR+vtfCMqq8L3gmT7nSI7qXQa6EntDa5rznVwAblldVCXLtjROLbiapMcTDuWM/g20Iu2Xrx2aJK/Qlmx2/3AedZYNc/eIipp+fw68ufCNdXuMin418Bmi86TBP7PUBANAtglygOQhygZr4BtGWb0h9QzuIQa7C2HDxau+2nqdo/rygR/vOBjgz5ywwS10WG0/V/kGi3qTh8byfb9vATTepKqOfAUIRvTb7k2j9tN5T6Gj320ETpKrXZnhc89i70Ae216/msWFxL4JceyO1vIBm+corPYIVosSCLA0REObRPrHKhKCdglw77rINw8ta8+6GdHltT6zX48tmX/v3RZnXoM8TO/SBhiDwdM7YLys0bIJojOXwmIJ7T0GrH4LEK3Ms897fYrdLwbk+Dy29Pvv+9L1T+/les18+aYgJz36mqXod5NoxwhX0+32j42NDUlWVINeO45y3rEJcO2yN/byw4/hqv8Y+SyY+Oz3zHD7oLApytc/ssrGgv5+fw9q/+rIsrEOfQy/OfCX5LNC4xBpqw25f7PUBANAtglygOQhygZr4BtGWb0h9QzuIQa4NGTR2Yid6nSGYUukmS0FR0GNvJKNSsKRxKXUxrR6A/q7qKvsHiUJMO009qBTAHD8xkvQmtEFVp3FjrX4GCJ3oRkN2XypQUI869Zyd8dL8TNCr12dp39jwRCGg9onuLK9gxoZPKh9g9SLIVQ9L+xwKTBUwf7JjVzqPttOGfApRpl/azzo/9HN2BSp2HX5YgTIhaKcgd8r0l9PpOs/0RYLOO4VbZdnxS7WOF16cm7xftK/9jcp0UyirzGuQ3Xv2Z9ajsZ51IzGNs6r94sMoGwjq32GajoOGQdFx0DlslwvllTmWRe9v7UsbRuo59UXChk1bkx6RGl84TNN57Yd/6Od7zfb017HT8ArapxryxZ4boXod5J45czYT0mvfaJ9ovFqNh2wD1lCxMLaID2MnPTez9fa7G5IethpL3H6++pv2qS2zPfe1rXpf6rNEx+XuB55o2z4fdBYFuWLPDQ3xoQBVY/YG/f4c1hdI9hjESp+94f/96wMAoFsEuUBzEOQCNfENoi3fkPqGdtCCXIWw4cJVF795P+/3bKhlg7eioEcUsvmLZ1sKK+14hv4PEgUwfhlfConyxkGM6XeA0ImCMv8afCkE093XPZ1ztpdjXsUC+l4EuaJhAPzzKZC2dF7FwiBffv9LmRC0U5Bre/za2m5Cyk70frfnZl7Fnr/Mawh879BYKZTzvYI15IOfz5a+3LDDccR0Opad3t/qBd8pLNO266f9Xj/fa7///cXMa4+V/WzpdZArPqT3pf1m32tVg1yxy+eVekvbmwkGCuLtF0exKgo6OwW5dllbwVh8DuuLM/+li0rvjU937U2mh8f86wMAoFsEuUBzEOQCNfEN4jAHufppdrhwzRtbM8aGj/an3KvfXpc+7sfPDdRzLBb2qPeexmG0F9qxP0jUk+6WOya0La8eiRqeQKFNFerRG9ahXrCWDR+KQr8wBmu3N/RSOBH7ea+CFfWyVUiUR+Okarttz95QCijsuLiWxqsN872yYKmfnLLjb/rwUDTOqXoX2h6hPsgVfWmggCa2nQpg8s6XMH9snYEd31U3d4vRPD6oLDqmMQrAFJb516B/KyjMW1+Z12BpX9gbX9nnUW/i2BifoueP9b7VOaSgzvZaj+l0LMu8vzXMgx3KwJYCztiXAdLv95o+l2M9/9VTVF8EqBd1eOy119/MLGvPm9hnkmj9YR71QI9ROGt7JodSCKoeo0uXr04fsz2hy9K2aT/GAlkdU/0CoujLOgXsOkZ+WZ2L2j/7D1wZ/kaf19bTk2ek02LjrKu9fGv1e5nxilXBWH4O632sX3joyyy7rTZsL/pyCwCAKghygeYgyAVq4htEW74h9Q3toAW5ddG+PDFyMgkHjh49nuzLqrSMgkX1trTDOwwyvY59+w+1BQxlaH9onyqM0PL2RlJjQcdUN6LT8+q9kEfTFNro2CvUU3g/lvR82s7RnDNhX4fzt19/OGtf6ljqHI+NLZxHnzlaTmFVUXCXp+yxLKL9rPenxt5VT8dYL9C66PzT+0RDHtRBY1/r+OjLlKIvabql46fzReeNnqfqua4vw7RcN8uWoR67GspD5+lY0P7WOXj5PMz/XLXjjsd+xQAAQDcIcoHmIMgFauIbRFu+IfUNLUEuAADjh73honoXx77cUPBte2sXBb4AAFRBkAs0B0EuUBPfIBLkAgAwmNQ73Ia0Gn5EQ5RoXOm1695P/t8Ol6KxsAEA6BWCXKA5CHKBmvgGkSAXAIDBpbHC/djWsdL4xmM15AMAoBkIcoHmIMgFauIbRIJcAAAGm8bKnfTczLabwam3rm4EqJvBAQDQawS5QHMQ5AI18Q0iQS4AAMND7fSRo8eTcBcAgH4iyAWagyAXqIlvEAlyAQAAAABVEeQCzUGQC9TEN4gEuQAAAACAqghygeYgyAVq4htEglwAAAAAQFUEuUBzEOQCNfENIkEuAAAAAKAqglygOQhygZr4BpEgFwAAAABQFUEu0BwEuUBNfINIkAsAAAAAqIogF2gOglygJr5B7HWQe+HCBYJcAAAAABhy4bpP14AEucBwI8gFauIbRIJcAAAAAEBVBLlAcxDkAjXxDSJBLgAAAACgKoJcoDkIcoGa+AaRIBcAAAAAUBVBLtAcBLlATXyDSJALAAAAAKiKIBdoDoJcoCa+QSwKcn2YS5ALAAAAAJDRBLn+upMgFxjfCHKBmvgG0ZdvTAlyAQAAAABeL4Ncf13qC0C9CHKBmvgG0ZdvUAlyAQAAAAAeQS7QHAS5QE18g+jLN6gEuQAAAAAAjyAXaA6CXKAmvkH05RvUboLcQ0cuN+haHgAAAAAwXHStp2s+XfsR5ALDjyAXqIlvEH35BrWbIPfI0RNJo/7551/4pwcAAAAADDhd6+maT9d+BLnA8CPIBWriG0RfvkGNBbkhzA0N9MWLFzNB7vETJ5NG/fz5z/zTAwAAAAAGnK71dM2naz8b5Ora0Aa59hqSIBcYXAS5QE18g+jLN6hFQW4Ic32Qe+rUmaRRPzFy2j89AAAAAGDA6VpP13y69osFub43LkEuMNgIcoGa+AbRl29Quwlyz507lw58/4c//KffBAAAAADAgNI1Xrje07UfQS4w/AhygZr4BtGXb1CrBLkqNeJ2eIXTZ875TQAAAAAADChd49lhFVThepAgFxhOBLlATXyD6Ms3qN0GuWfOnE2/peWmZwAAAAAw+MJNzlS65iPIBZqBIBeoiW8QffkGtdsgVz+xCb1yj5045TcDAAAAADBgdG0XeuOGYRUIcoHhR5AL1MQ3iL58g2obWxvm5gW5dpxc1ZGjJ5KG/uSps35TAAAAAAADQtd0urbTNV643rPj4xYFuf660l93+utSXwDqRZAL1MQ3iL58g+ob3FiQG7vh2fnz55OG/dSp061DRy7/9IYwFwAAAAAGTwhxdW2nazxd6+maL3ajM4JcYPgQ5AI18o1iUZDrw9yqQe6ZM2daIydPtQ79cRwl/RSHMXMBAAAAYPzTtVsYTkHXdLq20zXeaIJcf73ZKcgFUD+CXKBGvmH05RvVWJDrw9y8cXLPnj37xzD3ZOvwH3vmqnSn0z/84T/9pgEAAAAAaqZrNV2zhes3Xcvpmk7XdrrGY3xcoFkIcoEa+YbRl29Yqwa5sV65p0+fbp281PAfOXolzFWdGDl9ab7Pkm969VwAAAAAgLGlazFdk+naTNdo9ppN13C6ltM1XV5vXIJcYLgR5AI18g2jL9+wlglyVXlBbuiVe+rUqeQPgOPHT7QFuhRFURRFURRFUdT4KV2z6dpN13C6lrO9cWNBbt6wCgS5wOAjyAVq5BtGX75hLRvk2nFybZgbglx9g6s/AEZGRlonTpxoHTt27NIfB8dahw5froNJtf8BQVEURVEURVEURfWzrlyX6RpN12q6ZtO1m67hQm9cXdvZELfM+LgEucDgI8gFauQbRl++Yc0Lc0MDndcrV6VGvijMPX78+OVA98iRpA4dOpTUgQMH0tq/f39r3759ae3duzetPXv25Nbu3bspiqIoiqIoiqKGsvz1jy17zWSvpXRtZa+1wvVXuB7TtZmu0YpCXJUNcWO9cW2QWxTiEuQCg4EgF6iRbxhj5RvXWJAb65VbFOSq9EdAGC/Xh7lHjx5N/ng4fPhwUvqD4uDBg0n5YNeX/eOkqOwfNBRFURRFURRFUYNQ/romr/x1kg9uw/WVrrXCdZeuwXQt5kPcMC6uKlzPlQ1ye9UbVwWgfgS5QM184+jLN7Blg1x/07NOYa5KfyiEoRZsoGtDXR/s+nC3U9BLURRFURRFURQ1jOWvh3xo64PbEN7aADcMpaAK12llQ1yGVQCGH0EuUDPfQPryDaxtfG2YGxteIW+sXA2Kr9LPcsLNz8IwC6H0DXDooetDXR/shnC3qOwfLxRFURRFURRFUcNQ/rrHl79ustdUNrwN11/2mixcp4XrtnAdV3Zs3LxhFQhygcFFkAvUzDeQvnwD68PcMr1yQwNfFOaGMXPDt75huIUw5IIddsGW/UMkL+TtVP6PHYqiKIqiKIqiqPFS/vqlU/nroxDa2rLhbbjuCsMoqOyYuEUhblGQW7Y3LkEuMDgIcoGa+QYyVr6RLRvkxsJcNfo2zA0/zwlhbizQtaFuLNyNBby+/B8yFEVRFEVRFEVRg17+useX73Hrr6vC9ZYPcO2NzVQ2xC3qjdtNkOuvP2MFYHwgyAVq5hvIWPmG1v8spijMVaNeJcy1vXND+VC3bLjbbfk/fiiKoiiKoiiKosaq/PVJ1eoU2sbC21C2F27ZELdKb1yCXGCwEeQCNfMNZKx8Q+vD3KIgt0yYa2+AFv5osD1083rpFoW6sYCXoiiKoiiKoihq2Mpf/xSFtz7Atddc9lrM39isTIhbJsj115UEucBgIcgFxgHfSMbKN7b+W9WqYW74Q8CGuWHcJT92rg90fU9dX/4PFYqiKIqiKIqiqKaUvz7K63kbC3HtNZkPcUOQ222IGwty/XVnrACMHwS5wDjgG8pY+QbXN8ixIDc2xEIIc1WdwtzwLXBRT91YwJtX/g8ZiqIoiqIoiqKoQS1/vRMrf91kQ1vb8zYMoVAU4obrOHtt50NcglxguBHkAuOAbyhj5RvcsmFuXq/cULFhFvLCXB/o5oW6ZYNdiqIoiqIoiqKoYSp/XRQLb32A2ynEDb1wfZA72t64BLnA4CHIBcYJ31j68g1u2SC3bJhrx87tJtAtCnU7lf/jh6IoiqIoiqIoaryUv34pW/56qUqAa6/Ryoa4/QhyAYwvBLnAOOEbzFj5RrefYa7vpRsLd/NCXl/+jxeKoiiKoiiKoqhhKX/948tfP9nQ1ve+HU8hrgrA+EKQC4wjvtH05RveWJhrG++qYW6VQDcv1C0T7FIURVEURVEURQ1r+eujvPC2bIBbNcT1Qa6/fiwb5AIYfwhygXHEN5yx8o2vD3K7CXN9oGv/gPCBbtVQt0r5P4AoiqIoiqIoiqLqKn+90k356yYf3voA14e49pqtmxA3L8j115mxAvD/27Gj3MZhKAiC97/1wn+LBiVSchJQdjVQZyDf7JchV9qsPp4jfYRnY+7/j/zqmLsy6B6NutXPDAAAwKfo/TPSO2o24K6OuB1yexf2bjTiSs/OkCttVh/QkT7EoyH37pi7MugejbpXxl0AAIBP1PvobLydDbjvjLiGXOnzMuRKG9ZHdKSP8btj7t1Bd2XYnenHBwAAYBe9X67o3XR3wDXiSnplyJU2rA/pkT7KK2NuB91+Dvp5GA26s1F3pB8aAACAp+vdM9O7ajTgzkbc3ne9/94ZcV8k7ZshV9q0PqYjfZjvjrnvDLrVjwoAAMC36Z000ntrNuC+M+KuDrmS9s6QK21aH9QjfZzfGXNHg+7RqLs67M70wwMAALCb3jF39J46Gm9HA+5fjLgvkvbOkCttXB/VI32kr4y5Vwbds1H3pwdeAACAJ+p9NNI768qAa8SVvjdDrrRxfVjP9LG+OuZeHXSvDLsAAADfrHdU9Q47GnB/a8R9kbR/hlxp8/q4numjfTbmXh10V0bd6ucFAADgU/Uemum9dWfANeJK35UhV9q8PrAzfbxnY+6dQffusAsAAPCtek9V77HZgPtTI+6LpGdkyJUeUB/ZmT7i7w66q8Nu9eMCAADwqXoPzfTeqt5rKwOuEVf67Ay50gPqQ7uij3n1I1D9RIz0IwIAAMBY76mR3mXVu656F66Q9JwMudJD6mO7oo969VNwpJ+LK/p5AQAA+DS9g67o/XWk91z1Hlwh6VkZcqUH1Ud3VR/46gfhTD8dAAAAXNM760zvt+r9t0rS8zLkSg+rj++qPvZH+mlY1Y8JAADAt+vdtKp32pHefaskPTNDrvTA+ghf0Yf/TD8TAAAA/I7eY2d6510h6bn9A+Y3IFVufXAoAAAAAElFTkSuQmCC>