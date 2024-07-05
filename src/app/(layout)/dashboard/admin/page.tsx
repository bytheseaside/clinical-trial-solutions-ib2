import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import AdminHead from './AdminHead';

async function AdminDashboard() {
  return (
    <>
      <AdminHead clinicName="Clinica Monte Grande" />
      hello!
    </>
  );
}

export default withPageAuthRequired(AdminDashboard, { returnTo: '/dashboard' });
