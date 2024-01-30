import { TaskStatus } from '@prisma/client';

import { z } from 'zod';

export const UpdateTaskStatus = z.object({
  id: z.string(),
  status: z.nativeEnum(TaskStatus),
});
