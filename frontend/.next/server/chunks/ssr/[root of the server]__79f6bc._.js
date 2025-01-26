module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/contexts/ClientContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ClientProvider": (()=>ClientProvider),
    "useClient": (()=>useClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/client.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const ClientContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    client: null
});
function ClientProvider({ children, config }) {
    // Memoize the client instance to prevent unnecessary re-renders
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Client"](config), [
        config
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientContext.Provider, {
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
function useClient() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ClientContext);
    if (!context) {
        throw new Error('useClient must be used within a ClientProvider');
    }
    return context.client;
}
}}),
"[project]/contexts/ChatContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChatProvider": (()=>ChatProvider),
    "useChat": (()=>useChat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ChatProvider({ children }) {
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const addMessage = (message)=>{
        setMessages((prev)=>[
                ...prev,
                message
            ]);
    };
    const addEvent = (event)=>{
        setEvents((prev)=>[
                ...prev,
                event
            ]);
        // If it's a message completion event, add it to messages
        if (event.event === 'messages/complete') {
            const content = typeof event.data === 'string' ? event.data : event.data.content;
            addMessage({
                role: event.data.role || 'assistant',
                content
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: {
            messages,
            addMessage,
            isLoading,
            setIsLoading,
            events,
            addEvent
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ChatContext.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
function useChat() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
}}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_require__("[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),
"[project]/node_modules/retry/lib/retry_operation.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
function RetryOperation(timeouts, options) {
    // Compatibility for the old (timeouts, retryForever) signature
    if (typeof options === 'boolean') {
        options = {
            forever: options
        };
    }
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
    this._timer = null;
    if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
    }
}
module.exports = RetryOperation;
RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts.slice(0);
};
RetryOperation.prototype.stop = function() {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (this._timer) {
        clearTimeout(this._timer);
    }
    this._timeouts = [];
    this._cachedTimeouts = null;
};
RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (!err) {
        return false;
    }
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error('RetryOperation timeout occurred'));
        return false;
    }
    this._errors.push(err);
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
        if (this._cachedTimeouts) {
            // retry forever, only keep last error
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
        } else {
            return false;
        }
    }
    var self = this;
    this._timer = setTimeout(function() {
        self._attempts++;
        if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
                self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) {
                self._timeout.unref();
            }
        }
        self._fn(self._attempts);
    }, timeout);
    if (this._options.unref) {
        this._timer.unref();
    }
    return true;
};
RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
    if (timeoutOps) {
        if (timeoutOps.timeout) {
            this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
            this._operationTimeoutCb = timeoutOps.cb;
        }
    }
    var self = this;
    if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
            self._operationTimeoutCb();
        }, self._operationTimeout);
    }
    this._operationStart = new Date().getTime();
    this._fn(this._attempts);
};
RetryOperation.prototype.try = function(fn) {
    console.log('Using RetryOperation.try() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = function(fn) {
    console.log('Using RetryOperation.start() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = RetryOperation.prototype.try;
RetryOperation.prototype.errors = function() {
    return this._errors;
};
RetryOperation.prototype.attempts = function() {
    return this._attempts;
};
RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
        return null;
    }
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
    for(var i = 0; i < this._errors.length; i++){
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
        }
    }
    return mainError;
};
}}),
"[project]/node_modules/retry/lib/retry.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
var RetryOperation = __turbopack_require__("[project]/node_modules/retry/lib/retry_operation.js [app-ssr] (ecmascript)");
exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
    });
};
exports.timeouts = function(options) {
    if (options instanceof Array) {
        return [].concat(options);
    }
    var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: Infinity,
        randomize: false
    };
    for(var key in options){
        opts[key] = options[key];
    }
    if (opts.minTimeout > opts.maxTimeout) {
        throw new Error('minTimeout is greater than maxTimeout');
    }
    var timeouts = [];
    for(var i = 0; i < opts.retries; i++){
        timeouts.push(this.createTimeout(i, opts));
    }
    if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
    }
    // sort the array numerically ascending
    timeouts.sort(function(a, b) {
        return a - b;
    });
    return timeouts;
};
exports.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
};
exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
        methods = options;
        options = null;
    }
    if (!methods) {
        methods = [];
        for(var key in obj){
            if (typeof obj[key] === 'function') {
                methods.push(key);
            }
        }
    }
    for(var i = 0; i < methods.length; i++){
        var method = methods[i];
        var original = obj[method];
        obj[method] = (function retryWrapper(original) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
                if (op.retry(err)) {
                    return;
                }
                if (err) {
                    arguments[0] = op.mainError();
                }
                callback.apply(this, arguments);
            });
            op.attempt(function() {
                original.apply(obj, args);
            });
        }).bind(obj, original);
        obj[method].options = options;
    }
};
}}),
"[project]/node_modules/retry/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/retry/lib/retry.js [app-ssr] (ecmascript)");
}}),
"[project]/node_modules/p-retry/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
'use strict';
const retry = __turbopack_require__("[project]/node_modules/retry/index.js [app-ssr] (ecmascript)");
const networkErrorMsgs = [
    'Failed to fetch',
    'NetworkError when attempting to fetch resource.',
    'The Internet connection appears to be offline.',
    'Network request failed' // `cross-fetch`
];
class AbortError extends Error {
    constructor(message){
        super();
        if (message instanceof Error) {
            this.originalError = message;
            ({ message } = message);
        } else {
            this.originalError = new Error(message);
            this.originalError.stack = this.stack;
        }
        this.name = 'AbortError';
        this.message = message;
    }
}
const decorateErrorWithCounts = (error, attemptNumber, options)=>{
    // Minus 1 from attemptNumber because the first attempt does not count as a retry
    const retriesLeft = options.retries - (attemptNumber - 1);
    error.attemptNumber = attemptNumber;
    error.retriesLeft = retriesLeft;
    return error;
};
const isNetworkError = (errorMessage)=>networkErrorMsgs.includes(errorMessage);
const pRetry = (input, options)=>new Promise((resolve, reject)=>{
        options = {
            onFailedAttempt: ()=>{},
            retries: 10,
            ...options
        };
        const operation = retry.operation(options);
        operation.attempt(async (attemptNumber)=>{
            try {
                resolve(await input(attemptNumber));
            } catch (error) {
                if (!(error instanceof Error)) {
                    reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
                    return;
                }
                if (error instanceof AbortError) {
                    operation.stop();
                    reject(error.originalError);
                } else if (error instanceof TypeError && !isNetworkError(error.message)) {
                    operation.stop();
                    reject(error);
                } else {
                    decorateErrorWithCounts(error, attemptNumber, options);
                    try {
                        await options.onFailedAttempt(error);
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    if (!operation.retry(error)) {
                        reject(operation.mainError());
                    }
                }
            }
        });
    });
module.exports = pRetry;
// TODO: remove this in the next major version
module.exports.default = pRetry;
module.exports.AbortError = AbortError;
}}),
"[project]/node_modules/eventemitter3/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
'use strict';
var has = Object.prototype.hasOwnProperty, prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events){
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++){
        ee[i] = handlers[i].fn;
    }
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++){
            args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++){
                        args[j - 1] = arguments[j];
                    }
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
        }
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++){
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
            }
        }
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
    } else {
        this._events = new Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;
//
// Expose the module.
//
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = EventEmitter;
}
}}),
"[project]/node_modules/p-finally/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
'use strict';
module.exports = (promise, onFinally)=>{
    onFinally = onFinally || (()=>{});
    return promise.then((val)=>new Promise((resolve)=>{
            resolve(onFinally());
        }).then(()=>val), (err)=>new Promise((resolve)=>{
            resolve(onFinally());
        }).then(()=>{
            throw err;
        }));
};
}}),
"[project]/node_modules/p-timeout/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
'use strict';
const pFinally = __turbopack_require__("[project]/node_modules/p-finally/index.js [app-ssr] (ecmascript)");
class TimeoutError extends Error {
    constructor(message){
        super(message);
        this.name = 'TimeoutError';
    }
}
const pTimeout = (promise, milliseconds, fallback)=>new Promise((resolve, reject)=>{
        if (typeof milliseconds !== 'number' || milliseconds < 0) {
            throw new TypeError('Expected `milliseconds` to be a positive number');
        }
        if (milliseconds === Infinity) {
            resolve(promise);
            return;
        }
        const timer = setTimeout(()=>{
            if (typeof fallback === 'function') {
                try {
                    resolve(fallback());
                } catch (error) {
                    reject(error);
                }
                return;
            }
            const message = typeof fallback === 'string' ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
            const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
            if (typeof promise.cancel === 'function') {
                promise.cancel();
            }
            reject(timeoutError);
        }, milliseconds);
        // TODO: Use native `finally` keyword when targeting Node.js 10
        pFinally(// eslint-disable-next-line promise/prefer-await-to-then
        promise.then(resolve, reject), ()=>{
            clearTimeout(timer);
        });
    });
