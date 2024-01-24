import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="w-screen h-screen flex justify-center items-center">{children}</div>
);

export default AuthLayout;
