'use client';

import React, { useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from '@mui/icons-material/Clear';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Person4Icon from '@mui/icons-material/Person4';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';

import Container from 'shared/layout/Container';

type ClinicalStudyKeyVariable = 'boolean' | 'threshold' | 'text' | 'number';

type ClinicalStudy = {
  name: string;
  keyVariables: { name: string; type: ClinicalStudyKeyVariable }[];
};

type ExclusionCriteriaAnswer = {
  answer: string;
  shouldBeExcludedFromTrial: boolean;
};

type ExclusionCriteria = {
  question: string;
  answers: ExclusionCriteriaAnswer[];
};

type ClinicalTrial = {
  id: string;
  name: string;
  studies: ClinicalStudy[];
  groups?: string[];
  knownPossibleSecondaryEffects?: string[];
  exclusionCriteria?: ExclusionCriteria[];
};

type Observation = {
  date: Date;
  text: string;
};

type Symptom = {
  startDate: Date;
  comments: string;
  tag: string;
};

type Patient = {
  name: string;
  surname: string;
  age: number;
  sex: string;
  id: string;
  trialId: string;
  group?: string;
  observations?: Observation[];
  symptoms?: Symptom[];
};

type Props = {
  patientList: Patient[];
  sx?: SxProps<Theme>;
};

const PatientDetailedView: React.FC<Props> = ({ patientList, sx = [] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [newObservation, setNewObservation] = useState<string>('');
  const [clinicalTrial, setClinicalTrial] = useState<ClinicalTrial | null>(null);

  const handleClear = () => {
    setPatient(null);
    router.push('/dashboard/medical-staff/patient-details');
  };

  const handleObservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newObservation.trim() !== '') {
      const observation = { date: new Date(), text: newObservation };
      console.log('Submitting observation:', observation); // TODO replace with actual call to DB
      setNewObservation('');
      const { id } = patient!;
      const params = new URLSearchParams();
      params.set('patient', id);
      router.push(`/dashboard/medical-staff/patient-details?${params.toString()}`);
    }
  };

  useEffect(() => {
    const patientId = searchParams.get('patient');
    if (patientId) {
      const foundPatient = patientList.find((p) => p.id === patientId);
      if (foundPatient) {
        // async call to get clinical trial related to patient
        const clinicalTrialId = foundPatient.trialId;
        const foundClinicalTrial: ClinicalTrial = {
          id: clinicalTrialId,
          name: 'Trial A',
          studies: [
            {
              name: 'Study A1',
              keyVariables: [
                { name: 'Variable A', type: 'boolean' },
                { name: 'Variable B', type: 'threshold' },
                { name: 'Variable C', type: 'text' },
                { name: 'Variable D', type: 'number' },
              ],
            },
            {
              name: 'Study A2',
              keyVariables: [
                { name: 'Variable E', type: 'boolean' },
                { name: 'Variable F', type: 'threshold' },
                { name: 'Variable G', type: 'text' },
                { name: 'Variable H', type: 'number' },
              ],
            },
          ],
          groups: ['A', 'B', 'C'],
          knownPossibleSecondaryEffects: ['Effect A', 'Effect B', 'Effect C'],
          exclusionCriteria: [
            {
              question: 'Question A',
              answers: [
                { answer: 'Answer A', shouldBeExcludedFromTrial: true },
                { answer: 'Answer B', shouldBeExcludedFromTrial: false },
              ],
            },
            {
              question: 'Question B',
              answers: [
                { answer: 'Answer C', shouldBeExcludedFromTrial: true },
                { answer: 'Answer D', shouldBeExcludedFromTrial: false },
              ],
            },
          ],
        }; // TODO replace with actual call to DB
        setClinicalTrial(foundClinicalTrial);
        setPatient(foundPatient);
      }
    }
  }, [searchParams, patientList]);

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
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={patientList.sort((a, b) => a.name.localeCompare(b.name))}
        getOptionLabel={(pat) => `${pat.surname}, ${pat.name}`}
        sx={{
          mt: -10,
          mb: 4,
        }}
        groupBy={({ surname }) => surname.charAt(0)}
        blurOnSelect
        autoComplete
        renderInput={(params) => (
          <TextField {...params} label="Select a patient" />
        )}
        clearIcon={(
          <IconButton onClick={handleClear} color="inherit">
            <ClearIcon />
          </IconButton>
        )}
        size="small"
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
      {patient && (
        <Box>
          {/* OBSERVATIONS */}
          <Box>
            <Typography
              color="text.primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
                typography: { xxs: 'h5', sm: 'h4' },
              }}
            >
              <NoteAltIcon fontSize="inherit" color="secondary" />
              Observations
            </Typography>
            <List>
              {Array.isArray(patient.observations)
                  && patient.observations.map(({ date, text }) => (
                    <ListItem
                      key={date.toISOString()}
                      sx={{
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
                      }}
                    >
                      <ListItemText
                        primary={(
                          <Typography variant="body2">
                            <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            {date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                          </Typography>
                        )}
                        secondary={(
                          <Typography variant="body2" color="textSecondary">
                            {text}
                          </Typography>
                        )}
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))}
            </List>
            <Box
              component="form"
              onSubmit={handleObservationSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                sx={{
                  mb: 2,
                  width: '100%',
                  maxWidth: '100%',
                  borderColor: 'divider',
                }}
                label="Observation"
                variant="outlined"
                value={newObservation}
                onChange={(e) => setNewObservation(e.target.value)}
                size="small"
                placeholder="Add a new observation."
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  typography: { xxs: 'captionSmall', sm: 'caption' },
                  mt: 2,
                  alignSelf: 'flex-end',
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
          {/* REPORTED SYMPTOMS */}
          <Box>
            <Typography
              color="text.primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
                typography: { xxs: 'h5', sm: 'h4' },
              }}
            >
              <CoronavirusIcon fontSize="inherit" color="secondary" />
              Symptoms
            </Typography>
            <List>
              {Array.isArray(patient.symptoms)
                  && patient.symptoms.map(({ startDate, comments, tag }) => (
                    <ListItem
                      key={startDate.toISOString()}
                      sx={{
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
                      }}
                    >
                      <ListItemText
                        primary={(
                          <Typography variant="body2">
                            <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            {tag}
                            {' '}
                            (
                            {startDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                            )
                          </Typography>
                        )}
                        secondary={(
                          <Typography variant="body2" color="textSecondary">
                            {comments}
                          </Typography>
                        )}
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))}
            </List>
          </Box>
          {/* STUDY ASSESMENT DATA */}
          <Box>
            <Typography
              color="text.primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
                typography: { xxs: 'h5', sm: 'h4' },
              }}
            >
              <DataThresholdingIcon fontSize="inherit" color="secondary" />
              Study Assessment Data
            </Typography>
            <List>
              sddfsa
            </List>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PatientDetailedView;
