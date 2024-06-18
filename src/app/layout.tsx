import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinical Trial Solutions',
  description: 'Clinical trials management made easy for everyone involved.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
