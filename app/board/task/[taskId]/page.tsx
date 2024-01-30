import { NotFound } from '@components/not-found';
import { TaskDetails } from '@components/task/task-details';
import { getTask } from '@lib/getTask';

import type { FullTask } from '@types';

export default async function TaskIdPage({ params }: { params: { taskId: string } }) {
  const task = await getTask(params.taskId);

  return task ? (
    <TaskDetails task={task as FullTask} />
  ) : (
    <NotFound status="404" title="Task Not Found" />
  );
}
