import type { CommentWithUser } from '@types';

import { CommentItem } from './comment-item';

export const CommentsList = ({ comments }: { comments: CommentWithUser[] }) =>
  !comments.length ? (
    <div className="text-center text-sm text-neutral-400">
      There are no comments for this task yet...
    </div>
  ) : (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
