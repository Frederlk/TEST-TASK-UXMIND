import { Spinner } from '@/components/ui/spinner';

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Spinner />
    </div>
  );
}
