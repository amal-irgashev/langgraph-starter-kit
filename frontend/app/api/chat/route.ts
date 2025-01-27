import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL;
    if (!apiUrl) {
      throw new Error('LangGraph API URL is not configured');
    }

    const body = await request.json();
    const { thread_id, message } = body;

    if (!thread_id || !message) {
      return NextResponse.json(
        { error: 'Thread ID and message are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${apiUrl}/threads/${thread_id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: message
        }]
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
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