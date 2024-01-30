'use client';


import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';

import { getFirstLastNameInitials } from '@lib/utils';

import type { AuthUser } from '@types';

export const BoardHeader = ({ user }: { user: AuthUser }) => {
  const handleSignOut = () => () => signOut({ callbackUrl: '/auth' });

  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="space-y-1">
        <p className="text-xs text-white">Welcome back!</p>
        <p className="text-sm font-semibold text-primary">{user.name}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative h-10 w-10 rounded-md ">
            <Avatar className="h-10 w-10 rounded-md ">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="rounded-md bg-neutral-800 text-primary">
                {getFirstLastNameInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-primary">{user.name || 'Name'}</p>
              <p className="text-xs text-neutral-400">{user.email || 'Email'}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-neutral-400" />
          <DropdownMenuItem onClick={handleSignOut()} className="cursor-pointer focus:text-red-500">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
