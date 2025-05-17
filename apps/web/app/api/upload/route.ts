/**
 * @file Upload API Route
 * @description Handles POST requests to upload audio files to the backend API.
 * @module api/upload/route
 */

import { NextRequest, NextResponse } from 'next/server';
import { UploadAudioType } from '@repo/shared';
import axios from 'axios';

const API_URL = process.env.API_URL;

/**
 * Handles POST requests to upload audio files.
 *
 * @param {NextRequest} req - The incoming request object containing the audio file data in the JSON body.
 * @returns {Promise<NextResponse>} The response containing the upload result or an error message.
 */
export async function POST(req: NextRequest) {
  try {
    const data: UploadAudioType = await req.json();
    const response = await axios.post(`${API_URL}/upload`, data);
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || 'Failed to upload audio file',
        },
        {
          status: error.response?.status || 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      },
    );
  }
}
