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