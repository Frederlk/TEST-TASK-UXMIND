import type { Task } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-action';

import { z } from 'Zod';

import { UpdateTask } from './schema';

export type InputType = z.infer<typeof UpdateTask>;
export type ReturnType = ActionState<InputType, Task>;
