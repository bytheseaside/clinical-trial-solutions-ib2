import React from 'react';

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

  return (
    <>
      <PatientHead
        name="BRISA ROJAS"
        dni="42421293"
        trialName="probando 123"
      />
      <TrialProgress
        steps={steps}
      />
      <ContactsBoard staff={doctors} />
    </>
  );
}
