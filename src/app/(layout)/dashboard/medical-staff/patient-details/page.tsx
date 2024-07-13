'use server';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import PatientDetailedView from './PatientDetailedView';
import MedicalStaffHead from '../MedicalStaffHead';

async function PatientDetailsPage() {
  const mockPatientList = [
  // Surname starts with 'A'
    {
      id: '1',
      name: 'Aaron',
      surname: 'Anderson',
      age: 28,
      sex: 'Male',
      trialId: 'T001',
      group: 'A',
      observations: [
        { date: new Date('2024-01-15'), text: 'Initial consultation notes.' },
        { date: new Date('2024-03-20'), text: 'Follow-up on treatment progress.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-10'), comments: 'Mild headaches.', tag: 'Headache' },
        { startDate: new Date('2024-01-15'), comments: 'No significant change.', tag: 'Headache' },
      ],
    },
    {
      id: '2',
      name: 'Alice',
      surname: 'Andrews',
      age: 32,
      sex: 'Female',
      trialId: 'T002',
      group: 'A',
      observations: [
        { date: new Date('2024-02-05'), text: 'Patient reported fatigue.' },
        { date: new Date('2024-04-15'), text: 'Observing improvement in energy levels.' },
      ],
      symptoms: [
        { startDate: new Date('2024-02-01'), comments: 'Persistent fatigue.', tag: 'Fatigue' },
        { startDate: new Date('2024-03-01'), comments: 'Slight improvement.', tag: 'Fatigue' },
      ],
    },
    {
      id: '3',
      name: 'Adam',
      surname: 'Archer',
      age: 45,
      sex: 'Male',
      trialId: 'T003',
      group: 'B',
      observations: [
        { date: new Date('2024-01-20'), text: 'Chest pain reported.' },
        { date: new Date('2024-02-25'), text: 'Heart check-up scheduled.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-10'), comments: 'Sharp chest pain.', tag: 'Chest Pain' },
        { startDate: new Date('2024-02-10'), comments: 'Pain level decreased.', tag: 'Chest Pain' },
      ],
    },

    // Surname starts with 'B'
    {
      id: '4',
      name: 'Ben',
      surname: 'Brown',
      age: 34,
      sex: 'Male',
      trialId: 'T004',
      group: 'B',
      observations: [
        { date: new Date('2024-01-25'), text: 'Routine check-up done.' },
        { date: new Date('2024-03-30'), text: 'No significant issues reported.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-15'), comments: 'Occasional dizziness.', tag: 'Dizziness' },
        { startDate: new Date('2024-02-15'), comments: 'No more dizziness.', tag: 'Dizziness' },
      ],
    },
    {
      id: '5',
      name: 'Bella',
      surname: 'Bennett',
      age: 40,
      sex: 'Female',
      trialId: 'T005',
      group: 'B',
      observations: [
        { date: new Date('2024-02-01'), text: 'Patient has high blood pressure.' },
        { date: new Date('2024-04-10'), text: 'Blood pressure stabilized.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-10'), comments: 'High blood pressure symptoms.', tag: 'Blood Pressure' },
        { startDate: new Date('2024-03-10'), comments: 'Blood pressure under control.', tag: 'Blood Pressure' },
      ],
    },
    {
      id: '6',
      name: 'Billy',
      surname: 'Bailey',
      age: 29,
      sex: 'Male',
      trialId: 'T006',
      group: 'C',
      observations: [
        { date: new Date('2024-03-05'), text: 'Patient reports back pain.' },
        { date: new Date('2024-04-20'), text: 'Back pain has decreased.' },
      ],
      symptoms: [
        { startDate: new Date('2024-02-20'), comments: 'Severe back pain.', tag: 'Back Pain' },
        { startDate: new Date('2024-03-20'), comments: 'Pain has reduced.', tag: 'Back Pain' },
      ],
    },

    // Surname starts with 'C'
    {
      id: '7',
      name: 'Charles',
      surname: 'Clark',
      age: 55,
      sex: 'Male',
      trialId: 'T007',
      group: 'C',
      observations: [
        { date: new Date('2024-02-10'), text: 'Patient showed signs of joint pain.' },
        { date: new Date('2024-04-15'), text: 'Joint pain management advised.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-20'), comments: 'Joint pain in knees.', tag: 'Joint Pain' },
        { startDate: new Date('2024-03-20'), comments: 'Pain has slightly improved.', tag: 'Joint Pain' },
      ],
    },
    {
      id: '8',
      name: 'Catherine',
      surname: 'Collins',
      age: 42,
      sex: 'Female',
      trialId: 'T008',
      group: 'C',
      observations: [
        { date: new Date('2024-03-01'), text: 'Patient reports headaches.' },
        { date: new Date('2024-05-10'), text: 'Headaches less frequent.' },
      ],
      symptoms: [
        { startDate: new Date('2024-02-15'), comments: 'Frequent headaches.', tag: 'Headache' },
        { startDate: new Date('2024-04-15'), comments: 'Headaches decreasing.', tag: 'Headache' },
      ],
    },
    {
      id: '9',
      name: 'Carol',
      surname: 'Cook',
      age: 37,
      sex: 'Female',
      trialId: 'T009',
      group: 'D',
      observations: [
        { date: new Date('2024-01-30'), text: 'Patient experiencing fatigue.' },
        { date: new Date('2024-03-25'), text: 'Fatigue levels improved.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-15'), comments: 'Persistent fatigue.', tag: 'Fatigue' },
        { startDate: new Date('2024-02-20'), comments: 'Fatigue has reduced.', tag: 'Fatigue' },
      ],
    },

    // Surname starts with 'D'
    {
      id: '10',
      name: 'Daniel',
      surname: 'Davis',
      age: 39,
      sex: 'Male',
      trialId: 'T010',
      group: 'D',
      observations: [
        { date: new Date('2024-02-15'), text: 'Routine physical examination completed.' },
        { date: new Date('2024-04-05'), text: 'No major concerns.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-20'), comments: 'Slight abdominal pain.', tag: 'Abdominal Pain' },
        { startDate: new Date('2024-03-15'), comments: 'Pain subsided.', tag: 'Abdominal Pain' },
      ],
    },
    {
      id: '11',
      name: 'Diana',
      surname: 'Dixon',
      age: 33,
      sex: 'Female',
      trialId: 'T011',
      group: 'D',
      observations: [
        { date: new Date('2024-01-10'), text: 'Initial examination notes.' },
        { date: new Date('2024-03-20'), text: 'Patient feeling better.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-05'), comments: 'Nausea and dizziness.', tag: 'Nausea' },
        { startDate: new Date('2024-02-20'), comments: 'Symptoms have lessened.', tag: 'Nausea' },
      ],
    },
    {
      id: '12',
      name: 'Deborah',
      surname: 'Douglas',
      age: 49,
      sex: 'Female',
      trialId: 'T012',
      group: 'E',
      observations: [
        { date: new Date('2024-01-15'), text: 'Patient reports joint stiffness.' },
        { date: new Date('2024-03-30'), text: 'Stiffness lessening with treatment.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-10'), comments: 'Stiffness in joints.', tag: 'Joint Stiffness' },
        { startDate: new Date('2024-02-15'), comments: 'Stiffness has reduced.', tag: 'Joint Stiffness' },
      ],
    },

    // Surname starts with 'E'
    {
      id: '13',
      name: 'Edward',
      surname: 'Evans',
      age: 45,
      sex: 'Male',
      trialId: 'T013',
      group: 'E',
      observations: [
        { date: new Date('2024-02-05'), text: 'Check-up shows improvement in condition.' },
        { date: new Date('2024-04-15'), text: 'Overall health stable.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-15'), comments: 'Occasional headaches.', tag: 'Headache' },
        { startDate: new Date('2024-03-15'), comments: 'Headaches have become less frequent.', tag: 'Headache' },
      ],
    },
    {
      id: '14',
      name: 'Emma',
      surname: 'Ellis',
      age: 31,
      sex: 'Female',
      trialId: 'T014',
      group: 'E',
      observations: [
        { date: new Date('2024-03-01'), text: 'Patient experiencing mild anxiety.' },
        { date: new Date('2024-05-10'), text: 'Anxiety levels improving with therapy.' },
      ],
      symptoms: [
        { startDate: new Date('2024-02-01'), comments: 'Mild anxiety symptoms.', tag: 'Anxiety' },
        { startDate: new Date('2024-04-01'), comments: 'Anxiety has lessened.', tag: 'Anxiety' },
      ],
    },
    {
      id: '15',
      name: 'Eve',
      surname: 'Edwards',
      age: 29,
      sex: 'Female',
      trialId: 'T015',
      group: 'F',
      observations: [
        { date: new Date('2024-01-20'), text: 'Patient reports frequent headaches.' },
        { date: new Date('2024-03-25'), text: 'Headache frequency has decreased.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-10'), comments: 'Frequent headaches.', tag: 'Headache' },
        { startDate: new Date('2024-02-10'), comments: 'Headaches are less frequent.', tag: 'Headache' },
      ],
    },
  ];

  return (
    <>
      <MedicalStaffHead name="some name" trialName="ajbskd" />
      <PatientDetailedView patientList={mockPatientList} />
    </>
  );
}

export default withPageAuthRequired(PatientDetailsPage, { returnTo: '/dashboard' });
