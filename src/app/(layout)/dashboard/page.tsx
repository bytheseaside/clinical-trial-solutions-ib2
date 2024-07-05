'use client';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

async function Dashboard() {
  return (
    <>
      General dashboard, then we have to redirect people to the correct dashboard
    </>
  );
}

export default withPageAuthRequired(Dashboard);
