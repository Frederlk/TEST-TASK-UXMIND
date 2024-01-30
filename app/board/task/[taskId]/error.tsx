'use client';

import { NotFound } from '@components/not-found';

export default function TaskIdErrorPage({ error }: { error: Error & { digest?: string } }) {
  return <NotFound title={error.message} />;
}
