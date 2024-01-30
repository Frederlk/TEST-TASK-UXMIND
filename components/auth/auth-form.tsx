'use client';

import { signIn } from 'next-auth/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from '@ui/use-toast';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={!(isDirty && isValid) || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Sign in with Email'}
        </Button>
      </form>
    </FormProvider>
  );
};
