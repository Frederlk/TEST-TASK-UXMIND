import { TaskStatus } from '@prisma/client';

import type { BadgeProps } from '@ui/badge';

export const taskStatusToText: {
  [key in TaskStatus]: string;
} = {
  [TaskStatus.TO_DO]: 'To Do',
  [TaskStatus.DONE]: 'Done',
  [TaskStatus.ARCHIVED]: 'Archived',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.ON_HOLD]: 'On Hold',
};

export const taskStatusToBadgeVariant: {
  [key in TaskStatus]: BadgeProps['variant'];
} = {
  [TaskStatus.TO_DO]: 'default',
  [TaskStatus.DONE]: 'success',
  [TaskStatus.ARCHIVED]: 'ghost',
  [TaskStatus.IN_PROGRESS]: 'pending',
  [TaskStatus.ON_HOLD]: 'warning',
};
