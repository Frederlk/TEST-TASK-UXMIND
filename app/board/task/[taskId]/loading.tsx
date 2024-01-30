import { Spinner } from '@ui/spinner';

export default function taskIdLoading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Spinner />
    </div>
  );
}
