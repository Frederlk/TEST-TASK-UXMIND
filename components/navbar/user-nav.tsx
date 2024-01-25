'use client';

import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

function getFirstLastNameInitials(name?: string | null) {
  return name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('.')
    : 'N/A';
}

export const UserNav = ({ user }: { user?: UserType }) => {
  const handleSignOut = () => () => signOut({ callbackUrl: '/auth' });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-sm">
          <Avatar className="w-10 h-10 rounded-sm">
            <AvatarImage src={user?.image || undefined} />
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
