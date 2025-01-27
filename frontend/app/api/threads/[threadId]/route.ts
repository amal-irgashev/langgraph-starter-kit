import { NextRequest, NextResponse } from 'next/server';

// GET /api/threads/[threadId] - Get a specific thread
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

    const response = await fetch(
      `${apiUrl}/threads/${params.threadId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch thread');
    }

    const thread = await response.json();
    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch thread',
        code: 'THREAD_FETCH_FAILED'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/threads/[threadId] - Delete a thread
export async function DELETE(
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

    const response = await fetch(
      `${apiUrl}/threads/${params.threadId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete thread');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting thread:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to delete thread',
        code: 'THREAD_DELETE_FAILED'
      },
      { status: 500 }
    );
  }
} 