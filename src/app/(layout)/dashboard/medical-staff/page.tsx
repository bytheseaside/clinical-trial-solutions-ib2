import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import MedicalStaffHead from './MedicalStaffHead';

async function MedicalStaffDashboard() {
  return (
    <>
      <MedicalStaffHead name="some name" trialName="ajbskd" />
      hello!
    </>
  );
}

export default withPageAuthRequired(MedicalStaffDashboard, { returnTo: '/dashboard' });
