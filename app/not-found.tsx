import { NotFound } from '@components/not-found';

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center p-5 lg:h-screen lg:w-full">
      <NotFound
        status="404"
        title="Page Not Found"
        button={{
          link: '/',
          text: 'Back to Home Page',
        }}
      />
    </div>
  );
}
