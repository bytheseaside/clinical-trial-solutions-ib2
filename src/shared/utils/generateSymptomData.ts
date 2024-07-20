import { Patient } from 'shared/api';

import { Data } from '../../app/(layout)/dashboard/analyst/TotalAmountChart';

// Function to generate chart data from patients
export const generateSymptomData = (patients: Patient[]): Data[] => {
  // First, flatten all symptoms from patients
  const flattenedSymptoms = patients.flatMap((patient) =>
    (patient.symptoms || []).map((symptom) => ({
      symptom: symptom.tag,
      value: 1, // Initialize each symptom occurrence with a value of 1
      group: patient.group || 'Unknown', // Default group if not present
    })));

  // Aggregate data by symptom and group
  const aggregatedData = flattenedSymptoms.reduce((acc, curr) => {
    const key = `${curr.symptom}-${curr.group}`;
    if (!acc[key]) {
      acc[key] = { ...curr, value: 0 };
    }
    acc[key].value += curr.value;
    return acc;
  }, {} as Record<string, Data>);

  return Object.values(aggregatedData);
};
