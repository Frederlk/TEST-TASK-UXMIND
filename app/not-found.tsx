import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="w-full">
      <p className="mb-4 text-5xl font-semibold text-center text-primary md:text-6xl">404</p>
      <p className="mb-12 text-4xl text-center text-white md:text-5xl">Page Not Found</p>
      <Button size="lg" className="w-full text-xl font-semibold" asChild>
        <Link href="/">Back to home page</Link>
      </Button>
    </div>
  );
}
