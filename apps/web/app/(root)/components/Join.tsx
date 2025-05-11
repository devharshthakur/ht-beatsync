'use client';

import { useRoomStore } from '@/store/slices/room';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { JoinFromData, JoinFromSchema } from '../schema/join.schema';
import { generateName } from '@/lib/randomNames';
import { AlertCircle, Construction, Loader2 } from 'lucide-react';

export const Join = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const setUsername = useRoomStore(state => state.setUsername);
  const username = useRoomStore(state => state.username);
  const router = useRouter();

  useEffect(() => {
    const generatedUserName: string = generateName();
    setUsername(generatedUserName);
  }, []);

  const form = useForm({
    validators: {
      onChange: JoinFromSchema,
    },
    defaultValues: {
      roomId: '',
    },
  });

  const handleCreateRoom = async () => {
    setIsCreating(true);
    const newRoomId: string = Math.floor(100000 + Math.random() * 900000).toString();
    router.push(`/room/${newRoomId}`);
  };

  const handleRegenerateName = async () => {
    const newName: string = generateName();
    setUsername(newName);
  };

  const onSubmit = async (data: JoinFromData) => {
    setIsJoining(true);
    console.log('Joining room with data: ', {
      roomId: data.roomId,
      username,
    });

    router.push(`/room/${data.roomId}`);
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-6 py-16 md:px-8 lg:max-w-5xl">
      <div className="mb-12 w-full text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <Construction className="text-primary h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">BeatSync</h1>
        </div>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Synchronize your listening experience with friends and collaborators.
        </p>
      </div>

      <div className="bg-muted/30 mb-10 w-full rounded-lg px-8 py-10">
        <div className="mx-auto flex max-w-2xl items-start space-x-4">
          <AlertCircle className="text-primary mt-1 h-6 w-6 shrink-0" />
          <div>
            <h2 className="text-foreground text-xl font-medium">Development in Progress</h2>
            <p className="text-muted-foreground mt-2">
              This feature is currently under active development. Check back soon for the full experience. In the
              meantime, you can create a room and share the link with friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
