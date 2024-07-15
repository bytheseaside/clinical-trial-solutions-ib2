import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';
import CodeService from 'services/firebase/codeService';
import PatientService from 'services/firebase/patientService';

import { ClinicalTrial, Patient } from 'shared/api';

import AdminHead from './AdminHead';
import AssignAppointments from './AssignAppointments';
import ContactInfo from './ContactInfo';
import CreateNewClinicalTrial from './CreateNewClinicalTrial';
import TrialsList from './TrialsList';

async function AdminDashboard() {
  const patientList: Patient[] = await PatientService.getAllPatients();
  const trials: ClinicalTrial[] = await ClinicalTrialService.getAllTrials();
  const medicalStaffCode : string = await CodeService.getMedicalStaffCode();

  return (
    <>
      <AdminHead clinicName="Clinica Monte Grande" />
      <TrialsList trials={trials} medicalStaffCode={medicalStaffCode} />
      <ContactInfo trials={trials} />
      <CreateNewClinicalTrial />
      <AssignAppointments patientList={patientList} />
    </>
  );
}

export default withPageAuthRequired(AdminDashboard, { returnTo: '/dashboard' });
