import { UserType } from '@/types';

import { UserNav } from './user-nav';
import { Filters } from './filters';
import { List } from './list';

export const Board = ({ user }: { user?: UserType }) => (
  <div className="flex flex-col gap-y-4">
    {user ? <UserNav user={user} /> : null}

    <Filters />

    <List />
  </div>
);
