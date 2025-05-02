import { z } from 'zod';

export const UploadAudioSchema = z.object({
  name: z.string(),
  audioData: z.string(),
  roomId: z.string(),
});

export type UploadAudioType = z.infer<typeof UploadAudioSchema>;

export const GetAudioSchema = z.object({
  id: z.string(),
});

export type GetAudioType = z.infer<typeof GetAudioSchema>;
