import { NextRequest } from 'next/server';

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
    const { threadId, message } = body;

    console.log('Stream request body:', { threadId, message });

    if (!threadId) {
      return new Response(
        JSON.stringify({ error: 'Thread ID is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL;
    if (!apiUrl) {
      throw new Error('LangGraph API URL is not configured');
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
        streamMode: ["messages-tuple", "messages"],
        streamSubgraphs: true,
        messages: [{
          role: "user",
          content: message
        }]
      }),
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
      transform(chunk, controller) {
        // Forward the chunk as is
        controller.enqueue(chunk);
      },
    });

    return new Response(
      response.body?.pipeThrough(transformStream),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );
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