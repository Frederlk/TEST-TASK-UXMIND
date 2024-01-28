import type { Comment } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-action';

import { z } from 'Zod';

import { CreateComment } from './schema';

export type InputType = z.infer<typeof CreateComment>;
export type ReturnType = ActionState<InputType, Comment>;
