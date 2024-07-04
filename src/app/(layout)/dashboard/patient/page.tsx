import React from 'react';

import ContactsBoard from './ContactsBoard';

type Props = {
};

export default async function PatientDashboard({ }: Props) {
  const doctors = [
    { name: 'Dr. John Smith', specialty: 'Cardiology', phone: '555-1234' },
    { name: 'Dr. Emily Davis', specialty: 'Neurology', phone: '555-5678' },
    { name: 'Dr. Michael Johnson', specialty: 'Orthopedics', phone: '555-8765' },
    { name: 'Dr. Sarah Lee', specialty: 'Pediatrics', phone: '555-4321' },
    { name: 'Dr. David Brown', specialty: 'Dermatology', phone: '555-6789' },
  ];
  return (
    <>
      Patient page
      <ContactsBoard staff={doctors} />
    </>
  );
}
