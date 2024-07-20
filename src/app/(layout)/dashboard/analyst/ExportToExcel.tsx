'use client';

import React from 'react';

import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { Patient } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  patientsData: Patient[];
  sx?: SxProps<Theme>;
};

// Function to handle date formatting
const formatDate = (date:Date) => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  } if (typeof date === 'string') {
    return new Date(date).toISOString().split('T')[0];
  }
  return '';
};

const ExportToExcel: React.FC<Props> = ({ patientsData, sx = [] }) => {
  const exportToExcel = () => {
    const dataForExcel = patientsData.map((patient) => ({
      ...patient,
      symptoms: patient.symptoms ? patient.symptoms.map((symp) => ({
        startDate: formatDate(symp.startDate),
        comments: symp.comments,
        tag: symp.tag,
      })) : [],
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'patients.xlsx');
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
        It has the data anonimized and formatted for easy reading and analysis.
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
