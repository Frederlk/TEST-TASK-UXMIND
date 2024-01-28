import type { Comment } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-action';

import { z } from 'Zod';

import { UpdateComment } from './schema';

export type InputType = z.infer<typeof UpdateComment>;
export type ReturnType = ActionState<InputType, Comment>;
