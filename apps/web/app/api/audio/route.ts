/**
 * @file Audio API Route
 * @description Handles POST and GET requests to fetch audio data from the backend API and returns it as an audio/mpeg stream.
 * @module api/audio/route
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.API_URL;

/**
 * Handles POST requests to fetch audio data by ID and returns it as an audio/mpeg stream.
 *
 * @param {NextRequest} req - The incoming request object containing the audio ID in the JSON body.
 * @returns {Promise<NextResponse>} The response containing the audio data as a stream or an error message.
 */
export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };

    const response = await axios.post(
      `${API_URL}/audio`,
      { id },
      {
        responseType: 'arraybuffer',
      },
    );

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': response.headers['content-length'],
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

/**
 * Handles GET requests to fetch audio data by ID from the backend API and returns it as an audio/mpeg stream.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} The response containing the audio data as a stream or an error message.
 */
export async function GET(req: NextRequest) {
  try {
    // Extract ID from query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Audio ID is required' }, { status: 400 });
    }

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
        'Content-Length': response.headers['content-length'],
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
