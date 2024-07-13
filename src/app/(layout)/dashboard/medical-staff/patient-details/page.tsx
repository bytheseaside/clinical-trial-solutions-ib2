'use server';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import PatientDetails from './PatientDetails';
import MedicalStaffHead from '../MedicalStaffHead';

async function PatientDetailsPage() {
  return (
    <>
      <MedicalStaffHead name="some name" trialName="ajbskd" />
      <PatientDetails />
    </>
  );
}

export default withPageAuthRequired(PatientDetailsPage, { returnTo: '/dashboard' });
