import type { Task } from '@prisma/client';

import { z } from 'Zod';

import type { ActionState } from '@lib/create-safe-action';

import { CreateTask } from './schema';

export type InputType = z.infer<typeof CreateTask>;
export type ReturnType = ActionState<InputType, Task>;
