import React, { PropsWithChildren } from 'react';

import { UserProvider } from '@auth0/nextjs-auth0/client';

import { LayoutContextProvider } from 'shared/context';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <LayoutContextProvider>
        {children}
      </LayoutContextProvider>
    </UserProvider>
  );
}
