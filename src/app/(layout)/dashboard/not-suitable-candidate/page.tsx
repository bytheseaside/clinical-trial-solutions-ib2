'use client';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

import Container from 'shared/layout/Container';

import Header from '../Header';

function NotSuitableCandidate() {
  const router = useRouter();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/api/auth/logout');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          typography: 'hBig',
        }}
      >
        Thanks for wanting to be part of our study.
        We are sorry to inform you that you are not a suitable candidate for this study.
        You&apos;ll soon be logged out.
      </Container>
    </>
  );
}

export default withPageAuthRequired(NotSuitableCandidate);
