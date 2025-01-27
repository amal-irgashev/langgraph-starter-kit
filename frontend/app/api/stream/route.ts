import { NextRequest } from 'next/server';
import { getLangGraphApiUrl, createErrorResponse, validateRequestBody } from '../utils';

export const runtime = 'edge';

// Store active connections
const connections = new Map<string, ReadableStreamController<any>>();

export async function GET(request: NextRequest) {
  try {
    // Create a new transform stream
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

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
    validateRequestBody(body, ['threadId', 'message']);
    const { threadId, message } = body;

    const apiUrl = getLangGraphApiUrl();
    const url = new URL(`${apiUrl}/runs/stream`);

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
        streamMode: ["messages-tuple", "messages"],
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