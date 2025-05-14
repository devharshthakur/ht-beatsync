import { validateFullRoomId } from '@/lib/room';

import React from 'react';

const Page = async ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  if (!validateFullRoomId(roomId)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <div>
          Invalid room ID: <span className="font-bold">{roomId}</span>.
        </div>
        <div className="text-sm text-gray-500">Please enter a valid 6-digit numeric code.</div>
      </div>
    );
  }
  return <div className="flex h-screen flex-col items-center justify-center">NewSyncer Component</div>;
};

export default Page;
