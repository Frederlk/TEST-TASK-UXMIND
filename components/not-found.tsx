import Link from 'next/link';
import { ReactNode } from 'react';

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
  <div className="p-5 flex h-full w-full flex-col justify-center items-center">
    {status ? (
      <p className="mb-2 text-4xl font-semibold text-center text-primary md:text-5xl">{status}</p>
    ) : null}
    {title ? <p className="mb-8 text-3xl text-center text-white md:text-4xl">{title}</p> : null}
    {button ? (
      <Button className="text-lg font-semibold" asChild>
        <Link href={button.link}>{button.text}</Link>
      </Button>
    ) : null}
  </div>
);
