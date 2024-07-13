'use client';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

function Dashboard() {
  return (
    <>
      General dashboard.  Later we have to redirect people to the correct dashboard
      after checking their role.
    </>
  );
}

export default withPageAuthRequired(Dashboard);
