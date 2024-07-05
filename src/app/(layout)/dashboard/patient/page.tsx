import React from 'react';

import AppointmentsSection from './AppointmentCalendar';
import ContactsBoard from './ContactsBoard';
import PatientHead from './PatientHead';
import ReportSymptom from './ReportSymptom';
import TrialProgress from './TrialProgress';

export default async function PatientDashboard() {
  const doctors = [
    { name: 'Dr. John Smith', specialty: 'Cardiology', phone: '555-1234' },
    { name: 'Dr. Emily Davis', specialty: 'Neurology', phone: '555-5678' },
    { name: 'Dr. Michael Johnson', specialty: 'Orthopedics', phone: '555-8765' },
    { name: 'Dr. Sarah Lee', specialty: 'Pediatrics', phone: '555-4321' },
    { name: 'Dr. David Brown', specialty: 'Dermatology', phone: '555-6789' },
  ];

  const steps = [
    { title: 'Registro de pacientes', status: 'done' as const },
    { title: 'Evaluación inicial', status: 'done' as const },
    { title: 'Asignación de tratamiento', status: 'inProgress' as const },
    { title: 'Seguimiento clínico', status: 'toDo' as const },
    { title: 'Análisis de datos', status: 'toDo' as const },
    { title: 'Informe final', status: 'toDo' as const },
    { title: 'Publicación de resultados', status: 'toDo' as const },
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
  return (
    <>
      <PatientHead
        name="BRISA ROJAS"
        trialName="probando 123"
      />
      <TrialProgress
        steps={steps}
      />
      <ReportSymptom symptoms={symptomsList} userId={userId} />
      <AppointmentsSection appointments={appointments} />
      <ContactsBoard staff={doctors} />
    </>
  );
}
