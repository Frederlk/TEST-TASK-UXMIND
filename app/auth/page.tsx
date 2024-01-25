import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { AuthForm } from '@/components/auth/auth-form';
import { AuthButtons } from '@/components/auth/auth-buttons';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <Card className="border-none bg-secondary-foreground">
      <CardHeader>
        <CardTitle className="text-white">Please sign in</CardTitle>
        <CardDescription>To access the private page you have to be authenticated</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
        <div className="flex items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-neutral-400" />
          <span className="-mt-1 text-sm text-center shrink-0 text-neutral-400">
            Or continue with
          </span>
          <div className="h-[1px] w-full bg-neutral-400" />
        </div>
        <AuthButtons />
      </CardContent>
    </Card>
  );
}
