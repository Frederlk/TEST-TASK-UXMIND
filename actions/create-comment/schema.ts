import { z } from 'zod';

export const CreateCommentFormSchema = z.object({
  message: z
    .string({
      required_error: 'Message is required',
      invalid_type_error: 'Message is required',
    })
    .min(2, {
      message: 'Message is too short',
    })
    .max(1000, {
      message: 'Message is too long',
    }),
});

export const CreateComment = CreateCommentFormSchema.extend({
  taskId: z.string(),
});
