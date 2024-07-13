'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import Container from 'shared/layout/Container';

type ClinicalTrial = {
  id: string;
  name: string;
};

type Study = {
  id: string;
  name: string;
  trialId: string;
};

type PersonWithAppointment = {
  id: string;
  name: string;
  hour: string;
};

type Props = {
  clinicalTrials: ClinicalTrial[];
  studies: Study[];
  peopleWithAppointmentsToday: PersonWithAppointment[];
  sx?: SxProps<Theme>;
};

const AppointmentsToday: React.FC<Props> = ({
  sx,
  clinicalTrials,
  studies,
  peopleWithAppointmentsToday,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedTrial, setSelectedTrial] = useState<string>(searchParams.get('trial') || '');
  const [selectedStudy, setSelectedStudy] = useState<string>(searchParams.get('study') || '');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedTrial) {
      params.set('trial', selectedTrial);
      if (selectedStudy) {
        params.set('study', selectedStudy);
      } else {
        params.delete('study');
      }
    } else {
      params.delete('trial');
      params.delete('study');
    }
    router.replace(`/dashboard/medical-staff?${params.toString()}`);
  }, [selectedTrial, selectedStudy]);

  const handleTrialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTrial(event.target.value);
    setSelectedStudy('');
  };

  const handleStudyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStudy(event.target.value);
  };

  const handleViewDetails = (patientId: string) => {
    const params = new URLSearchParams();
    params.set('patient', patientId);
    router.push(`/dashboard/medical-staff/patient-details?${params.toString()}`);
  };

  return (
    <Container sx={[
      {
        mt: -10,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    >
      <Box
        component={Link}
        sx={{ typography: 'caption', mb: 10, display: 'block' }}
        href="/dashboard/medical-staff/patient-details"
      >
        See patient&apos;s details
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          color="text.primary"
          sx={{
            typography: { xxs: 'h4', sm: 'h3' },
            mb: 3,
          }}
        >
          Today&apos;s Appointments
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Select a clinical trial and study to view details.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xxs: 'column', sm: 'row' },
            gap: { xxs: 1, sm: 2 },
            mt: { xxs: 2, sm: 4 },
          }}
        >
          <TextField
            select
            size="small"
            label="Select Clinical Trial"
            value={selectedTrial}
            onChange={handleTrialChange}
            fullWidth
          >
            <MenuItem value="" disabled dense>
              Select
            </MenuItem>
            {Array.isArray(clinicalTrials) && clinicalTrials.length > 0
            && clinicalTrials.map((trial) => (
              <MenuItem key={trial.id} value={trial.id} dense>
                {trial.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Study"
            value={selectedStudy}
            onChange={handleStudyChange}
            fullWidth
            size="small"
            disabled={!selectedTrial}
            sx={{ mb: 4 }}
          >
            <MenuItem value="" disabled dense>
              Select
            </MenuItem>
            {Array.isArray(studies) && studies.length > 0
            && studies.filter((study) => study.trialId === selectedTrial)
              .map((study) => (
                <MenuItem key={study.id} value={study.id} dense>
                  {study.name}
                </MenuItem>
              ))}
          </TextField>
        </Box>
      </Box>
      {selectedTrial && selectedStudy && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="caption"
            component="h2"
            color="text.primary"
          >
            Appointments for Selected Study
          </Typography>
          {Array.isArray(peopleWithAppointmentsToday)
            && peopleWithAppointmentsToday.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 2,
                  py: 3,
                  maxHeight: '50vh',
                  overflowY: 'scroll',
                }}
              >
                {peopleWithAppointmentsToday.map((person) => (
                  <Box
                    key={person.id}
                    onClick={() => handleViewDetails(person.id)}
                    sx={{
                      backgroundColor: 'background.paper',
                      px: 2,
                      py: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      borderRadius: 1,
                      boxShadow: 3,
                      width: { xxs: '100%', sm: '40%', md: '30%' },
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      textDecoration: 'none',
                      color: 'text.primary',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                        textDecoration: 'none',
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        pb: 1,
                        borderBottom: '1px solid',
                        borderColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      Today at
                      {' '}
                      {person.hour}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ mb: 1, typography: { xxs: 'captionSmall', sm: 'caption' } }}
                    >
                      {person.name}

                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1">
                No appointments today.
              </Typography>
            )}

        </Box>
      )}
    </Container>
  );
};

export default AppointmentsToday;
