import { ReactNode } from 'react';

import Link from 'next/link';

import { Button } from './ui/button';

interface NotFoundProps {
  status?: ReactNode;
  title?: ReactNode;
  button?: {
    link: string;
    text: ReactNode;
  };
}

export const NotFound = ({ status, title = 'Something went wrong', button }: NotFoundProps) => (
  <div className="flex h-full w-full flex-col items-center justify-center p-5">
    {status ? (
      <p className="mb-2 text-center text-4xl font-semibold text-primary lg:text-5xl">{status}</p>
    ) : null}
    {title ? <p className="mb-8 text-center text-3xl text-white lg:text-4xl">{title}</p> : null}
    {button ? (
      <Button className="text-lg font-semibold" asChild>
        <Link href={button.link}>{button.text}</Link>
      </Button>
    ) : null}
  </div>
);
