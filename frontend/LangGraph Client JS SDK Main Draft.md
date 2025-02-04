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

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWEAAAF2CAYAAAC/LCn0AABBUklEQVR4Xu2dd3xU1drv7x+33/vee1/1VURFj0rH7rGcczycYzsej4IohCY99CLSQRSwgALSpAqCSJEWuoAgTXrvJBBID+m9T0ieu59nsnb27EmYzJ4kO8n8vp/Pw17rWWvvtWfCfGdlzZ6d/9SoUUNq2fIvCAQCgajmaNjwcfpPLGEAAADVDyQMAAA2IhLmfwAAAFQ/kDAAANhIyXIEJAwAAHaANWEAALCRhg0bQsIAAGAXkDAAANiISBgfzAEAgD3g6ggAALARXB0BAAA2gqsjAADARvDBHAAA2Aj7FxIGAACbaOS8OgISBgAAOyi5OqJmSPj27ds057uF5nStZ8eO3XTx0mVzGgAAKkfC//m//bvE5i2/mJu8YuzYCXKcpctW0o0bN6V85WqIuZsLauzy4LbvFy8zpz1y1z0NPB67olTkOPwG9PU3MyR8pbKOAwCoenz+YC4k5LouGU+iqQjp6RmytVvCxscUn5BobvYKh8NhTrmRl5/v8bFUlMo6DgCg6vH5gzn1gu8ZOFC2xcXFLnnF//o/9+ntn3/5jYvk7q3/mPRZsuRHqZ88ecZNwv/n3+u77DNqzKcu4/TpN0gvN276rD4u15WEW7Vp73KMj4eP1fsZiYiIkvYFC5fofRV8Xv/lv5ce47/+j7v1tnvufdjl+HFx8ZI3HmOkdt7GPvc/6LxG25hTfV99/R2X3AMNGkv+yWf+JPUxn0zU2/797gfLPc7sOQtccgEdukkeAGA/lSLhBo82o/z8AinPmjVP8pO++FrqKSmpej8lBd7eW+8PlJeXp+czM7PKlfDKVWul3LDJ0y77GI/LkZycopcXa8dS7SzhyMhovS3fw6zzv5S03S4qov/9f+u59FP75ebmUmpqmpRf/8e7Mlvm8tx5i2RpwXj8sspF2rHbte+m5xNK9ufIyMjU+95z3yOUqz3m/3vXA3pfJWGO+PgEl+Pzvsbj8CzcOKb58QAA7EUkbHVNOCkpSV7Qs+bMl7pRBjk5uVL+ZPwkERaX7763gb5vfkGBSPPc+QvSduTosXIlrGAZGUXLqHJeXr7UL1y87NbOEu4/YKiUL126QrGxt7Tjh0l9/oIl+vEVnP+v//MeKX8zbabU0zMy9DaOzh/2pvT0dH2fxMRSid66FafnGfP5cGzatF3eUBTlLUfw40pJS6ORo50zaEZJ+MCBQ1KfOn221PmNjDEex+Eo1OtXrgTLGwQAoObg0wdz6sVtjuzsbJf2P73yhotczP057iThI0eOu/VXxzOWmczM0pmgamcJP/1c6ezRGF2699H3ZYySN8a//b/7pZ1n/I9pM3Jj2/ZfdkrbW++875J/+NHmkld15uy58/Q//u1el35MWRI29jG2KQmHhUdIfeeuPVIvS8LMpctX5U3FfBwAgP1Y/tpyQYFz+YHXRH9Y+pPE0I9HSe7f/l996TN0qLNufOGfP39JysHB16Teu69zLfdOElb786yOMR5PldsGdJF66/c6SL1h46f1dpbw8hU/S3nKlOmSLywspCHa+Z09e17qCnU89Zg4jOONGDVeguFf7zl/170P09p1G/W88Tiqjypzn1GjP5M+O3f9JnmebZslbJz5Mo81doqf8UbCycnJMuaatUFSb9j4KZfjAgDsxfLVEfUfaigv5r79P3LJGwVQWFi6Nvq0Jg7GuB5rjDtJuFfgALf+agxzTgULT7WrD+bMfdQxjJSV71uylLFz525q1uJ5t2PMm/+99mt+qWxVsJzNxzT3MY5lzKk3OXMwFZWw6q/K/80wGwYA1AwsfzDHVxBwmDHnzXWGRbx8+Wr51b+oqFja+df87OwcKfOMl9cuucwzViZcEw7vwx+GGY9pLB/8/QitWbNBH0e1Z2U5l0eYyMhIuYY2NPSmoVcp3D86OtaclnxsrHOtNyMjQ75UMnfeYu3YTvExfOUHjz9h4mSXdWHzcxATE0vjP/2CNgRt0nMMP+bNW7bRopI3DZbq4sU/UlRUtIypjhEXnyBltb7L68ZcV1emMOs2bKLv5n6v1/nNbMqUGXTmzDk9BwCwH8sSBgAA4DuQMAAA2IjlD+YAAAD4DiQMAAA2YvnqCAAAAL6DNWEAALARSBgAAGwEEgYAABvBmjAAANgIJAwAADaC5QgAALARSBgAAGwEEgYAABuBhAEAwEYgYQAAsBGfJMz3r41LSKHs7DwqKHAgEAiE3wX7jz1ovJ+3N1iWMP/litS0DHMaAAD8Evah+os+3mBJwmz82LgkcxoAAPwa9qK3M2JLEmbbqz+6CQAAwAl70dvZsCUJ89824z9sCQAAoBT2ovrbjxUFEgYAgErCsoQbN4aEAQDAVyBhAACwEUgYAABsxIqE2b+QMAAAVAKWJYwP5gAAwHcsSxgzYQAA8B0rEq5Ta8KPNHxOj6ee/7u5udq4q14jc8qNV/7+ToX6mbnTPidPn6Oo6Bhz2iO8HwDAd/xewiyoXbv3UU5uLg0ZNu6OwqpKKjIu96lIP2/g440a97k57ZHKPg8A/BVIWJPJ/oNHXOpqq6Jeg+Z6rulTf5Ztw+YvuPXbsWuvW27G7IW0b/8hvf7QY09T/UeecOmj9rn3oaZ6zvwV76zsbMkPGDKa/uOBppKLjrklub+/0UY/Tr0GLaRc7yHnllHbN99uJ+W7728i2/ade+vjrfx5Az3z4mtu53XfQ83pgUee1HPfzlro1gcAYB0rEq5Ta8JGoXA0f/ovlJ2dI+WsrGwJJRverlm/iQoLnU/YzDkL9H5KiIrc3DyaM3cxvfTKP3UJK4zl8xcu6zn1/XEW9cWLzrziuRdfpy+nzJCy2n/X7r1Sjo6O1ftx/dmXXqOcnFyXHHNP/SZa2+uUl5fn0macCRcWFlJ2jvPxX7l6TSS869d9et/ntP1VGQDgO5CwJpMvJn9LQ0eM18WSmpom5WdeeE0PhiXIeY6+g0ZQl54D9H5Pl/TjuyFx7rEmL9D92qzUk4TLyjVq/pKbhNW4KpSw32vXTc+x+Fmwjzd9Qc+pfRlua9TiJbc2JeG3WneQ+pPPtJStknBKSpreFxIGoHKBhOuVLkfc91AzaqbNhFlwnC8oKKBr12/Qi395S9pf/2db2S5fuVba1YyZOXjoGP35b+/QzNnOX9fVscuT8Jx5i+U5MfZVmCV8+MgJl/YmT/xJZssdPuxN/3inveTqP/IkBfb7WM4xOTlVcryPeiwMt4WFRehtavvKq+/q5bz8fLp1K17KniScr/UFAPiGFQlX+Zpwem6xz1FRWCa/Hz4uZb6lp5JTcPB1KXOER0ZJbunyn6XOolZrtuuDtkiO12LVPUFZVJz7Ydlqevmvb9MBTfJGifK+6tibtu6QnLG9cYuX6fKVEL3ObW++E6DXVY5pE9Bdyq3adpF6cnKKfuwjx0659M3MzKL7Hmwu9euhNyR3NeQ63ftgM1q9dqOMyW1fT58j2+CQUE3CLVwk/PzLb0i578ARLucMALCGFQk3Zgk3aVI1EjbL1JcAAICajiUJ83JEbZAwNAwAqOlYkTD7t0okzL/Nm0XqS3gYDgAAbMeyhKtiTRgSBgD4G1YkXGVXR3iScIcpadRqYqqEua2s8DAcAADYTq2SsIraKOHbXv4hP1Bz8fYFA8CdsCLhJlX1wVx5Ej4fVkitS2bAZcWhKwVu+1RUwq0Ceunl2fOXGlpKaW3oY5WIksvcLly8Itu+Q8Yam31mwMefmlPlkl9QYE5VK++262lOeYWv+/tKfEKSbAcNdz7nRdp/XG//ZDmoe/ywYqM5VSEsSbi6P5jzNPMtr93DcEJZEg4Lj5QXeodug6SuJDxt5kLJDxrmfPG91yFQ6j/8tMZ5AI1OPQfLVoli+LgvZdutzzAZS+W79P5YymahqNzMuUtc6kFbdrrUmeSUVL2uJKzq2Tm5tH3XXnq/Yx+pt+3SX7aHjpygvQeOyM/jt/1HyjyHPoPH6Dlj+4o1G13q7T7sV3JuzmudVdvV4OsUeiOcho/9gtpqfTZt2+Wynyqbx1XnunzVBqkPGTFB6gM+Hi/18vabv2SF5FqV5AdqzwXX+330idQ7dBsodf55Mb0HOR/fB536Sr1jj8Eux+RzZt7v1Ee27bsOkK16vIuWrqL0jAz9XNIzMqmgwOF2fldDbkh58vS5lJLqvNYa1G2siLhWSTg1p5jSSnK8TcnyXcL8IuEXKUebDr0lxy9WvvfC/oNHpa4krGY+Yyd8Q4Xa4+F9+avCRq4Gh8q9JXr2H0HXQ8N0ybOEmfMlM2FVnzJ9nnPHEvjeDTw2H/v02YsubUxeXj5lZmVrL/BQF3GwhAdqbw68r9qfJcznySQmp8i2dfteuoQ/6OyUkBmWFDPyk6/04+3cvU/bN5DWbNim91u1bos+FsOPW9VZwms2bJW88TyN9XHa82iEv91nPJ6C65xPS8/Q60amam+ODN8Jj/8P8ayU+yvpBpRIdMNm55vFqE+/lvaLl4Kl3vbD/rJVsDB5Xvv1twvoZskbMtOj33DZsoSZgcOcbw5GCSsio2L0+q24eEjYj/BWxDVewm2/cn4Yx+Vle3IpNP62lGPTiqjXjHRdwmWJ2MNwQlkz4fc02URGxVJEpPM+u0rCYz6bItvPv55DDodDyvzCNsvs/KWrIpSALgPosy+nS84sYbUcYVwC4edo6KgJFBbmfOEfO3FWb2PmLfpRm70ell+Hy5JwzwEj5bxVsITVPSbSSwRmlHDbciQ88pPJsh06epJ+LJ51M+ERUfpMcfnqIGnjHDN+0lSK0OpKwjtKbvxjlqaqT/jKeUMiBcvyZsljN8L11LR0ytBkp+pG5i1aLlt+Q+Svmqvx+bEy/AbLbP1lj/Z8FGvPsfNxRUTGSv7DwKHOAxlY+MMK7bHE0LAxn9OyVesl10t7fpkKSTiyVML8ZgoJ+wcbtuyh6zectwaoKFYkXO0fzCnBHgtxiHy5nJhZTGsO5Lq0m8PDcEJZEt538Jj2ghulv4iUhD/94lvqP/QTfabIv/5+PPpzmjprgfMAJaj9ArQXv1orVBJuFeBsK0vCDM/GAw1j8xjd+46g75eupnMXrmgz7JHyaztL+Nr1myIYlo1ajuAy99+rydqThNdt+kUei5KVQkmYv14d0HWg9ibTTx5H78Gjpb96zvjX+cHDP6MO3Z3LNm069tZ+tR/iJuGftRlznyGuSxyMWcKcDxw42k2yxv269x/u1s6/TQwYOl5fjuD2Ptrzq2bC7br0l/NW9e59h8sbljpOWRJWbb2181H/b80SPnryLHXvN6xcCfOSEOcuX70GCfsBa4J2UmJSsjntESsSrvbrhMuTrKd2D8N5zcqfvfs1A1QP+38/Zk650LW3u2SrA36j5fXyjt0G4YM7PyAjM8ucqhCWJVxdyxEc/eeVXh9cVvSek+a2T1VIGAAAKptaIWGr4WE4AACwHUgYAABspGZJmCpXwkVYhgMA1HCsSLjW3MoSAABqOlYkXDIT9u6vKlRUwpU1G7Zyq4aMnGKKSrpd7XErzbsfAACg7lDjJKzIc7iLtSKRW+D9DDgxvYjCEm7bHhEJ3v0gAAC1nxor4eoiTZv9mmVodwAA/Ae/l7BZgCoatVzrlrtTPPevTW65sqLFmxvccuZISK95zxMAoGrwawnzwoVZgCr+0nY7bdoXJ+XzYbk07KtTUr4Zf5tGfXOGth9OlPqSoDCauTxEl/BX8y/R0k3hzvKCSzT66zN0NTqfhn15Uvb9ft1NafvtVAqNmnKGbsYVuo3NAQDwD/xawnwJm1l+HGt2xcj2iTecs1Y1K/5qwWU6ejFDys+/45TuoAknKCzeORMeMukEnbuRQ+e14LZmr63XtoXU95OjUn+v9176oN9eKb/ba7dsv5h3yW18DgCAf+DXEi5vJszSnbo4mFq87irh7YcSpXw5Il+T7kbJTVl0RbYs4T5jj9K50BwKiS4QMbcokfiYaWdl+06P3bqEAwbuk+223xPcxucAAPgHfi1hxiw/jn/1dM5Sr0Tm0+wV12jvqRSR77UYBx08m0ZN/r6OXmi1Wfp0HLyfWrbbpi9HPP1WED31ZpCUdQlPPyfbd3vtoXYDnPKdsTREjhkcVeA2fqbrLYoBAHUYv5dweUsSdgVfNwwA8B/8XsIMn5ZZhnZEbIp3PwgAQO3HBwlXzdeW7STPQZSWXVztkZHr/RdMAAB1Ax8kXHdmwgAAYBeQMAAA2AgkDAAANgIJAwCAjViTcCNrEua/3gsAAKAU9qL3ErZwdQT/6fX4hFRzGgAA/Br2IvvRGywtR/Cf/M7NzaPMrBxzEwAA+CXsQ/Yi+9EbLC1HMGz7/Px8uhWfjKUJAIDfwv5jD7IPvZ0FM5YlzLDxCwsLZfC8vDwEAoHwu2D/sQe9nQErfJKwET4BBAKB8LfwlUqTMAAAAO+BhAEAwEYgYQAAsBFIGAAAbAQSBgAAG4GEAQDARnyWcEpKOsUnpiAQCITfBnvQKpYlzNfHxSfi/hEAAMCwD61cN2xJwjxQXEKyOQ0AAH4Ne9FbEVuSMH8/Ojc335wGAAC/hr3o7f0jLEkYN3UHAAB3qvWm7pAwAAC4AgkDAICNQMIAAGAj1iRs4S9rQMIAAOCONQljJgwAAJUCJAwAADYCCQMAgI1AwhrLV6yhu+o1kggOuW5uLhfu74mDvx+jf7XupNf5ouxXXn3X0MMVPuYnEyab0wCAOorfS7hNQDcRX2JiEh09dlrKkZHR5m5lUhEJb92+ix5+/Fm9zs/DnfaDhAHwL6xJuA5dHcHSO332gl5/6LGn6JFGz8t3udXsmKOw0Pkk3ftAU6nXe7iFLtPUtDS9330NmuvHYu4k4YSERH2/P2hjMkrCe3476DL+k8//TdpHjpmk59QMm8t/fa21flwAQO3BmoTr0Ey4PHHd+1BTevmvb0t5ydKV0i80NEzvz1JWZd4mpzjvDsfC/WXHbudByClho0xVqP1iYm/p5YyMTNkaJcykpWdImZcyjOfLZdX2654Deh4AUHuAhEvkpnA4CqmgwCH5n9dudOk3+ZuZ+oxV5dT2/keekKj3cHPq3L2/3udOM2He1ntY7deCVmvjlSVh1TczM8tlLI6Qa6GSy88v0PsCAGoPfi/hBo8/Q/c92EzKBQUFIrRlP63Wfr1vpQn3Ocm3fMP5q76aqXK/66E3XWT6408/S7lXn6GaQH93HpzuLOF76jehtes3SzmgUyAlJSW7STg3N49OnjzrMlZuXp6U23boSenpznOChAGondRICWflFVN6rvXIyPPu3px//PM/RGQc7wd01/NPPNtScg0efVrP/eXv70iupWENtqiomO4vWSN+4c9v6n0ZkXDDsiXM1GvQXOpv/LOd1Lk8fuIUXcKPNfmjbGfNXijtERFR+rmOL/kATyRcAAkDUBvxQcKNzfk7UlEJZ/ooYBUZud6JuKZhXo4AANRNfJCwd4KoqITNMvUlajPRMbfo+x9+MqcBAHUMHyRc+TNh/gsfZpH6Eh6GAwAA24GEAQDARmqVhLt9m0atJqZKmNvKCg/DAQCA7dQqCauoCxIuLCw0p0A1oL75CEBNwQcJV/4Hc+VJODyhiFpPcs6AzdFai5CY2277eCPhDt0HUWRUjDntBp9/8LUb5jS936mPOeWRabO+l+37nfrK9t12PY3NNQr+8kqhl/9JKkp8QpI5JSz8YZU5RctXrvf6T4ObmTbb+bwDUNn8sKL0y13eYE3Cjat3JsyyvRF/m2LTitwiKqWo3Jmxh+F0uvUZRoNHTNDrnXoMps49h0j58LFT1O7DfhQZGSOzqHMXrlCRdqIdug2gj0Y692GB9ug/grJzcql9lwH05dTv9GMdPnKytHzUWR7/+TRt/4F08VKw7Mtl3o4Y8yV16f2x3p/htgEfj6f2XQdI/esZ82nytLl06OgpunDpqpzbmbMXpe1mWKRW709nz12kBE1uXQKH6o9j6KhJFNClPzm0GTi/4fC+Adqx+evWAdoxMjKypF9aerr0458Vb7Ozc5wnQs5zWbN+C7XXtgruc1471mdffKvnGD7fD7XxGX6T6xL4kfY8lz62AO08Q8Mi3CQcoO33y869uoSnzlwoYzAs4VNnLkg9Lj5RvqASExsnbXxuzOz5S2Xsnv1HSn3thm3yHAWH3BCBq349tZ8X9zt4+LjUP/l8ujyudRu3Sx0Ab2E/LFu5yZz2SK2RsDlXkXYPwwmpaekSXXsPlRcpR4HDobe/1763XuYlhFNnL7jNWlXdnGf4K9FHj58WMbfS2nM0UTPmfdSWL037de9B586GPMMinTh5pl7vO3isbPsPHUc8P1R9Bw+fIJL6oGSWbYT7hEdEyzfxHNrjXLxstZ5n0jMy5ZzbdHTO7o3jqzL/LJOSU7XnJlDqfKyR47/S+yn4a9ZXgq9Tq4BeUl+jCZFRxzl/8YqLhIeP+1K2fHyW8BDtjTEmNl5yvQeNEQln5zjfFPgY+fn5FBUdq9f5vJetWKfXmfGaXJmtO/bIz1bl23Yu/Q2E8/zmyqjfTACwircz4hov4Y5TnR/GcXnZnlwKjXcuPfAsuNeMdF3CZYnYw3ACvwjbajMljmmzFkmOxcACy8hyzg6nzV4o/ZSEmd/2HabWJoEym7fvFtkaYZm01oQ1ZNQEalcyE1P7mLcpKWm0WpttKozH5uMqCfPywMo1znfdDZt3yLm1LZkxfq+J1SxhngH+fuSEHI8lzG80/M597MRZaTeOw1LiWbQ5bywnJiXrj5NlbpRwO+08VqwOohOnzsmMW0n4zDnnjN14HKOEVT+GJcz9+PxUsITVf9bOvYaIhCMNEubngH9DkHrJsdYG/SJbnq0bJaxmxFznr6OHl9y+VL0RAGCFXXsP0e59R8zpO2JZwk2bVo+ElWR5u/5wPoUlFkk5Lr2YxizNdGk3h4fhBJ4BK1gqfJ4jPvmKvvxmjnwVuFVATzqrzZKMEuZ9Vq/dos0WnbNklsfWX/bQ+9rskbdqhqjgJYFf9/4uZSVGJQM+Bs/S7iThQcM+pcCBoygpKcVlJszjsoD5HJm+Q8ZI/1XrNrtJuGe/ETRjzuJKlTD/BsG5wAEjXSTcvvtA+m3/YXnjKUvCO3YfoKkzF8haulHCYeFR9NGoidobYn+RMJ8H77s2aBt9o/VnCfNj/XrGAn1JpHX7XvT1t/P1c+OlCu7DSyBM18CPpe2zr2aUK2Hmg879pLxwiftaNAAVYc/+Y7TvgHN5yxusSbiRPRIuL8pr9zBcrcAoPk9wX761ZZsOfUQ4VQ0LLzYunvYdPEprNmw1N9tC4IBRlJaWoT9vvOV1708mTTX1dGXU+Mnafs43FQCscPiYc0LjLZYlXF3LERxdppVeH1xWdP4mzW2fuiJhb8nIdC6hVBfG24DWFMx3lMsrueucJ/g2pgBUN9YkLMsRTcz5O+KLhDlulXFlhApzX3+WMACgdlFrJGwlPAwHAAC2U7MkTJUs4apfFgUAAJ/wQcKVvybMmEXqSwAAQE2nxknYcbtyRJzv8F7Chdrp5TlqbuTjcyMA6hyWJVwVV0cYyc13F2tFIiffe/kmZxVRWMLtWhPhCd79wAAANRfLEq6KNWE7KNKcbZZcbYiIJO9+aACAmok1CTepOxI2y41j/+lUOnAmzS3vKUZMOU0Xb+a65asqeOkGAFC78WsJ88KFWWwcTf6+TrZt+vxGx69mSpnFfC3GQTfjCvV+l8Pz6Wb8bdp7MkXqwyef0iX8y+8J0nYzvpBCbzlo5+FEyV+LdlBwVD5djcynKyXB+eCoAroQliflq5EF0n45QmvTjtH01XV0NcrZzxgRid794AAANQ8fJFy1a8LVQXlLEUrCHEMmnaB/dt8t5RdabRYp9hpzhC5qwmRRNmq5Vm9TElb7c9sFrc79VX3c9LMUqom58d/WasfIpef+tVHa2vbfRyHRBfTt0hB6v99eTdyF1Ow153FYwuZzVAEAqN1Yk3AVXh1RnXiaCe85kUxLNoTR028F0dGLGfT7+XRdps+/s0kvc9sxLZSElZiVhH8ICtfrLGEuP/u2U74vv7dFtrN/uibHOR2cJRLmXIfB+2VbnoQxEwag9mNZwlV9dUR1YRabkiXHl/Mvu+S6jzgk5V1HkqjHqMNSXr45QtoOaQIdMdm5Jnzyaqbkgn67JRL+ZvFVqV8Kz6Nx356T/Z5/Z7NslYS7fHxQZsc34gp1CXf+6IBsB3x2nHqMdI5nDNMtEgAAtRDLEq4La8JManaxm9wqM1jCOw4514MrOwAAtR8rEmb/1hkJM/Hptes6YQ4AQN3ABwnXjeUIIxk5xRSVdLvGxq00735QAICajzUJ15EP5gAAwG4gYQAAsBHLEuaLhb0BEgYAAHesSLhOXR0BAAB2YkXCde7qCAAAsAsfJOzdmjD/QcjEpDRzGgAA/Br2ord/MNeShPlPsGdkZFJhoXfGBwCAugr7kL3IfvQGSxJmeMqdk5tLSSnpWJoAAPgt7D/2IPvQ26UIRiTs7dURCjZ+YWEh5eXlIRAIhN8Ge9DbGbDC0tURZnhwBAKB8NfwBUtXRwAAAKgcLK8JAwAA8B1IGAAAbATLEQAAYCOV8sEcAAAAa0DCAABgIz4vRxQVF1NCUirFxiUhEAiE3wX7jz1oFcsS5mvj4uKSzWkAAPBL2IdWrhm2LOG4BAgYAACMWPGiJQmz7XNycs1pAADwa9iL3s6G+bYRXksY9xMGAAB3rNxPGBIGAIBKwoqELS1HQMIAAOAOJAwAADYCCQMAgI1AwgAAYCOQMAAA2AgkDAAANmJZws2a1Q0JZ2fnSOTk5FCBw2Fu9hn+S6pWaNDwWeozYJg5DQCoY/i9hO+q14geevQZerjhc1LmKA9+DHdqN9OxS1/pf+NGmLnJIw0ef5Z69vnInC6Xrj0HenVuAICagWUJ15XlCBbX/oNHXOrTZ87XhWsUs7ne8vVWej0yKlo/hoLzR46fokbNX3LJTZo83eU4WVnZev3Rxs9LTkmYcy//9Z+Si46OkTp/zVH1b9jsRf24HA0ef8Y5EACgVgAJ13OV8B80CbLIbtwIp7PnL0ruwUefprHjv3KbCR8+ekK2W7buoIc1aZpRfZU4Vfn8hSt6+VZcghwnIjJKz509d1GXsBI007DZSzThi6lSbxPQXXLHTpyW88JMGIDaCSRskjDXH2n0HEVGRuuzS46hw8e7Sfg/Hmimtzd4zHUGek/9pnTX/Y3p0SZ/lPaXXnlL8sb96z/8BEVps9tFS35yGevU6XMuyxGc43685Rt9FBUV6X3v147BQMIA1E4sS7hZHZZwalq6bBf/sEJy9R950k3CR4+d1Mtz5y9xkzC3zV+0TOJPLd/W+5YlYSVX1V6WhMd++mWZkuVchPaGAQkDUDuxLOGqnAlrEz1Kzy22HN48HhaXMd5u3VHyn39Vum57T/0mImFjf2P5mRdfdZEwP06jEIuKiqXucDhc8krCjZq/7HIOZgknJ6dKfsTYiVIfO94pZBUs8OCQUCljTRiA2oVlCVfV1RF5Dt8ErCLH4d39OWsyJ06eFcHyMgQAoG5hWcJVNRM2y9SXqAvk5eXTO20608nTZ81NAIA6QI2SMGvTLFJf4nbd8DAAoA5TsyRcXMkSvvNwAABgO5YlXBVrwp4kHJdeTLFpRRLmtrLCw3AAAGA7tUrCIxdnUK8Z6dRqYqpbW1nhYTgAALCdWiPhY9ccerCEVfm4Fua+3ki4VUAvvTx7/lJDSymtDX0qm3fb9TSnKp07jfH9stW0buN2c9ojiUkp9EGnvuZ0hSjvfOLiE80pAGoNQVv3mFMVolZImKX7/c5cWrbHPZbuzi13ZuxhOKEsCfN1tzPnLqFLV0KkriR8/uJlmjnvB/mqMRMccoNmaXUzy38OorUbtkn5x1XrRXJLl/8sdX6Mcxcuo2Mnz0idhRR6M1ztKv0PHT0lWw6GnzseR33dWXHy9Hma+d1icjgKpc7nPW3WIv2LH/sOHNUku8pFejGxcVRQUCBlPn58QhJFazkeY/rsRZSWlkFF2v4bt+2SPivWbpTt9p17adHSVZSbly91lvCqdZv14xjPd13QNhnXzPzFy+n4ybP6+axZv5VWrXEef5m276Bhzmuxfz9ykhYscX5RBoDaQnhkDK3dtNOc9ohlCVfnB3PlSdZTu4fhBBZC937DJT7o7JzZtSqRxOz5TsEqCbf7sJ9sVT8lk8tXr8mWYUGzAtVtMVWf/PwCik9M1sX+yaSpmgwdevvgEZ/JdcBGeam29zv1ke0M7Y1BCZa5FnrTpd/SFetkG9B1gGxXrt3k0q4IHDRatlOmz6MLl4NF5u+2cz5GPj/+WfX7aJzU1WNleTPqWCzh9iXjMNExt+jsuUv0628HKT3defvONh166+09+4+Qc1ePOTcvT38zCL0ZIdtZ85bIlv8zM8Y3SABqA/xt2xVrnROwilLjJTxkfoYu2R9/y6Ub8belfCutiAJnpusS5rVi874ehhPKmgmzdH/ZtY+27dir15mpMxfI9rsFyygvP5/SMzKpQ/fB1GfQKOcBNGZp4p40ZZY2mz0pdaMArwaHUkC3gbR42RoaMnKi3NRHtfNWSZTp2rf0XsIBXfrL+XDcNnxho3X7XrRxy079GErQLE6+vjglNU3qZgl30M7hZ20WyigJFxbepgmTZ1Cbjn3KlDAfY8fu/WVKmL8JOHSU89t8g0dM0M91+87fJMeoNwaGj3E1JFSeg/2HjtGps84bJSkJc/t2bX/zeQNQ0zl05DRt27nfnL4jliVcXcsRgbPSSiW8J5dCSyTMV0gEloiX2ztOSXPb18NwQlkS5hyLZc7CZVJXEuYZMj8OJYc2nfrKV5LbdCyd8fXQ5FlYWEjDxn4hdbOE+Rg84+W8UcJ7DxzVxnWWC7UxNmzeqf9guE+Bo5Cmzf5e2qSPNgYvczi0bVkSZlq3D5SlCrPMTmvSe09rY0pnwj1lf9X3Xe0xGx9rkibdjIysMiWsnheOmJg42n/wmIxrfG4/0oTLN7i/GnxdjrF+0y+Um5tPq9Zu0SU8fOyXsj1y7JS8iZjPG4CaDE9klq10/vbpDTVewkqy5lxF2j0Md0f412szK3/eSJFRzl+VFbEl68NGIkt+nS6PqKhYc0p+gKtL1ljLIiYm3pwq+fXe+St9eWRm55hT5RIWHulST0pO0cvefGWazyu75NadRpKSU13qiYnJLnU1hjdjAVBTWLa6/Nfvnag1Ej5wqcDlCgkVR4KdV0uY9/FVwmVx8JDz/sFVAa8RAwD8j1ohYQ5eijBfGcHB68TmvlUlYQAAqGwsS7i6PpjzJTwMBwAAtgMJAwCAjViWcFUsRzBmkfoSAABQ07EiYfZvlUk4K89dplYiMw8SBgDUfGqchJncAnepehM5+d4LOCzhtm0Rn16x5wUAUPeokRKuTljXZinaEeEJ3v0QAAB1A7+XsFmGKg6cSXXLlRWvtNvmllPRcfABt9ydIjrZux8EAKD2Y0XCVfrBXHVjFqGK5q+vp+NXs9zyHDfiCik0tlDKjVqudWt/5u2NbrmjlzL08qEL6W7tKgAA/oVfS7iouGwJB0cX0KHz6fRWt11Sb/7GBlqxNVKEez3WQW367qWeow/TtRiH5EK07YptUTTrx2u093QKPfVWEP1yOJE+6LdX9m/y6jpavSOKXmq1WXLnw3LphXc3u40LCQPgf1iRcJ1ZjuDrks0S5GCxPvlmkD7LZQmrPM+Cm762nl5svYUuh+frfZ78xwa9rGbCLNwQTeg/BIXrx2bBP61Juu+4o27jcgAA/Au/ljBjliDHE286pbvneBKduJrpIuHzN3Kp3/ij9Lw2kzVKePCkU/TJjPNS7jrid/p87iV9Jsx9piy8Qh0G76M/t9lKP26OoKf/GeQ2Lj6cA8D/8HsJJ2cWu8nQSvyxnOUFbwIA4H9YkXCdWRNWxKUVuQmxuoPXpwEA/gckXAI7MC2rcmbFFY3wxNuUbeGLJQCAugMkDAAANmJFwnVqTRgAAOwEEgYAABuBhAEAwEasSBhrwgAAUElYkbClmTD/Bd3klDRzGgAA/Br2ord/YdyShPnPoMcnlP4JdQAAACReZD96gyUJMw6HgxISU72eegMAQF2DPcg+ZC96S4mEm5rzHmHb88B5eXmUlpZBKanpCAQC4XfB/mMPsg+9nQUzlmfCRnhgBAKB8NfwhUqRMAAAAGtAwgAAYCOW14QBAAD4DiQMAAA2guUIAACwEUgYAABsxGcJ8+UZSclpFJ+YgkAgEH4X7D9fLlOzLGEeFF9dBgAAJ1a+ssyIhJs39/6DufT0THMKAAD8GitetCRhtj1/XQ8AAEAp7EVvZ8OWliNwP2EAAHCn2u4nDAkDAIA7kDAAANgIJAwAADZiWcLefjAHCQMAgDvWJNwUEgYAgMrAsoS9vYEPJAwAAO5Yk7CFu6hBwgAA4A4k7CX/8YD7B5JJScn0SKPnzOlqofkzr1DItRvmNACgluD3Er6rXiO9fO+DzfR6RGS0S5ti8dJVetnYfubsBb1sBT5WWeN5IiQk1JzS6T9opKVj8j7RMbHmNACgCrAs4brywRwLZ+v2XXpZSatL9/70p5b/oqXLV9OAIaOoZ58htHHzdikzvOW+vM3MyqYhw8ZRYWGh1COjYqQt9la89M3Lz6c27brR6HETafDQsfTDspXOwQ1w/+defI16Dxim50JDw+ixpn+k7+Yv0XMz5iygpk/+maJjb0l9xJgJdCs+QcqTvppOL7zyD/lLrkzjFi/p58jw47xPe6PZvnOP1Ad+NIZ+XLGW+g0aQa0+6CI59bg+1B5/dnaO5AAAVYc1CdehqyPmzP2enn/5Ddq8daeLhHkbqc2GA/t9LOXlmqyiSuTK3IqLl3JcXAIlJiZRvYdaUG5enuQmfTWNdv26z+VYr/6jDR05dkrKXXoM1MdnWN533d+YsjSZq30YVX7+pdfpkYbPUotn/krPaeWioiKq16C5tD3S8Dm6fDWYHvjDU3LcfE343MbH+rD7AP0c/9D4eXpYO4bD4aC76zWmtPQMabtbG/fipSv0aOM/avG89OX86dPnvf4+OwDAeyxLuK4sR7C0WDrNnv6LNitcQx+P/JQmfjFVF6CSsKKsslnCxvaiomLZKqGVJWHOPaIJcNOWHVI+eOiYnud44+128vzxkgfXH9SEO33mfOmjJLxy9QbncRo9R8tXrpU243IEj//WOx2oYTPn7PjK1Wuy7RY4SNrnzl+q9+UtliMAqB6sSbgOrQkzSnY8w1T1e+o7P4DzVcJqu/0X5xIAl8uS8ORvZkmoc1HwOTUqWVZQqBkzP6dKwor0khkuf1hnlDBvR46ZJOV76jfVJdyr71DJzV+4zKXvzbBwKQMAqhbLEq7K5Qht8kjpucWWo4LD6JjFx+X32naVsicJ312/sUcJz5qzSB+DwyjhC5euuOyjljkY3t7/yBOyHffZZBoxZqKU6z/ypN5HSfjPf/uXs+1hZ3/jsfkcGzz6lJTveaAJ3X1/E48S5khMwg34AahqLEu4qmbCBYW+CVhFnqPmrGey0KJKfr3n8tLlP5t6AAD8FcsSrqqZsFmmvkRNYdioz/TZJX/ABgAACisSZv9WiYRZm2aR+hK8rAEAADWZmiVhH9eCzeFhOAAAsB0rEq6y5QhIGADgb9QqCXefkUatJqZKmNvKCg/DAQCA7ViTsM3LEZUt4e8N94Ngxk2c6lJ/t11Pl7qRO7XVNgYPn2BOVQobt+w0p8qkR78R9NPqIEpITNJzfE302AnfGHoBUDPZtnO/OVUhaoWEA2eVzoDLih7aDNm8jzcSfrddL1q5ZpM5Tbm5ubK9k2hvl3zBgynrXgv8TTX1JRCGv0FXUOAw9ND2y3Hul5uXT9t2/KbnMzKz9HKRdhy+DlnB52QcmzG2c5tx3Pz8Ar1szO/ed4hOnb2o15lC7WeVm5vvksvNLT22wvg4jMdU8ONhzBLmvmU9byxh9c3CDt0G6n3kOSzJ8/OnyCs5Pr5eDWoCa4J2UmJSsjntESsSrvYP5jzNfMtr9zCcwPdt+GlVkItoj508S198PUe2oz6dLG0siuOnztHaDdtcXvTc5nAUUrsu/elGWITLcVh8k6fPpV9/O0gduw+hqyGh9POGrfTr3oO0buN2iomJo2Fjv6BroWE0bMznFK3VV6/dIs9V64BeFJ+QRK0CnMfj4yYlpVArbcvjSz05VR9r4LBP6ez5SzTms6+l3krb/7h2/tx3wlcztMdyRvocPnaKjh4/TStK3nSCNEH+tv+wlH/5dZ+8Cezac5DOX7ii7TeTtu/aS9NmLaJzFy7Tkh9Lr28ePvZL+Vbe4OGfSr1n/5HaeOe0/CQ5//fa96Z9B4/Sl1O/c5HwRO2YK3/eRIuXrdbOP4UGfvwpndHeBLbu2CMSPnDouEi6fdcB2ow4Wf7P8P7jP5+mnfcZ+nLaXDkOv3nsO3CEvv52Hn238Ef9+ADYSdDWPRR6M9KcviO1SsJbjudTRFKRlOPTi2nSqiyfJTxkxARNtFOoe7/h2pMXLjmWr1Gmqszbfh+N1fMqxxK+Enxd6m069Nbbxn8+XS8zLBa9rM30WMJZJbPAAK2NZ5bbd+6VOh+XRarGDhw0WrbtPuyvtxsx13lfZsr0+VJWx+I3hvZdBuj992oiO3v+spRZwubHzRJWM9JOPQfrbcGagN/v3FfvzxJmChwOuWuc8ThGCavHxbHoh1Uu/YwS5pkwY5SwEeN+kDCoSfywYqM5dUesSLhalyM6fONciuDysj25FBp/W8qxaUXUa0a6LuGyROxhOOGDTn31snphs4TbdHDml/20VvLLV22QempaussM9E4S5juVbfllt9wkiPObtu2i5JQ0ysnJpXETp7lJmI/zzcwF+nGZHtqbA+NJwm07O8939VrnDFdJmJcVNm513qqze9/h2oz7CylPm7VQtoePnpJzZFjCYydO1f9DdNP6s4TVUoNRwh+UjMe/ATBlSZiPs23nHjcJh4VHyRvOCW3m3LH7IJmt8+1AvZFw6I1wbVb8HfXoOwwSBjUGbwXM1HgJK8macxVp9zCcYFwrzc5xrgGrJ+T6jQiZBap8ekam29qoalOiUnUFS5b3U6RnZFFCgvODJ+P6pnEMNfM8e+GKfi5qvbf0HIso0fBmwIRFRLv1YzgXHRun19UbhiIlNU22vDTDJKek0s0w569UjpIcw28eRs5fDNYft/l5YcKjYrRj3taPq0jLyJA3KMWlK9dE3DnaMbi/IjYuQbb85sTtRlJTSx/7VsM6OgB2YUXATK2RcFyqcxnCHMnZvkkY1F4+6NyPBpWsSQNQW6kVEr4aVUity7gqQsXpUIfbPpAwAKA2YEXC1f7BnNXwMBwAANiOFQlX+0zYangYDgAAbMeKhKtsJsyYRepLAABATafGSTgrz12mViIjDxIGANR8apyEmax8d6l6E1YEHJZwu1rDy+ccAFBH8UHCzcz5O+KNhKsbsyCrK3JcL30FAPghPki46mbC1Ul4orscqzNw7xkA/Bu/l7BZihyvd95Bo785S39+fxtdjshzazfH6Kln3XLmaNRyrVuOIzzBuycfAFC38GsJ8yzULEWO5q+v18s3bhXSim2RNGH2BWr0N6dIG2vb+atCqdmr62ndr7HUddjvdDP+Nr3ZZReNnX6WToZkiXS/XRos+xy5lCH1fadT3cbiAAD4L5BwGVI0SpjjiTc3yPZUcJZs/9XjV9mq2S3PhE9ccYqX4+X3tuht5m1ZAQDwX/xawoxZiByvtNtKkxdeppdabaGLYbnOmfCs0pmwWcIs7ZvxhfR65520eH0YLdlw002+3Gf38WS3sSKTvXvyAQB1Cx8kXDeujuA1WbMYOfafSZMlBlW/EefeR4Xqd/2Wgy5H5Lu1m/sZAx/MAeDf+CDhujETZsxirK7AJWoAAEi4hIzcYjdJVlVEYQkCAFACJAwAADYCCQMAgI1AwgAAYCOQMAAA2AgkDAAANlKtEs7Kcv1rvQAA4O+wF6tFwsXFxRSXkGxOAwCAX8NeZD96gyUJMw6Hg27FJ5nTAADgl7AP2YveYlnCbPvCwkLKzc2l+KQU7QSSEQgEwu+C/cceZB96OwtmSiTs3b0jjPCgRUXOxWgEAoHwt2D/WZGvwmcJAwAAsE6LFpAwAADYBmbCAABgI5AwAADYCCQMAAA2IhJu0QISBgAAO5AP5nyVMF+egUAgEP4avuDT1RH5+Q5Kz8gypwEAwK9gD7IPrWB5TThDG9THNwAAAKgzsA/Zi95iScI8/U5OSTOnAQDAr2Evers8YUnCzq8p437CAABghL3IfvQGS1dHOL8z7d1AAABQ17FyU3dLV0dAwgAA4I5lCXu7HAEJAwCAO9Yk3AwSBgCAysCahDETBgCASsGahDETBgCASsGShHF1BAAAVA6WJIyrI0rhx+XthdYAAKCwLOG6shxxV71GdN+Dro+Fc/c3eMIlZ+TBR5+ieQuWSpn7rly93tTDyXMvvS7txujdf5i5m/DgY0/Ra2+9b04DAOo4kHCJHM05JeGcnBwK6BxIo8Z9LvW9+w9J+9/eeI8OHzmpS/jlv75Ns+d+bzyMDvd5SJMsU+Bw0OiSYzHquNynwePP0k+r1kl9+449kouJvSX1yKgY6Tti9ATasHGbvj8AoHZjTcJ16IM5p0Q30PgJU6Te/KlXaM36TbqEuX3vvkP0XrtudE/9JpScnCw5lmFqapou8eMnz8h2weJlhqM7MUo4JyfXRfqqzNtmT78isn2vbVepXw+9Kdu167fQiRPO4//rvc509NgpfX8AQO0GEjZIUG2ztdmvknBMbBx9PGI8Pf+nN1z6zPpukV6ev3CZlO++vzE93uwFKRupqIT/1PJtvcyCZ0aNnUR/aPS8LmEAQN3CsoTrygdzSmwP/OFJkWn9h5/QJXztunMm6rwJs6swZ8xaoJfVmnC9Bi18kvCLf3lLyizzS1eCpfzu+x/S401fhIQBqKNYlnBVz4TzHcWUked95BV4d6WCEtvefb9Lmc9RSTg8IkpyH2kzYd4ahcmx9ZdfvZZwUVGxU7h/fovqP/KEfsx/tuqoybcJTfpyOn09bbbk23XsJdvw8EhIGIA6So2UcHpusc9RVEEXZ2Rk3rGcnZ1Dh4+edGtPT8+ggoICyTkczrvj882ZM7Pcb9DMfTIzS/N8zF2798kM23jMtLQMaZM+2hvBpi07KD+/QOr8/Bn7AgDqBpYlXFXLEWaZ+hIAAFDTqVESZm2aRepLVHQ2DAAAdlGzJFxcuRL2MBwAANgOJAwAADZSqyTcamKqHua2ssLDcAAAYDu1SsIqKlPCaRmZlJubZ057JDrmlnwFWcGP72pIqKFH5RI4cJQ55RPDx35hTpVJyPUwc6pcNmzeoT3nrk/6xi07XerVQY/+I8ypcgmLiDKnXDh97qLXLxDgn5j/71eUWiHhgfPSXWbB5ug7J91tn4pKuFVAL9kuW7mevv52vqm14hQWFtLZ85fNaZ/p0G2gbN/v1NfUYo22H/Y3p+7IhcvOL41YZfW6zeZUlaN+phUh5PpNc0oIsuHNA9Rufly9RfOAdzJlaoWEPc18y2v3MJygXrB8zW6rdj1pzGdfU5fAoZSckqbVe9GR46clz6wNct44p1ufYRSXkEgFBQ7qP/QTWrN+K73XobdImK8Z7vfROBr5yWTKzsmlrlrfhMQkavdhP31Mhsc9d+EKvasd+9KVENkyHXsMouBrN6h1h0CZWQd06U/5+fki4fWbftG2vaXfh4Ef0W/7j9AHJXLmczx55oIcZ23Qdurae6g8pvfaB9LNsEjJc71Nxz5y3G59nXdz4/ymbb9q5x8o9dbte9GFS8H0bsnzYpQwjzlu4jey73cLf9Qe51jJ83F5Zr181QYpt9Ue6/7fj1KnnoNFwvyc7j1whN7v4Dx3HuP7pavlsTHttDeGb+d8L88V79+xx2Bt3NLnRNFG2/+MNjPlsfhNj8/54OETcnz+k+GtAnrS7t9+d9vvg0596NCRk/L87dxzgGbN+4HmL/mJVq7drEtY7ZOnPdd8bfbcRT/K83T0xBn5vxumPYcTvphBQ0dNoozMLOrYfRC17z6Qflyxnn7dc1B7A19AsbfiqXWA69jAv1i+ynsR1yoJn77hoLj0IiknZRXTlmN5PkuYX3wc7UqEwC9oJi8vn3bu3i/loC07ZNtaE1N6Rqa8CJWE1YuXX7gs4R79htP7HftKtO86UGTDwr2qidXIrPnOW2Gq/dV28Y8/a6LsrdfNM2F+oav+apyk5FT9jULtF3ozXL4iff1GOAV0HaDn1UxYSThw4EjZKlav26JJMlDvb5QwC11xJwkbJcgS5uWeHn2H63mWMBOsSS5HazNLUz023hq/oLJ8VZCcA+edv3lc0vsPGfmZ9gZYqNeN8BvPyE++cr4plbwRMCzt8iSsZsJKwsZjTvhqpkhY0XvQaAravFP63IpL1PPAP/lhxUZz6o7UeAl/8FXpB3HL9uRSaPxtKcemFVGvGc5liPI+rPMwnGD+1VVJmOkzeIxsA7oMkO2RY6f1/mYJb9m+RyS8RJNoerpTHD9rM+SlP62T8tcz5stsTVGWhFPT0uW4xryaLZolrKQbGR0jbxjlSdh4fKZdyWNREmbhM98tWk5F2g8gIiraRaRGCbfX3hCCNu+gSZNniYRnlzyGxKQUFwmrc7l89ZpIWD1nnXp9JFuzhFX/m+GRFBefqI+9ZPka2TL83BnfgIzLP1znGfJYbZau6oqo6Fjad+ColHkWz7+58P9FPs9OPYe4SfhXbSbNEt6yfbfUlYR7Dx4t+yQlp4igzRJWP+dufT7W88D/8FbATI2XsJIsb5OziymtJMfbhAzXdnN4GE4wS3jchKl6ec/+w/LiPHHyrJ7jpQgmMTFJJKyEdfzkOVleYHiJQL2ob2ni4PL4z6frx2C+K7nzmlmSbTr0oQ7aC1zVPx7zhSxPqGWH+PgE2To0CXGfwSM+k7pZwrwEwRKeNmuh5FT+9NmLUlYfXiVqs2iuz1mwTOo8A+3Zf6Te//KVENkqboZFiPTnahJmuB8v04wY9yWtXLNRng81u127cbtIOEITIdd/LlkfVhK+Fhoms2RewuH2wIGjJZ+QmCz1Xdqv+Ub4DWPIyInSxr/yqedbneuU6fNlFm/+mQ4c9qnWp5eIm+Hx1fPFN2li+HHycc5d4CWlQsovKJD6iVPn9BcI1/mNiDFKuN+QcfKVc27HWrL/snTFJnOqQtQqCZcX5bV7GA54ya7dB2U5gJdleNYMAPCdWiHh0zcL3a6IMMb+SwVu+0DCAIDaQK2QsNXwMBwAANgOJAwAADZSoyTMmEXqSwAAQE0HEgYAABupcRJmzDK1Et6SnV9MEYm3KSzBnuCxHd79HAAAdYAaKeHqxixEO4NlDADwH/xewuHVMPu9HuNwy90p+JwAAP6B30vYLECORn9bS//oskvCmO8z9ohb3zvFE29ukO3E7y66tXkKAIB/4NcS5kvizPLjaPL3dXr5xJUsatRyLT33ziaR8PPalvMT5lygm/G36em3gqjfp8eo3ydHqcuw36mPtuX+m/bFUdNX19HVqAL6a7vtsk+z19bTn9pspdD4QunTpt9e2ZrH58AX0gDwD/xawvyHQM3y4+CZ8OdzL9GMpSE0aNIJCokukHxZElYSDdFkez3WQeO+PUeN/+aUuJoJs4R/O5ksx7kRV0jjZpzX93ul7Ta38TnwR0oB8A/8WsKMWX4cxpnw1MVXad6qUDodki0Sbjdgn+RfbrPFRcLPvL1RLzd51bl/89fXy1bNhJdsCKOTwVm061hSqYTblS1hAIB/4PcSDi9DgOZQM2EVhy5kuNQPX0zXy8evZrrt723wOQEA/AO/lzBjlqCdAQED4F/4IOHm5vwdqckSZqJT3IVY3RGX5t0PAgBQ+7Es4SeeqFsSBgAAO7AiYfZvnZsJAwCAHViRcJ1cjgAAADuAhAEAwEYgYQAAsJFqlXBOTp45DQAAfg170ZKEvb06oqioiOISks1pAADwa9iL7EdvkKsjvJVwcXExFRQUUGx8irkJAAD8EvYhe5H96A3OmbCXyxEMD+RwOCgxKZVi45IQCATCb4M9yD70VsCMpeUIIzz1LiwslBNAIBAIfwv2n7dLEEZ8ljAAAADrQMIAAGAjkDAAANiIpasjAAAAVA78PQ1IGAAAbAISBgAAG4GEAQDARiBhAACwEUgYAABsBFdHAACAjWAmDAAANgIJAwCAjUDCAABgI5AwAADYCD6YAwAAG4GEAQDARiBhAACwEUgYAABsBBIGAAAbeeKJFpAwAADYBWbCAABgI5AwAADYCCQMAAA2oku4ZctXEAgEAlHNwf79/yrsS1G8PLXWAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa4AAAE6CAYAAABOArbPAAAbMUlEQVR4Xu3de5BU1Z3A8fyxVft3UvtHams3tbWVpbZq/YfUZhPdXWNiaRJd47MSTWKiGIlBgy9EBBEERXyARHRURB5KRJCHKA8FkVcAeStvkeE5MIwCM8wM48z0zNz1d/DcOff07Zm+fboPc3u+n6pf9b3n3n6MlfS3bk8D3wgAAEiRb9gLAAD0ZIQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCpFCdesVV8Gvxh5Ws21o04HRz5vs08BAKAonMK1dndLGKxPqzJBe0cQLNrYHK4ltXvPvqCltdVe9uKT7TuDs2eb7OWcHh7xRHDDjf3s5YLIzyyPtXXbdvtQlht/279ozwsAaVRwuL44054Vp7h9Oa8rX5w8FXzr232y5ns/uNQ+tSTs55W59faB9mlZLrnsWnVuMTQ1NanHWrh4qX0oi36NANBbFRwuO1Jxa2fOdmSt2fQb8eEjVVlrDQ2NxpnnZDLRjyFr685E9m2na+vspVCfCy5UzyPx1HKF4dTp2si+HS6JT5zW1oy9lKUY4erq5wSAclLScOVa0/Qb9ne+2zeyLm/2sn71Db9T+7Ldr//dkTdtvW2OZq/LxEVBH6up+cI+FLIfRz+PDtf9g0dEjumwtre3x95PNDc3R9Y3bNyqbvVrlO3f3PKn8PwL+l4c3t9+LPs59LGPNm5R2w8MGZl1HwBIs4LCta2yNTZIudbk/DiTp8xQb6ibNm+zD0XoN95Vq9ep/U/37Vf7U1+bqfb1ldOQhx+LnH/o8NGgurom5xv3kaPHIm/4wx4ZEzkuQZX1e+5/WO0/OGx0+Dg6XHr/lVdfj+yb2x0dHbHHXpsxO7KfNFx/nTlHbV9+5S/V/ow3zu3/4Y57w3DJyH8veQ0AUA6KHi6ZodPqI2u5wjVi1FPqjfVo1TH7UIScY16VmW/ecWv2cXvfVF/fEB7Xo5+rq/vZHxUK+zUcPHQkOHa8Wo19zLzv+Akvqv2k4dLb+jnM59Hhmvb6m+HjAEA5KChcIi5cmh2uXFauWqveXIcOf9w+FCHn6KsevW++8dtr9nF7P5fGxrNdPo4pn3DFjX2ekI8qZb/QcMWNDpdcVQJAOSlJuLQkX84wyVfNZe2Fl6aE55jh0h/hmeLe0OOOmeLWzceOO/7oY0+r23zCdeLE55Hjmv24/Qfcr/bNcMnHn5r9uHHbNsIFoFwVHK64r8Pb5Hh3X4eXr73rN2D5Hc33L7o86w1Zts1w6S9vyJu7+TssuYLT59v3j3uDN5972fJVwR13PRA5d+B9Q8N982v7Ip9wyazfsFn9Di/umERy7vyF4b4ZLhn5HZb9msztAwcOhfvy7crhI8eqbfm5CBeAclVwuIT+nZZcWZlmrT73N2m881FzZD0X84sO5huzJvtmuIS+MtJz76Dh4TH7Mex9k/04MuYXGcyQykysmKzWuwuXuW+v28fkDz7LrQ7X4KGjIsdzfVQoxk2oiJyrfz9HuACUK6dwiW37z31Rwx4AAErBOVwAAPhEuAAAqUK4AACpQrgAAKlCuAAAqUK4AACpQrgAAKlCuAAAqUK4AACpQrgAAKlCuAAAqUK4AACpQrgAAKlCuAAAqUK4AACpQrgAAKlCuAAAqUK4AACpQrgAAKniFK5j1V/YSwAAxMpk2orSjYLDVYwnBwD0Pq79KChctXUN9hIAAF4UFC7XWgIAejeXCyDCBQDw7rhDRwgXAMA7l44QLgCAdy4dIVwAAO9cOkK4AADeuXSEcAEAvHPpCOECAHjn0hHCBQDwzqUjhAsA4J1LR7yFa+ZbC4Kmpi/t5Yhxf5lkL+Xlwh9fYy+Flq9cG9x82z32MgDgPCqkI5qXcElYpr7+lrrtKjJjx1XYS3np6jGXLl8d/OrmAfYyAOA8StoRU8nDtezDNZGwLFm6ItzWIRsyfKzal3AdPlKl1q649vfheQsWLs2K3pinn1f74ye+Eq7Lfdas26i293y6X62b4WrNZMLHae/oCB8LAOBXko7YSh4uIaG49Mqbgj17P4us6WDJ9t59lSpcI8c8G661t7cHXzY3h2GSCOltfbt56/a8w2WGz9wGAPiVtCMmL+ES7y7+ILzaEXHhMD8qlNBt2vJJMHz0M+H9zPs/MPTx8Nwk4bIfBwDgXyEd0UoerjdmLwg2bNoW7ucKV0dHR2y4Xnh5enBL//uMMzuPa2a4Fi75QG1/uHJtbLgAAOdfko7YSh6ulpZWFYznXpwaudJ5Z9Eytf3Yk8+Fa3HhEnL8/odGR+4vt9f/+o+RNfkGoWzL4+h1O1wSt8EPjyFiAHAeJemIreThAgDA5tIRwgUA8M6lI4QLAOCdS0cIFwDAO5eOEC4AgHcuHSFcAADvXDpCuAAA3rl0hHABALxz6Yi3cMnfjMEwDMOU5yRVSEc0L+E6eao2OHrsRFDAzwYA6MFaWzPB9l371Pt8Ekk7YippuKTCh44ct5cBAGVI/kWPfOXbkTglDZf8EFJiAED5qzx4NO+PDfPtSJyShqutrY1wAUAvIe/3hAsAkBqECwCQKoQLAJAqhAsAkCqEy5Nt2879K8umlpaW4NUpr9nLifzd33/TXgKAstarwiVv8uZc8X/X26cUnX6ufrcNULerVv9NrT8z7jm1P/7Z59Xt7t17rXvm54f//RN7KS8ED0Ba9bpw2X5xza+CgfcMDvcv++nVwYMPPaK2//Gf+qj7PP/Cy+Fx2dfrMuZ/vLjHnzN3Qbi9f39leI59rr2v1/7t3/uq20WL3w+mv/bX8HnNc/TtqNFjcx43t/U5MnLVJ77/w0uy7lvx4itZawBwvvW6cFVWHghH7qfXzXP07TXX3RRuH606Fm4fPnJUbc98c07wL//6H2pb4ibRi7N9+85gytTXY58n175ey2Qy4fbNv7893F7wzqJwW9/OeGOW2v7mP/yzusIzj3e1LT+D/jkefmR05DGF/AHvuNcHAKViv+dcetlV4XavC9d1N/wmHDNG5jn6Vj6+kxnx6Jjwjd3+j2m/yccZOeqJ4JZb71DnLHlvmVqzz7f37TVz+5XJ04J+f7gzsm4eP3TocOx6V9v6Z5Ux7zvmiWfC8wDAJ/1eZEZL9LpwxZk2fUZw36Chwc+uuDZYu+4jtSbnzp33jhr5uO/tBQvDdZPsy39Aez2XuKDE7dtr5nZ34ao+URO73tW2/ln1aPoKLO71AUCp2dEShOtr9puzbB84cFBtvzXnbXXVpddNp0/Xqqsx+X2QzQ5aQ0NjJCi1tXVqW35/ZT+usF+PVopwLVz0Xrgvv/dbvWZt8NCwkZFzAKAn6HXhMueSn1yRdUzT0bHX497A49a0AXfdF/s4+vdG9rop1/MmCddvbr4t9nnk92Cyr7+cYZ6zbv2GrLWnnp4Q3hcAzqdeFa5SyRUeAEDxES5HEq1Zs+fZywCAEiFcAIBUIVwAgFQhXACAVCFcAIBU2X/gSPrDJV8tP3i4yl4GAJQh+WM8qQ+X/ACtra1cdQFAGWttzaj3ef33zOYj347EKWm4hFx1SYWrjp/46gf7TP1wDMMwTHnMrr2VQV3dmURXWyJJR2wlD5eQH0b+NnW5+mIYhmHKa+RKK0m0RNKOmLyEyyQ/HMMwDFMeUyiXjngPFwAALh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDOpSOECwDgnUtHCBcAwDuXjngL13/1O8owDMOU6SRVSEc0L+Gyf0CGYRim/CaJpB0xlTxc9g/GMAzDlOccrs7YCcgpSUdshIthGIYpylxx7zE7ATkl6YiNcDEMwzBFm3wl6YiNcDEMwzBFm3wl6YiNcDEMwzBFm3wl6YiNcDEMwzBFm3wl6YiNcDGpngdfOKnGXu9qzH/7zj5W6tHkNdjHijHd/UzdHWcY18lXko7YCBeT6nmo4qQaez3XHK3JBE3NHWp7+uJ65/+NNja1B5t2N2etx414Z02j2j51ps35ueOmu8fs7jjDuE6+knTERriYVE/ScNn/m9yw68vgF4OOB/Vn24PqU50xkcDZ/xs2bd/fEtw0/ES4L8flyk+Lu6LS55nPrdfN5zbFPbe5bo95zCSv1V4T9v0ZxnXylaQjNsLFpG5mLmuw/2cWss+1J9c5Eq629uibvtxefEdVuH3R7VVZx80rLvOxxf/07zzfPm6vv73q3JXYm1//bLK9YHVjuG3eN9fjmMcOHGsN2o145nqcn959LOsxGMZl8pWkIzbCxaR6XK+49Ei4VmxpUts/vC37/3z6vvaaHS7T+Jm1eT23uV7X0K6iYx8zz8n1OPb5EsG4db32ZUtHsGVvfh9zMky+k68kHbERLibVU0i47njy88i+3JrhMtdlJEDXDakO1+RKSm9LuA6fyMTeJ+654/bN9RfnnQn3JYhx55jbev8nd567ctLHdlS2hB9Xmq/Xfpwf/Sl6VcgwrpOvJB2xES4m1ZM0XDKm5ZvOxcoOl1yJaAPHfxG5n3ykKGTtrmc+D7dvfawmPEev2WO67fGacC3XOeZa3LbMsJdOmXeJfZzLBnaGzWQ+DsMUY/KVpCM2wsUwDMMUbfKVpCM2wsUwDMMUbfKVpCM2wsUwDMMUbfKVpCM2wsUwDMMUbfKVpCM2wsUwDMMUZS6M+aMkuSTpiI1wMQzDMEWZqQvP/XGOfCTpiK3k4ZJ/ytn+4RiGYZjymySSdMRW8nCJ+V//dTYMwzBMeY68zyeRtCMmL+ECAMDk0hHCBQDwzqUjhAsA4J1LRwgXAMA7l44QLgCAdy4dIVwAAO9cOkK4AADeVdectJfyRrgAAN41NXX+m3dJFRSuTCYTtLS02ssAAHTLtR8FhUu4XOYBAHov134UHC4hHxmePFUXtLd//W+ZAwAQQ66ypBln6pP91VBxnMIFAIBvhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqTuHiH5IEAOSjR/xDkq7/9DIAoHdy7UdB4cpkMqqeAAAk5dqPgsIll3sAABSqqanZXsob4QIAeHfcoSOECwDgnUtHCBcAwDuXjhAuAIB3Lh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDOpSM9Olxr12+2lwAAZcClI97CdeGPr1HTHfOc9Ru2GkeS0c/3q5sH5PW8hejqcU/UfB6cPFVrLwMAgsI6onkL19W/vC3rjf7m2+5Ra3JM6Njo8+S2vaMjcj/Zbs1kggULl+aM4StT34isP/bkc5HHvPTKm4Lrf/3HcF/mnsGPqv077304mDXn3ZyPbbJfl8zMtxaofRWuk6ezHmd/5aGsNQDobQrpiOYlXAuXfBB0fBUgCcaadRvV2h//PCR885arosEPj1Hbdgy6W1u6fHVWBGR/zvzFkTVNjjU3t4TbQ4aPDbeFhEtv3zFwqHrNuZivZdeefeG2XGlJuPTxB4Y+nvW6GxrPZr1uAOgtknbE5CVc+s28+kTnm7ncSsxs5pu53r570IjgrfmLgmUfrglu6X9feMwck+zPnrcwsqbFPb44cvR4sH3nHhUufdVUd6Y+67FNdozEo2MmqKs3CdfOXZ+G6+a5MjqYANAbJe2IyVu4xjz9vBrzDfzgoaPhOfKRoF7X7G1zXwcszqvTZ0XONfftx9Q+XLlWxUZ/VCjiwrVi9Xp129DQGPuYcvU4dlyFeqy5b3de9dmPM3nam1lrANBbJO2IqeThkisQ/fskIR+9PVcxJaivb1Bv3E8/+5K63bP3M3VctoeNfCrc1uxwyfb9D43OWjePy8hz2/fT9O/JRjw2PlzvLlyyLx9ryu1fXpii1n59y5/Vvny0qM/XHxXqtXF/mRTeX7b1fQCgN0rSEVvJw9Ud/bshU1PTl/ZSrM8qDwZtbW32cujTfZXB4SNV9nKEfFypo5mvhUuWZz3vl83N6vXYJND6d2qafGQa9zEpAPQWLh057+ECAPQ+Lh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDOpSOECwDgnUtHCBcAwDuXjhAuAIB3Lh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDOpSOECwDgnUtHCBcAwDuXjhAuAIB3Lh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDOpSOECwDgnUtHCBcAwDuXjhAuAIB3Lh0hXAAA71w6Qri60d7eHjQ0NNrLAAAHLh3xEq5vfbtPOBf0vdg+XDTfv+jy8Hm+892+4br5/ElNrJgcXPqz6+3lbvW54EJ7CQDwtaQdMXkLl6m6uiaoqel8jM/2Hwi3p73+Zrgt5FhbW1uwbPmqyHmyncm0GWdGn0dvy+0DQ0aq7RcnTct6Lc0tLcHBQ0eC2roz4ePNmrMgPH7mTL16vUI//85de8Pj9mvSt/I85s/42ozZWa933tuLgrNnmyJrANAbJO2I6byEq6W1NWdk3pw9X92ePHU6XJOrp2GPjFHba/72UeQ+cY4dr448psneX7t+o1ob9fgz6lZmzJMTwvMkdlff8Du1LWtXXfdbddt/wP3hmqa3X5o0XW2/v2xF+LPOeGOOut285ePw3PUbNme9HgDoDZJ2xOQtXHrmzHs3XBPyMdz0GbOCJe8tV2ty5bNh49bwuPnGLlcwcesm87n0vn3cpMNlH9PbdrjEgQOHuryPuS23c+cvVD+XjLn+3tIPw/MBoDdJ2hGTt3DZfn7VjcHiJR+Ex+SjNNleuHhpOMK+r97ftHlbZN0m5237eEfO+2uFhOvU6dou72Nuy23Fy1Ozfi7Rr//dWa8HAHqK+q2bgo0X9Q2nmJJ2xOQtXPJxn8wll10bWTe/rCH7o8aMU7eTp/41XDM9PrbzYzybrF9+5S/V6HP0VY7+/VZl5aHIfYoRrgsvvkL9bPb9X3hpivpWomw/OGy0ur319oHhcfnih9x2dHSE9wOA882MVa5xlbQjJi/hSkL/DigX+/djNvndmPmlCE2+9FGqQJhf1jCZz/fxJzuNI+fs2LnHXgKAHiFXnHKtJ+XSkR4Xrq6Mm1ChorV7zz77EACgiHSgPn97buSWcAEAeiQdqFy3rlw6QrgAAFnsUNm3rlw6QrgAAFnsUNm3rlw6QrgAAFlyBSrXelIuHfESrn37D0b277pvhLp96JGn1PaT41+OHJOJ+wbg089OspcU/Xi2XOtbtu2wlwAABglUrimGpB0xlTxcLS2tKiCTpswM1ya+ND04Xl0T7Nm7X+2PeuI5dXu2qfPv7bOjc+hwlVp7YOgTkXWJmayv/WhLZH3ajLlqvbm5ObKuw2ivAwD8SdIRW8nDVd/QGOz77EBw7+DRan/9hq2Rqyn5C3R1pGbPXRSu2+Ga/877wbPPTwkqJr0eWR868hl17vDR4yPrAwc9qtZPnaqNrK/+28Zg2ye7stYBAP4k6Yit5OGy2UEScgUmf8PFvK/ipMWdBwAoDy4dOW/hWr5yXVBf36C2F7+/MmhsPKs+VpS/Isk8DwBQflw64j1c89/t/Etm9e+n5PdRmv4dFACgfLl0xGu4Zs/r/B0WAKD3KrQjwmu4AAAQLh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDOpSOECwDgnUtHCBcAwDuXjhAuAIB3Lh0hXAAA71w6QrgAAN65dKTgcDEMwzCMyxSq4HABAFAol44QLgCAdy4dIVwAAO9cOkK4AADeuXSEcAEAvHPpCOECAHjn0hHCBQDwzqUjhAsA4J1LRwgXAMA7l44QLgCAdy4dIVwAAO9cOkK4AADeuXSEcAEAvHPpiJdwfevbfcK5oO/F9uGiWffRpvB5bPcOGh48OGy0vQwAOA+SdsTkLVw+6Oeprq7Jek7CBQA9R9KOmM5LuN5ftiKyprfNKzPzmMz3fnCpum1tzUTuk4t9XMJ18613ho+3Y+cetT5g4IPhWk3NuZ/Lfv5Mpi1Yu35j5LWZr7Xq2PHwfABA95J2xOQtXHrmzHs3XBPPvfBK8POrblTR0GtvvDk3+M53+0bOE5OnzAj6XHBh1rpNjkmQTBIufZ9P9+2PBEjLtWaGy1wHABQmaUdM3sJlk7WzZ5vCYxMmTlLb5ujzTHo/18d+EjwdN5P9UaE8TkdHR2yM7LW4cN1wY7/wdTY2ng3XAaCcbLyobzjFlLQjpvMWrtq6Myoy+tjp2rpwu7mlJVi/YbPatu8r+xK5OPLFj7hoibhwmbddrdnhktf3yY5danvP3n1ZrxEAysGeu26P7B+b/FJk30XSjpi8hUuP+a1C2X/ymYnhvkRHn2eeY8oVipbW1sjz2OfkCte4CRXh+U1NTWrtzruHRB7HDpe+v55Dh4+G6wCQduZVVq5xlbQjJi/hKqaJFZOzogQAKK5cccq1npRLR1IVLn11BAAoLR2oTf/7n5FbwgUA6JF0oHLdunLpCOECAGSxQ2XfunLpCOECAGTJFahc60m5dMRbuBa/v9JeijVw0KPqtr6h8av7rIgeBAB4kStQudaTKqQjmpdw3XXfiMit9tb8xUHFpBnBvYM7v6Yu2x9v3x3Mf3ep2s91H3td9vWYJITjJ74aTJsxN7IOAOia/Lkt+bNc5hRL0o6YSh6uz784FRw4eERt21FZsXp9VmyOVh3vPCHIfR8zdkI/Tq51rt4AoOdI0hFbycM1e96icHv02M4/bKzt3VdpL4Xemrc4Nji57jP37ffsJeWTHef+Ql0AQM+QpCO2kodL/iqnffsPqm376sn22hvzwm2JzdPPxv/VTgCAdEvSEVvJwyUkWM3NLd2GSx+Xjxdlu+pYtRoAQHlJ2hGTl3CJXXv22UtZugsbAKA8FNIRzVu48iHfGAQAlD+XjvSocAEAegeXjhAuAIB3Lh0hXAAA71w6QrgAAN65dIRwAQC8c+kI4QIAeOfSEcIFAPDuuENHCBcAwLvaugZ7KW8FhcvlCQEAcFFQuARXXQCAQrj2o+BwCXnyk6fqgvb2dvsQAAChlpZW1Ywz9Y32ocScwgUAgG+ECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAqhAsAkCqECwCQKoQLAJAq/w/XcjG1G/AK4gAAAABJRU5ErkJggg==>