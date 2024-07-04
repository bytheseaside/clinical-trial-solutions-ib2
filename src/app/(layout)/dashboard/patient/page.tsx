import React from 'react';

import AppointmentsSection from './AppointmentCalendar';
import ContactsBoard from './ContactsBoard';
import PatientHead from './PatientHead';
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

  const appointments = [
    { date: 4, month: 'July', name: 'Doctor Appointment', hour: '10:00 AM' },
    { date: 5, month: 'July', name: 'Team Meeting', hour: '02:00 PM' },
    { date: 6, month: 'July', name: 'Dentist Appointment', hour: '11:30 AM' },
    { date: 7, month: 'July', name: 'Project Review', hour: '03:00 PM' },
    { date: 8, month: 'July', name: 'Yoga Class', hour: '06:00 PM' },
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
      <AppointmentsSection appointments={appointments} />
      <ContactsBoard staff={doctors} />
    </>
  );
}
