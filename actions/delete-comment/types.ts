import type { Comment } from '@prisma/client';

import { z } from 'zod';

import type { ActionState } from '@lib/create-safe-action';

import { DeleteComment } from './schema';

export type InputType = z.infer<typeof DeleteComment>;
export type ReturnType = ActionState<InputType, Comment>;
