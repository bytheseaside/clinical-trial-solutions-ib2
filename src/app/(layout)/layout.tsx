import { PropsWithChildren } from 'react';

import { LayoutContextProvider } from 'shared/contexts';


export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LayoutContextProvider>
        {children}
      </LayoutContextProvider>
    </>
  );
}
