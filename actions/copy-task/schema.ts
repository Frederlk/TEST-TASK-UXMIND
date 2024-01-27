import { z } from 'Zod';

export const CopyTaskSchema = z.object({
  id: z.string(),
});
