import type { Task } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-action';

import { z } from 'Zod';

import { DeleteTask } from './schema';

export type InputType = z.infer<typeof DeleteTask>;
export type ReturnType = ActionState<InputType, Task>;
