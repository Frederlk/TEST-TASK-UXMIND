import type { FullTask } from '@types';

import { AddCommentForm } from './add-comment-form';
import { CommentsList } from './comments-list';

export const Comments = ({ task }: { task: FullTask }) => (
  <div className="space-y-4">
    <h2 className="text-white">Comments ({task.comments.length})</h2>

    <CommentsList comments={task.comments} />

    <AddCommentForm taskId={task.id} />
  </div>
);
