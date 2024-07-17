'use client';

import React, { useEffect, useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import UserService from 'services/firebase/userService';

import { ClinicalTrial, Patient } from 'shared/api';

type Props = {
  trial: ClinicalTrial;
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

const PatientForm: React.FC<Props> = ({ trial, group, sx = [] }) => {
  const { user } = useUser();
  const router = useRouter();
  const [optimisticMessage, setOptimisticMessage] = useState<string>('');

  const [patientData, setPatientData] = useState<Patient>(
    { ...BASE_PATIENT, mail: user?.email || '', id: user?.sub || '', trialId: trial?.id || '', group: group || '' },
  );
  const [exclusionAnswers, setExclusionAnswers] = useState<Record<string, boolean>>({});

  const handleSubmission = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOptimisticMessage('');

    // Verifica si exclusionAnswers y trial están definidos
    if (!exclusionAnswers || !trial?.exclusionCriteria) {
      console.error('Exclusion answers or trial exclusion criteria are not defined.');
      return;
    }

    // Compara cada respuesta de exclusión con los criterios
    const hasExcludedCriteria = Object.entries(exclusionAnswers)
      .some(([question, answer]) => {
        const criteria = trial.exclusionCriteria!.find(
          (crit) => crit.question === question,
        );
        if (!criteria) {
          return false;
        }
        return answer === criteria.answerToExclude;
      });

    if (hasExcludedCriteria) {
      router.push('/dashboard/not-suitable-candidate');
      return;
    }

    setOptimisticMessage('Your profile is being created, wait for a second while you\'re being redirected.');
    UserService.createUser(user!.sub, patientData)
      .then(() => router.push('/dashboard/patient'))
      .catch(() => {
        setOptimisticMessage('There was some error. Please try again later');
      });
  };

  useEffect(
    () => {
      if (trial && group) {
        setPatientData({ ...patientData, trialId: trial.id, group });
      }
    },
    [trial, group],
  );

  return (
    <Box
      sx={{
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Please fill the following form to continue with the registration process.
      </Typography>
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
        <DatePicker
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
        {Array.isArray(trial?.exclusionCriteria) && trial.exclusionCriteria.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Exclusion Criteria</Typography>
            {trial.exclusionCriteria.map((criteria, index) => (
              <TextField
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                id={`exclusion-${index}`}
                name={`exclusion-${index}`}
                select
                label={criteria.question}
                variant="outlined"
                value={exclusionAnswers[criteria.question] || false}
                onChange={(e) => setExclusionAnswers((prevAnswers) => ({
                  ...prevAnswers,
                  [criteria.question]: e.target.value === 'true',
                }))}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            ))}
          </Box>
        )}

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
      <Typography
        variant="body2"
        color="text.primary"
      >
        {optimisticMessage}
      </Typography>
    </Box>
  );
};

export default PatientForm;
