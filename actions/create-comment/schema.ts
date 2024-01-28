import { z } from 'Zod';

export const CreateCommentFormSchema = z.object({
  message: z
    .string({
      required_error: 'Message is required',
      invalid_type_error: 'Message is required',
    })
    .min(2, {
      message: 'Message is too short',
    }),
});

export const CreateComment = CreateCommentFormSchema.extend({
  taskId: z.string(),
});
