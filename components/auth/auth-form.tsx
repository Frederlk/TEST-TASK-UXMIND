'use client';

import { signIn } from 'next-auth/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput } from '@components/form/form-input';

import { toast } from '@ui/use-toast';
import { Button } from '@ui/button';

import { SignIn } from '@actions/sign-in/schema';
import { InputType as SignInInputType } from '@actions/sign-in/types';

export const AuthForm = () => {
  const form = useForm<SignInInputType>({
    mode: 'onChange',
    resolver: zodResolver(SignIn),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  const onSubmit: SubmitHandler<SignInInputType> = async ({ email }) => {
    await signIn('email', {
      email,
      callbackUrl: '/board',
    });

    return toast({
      title: 'Check your email',
      description: 'A magic link has been sent to you',
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="name@example.com"
        />
        <Button type="submit" className="w-full" disabled={!(isDirty && isValid) || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Sign in with Email'}
        </Button>
      </form>
    </FormProvider>
  );
};
