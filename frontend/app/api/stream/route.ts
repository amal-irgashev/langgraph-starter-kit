/**
 * API Route for Streaming Communication
 * 
 * This file implements a Next.js API route that handles streaming communication with the LangGraph API.
 * It provides endpoints for establishing SSE (Server-Sent Events) connections and processing chat messages,
 * acting as a bridge between the frontend client and the LangGraph backend service.
 */



import { NextRequest } from 'next/server';
import { getLangGraphApiUrl, createErrorResponse, validateRequestBody } from '../utils';

export const runtime = 'edge';

export async function GET() {
  try {
    // Create a transform stream for server-sent events (SSE)
    const stream = new TransformStream();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error establishing SSE connection:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to establish SSE connection',
        code: 'SSE_CONNECTION_FAILED',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate required fields in request body
    validateRequestBody(body, ['threadId', 'message']);
    const { threadId, message } = body as { threadId: string; message: string };

    const apiUrl = getLangGraphApiUrl();
    const url = new URL(`${apiUrl}/runs/stream`);

    // Initialize streaming connection to LangGraph API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Configure thread-specific settings
        configurable: {
          thread_id: threadId
        },
        // Enable streaming for message tuples and individual messages
        streamMode: ["messages-tuple", "messages"],
        // Enable streaming of subgraph execution details
        streamSubgraphs: true,
        messages: [{
          role: "user",
          content: message
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Stream connection failed: ${response.status} ${response.statusText}`);
    }

    // Pipe the LangGraph API response directly to client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return createErrorResponse(error, 'SSE_CONNECTION_FAILED');
  }
} 