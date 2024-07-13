import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import AppoinmentsToday from './AppointmentsToday';
import MedicalStaffHead from './MedicalStaffHead';

async function MedicalStaffDashboard() {
  const clinicalTrials = [
    { id: '1', name: 'Trial A' },
    { id: '2', name: 'Trial B' },
    { id: '3', name: 'Trial C' },
  ];
  const studies = [
    { id: '1-1', name: 'Study A1', trialId: '1' },
    { id: '1-2', name: 'Study A2', trialId: '1' },
    { id: '2-1', name: 'Study B1', trialId: '2' },
    { id: '2-2', name: 'Study B2', trialId: '2' },
    { id: '3-1', name: 'Study C1', trialId: '3' },
    { id: '3-2', name: 'Study C2', trialId: '3' },
  ];
  const mockPeopleWithAppointmentsToday = [
    {
      id: 'p1',
      name: 'Alice Johnson',
      hour: '09:00 AM',
    },
    {
      id: 'p2',
      name: 'Bob Smith',
      hour: '10:30 AM',
    },
    {
      id: 'p3',
      name: 'Charlie Brown',
      hour: '01:00 PM',
    },
    {
      id: 'p4',
      name: 'Diana Prince',
      hour: '02:30 PM',
    },
    {
      id: 'p5',
      name: 'Evelyn Adams',
      hour: '04:00 PM',
    },
    {
      id: 'p6',
      name: 'Franklin Roosevelt',
      hour: '05:30 PM',
    },
    {
      id: 'p7',
      name: 'Gina Rodriguez',
      hour: '07:00  PM',
    },
  ];

  return (
    <>
      <MedicalStaffHead name="some name" trialName="ajbskd" />
      <AppoinmentsToday
        clinicalTrials={clinicalTrials}
        studies={studies}
        peopleWithAppointmentsToday={mockPeopleWithAppointmentsToday}
      />
    </>
  );
}

export default withPageAuthRequired(MedicalStaffDashboard, { returnTo: '/dashboard' });
