/**
 * @file Audio API Route with ID parameter
 * @description Handles GET requests to fetch audio data by ID from the backend API and returns it as an audio/mpeg stream.
 * @module api/audio/[id]/route
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.API_URL;

/**
 * Handles GET requests to fetch audio data by ID from the backend API and returns it as a blob.
 *
 * @param {NextRequest} req - The incoming request object.
 * @param {{ params: { id: string } }} context - The context object containing route parameters.
 * @returns {Promise<NextResponse>} The response containing the audio data as a blob or an error message.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = params;

    // Forward GET request to backend server
    const response = await axios.get(`${API_URL}/audio/${id}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Return the audio file with proper headers
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': response.headers['content-length'] || '',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch audio' },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
