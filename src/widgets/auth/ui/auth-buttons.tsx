'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/shared/ui/button';
import GoogleIcon from '@public/google.svg';
import GithubIcon from '@public/github.svg';

export const AuthButtons = () => {
  const onGoogleSignIn = () => () => signIn('google');
  const onGitHubSignIn = () => () => signIn('github');

  return (
    <div className="flex w-full justify-center items-center gap-x-3 mt-6">
      <Button onClick={onGitHubSignIn()} variant="outline" size="icon">
        <Image src={GithubIcon} alt="Google icon" className="w-6 h-6" />
      </Button>
      <Button onClick={onGoogleSignIn()} variant="outline" size="icon">
        <Image src={GoogleIcon} alt="Google icon" className="w-10 h-10" />
      </Button>
    </div>
  );
};
