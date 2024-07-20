import React from 'react';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';
import PatientService from 'services/firebase/patientService';
import UserService from 'services/firebase/userService';

import { Analyst, ClinicalTrial, Patient } from 'shared/api';
import WrongPage from 'shared/components/WrongPage';
import { generateSymptomData } from 'shared/utils/generateSymptomData';

import AnalystHead from './AnalystHead';
import AssesmentsResultsReport, { AssessmentData } from './AssesmentsResultsReport';
import SecondaryEffectsReport from './SecondaryEffecstReport';

const colors = ([
  '#98df8a', // verde claro
  '#c5b0d5', // morado claro
  '#17becf', // celeste
  '#86E3C3', // rojo claro
  '#ff7f0e', // naranja
  '#D0E6A5', // verde
  '#d62728', // rojo
  '#9467bd', // morado
  '#8c564b', // marron
  '#e377c2', // rosa
  '#7f7f7f', // gris
  '#bcbd22', // amarillo
  '#aec7e8', // azul claro
  '#ffbb78', // naranja claro
  '#c49c94', // marron claro
  '#f7b6d2', // rosa claro
  '#c7c7c7', // gris claro
  '#dbdb8d', // amarillo claro
  '#9edae5', // celeste claro
]);
async function AnalystDashboard() {
  const session = await getSession();
  const userId = session?.user.sub;
  const user: Analyst = await UserService.getUserById(userId);
  if (user.usertype !== 'analyst') {
    console.warn('User is not an analyst');
    return (
      <WrongPage />
    );
  }

  // get all patients and filter by analyst clinical trial id

  const patients: Patient[] = await PatientService.getAllPatients();
  const patientsInClinicalTrial = patients.filter((patient) => patient.trialId === user.trialId);

  const effectsData = generateSymptomData(patientsInClinicalTrial);

  // eslint-disable-next-line max-len
  const clinicalTrial: ClinicalTrial = await ClinicalTrialService.getClinicalTrialById(user.trialId);
  const { studies } = clinicalTrial;

  const assessmentData = studies.flatMap((study) =>
    study.keyVariables.map((keyVariable) => {
      // Ensure type is one of the allowed values
      const type: 'boolean' | 'threshold' | 'numeric' | 'text' = keyVariable.type as 'boolean' | 'threshold' | 'numeric' | 'text';

      return {
        type,
        title: `${study.name} - ${keyVariable.name}`,
        data: patientsInClinicalTrial.map((patient) => {
          const patientAssessment = patient.assessments?.find((assessment) =>
            // Ensure assessment is an object before checking properties
            assessment && typeof keyVariable.name === 'string' && Object.prototype.hasOwnProperty.call(assessment, keyVariable.name));

          return {
            group: patient.group || 'General',
            value: patientAssessment ? patientAssessment[keyVariable.name] : 'NC',
          };
        }),
      };
    }));

  console.log('assessmentData', assessmentData);
  // log the data inside the assesmentdata for each element to see if it is correct
  assessmentData.forEach((data) => {
    console.log('data', data);
  });

  return (
    <>
      <AnalystHead />
      <SecondaryEffectsReport
        effectsData={effectsData}
        colors={colors}
      />
      <AssesmentsResultsReport
        assesmentsData={assessmentData as AssessmentData[]}
        colors={colors}
      />
    </>
  );
}

export default withPageAuthRequired(AnalystDashboard, { returnTo: '/dashboard' });
