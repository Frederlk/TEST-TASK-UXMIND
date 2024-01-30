import type { AuthUser } from '@types';

import { BoardHeader } from './header';
import { BoardFilters } from './filters';
import { BoardTaskList } from './task-list';

export const Board = ({ user }: { user: AuthUser }) => (
  <div className="flex h-full flex-col gap-y-4">
    <BoardHeader user={user} />

    <BoardFilters />

    <BoardTaskList />
  </div>
);
