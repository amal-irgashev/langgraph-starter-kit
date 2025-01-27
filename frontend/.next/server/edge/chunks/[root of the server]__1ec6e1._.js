(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__1ec6e1._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/app/api/stream/route.ts [app-edge-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "GET": (()=>GET),
    "runtime": (()=>runtime)
});
const runtime = 'edge';
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const threadId = searchParams.get('thread_id');
    const streamMode = searchParams.get('stream_mode') || 'messages';
    console.log('Stream request params:', {
        threadId,
        streamMode
    });
    if (!threadId) {
        return new Response(JSON.stringify({
            error: 'Thread ID is required'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    try {
        const apiUrl = ("TURBOPACK compile-time value", "http://localhost:2024");
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        console.log('Using LangGraph API URL:', apiUrl);
        const url = new URL(`${apiUrl}/runs/stream`);
        console.log('Making request to:', url.toString());
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                configurable: {
                    thread_id: threadId
                },
                streamMode: "messages",
                messages: [
                    {
                        role: "user",
                        content: "Hello"
                    }
                ]
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Stream response error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`Failed to establish SSE connection: ${response.status} ${response.statusText}`);
        }
        // Create a TransformStream to modify the response
        const transformStream = new TransformStream({
            transform (chunk, controller) {
                // Forward the chunk as is
                controller.enqueue(chunk);
            }
        });
        return new Response(response.body?.pipeThrough(transformStream), {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        });
    } catch (error) {
        console.error('Error establishing SSE connection:', error);
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Failed to establish SSE connection',
            code: 'SSE_CONNECTION_FAILED',
            details: error instanceof Error ? error.stack : undefined
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}}),
"[project]/.next-internal/server/app/api/stream/route/actions.js [app-edge-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1ec6e1._.js.map