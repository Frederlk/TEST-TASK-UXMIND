import { Spinner } from '@/components/ui/spinner';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center p-5 md:w-full md:h-screen">
      <Spinner />
    </div>
  );
}
