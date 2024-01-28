import type { Task } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-action';

import { z } from 'Zod';

import { UpdateTaskFormSchema } from './schema';

export type InputType = z.infer<typeof UpdateTaskFormSchema>;
export type ReturnType = ActionState<InputType, Task>;
