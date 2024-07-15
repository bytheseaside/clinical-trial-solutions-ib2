import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { Appointment, Patient } from 'shared/api';

import AppointmentsSection from './AppointmentCalendar';
import ContactsBoard from './ContactsBoard';
import PatientHead from './PatientHead';
import ReportSymptom from './ReportSymptom';
import TrialProgress from './TrialProgress';

async function PatientDashboard() {
  const doctors = [
    { name: 'Dr. John Smith', specialty: 'Cardiology', phone: '555-1234' },
    { name: 'Dr. Emily Davis', specialty: 'Neurology', phone: '555-5678' },
    { name: 'Dr. Michael Johnson', specialty: 'Orthopedics', phone: '555-8765' },
    { name: 'Dr. Sarah Lee', specialty: 'Pediatrics', phone: '555-4321' },
    { name: 'Dr. David Brown', specialty: 'Dermatology', phone: '555-6789' },
  ];

  const symptomsList = ['Fever', 'Cough', 'Headache', 'Fatigue']; // Example symptoms list
  const userId = '123456789'; // Example user ID

  const appointments = [
    {
      title: 'Checkup',
      date: new Date('2024-07-10T09:30:00'),
    },
    {
      title: 'Dental cleaning',
      date: new Date('2024-07-12T14:00:00'),
    },
    {
      title: 'MRI Scan',
      date: new Date('2024-07-15T11:15:00'),
    },
    {
      title: 'Physical therapy',
      date: new Date('2024-07-18T16:45:00'),
    },
    {
      title: 'Consultation',
      date: new Date('2024-07-22T10:00:00'),
    },
  ];

  const mockClinicalStudies = [
    {
      name: 'Study ABC',
      keyVariables: [
        { name: 'Blood Pressure', type: 'number' },
        { name: 'Heart Rate', type: 'number' },
        { name: 'Patient Feedback', type: 'text' },
      ],
    },
    {
      name: 'Study XYZ',
      keyVariables: [
        { name: 'Cholesterol Level', type: 'number' },
        { name: 'Glucose Level', type: 'number' },
        { name: 'Lifestyle Assessment', type: 'text' },
      ],
    },
    {
      name: 'Study DEF',
      keyVariables: [
        { name: 'Body Temperature', type: 'number' },
        { name: 'Respiratory Rate', type: 'number' },
        { name: 'Health History', type: 'text' },
      ],
    },
  ];

  // Array of mock appointments
  const mockAppointments = [
    {
      date: new Date('2024-07-20'),
      study: mockClinicalStudies[0], // Study ABC
    },
    {
      date: new Date('2024-07-14'),
      study: mockClinicalStudies[1], // Study XYZ
    },
    {
      date: new Date('2024-07-15'),
      study: mockClinicalStudies[2], // Study DEF
    },
  ];

  return (
    <>
      <PatientHead
        name="BRISA ROJAS"
        trialName="probando 123"
      />
      <TrialProgress
        steps={mockAppointments as Appointment[]}
      />
      <ReportSymptom symptoms={symptomsList} userId={userId} />
      <AppointmentsSection appointments={mockAppointments} />
      <ContactsBoard staff={doctors} />
    </>
  );
}

export default withPageAuthRequired(PatientDashboard, { returnTo: '/dashboard' });
