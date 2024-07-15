'use client';

import React, { useEffect } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

import { Patient } from 'shared/api';

type Props = {
  trialId: string;
  group: string;
  sx?: SxProps<Theme>;
};

const BASE_PATIENT : Omit<Patient, 'mail' | 'id' | 'group' | 'trialId'> = {
  usertype: 'patient',
  name: '',
  surname: '',
  dni: '',
  birthDate: new Date(),
  sex: 'F',
  observations: [],
  symptoms: [],
  assesments: [],
  appointments: [],
};

const PatientForm: React.FC<Props> = ({ trialId, group, sx = [] }) => {
  const { user } = useUser();
  const router = useRouter();

  const [patientData, setPatientData] = React.useState<Patient>(
    { ...BASE_PATIENT, mail: user?.email || '', id: user?.sub || '', trialId, group },
  );

  const handleSubmission = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(patientData); // TODO make API call to save patient data
    router.push('/dashboard');
  };

  useEffect(
    () => {
      if (trialId && group) {
        setPatientData({ ...patientData, trialId, group });
      }
    },
    [trialId, group],
  );

  return (
    <Box
      sx={{
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
        }}
        onSubmit={handleSubmission}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xxs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <TextField
            id="name"
            name="name"
            required
            onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
            label="Patient name"
            variant="outlined"
            value={patientData.name}
            size="small"
            fullWidth
          />
          <TextField
            id="surname"
            name="surname"
            required
            onChange={(e) => setPatientData({ ...patientData, surname: e.target.value })}
            label="Patient surname"
            variant="outlined"
            value={patientData.surname}
            size="small"
            fullWidth
          />
        </Box>
        <TextField
          id="dni"
          name="dni"
          required
          onChange={(e) => setPatientData({ ...patientData, dni: e.target.value })}
          label="Patient DNI"
          variant="outlined"
          value={patientData.dni}
          size="small"
          fullWidth
        />
        <TextField
          id="sex"
          name="sex"
          required
          select
          onChange={(e) => setPatientData({ ...patientData, sex: e.target.value as 'F' | 'M' })}
          label="Patient sex"
          variant="outlined"
          value={patientData.sex}
          size="small"
          fullWidth
        >
          <MenuItem value="F" dense>
            Female
          </MenuItem>
          <MenuItem value="M" dense>
            Masculine
          </MenuItem>
        </TextField>
        <DateTimePicker
          label="Birth date of the patient"
          value={dayjs(patientData.birthDate)}
          onChange={(newDate: Dayjs | null) => {
            if (!newDate) return;
            setPatientData((prevPatient) => ({
              ...prevPatient,
              birthDate: newDate.toDate(),
            }));
          }}
          referenceDate={dayjs()}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ alignSelf: 'flex-end' }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PatientForm;