module.exports = pTimeout;
// TODO: Remove this for the next major release
module.exports.default = pTimeout;
module.exports.TimeoutError = TimeoutError;
}}),
"[project]/node_modules/p-queue/dist/lower-bound.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comparator) {
    let first = 0;
    let count = array.length;
    while(count > 0){
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
            first = ++it;
            count -= step + 1;
        } else {
            count = step;
        }
    }
    return first;
}
exports.default = lowerBound;
}}),
"[project]/node_modules/p-queue/dist/priority-queue.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const lower_bound_1 = __turbopack_require__("[project]/node_modules/p-queue/dist/lower-bound.js [app-ssr] (ecmascript)");
class PriorityQueue {
    constructor(){
        this._queue = [];
    }
    enqueue(run, options) {
        options = Object.assign({
            priority: 0
        }, options);
        const element = {
            priority: options.priority,
            run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
            this._queue.push(element);
            return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b)=>b.priority - a.priority);
        this._queue.splice(index, 0, element);
    }
    dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
    }
    filter(options) {
        return this._queue.filter((element)=>element.priority === options.priority).map((element)=>element.run);
    }
    get size() {
        return this._queue.length;
    }
}
exports.default = PriorityQueue;
}}),
"[project]/node_modules/p-queue/dist/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const EventEmitter = __turbopack_require__("[project]/node_modules/eventemitter3/index.js [app-ssr] (ecmascript)");
const p_timeout_1 = __turbopack_require__("[project]/node_modules/p-timeout/index.js [app-ssr] (ecmascript)");
const priority_queue_1 = __turbopack_require__("[project]/node_modules/p-queue/dist/priority-queue.js [app-ssr] (ecmascript)");
// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = ()=>{};
const timeoutError = new p_timeout_1.TimeoutError();
/**
Promise queue with concurrency control.
*/ class PQueue extends EventEmitter {
    constructor(options){
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        options = Object.assign({
            carryoverConcurrencyCount: false,
            intervalCap: Infinity,
            interval: 0,
            concurrency: Infinity,
            autoStart: true,
            queueClass: priority_queue_1.default
        }, options);
        if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
            throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ''}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
            throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ''}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
    }
    get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
    }
    get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
    }
    _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit('next');
    }
    _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
            this._resolveIdle();
            this._resolveIdle = empty;
            this.emit('idle');
        }
    }
    _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = undefined;
    }
    _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === undefined) {
            const delay = this._intervalEnd - now;
            if (delay < 0) {
                // Act as the interval was done
                // We don't need to resume it here because it will be resumed on line 160
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            } else {
                // Act as the interval is pending
                if (this._timeoutId === undefined) {
                    this._timeoutId = setTimeout(()=>{
                        this._onResumeInterval();
                    }, delay);
                }
                return true;
            }
        }
        return false;
    }
    _tryToStartAnother() {
        if (this._queue.size === 0) {
            // We can clear the interval ("pause")
            // Because we can redo it later ("resume")
            if (this._intervalId) {
                clearInterval(this._intervalId);
            }
            this._intervalId = undefined;
            this._resolvePromises();
            return false;
        }
        if (!this._isPaused) {
            const canInitializeInterval = !this._isIntervalPaused();
            if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                const job = this._queue.dequeue();
                if (!job) {
                    return false;
                }
                this.emit('active');
                job();
                if (canInitializeInterval) {
                    this._initializeIntervalIfNeeded();
                }
                return true;
            }
        }
        return false;
    }
    _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== undefined) {
            return;
        }
        this._intervalId = setInterval(()=>{
            this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
    }
    _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
    }
    /**
    Executes all queued functions until it reaches the limit.
    */ _processQueue() {
        // eslint-disable-next-line no-empty
        while(this._tryToStartAnother()){}
    }
    get concurrency() {
        return this._concurrency;
    }
    set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
    }
    /**
    Adds a sync or async task to the queue. Always returns a promise.
    */ async add(fn, options = {}) {
        return new Promise((resolve, reject)=>{
            const run = async ()=>{
                this._pendingCount++;
                this._intervalCount++;
                try {
                    const operation = this._timeout === undefined && options.timeout === undefined ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === undefined ? this._timeout : options.timeout, ()=>{
                        if (options.throwOnTimeout === undefined ? this._throwOnTimeout : options.throwOnTimeout) {
                            reject(timeoutError);
                        }
                        return undefined;
                    });
                    resolve(await operation);
                } catch (error) {
                    reject(error);
                }
                this._next();
            };
            this._queue.enqueue(run, options);
            this._tryToStartAnother();
            this.emit('add');
        });
    }
    /**
    Same as `.add()`, but accepts an array of sync or async functions.

    @returns A promise that resolves when all functions are resolved.
    */ async addAll(functions, options) {
        return Promise.all(functions.map(async (function_)=>this.add(function_, options)));
    }
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */ start() {
        if (!this._isPaused) {
            return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
    }
    /**
    Put queue execution on hold.
    */ pause() {
        this._isPaused = true;
    }
    /**
    Clear the queue.
    */ clear() {
        this._queue = new this._queueClass();
    }
    /**
    Can be called multiple times. Useful if you for example add additional items at a later time.

    @returns A promise that settles when the queue becomes empty.
    */ async onEmpty() {
        // Instantly resolve if the queue is empty
        if (this._queue.size === 0) {
            return;
        }
        return new Promise((resolve)=>{
            const existingResolve = this._resolveEmpty;
            this._resolveEmpty = ()=>{
                existingResolve();
                resolve();
            };
        });
    }
    /**
    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.

    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
    */ async onIdle() {
        // Instantly resolve if none pending and if nothing else is queued
        if (this._pendingCount === 0 && this._queue.size === 0) {
            return;
        }
        return new Promise((resolve)=>{
            const existingResolve = this._resolveIdle;
            this._resolveIdle = ()=>{
                existingResolve();
                resolve();
            };
        });
    }
    /**
    Size of the queue.
    */ get size() {
        return this._queue.size;
    }
    /**
    Size of the queue, filtered by the given options.

    For example, this can be used to find the number of items remaining in the queue with a specific priority level.
    */ sizeBy(options) {
        // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
        return this._queue.filter(options).length;
    }
    /**
    Number of pending promises.
    */ get pending() {
        return this._pendingCount;
    }
    /**
    Whether the queue is currently paused.
    */ get isPaused() {
        return this._isPaused;
    }
    get timeout() {
        return this._timeout;
    }
    /**
    Set the timeout for future operations.
    */ set timeout(milliseconds) {
        this._timeout = milliseconds;
    }
}
exports.default = PQueue;
}}),
"[project]/node_modules/@langchain/langgraph-sdk/dist/utils/async_caller.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AsyncCaller": (()=>AsyncCaller)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$retry$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/p-retry/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/p-queue/dist/index.js [app-ssr] (ecmascript)");
;
;
const STATUS_NO_RETRY = [
    400,
    401,
    403,
    404,
    405,
    406,
    407,
    408,
    422
];
const STATUS_IGNORE = [
    409
];
/**
 * Do not rely on globalThis.Response, rather just
 * do duck typing
 */ function isResponse(x) {
    if (x == null || typeof x !== "object") return false;
    return "status" in x && "statusText" in x && "text" in x;
}
/**
 * Utility error to properly handle failed requests
 */ class HTTPError extends Error {
    constructor(status, message, response){
        super(`HTTP ${status}: ${message}`);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = status;
        this.text = message;
        this.response = response;
    }
    static async fromResponse(response, options) {
        try {
            return new HTTPError(response.status, await response.text(), options?.includeResponse ? response : undefined);
        } catch  {
            return new HTTPError(response.status, response.statusText, options?.includeResponse ? response : undefined);
        }
    }
}
class AsyncCaller {
    constructor(params){
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedResponseHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customFetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 4;
        if ("default" in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].default({
                concurrency: this.maxConcurrency
            });
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
                concurrency: this.maxConcurrency
            });
        }
        this.onFailedResponseHook = params?.onFailedResponseHook;
        this.customFetch = params.fetch;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        const onFailedResponseHook = this.onFailedResponseHook;
        return this.queue.add(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$retry$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(()=>callable(...args).catch(async (error)=>{
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (error instanceof Error) {
                        throw error;
                    } else if (isResponse(error)) {
                        throw await HTTPError.fromResponse(error, {
                            includeResponse: !!onFailedResponseHook
                        });
                    } else {
                        throw new Error(error);
                    }
                }), {
                async onFailedAttempt (error) {
                    if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
                        throw error;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (error?.code === "ECONNABORTED") {
                        throw error;
                    }
                    if (error instanceof HTTPError) {
                        if (STATUS_NO_RETRY.includes(error.status)) {
                            throw error;
                        } else if (STATUS_IGNORE.includes(error.status)) {
                            return;
                        }
                        if (onFailedResponseHook && error.response) {
                            await onFailedResponseHook(error.response);
                        }
                    }
                },
                // If needed we can change some of the defaults here,
                // but they're quite sensible.
                retries: this.maxRetries,
                randomize: true
            }), {
            throwOnTimeout: true
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject)=>{
                    options.signal?.addEventListener("abort", ()=>{
                        reject(new Error("AbortError"));
                    });
                })
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        const fetchFn = this.customFetch ?? fetch;
        return this.call(()=>fetchFn(...args).then((res)=>res.ok ? res : Promise.reject(res)));
    }
}
}}),
"[project]/node_modules/@langchain/langgraph-sdk/dist/utils/stream.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */ __turbopack_esm__({
    "IterableReadableStream": (()=>IterableReadableStream)
});
class IterableReadableStream extends ReadableStream {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) {
            this.reader = this.getReader();
        }
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done) {
                this.reader.releaseLock(); // release lock when stream becomes closed
                return {
                    done: true,
                    value: undefined
                };
            } else {
                return {
                    done: false,
                    value: result.value
                };
            }
        } catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        // If wrapped in a Node stream, cancel is already called.
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        return {
            done: true,
            value: undefined
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async throw(e) {
        this.ensureReader();
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        throw e;
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    static fromReadableStream(stream) {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
        const reader = stream.getReader();
        return new IterableReadableStream({
            start (controller) {
                return pump();
                "TURBOPACK unreachable";
                function pump() {
                    return reader.read().then(({ done, value })=>{
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            },
            cancel () {
                reader.releaseLock();
            }
        });
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull (controller) {
                const { value, done } = await generator.next();
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                }
                // Fix: `else if (value)` will hang the streaming when nullish value (e.g. empty string) is pulled
                controller.enqueue(value);
            },
            async cancel (reason) {
                await generator.return(reason);
            }
        });
    }
}
}}),
"[project]/node_modules/eventsource-parser/dist/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createParser": (()=>createParser)
});
function createParser(onParse) {
    let isFirstChunk;
    let buffer;
    let startingPosition;
    let startingFieldLength;
    let eventId;
    let eventName;
    let data;
    reset();
    return {
        feed,
        reset
    };
    "TURBOPACK unreachable";
    function reset() {
        isFirstChunk = true;
        buffer = "";
        startingPosition = 0;
        startingFieldLength = -1;
        eventId = void 0;
        eventName = void 0;
        data = "";
    }
    function feed(chunk) {
        buffer = buffer ? buffer + chunk : chunk;
        if (isFirstChunk && hasBom(buffer)) {
            buffer = buffer.slice(BOM.length);
        }
        isFirstChunk = false;
        const length = buffer.length;
        let position = 0;
        let discardTrailingNewline = false;
        while(position < length){
            if (discardTrailingNewline) {
                if (buffer[position] === "\n") {
                    ++position;
                }
                discardTrailingNewline = false;
            }
            let lineLength = -1;
            let fieldLength = startingFieldLength;
            let character;
            for(let index = startingPosition; lineLength < 0 && index < length; ++index){
                character = buffer[index];
                if (character === ":" && fieldLength < 0) {
                    fieldLength = index - position;
                } else if (character === "\r") {
                    discardTrailingNewline = true;
                    lineLength = index - position;
                } else if (character === "\n") {
                    lineLength = index - position;
                }
            }
            if (lineLength < 0) {
                startingPosition = length - position;
                startingFieldLength = fieldLength;
                break;
            } else {
                startingPosition = 0;
                startingFieldLength = -1;
            }
            parseEventStreamLine(buffer, position, fieldLength, lineLength);
            position += lineLength + 1;
        }
        if (position === length) {
            buffer = "";
        } else if (position > 0) {
            buffer = buffer.slice(position);
        }
    }
    function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
        if (lineLength === 0) {
            if (data.length > 0) {
                onParse({
                    type: "event",
                    id: eventId,
                    event: eventName || void 0,
                    data: data.slice(0, -1)
                });
                data = "";
                eventId = void 0;
            }
            eventName = void 0;
            return;
        }
        const noValue = fieldLength < 0;
        const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
        let step = 0;
        if (noValue) {
            step = lineLength;
        } else if (lineBuffer[index + fieldLength + 1] === " ") {
            step = fieldLength + 2;
        } else {
            step = fieldLength + 1;
        }
        const position = index + step;
        const valueLength = lineLength - step;
        const value = lineBuffer.slice(position, position + valueLength).toString();
        if (field === "data") {
            data += value ? "".concat(value, "\n") : "\n";
        } else if (field === "event") {
            eventName = value;
        } else if (field === "id" && !value.includes("\0")) {
            eventId = value;
        } else if (field === "retry") {
            const retry = parseInt(value, 10);
            if (!Number.isNaN(retry)) {
                onParse({
                    type: "reconnect-interval",
                    value: retry
                });
            }
        }
    }
}
const BOM = [
    239,
    187,
    191
];
function hasBom(buffer) {
    return BOM.every((charCode, index)=>buffer.charCodeAt(index) === charCode);
}
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@langchain/langgraph-sdk/dist/client.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Client": (()=>Client)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$async_caller$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/utils/async_caller.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$stream$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/utils/stream.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$eventsource$2d$parser$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/eventsource-parser/dist/index.js [app-ssr] (ecmascript)");
;
;
;
class BaseClient {
    constructor(config){
        Object.defineProperty(this, "asyncCaller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultHeaders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.asyncCaller = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$async_caller$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AsyncCaller"]({
            maxRetries: 4,
            maxConcurrency: 4,
            ...config?.callerOptions
        });
        this.timeoutMs = config?.timeoutMs || 12_000;
        this.apiUrl = config?.apiUrl || "http://localhost:8123";
        this.defaultHeaders = config?.defaultHeaders || {};
    }
    prepareFetchOptions(path, options) {
        const mutatedOptions = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options?.headers
            }
        };
        if (mutatedOptions.json) {
            mutatedOptions.body = JSON.stringify(mutatedOptions.json);
            mutatedOptions.headers = {
                ...mutatedOptions.headers,
                "Content-Type": "application/json"
            };
            delete mutatedOptions.json;
        }
        const targetUrl = new URL(`${this.apiUrl}${path}`);
        if (mutatedOptions.params) {
            for (const [key, value] of Object.entries(mutatedOptions.params)){
                if (value == null) continue;
                let strValue = typeof value === "string" || typeof value === "number" ? value.toString() : JSON.stringify(value);
                targetUrl.searchParams.append(key, strValue);
            }
            delete mutatedOptions.params;
        }
        return [
            targetUrl,
            mutatedOptions
        ];
    }
    async fetch(path, options) {
        const response = await this.asyncCaller.fetch(...this.prepareFetchOptions(path, options));
        if (response.status === 202 || response.status === 204) {
            return undefined;
        }
        return response.json();
    }
}
class CronsClient extends BaseClient {
    /**
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this cron job.
     * @param payload Payload for creating a cron job.
     * @returns The created background run.
     */ async createForThread(threadId, assistantId, payload) {
        const json = {
            schedule: payload?.schedule,
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook
        };
        return this.fetch(`/threads/${threadId}/runs/crons`, {
            method: "POST",
            json
        });
    }
    /**
     *
     * @param assistantId Assistant ID to use for this cron job.
     * @param payload Payload for creating a cron job.
     * @returns
     */ async create(assistantId, payload) {
        const json = {
            schedule: payload?.schedule,
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook
        };
        return this.fetch(`/runs/crons`, {
            method: "POST",
            json
        });
    }
    /**
     *
     * @param cronId Cron ID of Cron job to delete.
     */ async delete(cronId) {
        await this.fetch(`/runs/crons/${cronId}`, {
            method: "DELETE"
        });
    }
    /**
     *
     * @param query Query options.
     * @returns List of crons.
     */ async search(query) {
        return this.fetch("/runs/crons/search", {
            method: "POST",
            json: {
                assistant_id: query?.assistantId ?? undefined,
                thread_id: query?.threadId ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0
            }
        });
    }
}
class AssistantsClient extends BaseClient {
    /**
     * Get an assistant by ID.
     *
     * @param assistantId The ID of the assistant.
     * @returns Assistant
     */ async get(assistantId) {
        return this.fetch(`/assistants/${assistantId}`);
    }
    /**
     * Get the JSON representation of the graph assigned to a runnable
     * @param assistantId The ID of the assistant.
     * @returns Serialized graph
     */ async getGraph(assistantId) {
        return this.fetch(`/assistants/${assistantId}/graph`);
    }
    /**
     * Get the state and config schema of the graph assigned to a runnable
     * @param assistantId The ID of the assistant.
     * @returns Graph schema
     */ async getSchemas(assistantId) {
        return this.fetch(`/assistants/${assistantId}/schemas`);
    }
    /**
     * Create a new assistant.
     * @param payload Payload for creating an assistant.
     * @returns The created assistant.
     */ async create(payload) {
        return this.fetch("/assistants", {
            method: "POST",
            json: {
                graph_id: payload.graphId,
                config: payload.config,
                metadata: payload.metadata
            }
        });
    }
    /**
     * Update an assistant.
     * @param assistantId ID of the assistant.
     * @param payload Payload for updating the assistant.
     * @returns The updated assistant.
     */ async update(assistantId, payload) {
        return this.fetch(`/assistants/${assistantId}`, {
            method: "PATCH",
            json: {
                graph_id: payload.graphId,
                config: payload.config,
                metadata: payload.metadata
            }
        });
    }
    /**
     * Delete an assistant.
     *
     * @param assistantId ID of the assistant.
     */ async delete(assistantId) {
        return this.fetch(`/assistants/${assistantId}`, {
            method: "DELETE"
        });
    }
    /**
     * List assistants.
     * @param query Query options.
     * @returns List of assistants.
     */ async search(query) {
        return this.fetch("/assistants/search", {
            method: "POST",
            json: {
                graph_id: query?.graphId ?? undefined,
                metadata: query?.metadata ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0
            }
        });
    }
}
class ThreadsClient extends BaseClient {
    /**
     * Get a thread by ID.
     *
     * @param threadId ID of the thread.
     * @returns The thread.
     */ async get(threadId) {
        return this.fetch(`/threads/${threadId}`);
    }
    /**
     * Create a new thread.
     *
     * @param payload Payload for creating a thread.
     * @returns The created thread.
     */ async create(payload) {
        return this.fetch(`/threads`, {
            method: "POST",
            json: {
                metadata: payload?.metadata
            }
        });
    }
    /**
     * Update a thread.
     *
     * @param threadId ID of the thread.
     * @param payload Payload for updating the thread.
     * @returns The updated thread.
     */ async update(threadId, payload) {
        return this.fetch(`/threads/${threadId}`, {
            method: "PATCH",
            json: {
                metadata: payload?.metadata
            }
        });
    }
    /**
     * Delete a thread.
     *
     * @param threadId ID of the thread.
     */ async delete(threadId) {
        return this.fetch(`/threads/${threadId}`, {
            method: "DELETE"
        });
    }
    /**
     * List threads
     *
     * @param query Query options
     * @returns List of threads
     */ async search(query) {
        return this.fetch("/threads/search", {
            method: "POST",
            json: {
                metadata: query?.metadata ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0
            }
        });
    }
    /**
     * Get state for a thread.
     *
     * @param threadId ID of the thread.
     * @returns Thread state.
     */ async getState(threadId, checkpointId) {
        return this.fetch(checkpointId != null ? `/threads/${threadId}/state/${checkpointId}` : `/threads/${threadId}/state`);
    }
    /**
     * Add state to a thread.
     *
     * @param threadId The ID of the thread.
     * @returns
     */ async updateState(threadId, options) {
        return this.fetch(`/threads/${threadId}/state`, {
            method: "POST",
            json: {
                values: options.values,
                checkpoint_id: options.checkpointId,
                as_node: options?.asNode
            }
        });
    }
    /**
     * Patch the metadata of a thread.
     *
     * @param threadIdOrConfig Thread ID or config to patch the state of.
     * @param metadata Metadata to patch the state with.
     */ async patchState(threadIdOrConfig, metadata) {
        let threadId;
        if (typeof threadIdOrConfig !== "string") {
            if (typeof threadIdOrConfig.configurable.thread_id !== "string") {
                throw new Error("Thread ID is required when updating state with a config.");
            }
            threadId = threadIdOrConfig.configurable.thread_id;
        } else {
            threadId = threadIdOrConfig;
        }
        return this.fetch(`/threads/${threadId}/state`, {
            method: "PATCH",
            json: {
                metadata: metadata
            }
        });
    }
    /**
     * Get all past states for a thread.
     *
     * @param threadId ID of the thread.
     * @param options Additional options.
     * @returns List of thread states.
     */ async getHistory(threadId, options) {
        return this.fetch(`/threads/${threadId}/history`, {
            method: "POST",
            json: {
                limit: options?.limit ?? 10,
                before: options?.before,
                metadata: options?.metadata
            }
        });
    }
}
class RunsClient extends BaseClient {
    /**
     * Create a run and stream the results.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     */ async *stream(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            stream_mode: payload?.streamMode,
            feedback_keys: payload?.feedbackKeys,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter
        };
        if (payload?.multitaskStrategy != null) {
            json["multitask_strategy"] = payload?.multitaskStrategy;
        }
        const endpoint = threadId == null ? `/runs/stream` : `/threads/${threadId}/runs/stream`;
        const response = await this.asyncCaller.fetch(...this.prepareFetchOptions(endpoint, {
            method: "POST",
            json,
            signal: payload?.signal
        }));
        let parser;
        const textDecoder = new TextDecoder();
        const stream = (response.body || new ReadableStream({
            start: (ctrl)=>ctrl.close()
        })).pipeThrough(new TransformStream({
            async start (ctrl) {
                parser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$eventsource$2d$parser$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createParser"])((event)=>{
                    if (payload?.signal && payload.signal.aborted || event.type === "event" && event.data === "[DONE]") {
                        ctrl.terminate();
                        return;
                    }
                    if ("data" in event) {
                        ctrl.enqueue({
                            event: event.event ?? "message",
                            data: JSON.parse(event.data)
                        });
                    }
                });
            },
            async transform (chunk) {
                parser.feed(textDecoder.decode(chunk));
            }
        }));
        yield* __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$stream$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IterableReadableStream"].fromReadableStream(stream);
    }
    /**
     * Create a run.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     * @returns The created run.
     */ async create(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook
        };
        if (payload?.multitaskStrategy != null) {
            json["multitask_strategy"] = payload?.multitaskStrategy;
        }
        return this.fetch(`/threads/${threadId}/runs`, {
            method: "POST",
            json,
            signal: payload?.signal
        });
    }
    /**
     * Create a run and wait for it to complete.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     * @returns The last values chunk of the thread.
     */ async wait(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter
        };
        if (payload?.multitaskStrategy != null) {
            json["multitask_strategy"] = payload?.multitaskStrategy;
        }
        const endpoint = threadId == null ? `/runs/wait` : `/threads/${threadId}/runs/wait`;
        return this.fetch(endpoint, {
            method: "POST",
            json,
            signal: payload?.signal
        });
    }
    /**
     * List all runs for a thread.
     *
     * @param threadId The ID of the thread.
     * @param options Filtering and pagination options.
     * @returns List of runs.
     */ async list(threadId, options) {
        return this.fetch(`/threads/${threadId}/runs`, {
            params: {
                limit: options?.limit ?? 10,
                offset: options?.offset ?? 0
            }
        });
    }
    /**
     * Get a run by ID.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns The run.
     */ async get(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}`);
    }
    /**
     * Cancel a run.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @param wait Whether to block when canceling
     * @returns
     */ async cancel(threadId, runId, wait = false) {
        return this.fetch(`/threads/${threadId}/runs/${runId}/cancel`, {
            method: "POST",
            params: {
                wait: wait ? "1" : "0"
            }
        });
    }
    /**
     * Block until a run is done.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns
     */ async join(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}/join`);
    }
    /**
     * Delete a run.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns
     */ async delete(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}`, {
            method: "DELETE"
        });
    }
}
class Client {
    constructor(config){
        /**
         * The client for interacting with assistants.
         */ Object.defineProperty(this, "assistants", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with threads.
         */ Object.defineProperty(this, "threads", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with runs.
         */ Object.defineProperty(this, "runs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with cron runs.
         */ Object.defineProperty(this, "crons", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.assistants = new AssistantsClient(config);
        this.threads = new ThreadsClient(config);
        this.runs = new RunsClient(config);
        this.crons = new CronsClient(config);
    }
}
}}),
"[project]/node_modules/@langchain/langgraph-sdk/dist/index.mjs [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
}}),
"[project]/node_modules/@langchain/langgraph-sdk/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/client.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/index.mjs [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/@langchain/langgraph-sdk/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
}}),
"[project]/node_modules/@langchain/langgraph-sdk/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@langchain/langgraph-sdk/index.js [app-ssr] (ecmascript) <locals>");
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__79f6bc._.js.map