import { z } from 'Zod';

export const CreateTaskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(2, {
      message: 'Title is too short',
    }),
  description: z.optional(
    z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description is required',
    }),
  ),
  startDate: z.optional(
    z.date({
      required_error: 'Start date is required',
      invalid_type_error: "That's not a date!",
    }),
  ),
  endDate: z.optional(
    z.date({
      required_error: 'Due date is required',
      invalid_type_error: "That's not a date!",
    }),
  ),
  repoId: z.optional(
    z.string({
      required_error: 'Repo is required',
      invalid_type_error: 'Repo is required',
    }),
  ),
});
