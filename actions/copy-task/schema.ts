import { z } from 'Zod';

export const CopyTask = z.object({
  id: z.string(),
});
