import { Comment, Task, User } from '@prisma/client';

export type UserType = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type CommentWithUser = Comment & { user: User };

export type FullTask = Task & { comments: CommentWithUser[]; user: User };
