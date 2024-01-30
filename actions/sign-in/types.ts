import { z } from 'zod';

import type { ActionState } from '@lib/create-safe-action';

import { SignIn } from './schema';

export type InputType = z.infer<typeof SignIn>;
export type ReturnType = ActionState<InputType, null>;
