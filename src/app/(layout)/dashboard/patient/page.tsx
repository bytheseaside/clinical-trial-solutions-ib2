import React from 'react';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';
import UserService from 'services/firebase/userService';

import { ClinicalTrial } from 'shared/api';

import AppointmentsSection from './AppointmentSection';
import ContactsBoard from './ContactsBoard';
import PatientHead from './PatientHead';
import ReportSymptom from './ReportSymptom';
import TrialProgress from './TrialProgress';

async function PatientDashboard() {
  const session = await getSession();

  const userId = session?.user.sub;
  const patient = await UserService.getUserById(userId);
  // eslint-disable-next-line max-len
  const relatedTrial: ClinicalTrial = await ClinicalTrialService.getClinicalTrialById(patient.trialId);

  return (
    <>
      <PatientHead
        name={`${patient.name} ${patient.surname}`}
        trialName={relatedTrial.name}
      />
      <TrialProgress
        steps={patient?.appointments || []}
      />
      <ReportSymptom
        symptoms={relatedTrial.knownPossibleSecondaryEffects || []}
        userId={userId}
      />
      <AppointmentsSection appointments={patient?.appointments || []} />
      <ContactsBoard staff={relatedTrial.contacts || []} />
    </>
  );
}

export default withPageAuthRequired(PatientDashboard, { returnTo: '/dashboard' });
