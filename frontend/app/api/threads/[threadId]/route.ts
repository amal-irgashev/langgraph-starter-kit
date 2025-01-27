import { NextRequest, NextResponse } from 'next/server';

// GET /api/threads/[threadId] - Get thread by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await params;
  if (!threadId) {
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
      `${apiUrl}/threads/${threadId}`,
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

// DELETE /api/threads/[threadId] - Delete thread by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await params;
  if (!threadId) {
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
      `${apiUrl}/threads/${threadId}`,
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

    return new NextResponse(null, { status: 204 });
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