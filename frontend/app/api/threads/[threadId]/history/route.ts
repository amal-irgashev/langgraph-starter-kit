import { NextRequest, NextResponse } from 'next/server';

// GET /api/threads/[threadId]/history - Get thread history
export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  if (!params.threadId) {
    return NextResponse.json(
      { error: 'Thread ID is required' },
      { status: 400 }
    );
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not configured');
    }

    // Get thread history from LangGraph
    const response = await fetch(
      `${apiUrl}/threads/${params.threadId}/messages`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch thread history');
    }

    const messages = await response.json();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching thread history:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch thread history',
        code: 'HISTORY_FETCH_FAILED'
      },
      { status: 500 }
    );
  }
} 