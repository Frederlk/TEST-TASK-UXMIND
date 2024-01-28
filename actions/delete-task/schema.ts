import { z } from 'Zod';

export const DeleteTask = z.object({
  id: z.string(),
});
