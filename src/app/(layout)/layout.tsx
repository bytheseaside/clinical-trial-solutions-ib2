import { PropsWithChildren } from 'react';

import { LayoutContextProvider } from 'shared/context';


export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LayoutContextProvider>
        {children}
      </LayoutContextProvider>
    </>
  );
}
