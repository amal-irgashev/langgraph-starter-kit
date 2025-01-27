import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { thread_id, message } = await request.json();

    if (!thread_id) {
      return NextResponse.json(
        { error: 'Thread ID is required' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL;
    if (!apiUrl) {
      throw new Error('LangGraph API URL is not configured');
    }

    // Send message to LangGraph
    const response = await fetch(`${apiUrl}/threads/${thread_id}/state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: message
        }]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error from LangGraph:', error);
      throw new Error(`Failed to send message to LangGraph: ${error}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to send message',
        code: 'MESSAGE_SEND_FAILED'
      },
      { status: 500 }
    );
  }
} 