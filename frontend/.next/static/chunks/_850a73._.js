(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_850a73._.js", {

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
        clearRawMessages
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ChatContext.tsx",
        lineNumber: 51,
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
"[project]/contexts/AssistantContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AssistantProvider": (()=>AssistantProvider),
    "useAssistant": (()=>useAssistant)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/contexts/ClientContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
const AssistantContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AssistantProvider({ children }) {
    _s();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const [assistants, setAssistants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAssistantId, setSelectedAssistantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssistantProvider.useEffect": ()=>{
            async function loadAssistants() {
                if (!client) return;
                try {
                    setIsLoading(true);
                    const data = await client.assistants.search();
                    setAssistants(data);
                    // Auto-select the first assistant if none is selected
                    if (!selectedAssistantId && data.length > 0) {
                        setSelectedAssistantId(data[0].assistant_id);
                    }
                } catch (err) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                } finally{
                    setIsLoading(false);
                }
            }
            loadAssistants();
        }
    }["AssistantProvider.useEffect"], [
        client,
        selectedAssistantId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssistantContext.Provider, {
        value: {
            assistants,
            selectedAssistantId,
            setSelectedAssistantId,
            isLoading,
            error
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/AssistantContext.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(AssistantProvider, "tiRztlXBXmIAwchQiU3f0lMrxhQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"]
    ];
});
_c = AssistantProvider;
function useAssistant() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AssistantContext);
    if (context === undefined) {
        throw new Error('useAssistant must be used within an AssistantProvider');
    }
    return context;
}
_s1(useAssistant, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "AssistantProvider");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/contexts/AssistantContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
const ThreadContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThreadProvider({ children }) {
    _s();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const { selectedAssistantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentThreadId, setCurrentThreadId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load threads when the component mounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreadProvider.useEffect": ()=>{
            loadThreads();
        }
    }["ThreadProvider.useEffect"], []);
    const loadThreads = async ()=>{
        if (!client) return;
        try {
            setIsLoading(true);
            const response = await fetch('/api/threads');
            if (!response.ok) {
                throw new Error('Failed to load threads');
            }
            const data = await response.json();
            setThreads(data.threads || []);
        } catch (error) {
            console.error('Error loading threads:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const createNewThread = async ()=>{
        if (!client || !selectedAssistantId) {
            throw new Error('Client or assistant not initialized');
        }
        try {
            setIsLoading(true);
            const response = await fetch('/api/threads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assistant_id: selectedAssistantId,
                    metadata: {
                        assistant_id: selectedAssistantId,
                        created_at: new Date().toISOString()
                    }
                })
            });
            if (!response.ok) {
                throw new Error('Failed to create thread');
            }
            const { thread_id } = await response.json();
            setCurrentThreadId(thread_id);
            await loadThreads(); // Refresh the threads list
            return thread_id;
        } catch (error) {
            console.error('Error creating thread:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const loadThreadHistory = async (threadId)=>{
        if (!client) return;
        try {
            setIsLoading(true);
            const response = await fetch(`/api/threads/${threadId}/history`);
            if (!response.ok) {
                throw new Error('Failed to load thread history');
            }
            const { messages } = await response.json();
            // Update the thread's messages in the threads array
            setThreads((prevThreads)=>{
                return prevThreads.map((thread)=>{
                    if (thread.thread_id === threadId) {
                        return {
                            ...thread,
                            messages
                        };
                    }
                    return thread;
                });
            });
        } catch (error) {
            console.error('Error loading thread history:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const deleteThread = async (threadId)=>{
        if (!client) return false;
        try {
            setIsLoading(true);
            const response = await fetch(`/api/threads/${threadId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete thread');
            }
            // Remove the thread from the threads array
            setThreads((prevThreads)=>prevThreads.filter((thread)=>thread.thread_id !== threadId));
            // If the deleted thread was the current thread, clear the current thread ID
            if (currentThreadId === threadId) {
                setCurrentThreadId(null);
            }
            return true;
        } catch (error) {
            console.error('Error deleting thread:', error);
            return false;
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadContext.Provider, {
        value: {
            threads,
            currentThreadId,
            createNewThread,
            loadThreadHistory,
            deleteThread,
            setCurrentThreadId,
            loadThreads,
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThreadContext.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(ThreadProvider, "KZv1zF2ZYdYehFF2TK9hrWK2og8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ClientContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"]
    ];
});
_c = ThreadProvider;
function useThread() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThreadContext);
    if (context === undefined) {
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

//# sourceMappingURL=_850a73._.js.map