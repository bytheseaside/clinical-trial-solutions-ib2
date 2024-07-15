import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { Patient } from 'shared/api';

import AdminHead from './AdminHead';
import AssignAppointments from './AssignAppointments';
import CreateNewClinicalTrial from './CreateNewClinicalTrial';

async function AdminDashboard() {
  const mockPatientList = [
    {
      usertype: 'patient',
      mail: 'aaron.anderson@example.com',
      name: 'Aaron',
      surname: 'Anderson',
      dni: '12345678',
      birthDate: new Date('1996-01-15'),
      age: 28,
      sex: 'M',
      id: '1',
      trialId: 'T001',
      group: 'A',
      appointments: [
        {
          date: new Date('2024-01-20'),
          study: {
            name: 'Study A1',
            keyVariables: [
              { name: 'Variable A', type: 'boolean' },
              { name: 'Variable B', type: 'threshold' },
              { name: 'Variable C', type: 'text' },
            ],
          },
        },
        {
          date: new Date('2024-02-25'),
          study: {
            name: 'Study A2',
            keyVariables: [
              { name: 'Variable D', type: 'number' },
              { name: 'Variable E', type: 'boolean' },
              { name: 'Variable F', type: 'text' },
            ],
          },
        },
      ],
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
      usertype: 'patient',
      mail: 'alice.andrews@example.com',
      name: 'Alice',
      surname: 'Andrews',
      dni: '87654321',
      birthDate: new Date('1992-03-22'),
      age: 32,
      sex: 'F',
      id: '2',
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
      usertype: 'patient',
      mail: 'adam.archer@example.com',
      name: 'Adam',
      surname: 'Archer',
      dni: '11223344',
      birthDate: new Date('1979-05-15'),
      age: 45,
      sex: 'M',
      id: '3',
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
    {
      usertype: 'patient',
      mail: 'ben.brown@example.com',
      name: 'Ben',
      surname: 'Brown',
      dni: '55667788',
      birthDate: new Date('1990-07-20'),
      age: 34,
      sex: 'M',
      id: '4',
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
      usertype: 'patient',
      mail: 'bella.bennett@example.com',
      name: 'Bella',
      surname: 'Bennett',
      dni: '33445566',
      birthDate: new Date('1984-08-30'),
      age: 40,
      sex: 'F',
      id: '5',
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
      usertype: 'patient',
      mail: 'billy.bailey@example.com',
      name: 'Billy',
      surname: 'Bailey',
      dni: '99887766',
      birthDate: new Date('1995-12-25'),
      age: 29,
      sex: 'M',
      id: '6',
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
    {
      usertype: 'patient',
      mail: 'charles.clark@example.com',
      name: 'Charles',
      surname: 'Clark',
      dni: '55443322',
      birthDate: new Date('1969-11-10'),
      age: 55,
      sex: 'M',
      id: '7',
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
      usertype: 'patient',
      mail: 'catherine.collins@example.com',
      name: 'Catherine',
      surname: 'Collins',
      dni: '44332211',
      birthDate: new Date('1982-05-18'),
      age: 42,
      sex: 'F',
      id: '8',
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
      usertype: 'patient',
      mail: 'carol.cook@example.com',
      name: 'Carol',
      surname: 'Cook',
      dni: '66778899',
      birthDate: new Date('1987-09-22'),
      age: 37,
      sex: 'F',
      id: '9',
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
    {
      usertype: 'patient',
      mail: 'daniel.davis@example.com',
      name: 'Daniel',
      surname: 'Davis',
      dni: '11224466',
      birthDate: new Date('1985-04-12'),
      age: 39,
      sex: 'M',
      id: '10',
      trialId: 'T010',
      group: 'D',
      observations: [
        { date: new Date('2024-02-15'), text: 'Routine physical examination completed.' },
        { date: new Date('2024-04-05'), text: 'No major concerns.' },
      ],
      symptoms: [
        { startDate: new Date('2024-01-25'), comments: 'Minor joint pain.', tag: 'Joint Pain' },
        { startDate: new Date('2024-03-05'), comments: 'Joint pain resolved.', tag: 'Joint Pain' },
      ],
    },
  ];
  return (
    <>
      <AdminHead clinicName="Clinica Monte Grande" />
      <CreateNewClinicalTrial />
      <AssignAppointments patientList={mockPatientList as Patient[]} />
    </>
  );
}

export default withPageAuthRequired(AdminDashboard, { returnTo: '/dashboard' });
