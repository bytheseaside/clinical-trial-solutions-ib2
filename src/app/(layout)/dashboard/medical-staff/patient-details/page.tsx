'use server';

import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import PatientDetailedView from './PatientDetailedView';
import MedicalStaffHead from '../MedicalStaffHead';

async function PatientDetailsPage() {
  const mockPatientList = [
  // Surname starts with 'A'
    { id: '1', name: 'Aaron', surname: 'Anderson', age: 28, sex: 'Male' },
    { id: '2', name: 'Alice', surname: 'Andrews', age: 32, sex: 'Female' },
    { id: '3', name: 'Adam', surname: 'Archer', age: 45, sex: 'Male' },

    // Surname starts with 'B'
    { id: '4', name: 'Ben', surname: 'Brown', age: 34, sex: 'Male' },
    { id: '5', name: 'Bella', surname: 'Bennett', age: 40, sex: 'Female' },
    { id: '6', name: 'Billy', surname: 'Bailey', age: 29, sex: 'Male' },

    // Surname starts with 'C'
    { id: '7', name: 'Charles', surname: 'Clark', age: 55, sex: 'Male' },
    { id: '8', name: 'Catherine', surname: 'Collins', age: 42, sex: 'Female' },
    { id: '9', name: 'Carol', surname: 'Cook', age: 37, sex: 'Female' },

    // Surname starts with 'D'
    { id: '10', name: 'Daniel', surname: 'Davis', age: 39, sex: 'Male' },
    { id: '11', name: 'Diana', surname: 'Dixon', age: 33, sex: 'Female' },
    { id: '12', name: 'Deborah', surname: 'Douglas', age: 49, sex: 'Female' },

    // Surname starts with 'E'
    { id: '13', name: 'Edward', surname: 'Evans', age: 45, sex: 'Male' },
    { id: '14', name: 'Emma', surname: 'Ellis', age: 31, sex: 'Female' },
    { id: '15', name: 'Eve', surname: 'Edwards', age: 29, sex: 'Female' },

    // Surname starts with 'F'
    { id: '16', name: 'Frank', surname: 'Fisher', age: 50, sex: 'Male' },
    { id: '17', name: 'Fiona', surname: 'Foster', age: 37, sex: 'Female' },
    { id: '18', name: 'Felix', surname: 'Ford', age: 28, sex: 'Male' },

    // Surname starts with 'G'
    { id: '19', name: 'George', surname: 'Green', age: 46, sex: 'Male' },
    { id: '20', name: 'Grace', surname: 'Gray', age: 32, sex: 'Female' },
    { id: '21', name: 'Gina', surname: 'Garcia', age: 40, sex: 'Female' },

    // Surname starts with 'H'
    { id: '22', name: 'Henry', surname: 'Harris', age: 58, sex: 'Male' },
    { id: '23', name: 'Hannah', surname: 'Howard', age: 28, sex: 'Female' },
    { id: '24', name: 'Harold', surname: 'Hill', age: 45, sex: 'Male' },

    // Surname starts with 'I'
    { id: '25', name: 'Isaac', surname: 'Ingram', age: 34, sex: 'Male' },
    { id: '26', name: 'Irene', surname: 'Irving', age: 39, sex: 'Female' },
    { id: '27', name: 'Ivy', surname: 'Isaacson', age: 27, sex: 'Female' },

    // Surname starts with 'J'
    { id: '28', name: 'John', surname: 'Johnson', age: 47, sex: 'Male' },
    { id: '29', name: 'Jane', surname: 'Jones', age: 29, sex: 'Female' },
    { id: '30', name: 'Jack', surname: 'Jackson', age: 34, sex: 'Male' },

    // Surname starts with 'K'
    { id: '31', name: 'Kyle', surname: 'King', age: 39, sex: 'Male' },
    { id: '32', name: 'Kylie', surname: 'Klein', age: 28, sex: 'Female' },
    { id: '33', name: 'Karen', surname: 'Kramer', age: 42, sex: 'Female' },

    // Surname starts with 'L'
    { id: '34', name: 'Liam', surname: 'Lee', age: 30, sex: 'Male' },
    { id: '35', name: 'Laura', surname: 'Lewis', age: 35, sex: 'Female' },
    { id: '36', name: 'Lena', surname: 'Lopez', age: 29, sex: 'Female' },

    // Surname starts with 'M'
    { id: '37', name: 'Michael', surname: 'Miller', age: 45, sex: 'Male' },
    { id: '38', name: 'Mia', surname: 'Martin', age: 33, sex: 'Female' },
    { id: '39', name: 'Matthew', surname: 'Moore', age: 50, sex: 'Male' },

    // Surname starts with 'N'
    { id: '40', name: 'Nathan', surname: 'Nelson', age: 31, sex: 'Male' },
    { id: '41', name: 'Nora', surname: 'Nash', age: 28, sex: 'Female' },
    { id: '42', name: 'Nicole', surname: 'Norman', age: 40, sex: 'Female' },

    // Surname starts with 'O'
    { id: '43', name: 'Oliver', surname: 'Olsen', age: 36, sex: 'Male' },
    { id: '44', name: 'Olivia', surname: 'O’Neill', age: 33, sex: 'Female' },
    { id: '45', name: 'Oscar', surname: 'Ortega', age: 50, sex: 'Male' },

    // Surname starts with 'P'
    { id: '46', name: 'Paul', surname: 'Parker', age: 42, sex: 'Male' },
    { id: '47', name: 'Penny', surname: 'Peterson', age: 29, sex: 'Female' },
    { id: '48', name: 'Philip', surname: 'Phillips', age: 47, sex: 'Male' },

    // Surname starts with 'Q'
    { id: '49', name: 'Quinn', surname: 'Quinn', age: 29, sex: 'Female' },
    { id: '50', name: 'Quincy', surname: 'Quinn', age: 34, sex: 'Male' },
    { id: '51', name: 'Queenie', surname: 'Quincy', age: 41, sex: 'Female' },

    // Surname starts with 'R'
    { id: '52', name: 'Rachel', surname: 'Ramirez', age: 28, sex: 'Female' },
    { id: '53', name: 'Robert', surname: 'Roberts', age: 37, sex: 'Male' },
    { id: '54', name: 'Rosa', surname: 'Rodriguez', age: 45, sex: 'Female' },

    // Surname starts with 'S'
    { id: '55', name: 'Samuel', surname: 'Smith', age: 53, sex: 'Male' },
    { id: '56', name: 'Sophie', surname: 'Stewart', age: 31, sex: 'Female' },
    { id: '57', name: 'Sarah', surname: 'Sullivan', age: 42, sex: 'Female' },

    // Surname starts with 'T'
    { id: '58', name: 'Thomas', surname: 'Turner', age: 49, sex: 'Male' },
    { id: '59', name: 'Tina', surname: 'Taylor', age: 37, sex: 'Female' },
    { id: '60', name: 'Terry', surname: 'Thompson', age: 32, sex: 'Male' },

    // Surname starts with 'U'
    { id: '61', name: 'Ursula', surname: 'Underwood', age: 46, sex: 'Female' },
  ];
  return (
    <>
      <MedicalStaffHead name="some name" trialName="ajbskd" />
      <PatientDetailedView patientList={mockPatientList} />
    </>
  );
}

export default withPageAuthRequired(PatientDetailsPage, { returnTo: '/dashboard' });
