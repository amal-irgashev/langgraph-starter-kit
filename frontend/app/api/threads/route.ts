import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getLangGraphApiUrl, createErrorResponse } from '../utils';

// GET /api/threads - Get all threads
export async function GET() {
  try {
    const apiUrl = getLangGraphApiUrl();
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
    return createErrorResponse(error, 'THREAD_FETCH_FAILED');
  }
}

// POST /api/threads - Create a new thread
export async function POST() {
  try {
    const apiUrl = getLangGraphApiUrl();
    const thread_id = uuidv4();
    
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
      throw new Error(`Failed to create thread: ${error}`);
    }

    return NextResponse.json({ 
      thread_id,
      config: config.configurable 
    });
  } catch (error) {
    return createErrorResponse(error, 'THREAD_CREATION_FAILED');
  }
} 