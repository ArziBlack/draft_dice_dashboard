import { z } from "zod";

export const librarySchema = z.object({
  title: z.string().min(0).nullable(),
  video_id: z.string().min(1),
  url: z.string().min(0).optional(),
  content: z.string().min(1),
});

export type FormValues = z.infer<typeof librarySchema>;
