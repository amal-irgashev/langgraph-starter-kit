import { NextResponse } from 'next/server';

/**
 * Validates and returns the LangGraph API URL
 * @throws {Error} If API URL is not configured
 */
export function getLangGraphApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL;
  if (!apiUrl) {
    throw new Error('LangGraph API URL is not configured');
  }
  return apiUrl;
}

/**
 * Standard error response format for streaming endpoints
 */
export function createErrorResponse(error: unknown, code: string, status = 500) {
  console.error(`Streaming Error [${code}]:`, error);
  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      code,
      details: error instanceof Error ? error.stack : undefined
    },
    { status }
  );
}

/**
 * Validates required fields in the streaming request body
 */
export function validateRequestBody(body: Record<string, unknown>, requiredFields: string[]) {
  const missingFields = requiredFields.filter(field => !body[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
}

/**
 * Creates a message payload for LangGraph API
 */
export function createMessagePayload(message: string) {
  return {
    messages: [{
      role: "user",
      content: message
    }]
  };
} 