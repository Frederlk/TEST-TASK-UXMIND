'use client';

import type { UserType } from '@/shared/types';

import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

function getFirstLastNameInitials(name?: string | null) {
  return name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('.')
    : 'N/A';
}

export const UserNav = ({ user }: { user?: UserType }) => {
  const handleSignOut = () => () => signOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-sm">
          <Avatar className="h-10 w-10 rounded-sm">
            <AvatarImage
              src={
                user?.image ||
                'https://nnvvrwdezsncieasfxqg.supabase.co/storage/v1/object/sign/images/avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYXZhdGFyLnBuZyIsImlhdCI6MTcwNjA5ODg5MSwiZXhwIjoxNzM3NjM0ODkxfQ.gbKE2j74uznLYT4NOelycairBHpekBhCeyluti6YFu0&t=2024-01-24T12%3A21%3A31.623Z'
              }
            />
            <AvatarFallback className="rounded-sm">
              {getFirstLastNameInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || 'Name'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || 'Email'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut()} className="cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
