(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_fae288._.js", {

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
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
const ThreadContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThreadProvider({ children }) {
    _s();
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentThreadId, setCurrentThreadId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadThreads = async ()=>{
        setIsLoading(true);
        try {
            const response = await fetch('/api/threads');
            if (!response.ok) {
                throw new Error('Failed to fetch threads');
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setThreads(data);
                // If we have threads but no current thread selected, select the first one
                if (data.length > 0 && !currentThreadId) {
                    setCurrentThreadId(data[0].id);
                }
            } else {
                console.error('Invalid threads data format:', data);
                setThreads([]);
            }
        } catch (error) {
            console.error('Error loading threads:', error);
            setThreads([]);
        } finally{
            setIsLoading(false);
        }
    };
    const createThread = ()=>{
        try {
            const newThreadId = crypto.randomUUID();
            const newThread = {
                id: newThreadId,
                title: 'New Chat',
                lastMessage: '',
                timestamp: new Date().toISOString()
            };
            setThreads((prevThreads)=>{
                const updatedThreads = Array.isArray(prevThreads) ? prevThreads : [];
                return [
                    newThread,
                    ...updatedThreads
                ];
            });
            setCurrentThreadId(newThreadId);
            return newThreadId;
        } catch (error) {
            console.error('Error creating thread:', error);
            return '';
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreadProvider.useEffect": ()=>{
            loadThreads();
        }
    }["ThreadProvider.useEffect"], []);
    const value = {
        threads,
        currentThreadId,
        setCurrentThreadId,
        createThread,
        loadThreads,
        isLoading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThreadContext.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(ThreadProvider, "otICla6KbrGZB+RN6ERjPWWCjEc=");
_c = ThreadProvider;
function useThread() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThreadContext);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/contexts/ThreadContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ChatProvider({ children }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawMessages, setRawMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingContent, setStreamingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { currentThreadId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThread"])();
    const addMessage = (message)=>{
        setMessages((prev)=>{
            if (message.role === 'user') {
                return [
                    ...prev,
                    message
                ];
            }
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.role === 'assistant' && lastMessage?.content === message.content) {
                return prev;
            }
            return [
                ...prev,
                message
            ];
        });
    };
    const addRawMessage = (message)=>{
        setRawMessages((prev)=>[
                ...prev,
                message
            ]);
    };
    const clearMessages = ()=>{
        setMessages([]);
        setRawMessages([]);
        setStreamingContent('');
    };
    const loadThreadMessages = async (threadId)=>{
        try {
            const response = await fetch(`/api/threads/${threadId}/messages`);
            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            console.error('Error loading thread messages:', error);
        }
    };
    // Load messages when thread changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatProvider.useEffect": ()=>{
            if (currentThreadId) {
                loadThreadMessages(currentThreadId);
            } else {
                clearMessages();
            }
        }
    }["ChatProvider.useEffect"], [
        currentThreadId
    ]);
    const value = {
        messages,
        rawMessages,
        addMessage,
        addRawMessage,
        isLoading,
        setIsLoading,
        streamingContent,
        setStreamingContent,
        clearMessages,
        loadThreadMessages
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ChatContext.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(ChatProvider, "9msgB2IskDYs6rO6WqPZPzPcrHo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThread"]
    ];
});
_c = ChatProvider;
function useChat() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (!context) {
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
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_fae288._.js.map