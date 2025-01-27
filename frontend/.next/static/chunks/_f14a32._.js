(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f14a32._.js", {

"[project]/contexts/ClientContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ClientProvider": (()=>ClientProvider),
    "useClient": (()=>useClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/client.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
const ClientContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    client: null
});
function ClientProvider({ children, config }) {
    _s();
    // Memoize the client instance to prevent unnecessary re-renders
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientProvider.useMemo[client]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"](config)
    }["ClientProvider.useMemo[client]"], [
        config
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientContext.Provider, {
        value: {
            client
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ClientContext.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(ClientProvider, "/KoUf8dpTovukU4B6fVhiiXXF1g=");
_c = ClientProvider;
function useClient() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ClientContext);
    if (!context) {
        throw new Error('useClient must be used within a ClientProvider');
    }
    return context.client;
}
_s1(useClient, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "ClientProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contexts/ChatContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChatProvider": (()=>ChatProvider),
    "useChat": (()=>useChat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ChatProvider({ children }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawMessages, setRawMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingContent, setStreamingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const addMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatProvider.useCallback[addMessage]": (message)=>{
            setMessages({
                "ChatProvider.useCallback[addMessage]": (prev)=>[
                        ...prev,
                        message
                    ]
            }["ChatProvider.useCallback[addMessage]"]);
        }
    }["ChatProvider.useCallback[addMessage]"], []);
    const addRawMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatProvider.useCallback[addRawMessage]": (message)=>{
            setRawMessages({
                "ChatProvider.useCallback[addRawMessage]": (prev)=>[
                        ...prev,
                        message
                    ]
            }["ChatProvider.useCallback[addRawMessage]"]);
        }
    }["ChatProvider.useCallback[addRawMessage]"], []);
    const clearRawMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatProvider.useCallback[clearRawMessages]": ()=>{
            setRawMessages([]);
        }
    }["ChatProvider.useCallback[clearRawMessages]"], []);
    const value = {
        messages,
        rawMessages,
        isLoading,
        streamingContent,
        addMessage,
        addRawMessage,
        setIsLoading,
        setStreamingContent,
        clearRawMessages,
        setMessages
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ChatContext.tsx",
        lineNumber: 53,
        columnNumber: 10
    }, this);
}
_s(ChatProvider, "JJ7ybOcmt15VPD/J+MUZfbv07Bg=");
_c = ChatProvider;
function useChat() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
_s1(useChat, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "ChatProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contexts/ThreadContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ThreadProvider": (()=>ThreadProvider),
    "useThread": (()=>useThread)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/contexts/ClientContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/contexts/ChatContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
const ThreadContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(null);
function ThreadProvider({ children }) {
    _s();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const [threads, setThreads] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [currentThreadId, setCurrentThreadId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { addMessage, setMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const loadThreads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[loadThreads]": async ()=>{
            if (!client) return;
            try {
                setIsLoading(true);
                console.log('Loading threads from backend');
                const response = await client.threads.search({
                    metadata: {
                        graph_id: ("TURBOPACK compile-time value", "react_agent") || 'react_agent'
                    },
                    limit: 10 // Limit to 10 most recent threads
                });
                // Log the full thread details for debugging
                console.log('Raw thread response:', JSON.stringify(response, null, 2));
                // Filter out any threads that don't have valid IDs and sort by creation date
                const validThreads = response.filter({
                    "ThreadProvider.useCallback[loadThreads].validThreads": (thread)=>{
                        if (!thread.thread_id) {
                            console.warn('Found thread without ID:', thread);
                            return false;
                        }
                        return true;
                    }
                }["ThreadProvider.useCallback[loadThreads].validThreads"]).sort({
                    "ThreadProvider.useCallback[loadThreads].validThreads": (a, b)=>{
                        // Sort by creation date, newest first
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    }
                }["ThreadProvider.useCallback[loadThreads].validThreads"]);
                const formattedThreads = validThreads.map({
                    "ThreadProvider.useCallback[loadThreads].formattedThreads": (thread)=>({
                            thread_id: thread.thread_id,
                            created_at: thread.created_at || new Date().toISOString(),
                            messages: []
                        })
                }["ThreadProvider.useCallback[loadThreads].formattedThreads"]);
                console.log('Formatted threads:', formattedThreads.map({
                    "ThreadProvider.useCallback[loadThreads]": (t)=>({
                            id: t.thread_id,
                            created: t.created_at
                        })
                }["ThreadProvider.useCallback[loadThreads]"]));
                setThreads(formattedThreads);
                // Load messages for each thread
                await Promise.all(formattedThreads.map({
                    "ThreadProvider.useCallback[loadThreads]": (thread)=>loadThreadHistory(thread.thread_id)
                }["ThreadProvider.useCallback[loadThreads]"]));
            } catch (error) {
                console.error('Error loading threads:', error);
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[loadThreads]"], [
        client
    ]);
    const createNewThread = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[createNewThread]": async ()=>{
            if (!client) throw new Error('Client not initialized');
            try {
                setIsLoading(true);
                console.log('Creating new thread');
                const response = await client.threads.create({
                    metadata: {
                        graph_id: ("TURBOPACK compile-time value", "react_agent") || 'react_agent'
                    }
                });
                console.log('Thread created:', response.thread_id);
                const newThread = {
                    thread_id: response.thread_id,
                    created_at: new Date().toISOString(),
                    messages: []
                };
                // Update threads list with the new thread at the beginning
                setThreads({
                    "ThreadProvider.useCallback[createNewThread]": (prev)=>[
                            newThread,
                            ...prev
                        ]
                }["ThreadProvider.useCallback[createNewThread]"]);
                // Set as current thread
                setCurrentThreadId(newThread.thread_id);
                return newThread.thread_id;
            } catch (error) {
                console.error('Error creating thread:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[createNewThread]"], [
        client
    ]);
    const loadThreadHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[loadThreadHistory]": async (threadId)=>{
            if (!client) return;
            try {
                const state = await client.threads.getState(threadId);
                console.log('Thread state:', state);
                // Handle both direct message array and nested message array in values
                let messages = [];
                // Type assertion to handle potential message locations
                const rawState = state;
                if (rawState?.values?.messages && Array.isArray(rawState.values.messages)) {
                    // Convert LangGraph message format to our format
                    messages = rawState.values.messages.map({
                        "ThreadProvider.useCallback[loadThreadHistory]": (msg)=>({
                                role: msg.type === 'human' ? 'user' : 'assistant',
                                content: msg.content
                            })
                    }["ThreadProvider.useCallback[loadThreadHistory]"]);
                } else if (rawState?.messages && Array.isArray(rawState.messages)) {
                    messages = rawState.messages.map({
                        "ThreadProvider.useCallback[loadThreadHistory]": (msg)=>({
                                role: msg.role,
                                content: msg.content
                            })
                    }["ThreadProvider.useCallback[loadThreadHistory]"]);
                }
                console.log('Thread messages:', messages);
                // Always update thread with latest messages, even if empty
                setThreads({
                    "ThreadProvider.useCallback[loadThreadHistory]": (prev)=>prev.map({
                            "ThreadProvider.useCallback[loadThreadHistory]": (thread)=>{
                                if (thread.thread_id === threadId) {
                                    return {
                                        ...thread,
                                        messages
                                    };
                                }
                                return thread;
                            }
                        }["ThreadProvider.useCallback[loadThreadHistory]"])
                }["ThreadProvider.useCallback[loadThreadHistory]"]);
                // Sync messages with chat context
                setMessages(messages);
            } catch (error) {
                console.error(`Error loading thread history for ${threadId}:`, error);
            }
        }
    }["ThreadProvider.useCallback[loadThreadHistory]"], [
        client,
        setMessages
    ]);
    const deleteThread = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[deleteThread]": async (threadId)=>{
            if (!client) return;
            try {
                setIsLoading(true);
                console.log('Deleting thread:', threadId);
                // Delete from backend
                await client.threads.delete(threadId);
                console.log('Backend deletion successful');
                // Update local state immediately
                setThreads({
                    "ThreadProvider.useCallback[deleteThread]": (prev)=>{
                        console.log('Updating local state, removing thread:', threadId);
                        return prev.filter({
                            "ThreadProvider.useCallback[deleteThread]": (t)=>t.thread_id !== threadId
                        }["ThreadProvider.useCallback[deleteThread]"]);
                    }
                }["ThreadProvider.useCallback[deleteThread]"]);
                // Reset current thread if deleted
                if (currentThreadId === threadId) {
                    console.log('Resetting current thread');
                    setCurrentThreadId(null);
                }
                // Verify deletion and refresh thread list
                try {
                    await client.threads.getState(threadId);
                    console.error('Thread still exists after deletion');
                } catch (error) {
                    console.log('Verified thread deletion');
                    // Only refresh the list if deletion is verified
                    await loadThreads();
                }
            } catch (error) {
                console.error('Error deleting thread:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[deleteThread]"], [
        client,
        currentThreadId,
        loadThreads
    ]);
    const deleteAllThreads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[deleteAllThreads]": async ()=>{
            if (!client) return;
            try {
                setIsLoading(true);
                console.log('Fetching all threads for deletion');
                // Get all threads without limit
                const allThreads = await client.threads.search({
                    metadata: {
                        graph_id: ("TURBOPACK compile-time value", "react_agent") || 'react_agent'
                    }
                });
                console.log(`Found ${allThreads.length} threads to delete`);
                // Delete all threads in parallel
                await Promise.all(allThreads.map({
                    "ThreadProvider.useCallback[deleteAllThreads]": async (thread)=>{
                        try {
                            await client.threads.delete(thread.thread_id);
                            console.log('Deleted thread:', thread.thread_id);
                        } catch (error) {
                            console.error(`Error deleting thread ${thread.thread_id}:`, error);
                        }
                    }
                }["ThreadProvider.useCallback[deleteAllThreads]"]));
                // Clear local state
                setThreads([]);
                setCurrentThreadId(null);
                // Verify deletion by refreshing the list
                const remainingThreads = await client.threads.search({
                    metadata: {
                        graph_id: ("TURBOPACK compile-time value", "react_agent") || 'react_agent'
                    }
                });
                if (remainingThreads.length > 0) {
                    console.warn(`${remainingThreads.length} threads still remain after deletion`);
                    // Try to delete remaining threads
                    await Promise.all(remainingThreads.map({
                        "ThreadProvider.useCallback[deleteAllThreads]": async (thread)=>{
                            try {
                                await client.threads.delete(thread.thread_id);
                                console.log('Deleted remaining thread:', thread.thread_id);
                            } catch (error) {
                                console.error(`Error deleting remaining thread ${thread.thread_id}:`, error);
                            }
                        }
                    }["ThreadProvider.useCallback[deleteAllThreads]"]));
                }
                // Final refresh
                await loadThreads();
                console.log('All threads deleted');
            } catch (error) {
                console.error('Error deleting all threads:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[deleteAllThreads]"], [
        client,
        loadThreads
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ThreadProvider.useEffect": ()=>{
            if (client) {
                loadThreads();
            }
        }
    }["ThreadProvider.useEffect"], [
        client
    ]);
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ThreadProvider.useMemo[value]": ()=>({
                threads,
                currentThreadId,
                isLoading,
                loadThreads,
                createNewThread,
                loadThreadHistory,
                deleteThread,
                deleteAllThreads,
                setCurrentThreadId
            })
    }["ThreadProvider.useMemo[value]"], [
        threads,
        currentThreadId,
        isLoading,
        loadThreads,
        createNewThread,
        loadThreadHistory,
        deleteThread,
        deleteAllThreads
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThreadContext.tsx",
        lineNumber: 289,
        columnNumber: 5
    }, this);
}
_s(ThreadProvider, "ZWhftnNZrw1gf12D3g10kAfPchs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = ThreadProvider;
function useThread() {
    _s1();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useContext(ThreadContext);
    if (!context) {
        throw new Error('useThread must be used within a ThreadProvider');
    }
    return context;
}
_s1(useThread, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "ThreadProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_f14a32._.js.map