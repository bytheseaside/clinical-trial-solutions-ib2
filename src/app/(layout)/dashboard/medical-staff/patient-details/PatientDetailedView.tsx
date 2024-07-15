'use client';

import React, { useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from '@mui/icons-material/Clear';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PatientService from 'services/firebase/patientService';

import { ClinicalStudyKeyVariable, ClinicalTrial, Patient } from 'shared/api';
import Container from 'shared/layout/Container';

type KeyVariableSingleValue = {
  name: string;
  type: ClinicalStudyKeyVariable;
  value?: boolean | number | string;
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
  const [keyVariableValues, setKeyVariableValues] = useState<KeyVariableSingleValue[][]>([]);

  const handleClear = () => {
    setPatient(null);
    router.push('/dashboard/medical-staff/patient-details');
  };

  const handleObservationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newObservation.trim() !== '') {
      const createdNewObservation = { date: new Date().toISOString(), text: newObservation };

      try {
        await PatientService.addObservation(patient!.id, createdNewObservation);
        setNewObservation('');

        const { id } = patient!;
        const params = new URLSearchParams();
        params.set('patient', id);
        router.push(`/dashboard/medical-staff/patient-details?${params.toString()}`);
        setPatient((prevPatient) => {
          if (prevPatient !== null) {
            return {
              ...prevPatient,
              observations: [
                ...(prevPatient?.observations || []),
                createdNewObservation,
              ],
            };
          }
          return prevPatient;
        });
      } catch (error) {
      // Handle any errors that occurred during the observation submission
        console.error('Failed to add observation:', error);
      // Optionally, show an error message to the user
      }
    } else {
    // Optionally, handle the case where the observation text is empty
      console.warn('Observation text cannot be empty');
    }
  };

  const handleKeyVariableSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let i = 0; i < keyVariableValues.length; i += 1) {
      for (let j = 0; j < keyVariableValues[i].length; j += 1) {
        const assesmentItem = keyVariableValues[i][j];
        const medicionPaciente = {
          name: assesmentItem.name,
          value: assesmentItem.value,
          study: i,
        };
        console.log('Submitting key variable:', medicionPaciente); // TODO replace with actual call to DB
      }
    }
  };

  useEffect(() => {
    const patientId = searchParams.get('patient');
    if (patientId) {
      const foundPatient = patientList.find((p) => p.id === patientId);
      if (foundPatient) {
        // async call to get clinical trial related to patient TO DO DB
        const clinicalTrialId = foundPatient.trialId;
        const foundClinicalTrial: ClinicalTrial = {
          id: clinicalTrialId,
          contacts: [],
          name: 'Trial A',
          signUpCodes: { patient: 'P001', medicalStaff: 'D001', analyst: 'A001' },
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
              answerToExclude: false,
            },
            {
              question: 'Question B',
              answerToExclude: true,
            },
          ],
        }; // TODO replace with actual call to DB
        setClinicalTrial(foundClinicalTrial);
        setPatient(foundPatient);
      }
    }
  }, [searchParams, patientList]);

  useEffect(() => {
    if (clinicalTrial && patient) {
      const auxiliarKeyVariableValues: KeyVariableSingleValue[][] = [];

      for (let i = 0; i < clinicalTrial.studies.length; i += 1) {
        const expectedAssesments = clinicalTrial.studies[i].keyVariables;
        if (expectedAssesments) {
          auxiliarKeyVariableValues.push(expectedAssesments);
        } else {
          auxiliarKeyVariableValues.push([]);
        }
      }

      const keyVariableMeasuredValues = patient?.assesments;
      if (keyVariableMeasuredValues) {
        for (let i = 0; i < keyVariableMeasuredValues.length; i += 1) {
          for (let j = 0; j < auxiliarKeyVariableValues[i].length; j += 1) {
            const currentAssesment = auxiliarKeyVariableValues[i][j];
            const value = keyVariableMeasuredValues[i][currentAssesment.name];
            if (value) {
              auxiliarKeyVariableValues[i][j].value = value;
            }
          }
        }
      }
      setKeyVariableValues(auxiliarKeyVariableValues);
    }
  }, [clinicalTrial, patient]);

  return (
    <Container
      sx={[
        {
          mt: -10,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component={Link}
        sx={{ typography: 'caption', mb: 10, display: 'block' }}
        href="/dashboard/medical-staff"
      >
        See today&apos;s appointments
      </Box>
      <Typography
        color="text.primary"
        sx={{
          typography: { xxs: 'h4', sm: 'h3' },
          mb: 3,
        }}
      >
        Patient Detailed View
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Select a patient to see their clinical history.
      </Typography>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={patientList.sort((a, b) => a.name.localeCompare(b.name))}
        getOptionLabel={(pat) => `${pat.surname}, ${pat.name}`}
        sx={{
          mb: 4,
          mt: { xxs: 2, sm: 4 },

        }}
        groupBy={({ surname }) => surname.charAt(0)}
        blurOnSelect
        autoComplete
        renderInput={(params) => (
          <TextField {...params} label="Select a patient" />
        )}
        clearIcon={(<ClearIcon onClick={handleClear} color="inherit" />)}
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
                && patient.observations.map(({ date, text }, index) => (
                  <ListItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={text + date + index}
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
                          {new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
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
          {Array.isArray(patient.symptoms)
                && patient.symptoms.length > 0 && (
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
                      {patient.symptoms.map(({ startDate, comments, tag }, index) => (
                        <ListItem
                          // eslint-disable-next-line react/no-array-index-key
                          key={comments + tag + index}
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
                                {new Date(startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
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
          )}
          {/* STUDY ASSESMENT DATA */}
          {clinicalTrial && keyVariableValues
           && (
             <Box>
               <Typography
                 color="text.primary"
                 sx={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: 1,
                   my: 2,
                   typography: { xxs: 'h5', sm: 'h4' },
                 }}
               >
                 <DataThresholdingIcon fontSize="inherit" color="secondary" />
                 Study Assessment Data
               </Typography>
               {clinicalTrial.studies.map((study) => (
                 <Box
                   component="form"
                   onSubmit={handleKeyVariableSubmit}
                   key={study.name}
                   sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     '&:not(:last-child)': { mb: 6 },
                   }}
                 >
                   <Typography
                     color="text.primary"
                     variant="caption"
                     sx={{
                       display: 'flex',
                       typography: { xxs: 'h4', sm: 'h4' },
                       borderBottom: '1px solid',
                       borderColor: 'primary.main',
                     }}
                   >
                     {study.name}
                   </Typography>
                   {keyVariableValues.map((studyAssesments, studyIndex) => (
                     <>
                       {studyAssesments.map(({ name, type, value }, assesmentIndex) => {
                         if (type === 'boolean') {
                           return (
                             <Box
                               sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'flex-start',
                                 justifyContent: 'center',
                                 my: 2,
                                 gap: 2,
                               }}
                               component="li"
                               // eslint-disable-next-line react/no-array-index-key
                               key={study.name + name + assesmentIndex + studyIndex + type}
                             >
                               <Typography
                                 color="text.primary"
                                 variant="lead"
                               >
                                 {name}
                                 :
                               </Typography>
                               <Select
                                 size="small"
                                 value={value}
                                 onChange={(e) => {
                                   const aux = [...keyVariableValues];
                                   aux[studyIndex][assesmentIndex].value = e.target.value;
                                   setKeyVariableValues(aux);
                                 }}
                               >
                                 <MenuItem value="" disabled dense>
                                   Select an option
                                 </MenuItem>
                                 <MenuItem value="true" dense>Yes</MenuItem>
                                 <MenuItem value="false" dense>No</MenuItem>
                               </Select>
                             </Box>
                           );
                         }
                         if (type === 'threshold') {
                           return (
                             <Box
                               component="li"
                               sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'flex-start',
                                 justifyContent: 'center',
                                 my: 2,
                                 gap: 2,
                               }}
                               // eslint-disable-next-line react/no-array-index-key
                               key={study.name + name + assesmentIndex + studyIndex + type}
                             >
                               <Typography
                                 color="text.primary"
                                 variant="lead"
                               >
                                 {name}
                                 :
                               </Typography>
                               {
                                 <Select
                                   value={value}
                                   size="small"
                                   onChange={(e) => {
                                     // change the value of the measurement
                                     const aux = [...keyVariableValues];
                                     aux[studyIndex][assesmentIndex].value = e.target.value;
                                     setKeyVariableValues(aux);
                                   }}
                                 >
                                   <MenuItem value="" disabled dense>
                                     Select an option
                                   </MenuItem>
                                   {[...Array(10)].map((_, index) => (
                                     <MenuItem
                                       dense
                                       key={`threshold + ${name}`}
                                       value={index + 1}
                                     >
                                       {index + 1}
                                     </MenuItem>
                                   ))}
                                 </Select>
                               }
                             </Box>
                           );
                         }
                         if (type === 'text') {
                           return (
                             <Box
                               component="li"
                               sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'flex-start',
                                 justifyContent: 'center',
                                 my: 2,
                                 gap: 2,
                               }}
                               // eslint-disable-next-line react/no-array-index-key
                               key={study.name + name + assesmentIndex + studyIndex + type}
                             >
                               <Typography
                                 color="text.primary"
                                 variant="lead"
                               >
                                 {name}
                                 :
                               </Typography>
                               <TextField
                                 type="text"
                                 value={value}
                                 onChange={(e) => {
                                   const aux = [...keyVariableValues];
                                   aux[studyIndex][assesmentIndex].value = e.target.value;
                                   setKeyVariableValues(aux);
                                 }}
                                 size="small"
                                 sx={{ width: '100%' }}
                               />
                             </Box>
                           );
                         }
                         if (type === 'number') {
                           return (
                             <Box
                               component="li"
                               sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'flex-start',
                                 justifyContent: 'center',
                                 my: 2,
                                 gap: 2,
                               }}
                               // eslint-disable-next-line react/no-array-index-key
                               key={study.name + name + assesmentIndex + studyIndex + type}
                             >
                               <Typography
                                 color="text.primary"
                                 variant="lead"
                               >
                                 {name}
                                 :
                               </Typography>
                               {
                                 <TextField
                                   type="number"
                                   value={value}
                                   size="small"
                                   sx={{ width: '100%' }}
                                   onChange={(e) => {
                                     // change the value of the measurement
                                     const aux = [...keyVariableValues];
                                     aux[studyIndex][assesmentIndex].value = e.target.value;
                                     setKeyVariableValues(aux);
                                   }}
                                 />
                                }
                             </Box>
                           );
                         }
                         return null;
                       })}
                     </>
                   ))}
                   <Button
                     type="submit"
                     variant="outlined"
                     color="primary"
                     size="small"
                     sx={{
                       typography: { xxs: 'captionSmall', sm: 'caption' },
                       mt: 2,
                       backgroundColor: 'transparent',
                       justifySelf: 'flex-end',
                     }}
                   >
                     Submit Assessment for
                     {' '}
                     {study.name}
                   </Button>
                 </Box>
               ))}
             </Box>
           )}
        </Box>
      )}
    </Container>
  );
};

export default PatientDetailedView;
