import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Public = () => (
  <div className="flex h-full w-full flex-col justify-center">
    <h1 className="w-full text-5xl font-semibold leading-tight text-white md:w-[400px] md:text-6xl">
      Manage your Task with
      <span className="text-primary"> DayTask</span>
    </h1>
    <Button asChild size="lg" className="w-full mt-12 text-xl font-semibold">
      <Link href="/auth">Let’s Start</Link>
    </Button>
  </div>
);
