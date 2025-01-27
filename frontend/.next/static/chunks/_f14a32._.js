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
// Initial context value
const initialContextValue = {
    client: null,
    isInitialized: false,
    error: null
};
// Create context with initial value
const ClientContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(initialContextValue);
// Utility function to create client
const createClient = (config)=>{
    try {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"](config);
    } catch (error) {
        console.error('Failed to initialize client:', error);
        throw error;
    }
};
function ClientProvider({ children, config }) {
    _s();
    // Memoize the context value to prevent unnecessary re-renders
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientProvider.useMemo[value]": ()=>{
            try {
                const client = createClient(config);
                return {
                    client,
                    isInitialized: true,
                    error: null
                };
            } catch (error) {
                return {
                    client: null,
                    isInitialized: false,
                    error: error instanceof Error ? error : new Error('Failed to initialize client')
                };
            }
        }
    }["ClientProvider.useMemo[value]"], [
        config
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ClientContext.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(ClientProvider, "tPauEVZ6EeuERV9ttvKTwQ7++Gw=");
_c = ClientProvider;
function useClient() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ClientContext);
    if (!context) {
        throw new Error('useClient must be used within a ClientProvider');
    }
    if (context.error) {
        throw context.error;
    }
    if (!context.isInitialized) {
        throw new Error('Client is not initialized');
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
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature(), _s2 = __turbopack_refresh__.signature();
'use client';
;
// Initial state
const initialState = {
    messages: [],
    rawMessages: [],
    isLoading: false,
    streamingContent: ''
};
// Create context with a default value
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Custom hook for actions
const useChatActions = (state, setState)=>{
    _s();
    const addMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatActions.useCallback[addMessage]": (message)=>{
            setState({
                "useChatActions.useCallback[addMessage]": (prev)=>({
                        ...prev,
                        messages: [
                            ...prev.messages,
                            message
                        ]
                    })
            }["useChatActions.useCallback[addMessage]"]);
        }
    }["useChatActions.useCallback[addMessage]"], [
        setState
    ]);
    const addRawMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatActions.useCallback[addRawMessage]": (message)=>{
            setState({
                "useChatActions.useCallback[addRawMessage]": (prev)=>({
                        ...prev,
                        rawMessages: [
                            ...prev.rawMessages,
                            message
                        ]
                    })
            }["useChatActions.useCallback[addRawMessage]"]);
        }
    }["useChatActions.useCallback[addRawMessage]"], [
        setState
    ]);
    const setIsLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatActions.useCallback[setIsLoading]": (loading)=>{
            setState({
                "useChatActions.useCallback[setIsLoading]": (prev)=>({
                        ...prev,
                        isLoading: loading
                    })
            }["useChatActions.useCallback[setIsLoading]"]);
        }
    }["useChatActions.useCallback[setIsLoading]"], [
        setState
    ]);
    const setStreamingContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatActions.useCallback[setStreamingContent]": (content)=>{
            setState({
                "useChatActions.useCallback[setStreamingContent]": (prev)=>({
                        ...prev,
                        streamingContent: content
                    })
            }["useChatActions.useCallback[setStreamingContent]"]);
        }
    }["useChatActions.useCallback[setStreamingContent]"], [
        setState
    ]);
    const clearRawMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatActions.useCallback[clearRawMessages]": ()=>{
            setState({
                "useChatActions.useCallback[clearRawMessages]": (prev)=>({
                        ...prev,
                        rawMessages: []
                    })
            }["useChatActions.useCallback[clearRawMessages]"]);
        }
    }["useChatActions.useCallback[clearRawMessages]"], [
        setState
    ]);
    const setMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatActions.useCallback[setMessages]": (messages)=>{
            setState({
                "useChatActions.useCallback[setMessages]": (prev)=>({
                        ...prev,
                        messages
                    })
            }["useChatActions.useCallback[setMessages]"]);
        }
    }["useChatActions.useCallback[setMessages]"], [
        setState
    ]);
    return {
        addMessage,
        addRawMessage,
        setIsLoading,
        setStreamingContent,
        clearRawMessages,
        setMessages
    };
};
_s(useChatActions, "qeUFqCFUyYDTC1edLlIcWIlSeNY=");
function ChatProvider({ children }) {
    _s1();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const actions = useChatActions(state, setState);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatProvider.useMemo[value]": ()=>({
                ...state,
                ...actions
            })
    }["ChatProvider.useMemo[value]"], [
        state,
        actions
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ChatContext.tsx",
        lineNumber: 97,
        columnNumber: 10
    }, this);
}
_s1(ChatProvider, "lEqJ0wZtbE8ZtXsVUnMlWb3c7Vs=", false, function() {
    return [
        useChatActions
    ];
});
_c = ChatProvider;
function useChat() {
    _s2();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
_s2(useChat, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
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
// Utility functions to keep the code DRY
const getGraphId = ()=>("TURBOPACK compile-time value", "react_agent") || 'react_agent';
const formatThread = (thread)=>({
        thread_id: thread.thread_id,
        created_at: thread.created_at || new Date().toISOString(),
        messages: []
    });
const formatMessages = (state)=>{
    if (!state) return [];
    const rawState = state;
    if (rawState?.values?.messages && Array.isArray(rawState.values.messages)) {
        return rawState.values.messages.map((msg)=>({
                role: msg.type === 'human' ? 'user' : 'assistant',
                content: msg.content
            }));
    }
    if (rawState?.messages && Array.isArray(rawState.messages)) {
        return rawState.messages.map((msg)=>({
                role: msg.role,
                content: msg.content
            }));
    }
    return [];
};
function ThreadProvider({ children }) {
    _s();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const [threads, setThreads] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [currentThreadId, setCurrentThreadId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { setMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const loadThreads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[loadThreads]": async ()=>{
            if (!client) return;
            try {
                setIsLoading(true);
                const response = await client.threads.search({
                    metadata: {
                        graph_id: getGraphId()
                    },
                    limit: 10
                });
                const validThreads = response.filter({
                    "ThreadProvider.useCallback[loadThreads].validThreads": (thread)=>thread.thread_id
                }["ThreadProvider.useCallback[loadThreads].validThreads"]).sort({
                    "ThreadProvider.useCallback[loadThreads].validThreads": (a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                }["ThreadProvider.useCallback[loadThreads].validThreads"]).map(formatThread);
                setThreads(validThreads);
                await Promise.all(validThreads.map({
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
                const response = await client.threads.create({
                    metadata: {
                        graph_id: getGraphId()
                    }
                });
                const newThread = formatThread(response);
                setThreads({
                    "ThreadProvider.useCallback[createNewThread]": (prev)=>[
                            newThread,
                            ...prev
                        ]
                }["ThreadProvider.useCallback[createNewThread]"]);
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
                const messages = formatMessages(state);
                setThreads({
                    "ThreadProvider.useCallback[loadThreadHistory]": (prev)=>prev.map({
                            "ThreadProvider.useCallback[loadThreadHistory]": (thread)=>thread.thread_id === threadId ? {
                                    ...thread,
                                    messages
                                } : thread
                        }["ThreadProvider.useCallback[loadThreadHistory]"])
                }["ThreadProvider.useCallback[loadThreadHistory]"]);
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
                await client.threads.delete(threadId);
                setThreads({
                    "ThreadProvider.useCallback[deleteThread]": (prev)=>prev.filter({
                            "ThreadProvider.useCallback[deleteThread]": (t)=>t.thread_id !== threadId
                        }["ThreadProvider.useCallback[deleteThread]"])
                }["ThreadProvider.useCallback[deleteThread]"]);
                if (currentThreadId === threadId) {
                    setCurrentThreadId(null);
                }
                await loadThreads();
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
                const allThreads = await client.threads.search({
                    metadata: {
                        graph_id: getGraphId()
                    }
                });
                await Promise.all(allThreads.map({
                    "ThreadProvider.useCallback[deleteAllThreads]": (thread)=>client.threads.delete(thread.thread_id).catch({
                            "ThreadProvider.useCallback[deleteAllThreads]": (error)=>console.error(`Error deleting thread ${thread.thread_id}:`, error)
                        }["ThreadProvider.useCallback[deleteAllThreads]"])
                }["ThreadProvider.useCallback[deleteAllThreads]"]));
                setThreads([]);
                setCurrentThreadId(null);
            } catch (error) {
                console.error('Error deleting all threads:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[deleteAllThreads]"], [
        client
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadContext.Provider, {
        value: {
            threads,
            currentThreadId,
            isLoading,
            loadThreads,
            createNewThread,
            loadThreadHistory,
            deleteThread,
            deleteAllThreads,
            setCurrentThreadId
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThreadContext.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s(ThreadProvider, "cs4dPEKbwdLk/zZ+ynwJ4Y2jtnc=", false, function() {
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