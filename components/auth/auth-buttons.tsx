'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { Github } from 'lucide-react';

import GoogleIcon from '@/public/google.svg';
import { Button } from '@/components/ui/button';

export const AuthButtons = () => {
  const onGoogleSignIn = () => () => signIn('google', { callbackUrl: `${window.location.origin}` });
  const onGitHubSignIn = () => () => signIn('github', { callbackUrl: `${window.location.origin}` });

  return (
    <div className="space-y-2">
      <Button
        onClick={onGitHubSignIn()}
        variant="outline"
        size="icon"
        className="flex items-center justify-center w-full px-2 gap-x-4"
      >
        <Github className="w-6 h-6 -mr-2" />
        GitHub
      </Button>
      <Button
        onClick={onGoogleSignIn()}
        variant="outline"
        size="icon"
        className="flex items-center justify-center w-full px-2 gap-x-4"
      >
        <Image src={GoogleIcon} alt="Google icon" className="w-10 h-10 -ml-2 -mr-4" />
        Google
      </Button>
    </div>
  );
};
