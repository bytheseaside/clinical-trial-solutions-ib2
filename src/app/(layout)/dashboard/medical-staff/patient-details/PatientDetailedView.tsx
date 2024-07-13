'use client';

import React, { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';

import Container from 'shared/layout/Container';

type Patient = { name: string; surname: string; age: number; sex: string; id: string };

type Props = {
  patientList: Patient[];
  sx?: SxProps<Theme>;
};

const PatientDetailedView: React.FC<Props> = ({ patientList, sx = [] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);

  return (
    <Container
      sx={[
        {
          py: 3,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Autocomplete
        options={patientList.sort((a, b) => a.name.localeCompare(b.name))}
        getOptionLabel={(pat) => `${pat.surname}, ${pat.name}`}
        sx={{ my: 3, backgroundColor: 'white' }}
        groupBy={({ surname }) => surname.charAt(0)}
        blurOnSelect // on select, the input field will lose focus
        autoComplete
        renderInput={(params) => (
          <TextField {...params} label="Select a patient" />
        )}
        value={patient}
        onChange={(event, selectedPatient) => {
          setPatient(selectedPatient);
          if (selectedPatient) {
            const { id } = selectedPatient;
            const params = new URLSearchParams();
            params.set('patient', id);
            router.push(`/dashboard/medical-staff/patient-details?${params.toString()}`);
          } else {
            router.push('/dashboard/medical-staff/patient-details');
          }
        }}
        fullWidth
      />
    </Container>
  );
};

export default PatientDetailedView;
