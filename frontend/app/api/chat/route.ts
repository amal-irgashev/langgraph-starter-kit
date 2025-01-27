import { NextRequest, NextResponse } from 'next/server';
import { getLangGraphApiUrl, createErrorResponse, validateRequestBody, createMessagePayload } from '../utils';

/**
 * POST endpoint handler for chat messages
 * Handles sending messages to either the thread state or messages endpoint
 */

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    validateRequestBody(body, ['thread_id', 'message']);
    const { thread_id, message, update_state = false } = body;

    // Determine API endpoint based on update_state flag
    // If update_state is true, updates thread state
    // If false, adds message to thread history
    const apiUrl = getLangGraphApiUrl();
    const endpoint = update_state ? `threads/${thread_id}/state` : `threads/${thread_id}/messages`;

    // Send message to LangGraph API
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createMessagePayload(message)),
    });

    // Handle unsuccessful responses
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to send message: ${error}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return createErrorResponse(error, 'MESSAGE_SEND_FAILED');
  }
} 