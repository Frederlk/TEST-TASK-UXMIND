import { Spinner } from '@ui/spinner';

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-5">
      <Spinner />
    </div>
  );
}
