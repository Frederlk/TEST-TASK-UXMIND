import { UserType } from '@/types';

import { UserNav } from './user-nav';
import { Filters } from './filters';
import { List } from './list';

export const Board = ({ user }: { user?: UserType }) => (
  <div className="flex flex-col w-[50%] gap-y-8">
    {user ? <UserNav user={user} /> : <UserNav.Skeleton />}

    <Filters />

    <List />
  </div>
);
