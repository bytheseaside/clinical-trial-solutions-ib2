import React from 'react';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppointmentService from 'services/firebase/appointmentsService';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';
import UserService from 'services/firebase/userService';

import { Appointment, ClinicalTrial, Patient } from 'shared/api';
import WrongPage from 'shared/components/WrongPage';

import AppoinmentsToday from './AppointmentsToday';
import MedicalStaffHead from './MedicalStaffHead';

async function MedicalStaffDashboard() {
  const session = await getSession();
  const userId = session?.user.sub;
  const user = await UserService.getUserById(userId);
  if (user.usertype !== 'medicalStaff') {
    console.warn('User is not a medical staff');
    return (
      <WrongPage />
    );
  }

  const trials: ClinicalTrial[] = await ClinicalTrialService.getAllTrials();
  const peopleWithAppointmentsToday: {
    patient: Patient; appointment: Appointment;
  }[] = await AppointmentService.getAppointmentsForToday();

  return (
    <>
      <MedicalStaffHead />
      <AppoinmentsToday
        clinicalTrials={trials}
        peopleWithAppointmentsToday={peopleWithAppointmentsToday}
      />
    </>
  );
}

export default withPageAuthRequired(MedicalStaffDashboard, { returnTo: '/dashboard' });
