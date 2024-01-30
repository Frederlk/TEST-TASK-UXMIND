'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Github } from 'lucide-react';

import { Button } from '@ui/button';

import GoogleIcon from '@public/google.svg';

export const AuthButtons = () => {
  const onGoogleSignIn = () => () => signIn('google', { callbackUrl: '/board' });
  const onGitHubSignIn = () => () => signIn('github', { callbackUrl: '/board' });

  return (
    <div className="space-y-2">
      <Button
        onClick={onGitHubSignIn()}
        variant="outline"
        size="icon"
        className="flex w-full items-center justify-center gap-x-4 px-2"
      >
        <Github className="-mr-2 h-6 w-6" />
        GitHub
      </Button>
      <Button
        onClick={onGoogleSignIn()}
        variant="outline"
        size="icon"
        className="flex w-full items-center justify-center gap-x-4 px-2"
      >
        <Image src={GoogleIcon} alt="Google icon" className="-ml-2 -mr-4 h-10 w-10" />
        Google
      </Button>
    </div>
  );
};
