'use client';

import React from 'react';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import FirstSignIn from './FirstSignIn';
import Header from './Header';

function Dashboard() {
  const { user, error: userError, isLoading } = useUser();
  console.log(user, userError, isLoading);

  return (
    <>
      <Header />
      <FirstSignIn />
    </>
  );
}

export default withPageAuthRequired(Dashboard);
