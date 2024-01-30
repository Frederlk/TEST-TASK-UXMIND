import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { AuthForm } from '@components/auth/auth-form';
import { AuthButtons } from '@components/auth/auth-buttons';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

import { authOptions } from '@lib/auth';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full border-none bg-secondary-foreground lg:w-auto">
        <CardHeader>
          <CardTitle className="text-white">Please sign in</CardTitle>
          <CardDescription>To access the private page you have to be authenticated</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
          <div className="my-4 flex items-center gap-x-2">
            <div className="h-[1px] w-full bg-neutral-400" />
            <span className="-mt-1 shrink-0 text-center text-sm text-neutral-400">
              Or continue with
            </span>
            <div className="h-[1px] w-full bg-neutral-400" />
          </div>
          <AuthButtons />
        </CardContent>
      </Card>
    </div>
  );
}
