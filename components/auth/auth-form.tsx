'use client';

import { useEffect } from 'react';

import { signIn } from 'next-auth/react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from '@ui/use-toast';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Button } from '@ui/button';

const authSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
});

type AuthSchema = z.infer<typeof authSchema>;

export const AuthForm = () => {
  const form = useForm<AuthSchema>({
    mode: 'onChange',
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    reset,
    formState: { isSubmitSuccessful, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    const signInResult = await signIn('email', {
      email: data.email,
      callbackUrl: '/board',
    });

    if (!signInResult?.ok) {
      return toast({
        title: 'Well this did not work...',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      });
    } else {
      return toast({
        title: 'Check your email',
        description: 'A magic link has been sent to you',
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
