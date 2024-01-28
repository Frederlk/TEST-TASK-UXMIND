import { NotFound } from '@/components/not-found';

export default function NotFoundPage() {
  return (
    <NotFound
      status="404"
      title="Page Not Found"
      button={{
        link: '/',
        text: 'Back to Home Page',
      }}
    />
  );
}
