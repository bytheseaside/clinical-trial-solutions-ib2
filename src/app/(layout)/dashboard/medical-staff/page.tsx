import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppointmentService from 'services/firebase/appointmentsService';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';

import { Appointment, ClinicalTrial, Patient } from 'shared/api';

import AppoinmentsToday from './AppointmentsToday';
import MedicalStaffHead from './MedicalStaffHead';

async function MedicalStaffDashboard() {
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
