'use server';

import React from 'react';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import PatientService from 'services/firebase/patientService';
import UserService from 'services/firebase/userService';

import { Patient } from 'shared/api';
import WrongPage from 'shared/components/WrongPage';

import PatientDetailedView from './PatientDetailedView';
import MedicalStaffHead from '../MedicalStaffHead';

async function PatientDetailsPage() {
  const session = await getSession();
  const userId = session?.user.sub;
  const user = await UserService.getUserById(userId);
  if (user.usertype !== 'medicalStaff') {
    console.warn('User is not a medical staff');
    return (
      <WrongPage />
    );
  }

  const patients: Patient[] = await PatientService.getAllPatients();

  return (
    <>
      <MedicalStaffHead />
      <PatientDetailedView patientList={patients} />
    </>
  );
}

export default withPageAuthRequired(PatientDetailsPage, { returnTo: '/dashboard' });
