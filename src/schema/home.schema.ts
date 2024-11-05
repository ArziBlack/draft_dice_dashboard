import { z } from "zod";

export const homeSchema = z.object({
  title: z.string().min(1).nullable(),
  description: z.string().min(1),
  _image: z.instanceof(File).nullable().optional(),
  content: z.string().min(1),
});

export type FormValues = z.infer<typeof homeSchema>;
