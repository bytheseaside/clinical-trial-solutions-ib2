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
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'sans-serif',
          fontSize: '16px',
          lineHeight: 1.5,
          color: '#333',
          backgroundColor: '#f0f0f0',
        }}
      >{children}</body>
    </html>
  );
}
