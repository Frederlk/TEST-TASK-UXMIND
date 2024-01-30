import type { FullTask } from '@types';

import { NotFound } from '@components/not-found';
import { TaskDetails } from '@components/task/task-details';

import { fetcher } from '@lib/fetcher';
import getBaseUrl from '@lib/get-base-url';

export default async function TaskIdPage({ params }: { params: { taskId: string } }) {
  const task = await fetcher(getBaseUrl(`/api/tasks/${params.taskId}`));

  return task ? (
    <TaskDetails task={task as FullTask} />
  ) : (
    <NotFound status="404" title="Task Not Found" />
  );
}
