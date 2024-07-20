'use client';

import React from 'react';

import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { ClinicalTrial, Patient } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  patientsData: Patient[];
  trial: ClinicalTrial;
  sx?: SxProps<Theme>;
};

const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    return new Date(date).toISOString().split('T')[0];
  }
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return '';
};

const ExportToExcel: React.FC<Props> = ({ patientsData, trial, sx = [] }) => {
  const exportToExcel = () => {
    const knownSideEffects = trial.knownPossibleSecondaryEffects || [];
    const studies = trial.studies || [];

    // Create headers
    const headers = [
      'Index', 'Group', 'Sex', 'Date of Birth',
      ...knownSideEffects,
      'Other Symptoms',
      ...studies.flatMap((study) =>
        study.keyVariables.map((keyVar) => `${study.name} - ${keyVar.name}`)),
      'Observations',
    ];

    // Create data rows
    const dataForExcel = patientsData.map((patient, index) => {
      // Initialize the symptoms count for each known side effect
      const symptomsCount = knownSideEffects.reduce((acc, sideEffect) => {
        acc[sideEffect] = 0;
        return acc;
      }, {} as Record<string, number>);

      // Count the occurrence of each symptom
      let otherSymptomsCount = 0;
      patient.symptoms?.forEach((symptom) => {
        if (knownSideEffects.includes(symptom.tag)) {
          symptomsCount[symptom.tag] += 1;
        } else {
          otherSymptomsCount += 1;
        }
      });

      // Collect assessments data for each study key variable
      const assessmentsData = studies.flatMap((study) =>
        study.keyVariables.map((keyVar) => {
          const assessment = patient.assessments?.find(
            (assess) => assess.keyVariableName === keyVar.name,
          );
          return assessment ? assessment.value : '';
        }));

      return {
        Index: index + 1,
        Group: patient.group || 'General',
        Sex: patient.sex,
        'Date of Birth': formatDate(patient.birthDate),
        ...Object.values(symptomsCount),
        'Other Symptoms': otherSymptomsCount,
        ...assessmentsData,
        Observations: patient.observations?.map((obs) => `${obs.date}: ${obs.text}`).join('; ') || '',
      };
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Add headers
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

    // Generate and save Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `patients_data-${trial.name}_${formatDate(new Date())}.xlsx`);
  };

  return (
    <Container sx={sx}>
      <Typography
        color="text.primary"
        sx={{
          typography: { xxs: 'h4', sm: 'h3' },
          mb: 3,
        }}
      >
        Export data
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        By clicking the button below, you will download an Excel file with all the patients data.
        It has the data anonymized and formatted for easy reading and analysis.
      </Typography>
      <Button
        sx={{ backgroundColor: 'transparent', border: '1px solid', borderColor: 'primary.main', color: 'primary.main' }}
        onClick={exportToExcel}
      >
        Export to Excel
      </Button>
    </Container>
  );
};

export default ExportToExcel;
