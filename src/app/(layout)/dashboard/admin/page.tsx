import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import AdminHead from './AdminHead';
import CreateNewClinicalTrial from './CreateNewClinicalTrial';

async function AdminDashboard() {
  return (
    <>
      <AdminHead clinicName="Clinica Monte Grande" />
      <CreateNewClinicalTrial />
    </>
  );
}

export default withPageAuthRequired(AdminDashboard, { returnTo: '/dashboard' });
