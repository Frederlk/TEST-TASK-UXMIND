import Link from 'next/link';

import { Button } from './ui/button';

interface NotFoundProps {
  status: string;
  title: string;
  button?: {
    link: string;
    text: string;
  };
}

export const NotFound = ({ status, title, button }: NotFoundProps) => (
  <div className="flex h-full w-full flex-col justify-center items-center">
    <p className="mb-2 text-4xl font-semibold text-center text-primary md:text-5xl">{status}</p>
    <p className="mb-8 text-3xl text-center text-white md:text-4xl">{title}</p>
    {button ? (
      <Button className="text-lg font-semibold" asChild>
        <Link href={button.link}>{button.text}</Link>
      </Button>
    ) : null}
  </div>
);
