import { z } from 'zod';

export const DeleteComment = z.object({
  id: z.string(),
  taskId: z.string(),
  userId: z.string(),
});
