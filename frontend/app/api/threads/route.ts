import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// GET /api/threads - Get all threads
export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL;
    if (!apiUrl) {
      throw new Error('LangGraph API URL is not configured');
    }

    const response = await fetch(`${apiUrl}/threads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch threads');
    }

    const data = await response.json();
    return NextResponse.json({ threads: data });
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch threads', threads: [] },
      { status: 500 }
    );
  }
}

// POST /api/threads - Create a new thread
export async function POST() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL;
    if (!apiUrl) {
      throw new Error('LangGraph API URL is not configured');
    }

    // Generate a new thread ID
    const thread_id = uuidv4();
    
    // Create initial configuration for the thread with LangGraph options
    const config = {
      graph_id: "react_agent",
      configurable: {
        thread_id,
        model: "gpt-4",
        temperature: 0.1,
      },
      metadata: {
        created_at: new Date().toISOString(),
        version: "1.0"
      }
    };

    const response = await fetch(`${apiUrl}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error from LangGraph:', error);
      throw new Error(`Failed to create thread: ${error}`);
    }

    return NextResponse.json({ 
      thread_id,
      config: config.configurable 
    });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to create thread',
        code: 'THREAD_CREATION_FAILED'
      },
      { status: 500 }
    );
  }
} 