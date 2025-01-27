import { NextRequest, NextResponse } from 'next/server';

// GET /api/threads/[threadId]/config - Get thread configuration
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
      `${apiUrl}/threads/${threadId}/config`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch thread configuration');
    }

    const config = await response.json();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching thread config:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch thread configuration',
        code: 'CONFIG_FETCH_FAILED'
      },
      { status: 500 }
    );
  }
}

// PATCH /api/threads/[threadId]/config - Update thread configuration
export async function PATCH(
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

    const body = await request.json();
    
    const response = await fetch(
      `${apiUrl}/threads/${threadId}/config`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update thread configuration');
    }

    const updatedConfig = await response.json();
    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error('Error updating thread config:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to update thread configuration',
        code: 'CONFIG_UPDATE_FAILED'
      },
      { status: 500 }
    );
  }
} 