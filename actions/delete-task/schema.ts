import { z } from 'Zod';

export const DeleteTaskSchema = z.object({
  id: z.string(),
});
