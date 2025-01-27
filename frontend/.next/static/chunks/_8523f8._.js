(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_8523f8._.js", {

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
"[project]/types/chat-context.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "initialChatState": (()=>initialChatState)
});
const initialChatState = {
    messages: [],
    rawMessages: [],
    isLoading: false,
    streamingContent: ''
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useChatStateActions.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useChatStateActions": (()=>useChatStateActions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
function useChatStateActions(setState) {
    _s();
    // Add a new processed message to the chat
    const addMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatStateActions.useCallback[addMessage]": (message)=>{
            setState({
                "useChatStateActions.useCallback[addMessage]": (prev)=>({
                        ...prev,
                        messages: [
                            ...prev.messages,
                            message
                        ]
                    })
            }["useChatStateActions.useCallback[addMessage]"]);
        }
    }["useChatStateActions.useCallback[addMessage]"], [
        setState
    ]);
    // Add a new raw message to the chat
    const addRawMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatStateActions.useCallback[addRawMessage]": (message)=>{
            setState({
                "useChatStateActions.useCallback[addRawMessage]": (prev)=>({
                        ...prev,
                        rawMessages: [
                            ...prev.rawMessages,
                            message
                        ]
                    })
            }["useChatStateActions.useCallback[addRawMessage]"]);
        }
    }["useChatStateActions.useCallback[addRawMessage]"], [
        setState
    ]);
    // Update loading state for async operations
    const setIsLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatStateActions.useCallback[setIsLoading]": (loading)=>{
            setState({
                "useChatStateActions.useCallback[setIsLoading]": (prev)=>({
                        ...prev,
                        isLoading: loading
                    })
            }["useChatStateActions.useCallback[setIsLoading]"]);
        }
    }["useChatStateActions.useCallback[setIsLoading]"], [
        setState
    ]);
    // Update streaming content during real-time message delivery
    const setStreamingContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatStateActions.useCallback[setStreamingContent]": (content)=>{
            setState({
                "useChatStateActions.useCallback[setStreamingContent]": (prev)=>({
                        ...prev,
                        streamingContent: content
                    })
            }["useChatStateActions.useCallback[setStreamingContent]"]);
        }
    }["useChatStateActions.useCallback[setStreamingContent]"], [
        setState
    ]);
    // Clear all raw messages from state
    const clearRawMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatStateActions.useCallback[clearRawMessages]": ()=>{
            setState({
                "useChatStateActions.useCallback[clearRawMessages]": (prev)=>({
                        ...prev,
                        rawMessages: []
                    })
            }["useChatStateActions.useCallback[clearRawMessages]"]);
        }
    }["useChatStateActions.useCallback[clearRawMessages]"], [
        setState
    ]);
    // Replace all messages with a new array
    const setMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatStateActions.useCallback[setMessages]": (messages)=>{
            setState({
                "useChatStateActions.useCallback[setMessages]": (prev)=>({
                        ...prev,
                        messages
                    })
            }["useChatStateActions.useCallback[setMessages]"]);
        }
    }["useChatStateActions.useCallback[setMessages]"], [
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
}
_s(useChatStateActions, "qeUFqCFUyYDTC1edLlIcWIlSeNY=");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/types/chat-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useChatStateActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/hooks/useChatStateActions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
// Create context with undefined default to ensure proper provider usage
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ChatProvider({ children }) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$types$2f$chat$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialChatState"]);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useChatStateActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStateActions"])(setState);
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
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_s(ChatProvider, "plVSkHDiHwASp/2EW2avqYobBQI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useChatStateActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStateActions"]
    ];
});
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
// Import statements and module declarations
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
// Create context for thread management
const ThreadContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(null);
// Helper function to get the graph ID from environment variables
const getGraphId = ()=>("TURBOPACK compile-time value", "react_agent") || 'react_agent';
function ThreadProvider({ children }) {
    _s();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const [threads, setThreads] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [currentThreadId, setCurrentThreadId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { setMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    /**
   * Loads all threads from the backend
   * Filters and sorts threads by creation date
   */ const loadThreads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[loadThreads]": async ()=>{
            if (!client) return;
            try {
                setIsLoading(true);
                const response = await client.threads.search({
                    metadata: {
                        graph_id: getGraphId()
                    }
                });
                const validThreads = await Promise.all(response.filter({
                    "ThreadProvider.useCallback[loadThreads]": (thread)=>thread.thread_id
                }["ThreadProvider.useCallback[loadThreads]"]).map({
                    "ThreadProvider.useCallback[loadThreads]": async (thread)=>{
                        try {
                            const state = await client.threads.getState(thread.thread_id);
                            return {
                                thread_id: thread.thread_id,
                                created_at: thread.created_at || new Date().toISOString(),
                                messages: state?.values?.messages || []
                            };
                        } catch (error) {
                            console.error(`Thread ${thread.thread_id} not found:`, error);
                            return null;
                        }
                    }
                }["ThreadProvider.useCallback[loadThreads]"]));
                // Filter out null threads and sort by creation date
                const activeThreads = validThreads.filter({
                    "ThreadProvider.useCallback[loadThreads].activeThreads": (thread)=>thread !== null
                }["ThreadProvider.useCallback[loadThreads].activeThreads"]).sort({
                    "ThreadProvider.useCallback[loadThreads].activeThreads": (a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                }["ThreadProvider.useCallback[loadThreads].activeThreads"]);
                setThreads(activeThreads);
            } catch (error) {
                console.error('Error loading threads:', error);
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[loadThreads]"], [
        client
    ]);
    // Initialize threads when component mounts
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ThreadProvider.useEffect": ()=>{
            loadThreads();
        }
    }["ThreadProvider.useEffect"], [
        loadThreads
    ]);
    /**
   * Loads message history for a specific thread
   * Updates both thread messages and current chat messages
   */ const loadThreadHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[loadThreadHistory]": async (threadId)=>{
            if (!client) return;
            try {
                const state = await client.threads.getState(threadId);
                const messages = state?.values?.messages || [];
                // Update thread messages in state
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
                console.error(`Error loading thread history:`, error);
            }
        }
    }["ThreadProvider.useCallback[loadThreadHistory]"], [
        client,
        setMessages
    ]);
    /**
   * Creates a new chat thread
   * Returns the new thread ID
   */ const createNewThread = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[createNewThread]": async ()=>{
            if (!client) throw new Error('Client not initialized');
            try {
                setIsLoading(true);
                const thread = await client.threads.create({
                    metadata: {
                        graph_id: getGraphId()
                    }
                });
                const newThread = {
                    thread_id: thread.thread_id,
                    created_at: thread.created_at || new Date().toISOString(),
                    messages: []
                };
                // Add new thread to beginning of threads list
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
    /**
   * Deletes a specific thread
   * If current thread is deleted, resets current thread state
   */ const deleteThread = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[deleteThread]": async (threadId)=>{
            if (!client) return;
            try {
                setIsLoading(true);
                await client.threads.delete(threadId);
                await loadThreads();
                // Reset current thread if it was deleted
                if (currentThreadId === threadId) {
                    setCurrentThreadId(null);
                    setMessages([]);
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
        setMessages,
        loadThreads
    ]);
    /**
   * Deletes all threads associated with current graph
   * Resets all thread-related state
   */ const deleteAllThreads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ThreadProvider.useCallback[deleteAllThreads]": async ()=>{
            if (!client) return;
            try {
                setIsLoading(true);
                const allThreads = await client.threads.search({
                    metadata: {
                        graph_id: getGraphId()
                    }
                });
                // Delete all threads in parallel
                await Promise.all(allThreads.map({
                    "ThreadProvider.useCallback[deleteAllThreads]": (thread)=>client.threads.delete(thread.thread_id).catch({
                            "ThreadProvider.useCallback[deleteAllThreads]": (error)=>console.error(`Error deleting thread ${thread.thread_id}:`, error)
                        }["ThreadProvider.useCallback[deleteAllThreads]"])
                }["ThreadProvider.useCallback[deleteAllThreads]"]));
                await loadThreads();
                setCurrentThreadId(null);
                setMessages([]);
            } catch (error) {
                console.error('Error deleting all threads:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["ThreadProvider.useCallback[deleteAllThreads]"], [
        client,
        setMessages,
        loadThreads
    ]);
    // Context value containing all thread management functions and state
    const value = {
        threads,
        currentThreadId,
        isLoading,
        loadThreads,
        createNewThread,
        loadThreadHistory,
        deleteThread,
        deleteAllThreads,
        setCurrentThreadId
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThreadContext.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s(ThreadProvider, "RI6VH6FQnBRlzZcurascfNMAaX8=", false, function() {
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

//# sourceMappingURL=_8523f8._.js.map