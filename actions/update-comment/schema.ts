import { z } from 'zod';

export const UpdateCommentFormSchema = z.object({
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

export const UpdateComment = UpdateCommentFormSchema.extend({
  id: z.string(),
  taskId: z.string(),
  userId: z.string(),
});
