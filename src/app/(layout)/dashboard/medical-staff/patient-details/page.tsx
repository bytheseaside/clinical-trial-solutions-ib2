'use server';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PatientService from 'services/firebase/patientService';

import { Patient } from 'shared/api';

import PatientDetailedView from './PatientDetailedView';
import MedicalStaffHead from '../MedicalStaffHead';

async function PatientDetailsPage() {
  const patients: Patient[] = await PatientService.getAllPatients();

  return (
    <>
      <MedicalStaffHead />
      <PatientDetailedView patientList={patients} />
    </>
  );
}

export default withPageAuthRequired(PatientDetailsPage, { returnTo: '/dashboard' });
