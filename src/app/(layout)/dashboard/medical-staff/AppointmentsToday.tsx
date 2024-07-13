'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const pathname = usePathname();

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
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedTrial, selectedStudy]);

  const handleTrialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTrial(event.target.value);
    setSelectedStudy('');
  };

  const handleStudyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStudy(event.target.value);
  };

  const handleViewDetails = (personId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('patient', personId);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Container sx={sx}>
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
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Appointments for Selected Study
          </Typography>
          { Array.isArray(peopleWithAppointmentsToday)
            && peopleWithAppointmentsToday.length > 0 ? (
              peopleWithAppointmentsToday.map((person) => (
                <Box
                  key={person.id}
                  sx={{
                    mb: 4,
                    p: 3,
                    boxShadow: 1,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body1">
                    Name:
                    {' '}
                    {person.name}
                  </Typography>
                  <Typography variant="body1">
                    Hour:
                    {' '}
                    {person.hour}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleViewDetails(person.id)}
                  >
                    View Details
                  </Button>
                </Box>
              ))
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
