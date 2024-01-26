import { Skeleton } from '../ui/skeleton';

import { Filters } from './filters';
import { List } from './list';

export const Board = () => (
  <div className="flex flex-col w-full gap-y-8">
    <Filters />

    <List />
  </div>
);

// Board.Skeleton = function BoardSkeleton() {
//   return (
//     <div className="mt-2 space-y-2">
//       <Skeleton className="w-20 h-4 bg-neutral-200" />
//       <Skeleton className="w-full h-8 bg-neutral-200" />
//     </div>
//   );
// };
