'use client';

import React, { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

import { Appointment, ClinicalStudy, ClinicalTrial, Patient } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  patientList: Patient[];
  sx?: SxProps<Theme>;
};

const BASE_APPOINTMENT = {
  date: new Date(),
  study: {
    name: '',
    keyVariables: [],
  },
};

const AssignAppointments: React.FC<Props> = ({ patientList, sx = [] }) => {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newAppointment, setNewAppointment] = useState<Appointment>(BASE_APPOINTMENT);
  const [patientTrial, setPatientTrial] = useState<ClinicalTrial | null>(null);

  const onSubmitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // on submit, check if theres a new appointment complete and valid
    // TODO: add new appointment to patient in DB
    console.log('New appointment:', newAppointment);
  };

  const handleClear = () => {
    setSelectedPatient(null);
    router.push('/dashboard/admin', { scroll: false });
  };

  useEffect(() => {
    // TODO call to get clinical trial after patient is selected
    const foundClinicalTrial: ClinicalTrial = {
      id: 'trial1',
      name: 'Trial 1',
      studies: [
        {
          name: 'Study A1',
          keyVariables: [
            { name: 'Variable 1', type: 'boolean' },
            { name: 'Variable 2', type: 'number' },
          ],
        },
        {
          name: 'Study B1',
          keyVariables: [
            { name: 'Variable 3', type: 'text' },
            { name: 'Variable 4', type: 'threshold' },
          ],
        },
      ],
      signUpCodes: {
        medicalStaff: 'MS-TR1-001',
        analist: 'AN-TR1-001',
        patient: 'PT-TR1-001',
      },
    }; // TODO replace with actual call to DB
    setPatientTrial(foundClinicalTrial);
  }, [selectedPatient]);

  return (
    <Container
      sx={[
        {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        color="text.primary"
        component="h2"
        sx={{ typography: { xxs: 'h4', sm: 'h3' }, mb: 2 }}
      >
        Assign appointments
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Schedule appointments for patients.
      </Typography>
      <Box>
        {/* select patient */}
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
          clearIcon={(
            <IconButton onClick={handleClear} color="inherit">
              <ClearIcon />
            </IconButton>
        )}
          size="small"
          value={selectedPatient}
          onChange={(event, choosenPatient) => {
            setSelectedPatient(choosenPatient);
            if (choosenPatient) {
              const { id } = choosenPatient;
              const params = new URLSearchParams();
              params.set('patient', id);
              router.push(`/dashboard/admin?${params.toString()}`, { scroll: false });
            } else {
              router.push('/dashboard/admin', { scroll: false });
            }
          }}
          fullWidth
        />
        {/* add appointment inputs */}
        {selectedPatient && patientTrial && (
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            sx={{
              display: 'flex',
              flexDirection: { xxs: 'column', sm: 'row' },
              gap: { xxs: 5, sm: 3 },
            }}
          >
            <DateTimePicker
              label="Date and time"
              value={dayjs(newAppointment.date)}
              onChange={(newDate: Dayjs | null) => {
                if (!newDate) return;
                setNewAppointment((prevAppointment) => ({
                  ...prevAppointment,
                  date: newDate.toDate(),
                }));
              }}
              // eslint-disable-next-line max-len
              referenceDate={dayjs().add(1, 'day')} // only allow appointments starting from tomorrow
            />
            <TextField
              select
              fullWidth
              label="Study for the appointment"
              id="studyforappointment"
              variant="outlined"
              required
              value={newAppointment.study.name}
              onChange={(e) => {
                if (e.target.value === 'extraAppointment') {
                  setNewAppointment((prevAppointment) => ({
                    ...prevAppointment,
                    study: {
                      name: 'Extra appointment',
                      keyVariables: [], // set it empty because there is no reason to set it
                    },
                  }));
                  return;
                }

                const matchingStudy = patientTrial.studies.find(
                  (s) => s.name === e.target.value,
                );

                setNewAppointment((prevAppointment) => ({
                  ...prevAppointment,
                  study: matchingStudy as ClinicalStudy,
                }));
              }}
            >
              <MenuItem disabled value="" dense>Select a study</MenuItem>
              {Array.isArray(patientTrial.studies) && patientTrial.studies.map((study) => (
                <MenuItem key={study.name} value={study.name} dense>
                  {study.name}
                </MenuItem>
              ))}
              <MenuItem value="extraAppointment" dense>
                Extra appointment.
              </MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="text"
              color="primary"
              sx={{
                mt: { xxs: 2, sm: 0 },
                backgroundColor: 'transparent',
                border: 'none',
                alignSelf: 'center',
                '&:focus': {
                  textDecoration: 'underline',
                },
              }}
            >
              Add appointment
            </Button>
          </Box>
        )}
        {/* show patient's appointments */}
        <Box>
          {selectedPatient && (
            <Box
              component="ol"
              sx={{
                listStyle: 'none',
              }}
            >
              {Array.isArray(selectedPatient?.appointments)
                && selectedPatient.appointments.length > 0
                ? selectedPatient.appointments.map(
                  (appointment: Appointment, appointmentIndex) => (
                    <Box
                      component="li"
                      // eslint-disable-next-line react/no-array-index-key
                      key={`appointment${appointmentIndex}`}
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                        }}
                      >
                        <LabelImportantIcon fontSize="inherit" color="secondary" />
                        {new Date(appointment.date).toLocaleString('es-AR')}
                        {` - ${appointment.study.name}`}
                      </Typography>
                    </Box>
                  ),
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <LabelImportantIcon fontSize="inherit" color="secondary" />
                    No appointments scheduled yet.
                  </Typography>
                )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AssignAppointments;
