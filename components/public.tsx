import Link from 'next/link';

import { Button } from '@ui/button';

export const Public = () => (
  <div className="flex h-full w-full flex-col justify-center gap-y-6">
    <h1 className="w-full text-4xl font-semibold leading-tight text-white lg:w-[400px] lg:text-5xl">
      Manage your Task with
      <span className="text-primary"> DayTask</span>
    </h1>
    <Button asChild size="lg" className="w-full text-xl font-semibold">
      <Link href="/auth">Let’s Start</Link>
    </Button>
  </div>
);
