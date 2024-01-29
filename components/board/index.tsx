import { UserType } from '@/types';

import { BoardHeader } from './header';
import { BoardFilters } from './filters';
import { BoardTaskList } from './task-list';

export const Board = ({ user }: { user: UserType }) => (
  <div className="flex h-full flex-col gap-y-4">
    <BoardHeader user={user} />

    <BoardFilters />

    <BoardTaskList />
  </div>
);
