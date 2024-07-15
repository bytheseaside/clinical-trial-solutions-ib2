import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { Appointment, ClinicalStudy, ClinicalTrial, Patient } from 'shared/api';

import AppoinmentsToday from './AppointmentsToday';
import MedicalStaffHead from './MedicalStaffHead';

async function MedicalStaffDashboard() {
  const mockClinicalTrials = [
    {
      id: 'trial1',
      name: 'Trial 1',
      studies: [
        {
          name: 'Study A',
          keyVariables: [
            { name: 'Variable 1', type: 'boolean' },
            { name: 'Variable 2', type: 'number' },
          ],
        },
      ],
      groups: ['Group 1', 'Group 2'],
      knownPossibleSecondaryEffects: ['Nausea', 'Headache'],
      exclusionCriteria: [
        { question: 'Are you pregnant?', answerToExclude: true },
      ],
    },
    {
      id: 'trial2',
      name: 'Trial 2',
      studies: [
        {
          name: 'Study B',
          keyVariables: [
            { name: 'Variable 3', type: 'text' },
            { name: 'Variable 4', type: 'threshold' },
          ],
        },
      ],
    },
  ];

  const mockStudies = [
    {
      name: 'Study A',
      keyVariables: [
        { name: 'Variable 1', type: 'boolean' },
        { name: 'Variable 2', type: 'number' },
      ],
    },
    {
      name: 'Study B',
      keyVariables: [
        { name: 'Variable 3', type: 'text' },
        { name: 'Variable 4', type: 'threshold' },
      ],
    },
  ];

  const mockPersonWithAppointments = [
    {
      patient: {
        usertype: 'patient',
        mail: 'john.doe@example.com',
        name: 'John',
        surname: 'Doe',
        dni: '12345678',
        birthDate: new Date('1980-01-01'),
        age: 44,
        sex: 'M',
        id: 'patient1',
        trialId: 'trial1',
        appointments: [
          { date: new Date(), study: { name: 'Study A', keyVariables: [{ name: 'Variable 1', type: 'boolean' }, { name: 'Variable 2', type: 'number' }] } },
        ],
      },
      appointment: { date: new Date(), study: { name: 'Study A', keyVariables: [{ name: 'Variable 1', type: 'boolean' }, { name: 'Variable 2', type: 'number' }] } },
    },
    {
      patient: {
        usertype: 'patient',
        mail: 'jane.smith@example.com',
        name: 'Jane',
        surname: 'Smith',
        dni: '87654321',
        birthDate: new Date('1990-05-15'),
        age: 34,
        sex: 'F',
        id: 'patient2',
        trialId: 'trial1',
        appointments: [
          { date: new Date(), study: { name: 'Study A', keyVariables: [{ name: 'Variable 1', type: 'boolean' }, { name: 'Variable 2', type: 'number' }] } },
        ],
      },
      appointment: { date: new Date(), study: { name: 'Study A', keyVariables: [{ name: 'Variable 1', type: 'boolean' }, { name: 'Variable 2', type: 'number' }] } },
    },
  ];

  return (
    <>
      <MedicalStaffHead name="some name" trialName="ajbskd" />
      <AppoinmentsToday
        clinicalTrials={mockClinicalTrials as ClinicalTrial[]}
        studies={mockStudies as ClinicalStudy[]}
        peopleWithAppointmentsToday={
          mockPersonWithAppointments as { patient: Patient; appointment: Appointment }[]
        }
      />
    </>
  );
}

export default withPageAuthRequired(MedicalStaffDashboard, { returnTo: '/dashboard' });
