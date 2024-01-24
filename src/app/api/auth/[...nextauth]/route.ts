import NextAuth from 'next-auth/next';

import { authOptions } from '@/shared/api-helpers';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };