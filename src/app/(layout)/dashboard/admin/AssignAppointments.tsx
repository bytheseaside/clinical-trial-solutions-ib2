'use client';

import React, { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import AppointmentService from 'services/firebase/appointmentsService';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';

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

  const onSubmitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPatient) {
      // eslint-disable-next-line no-console
      console.error('No patient selected');
      return;
    }

    try {
      await AppointmentService.addAppointmentToPatient(selectedPatient.id, newAppointment);
      router.push('/dashboard/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding appointment:', error);
    }
  };

  const handleClear = () => {
    setSelectedPatient(null);
    router.push('/dashboard/admin', { scroll: false });
  };

  useEffect(() => {
    const fetchClinicalTrial = async () => {
      if (selectedPatient) {
        try {
          const clinicalTrialId = selectedPatient.trialId;
          // eslint-disable-next-line max-len
          const foundClinicalTrial = await ClinicalTrialService.getClinicalTrialById(clinicalTrialId);
          setPatientTrial(foundClinicalTrial);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching clinical trial:', error);
        }
      }
    };

    fetchClinicalTrial();
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
          clearIcon={<ClearIcon onClick={handleClear} />}
          size="small"
          value={selectedPatient}
          onChange={(event, choosenPatient) => {
            setSelectedPatient(choosenPatient);
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
              referenceDate={dayjs()}
              disablePast
              sx={{
                width: { xxs: '100%', sm: '35%' },
              }}
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
                if (e.target.value === 'Extra appointment') {
                  setNewAppointment((prevAppointment) => ({
                    ...prevAppointment,
                    study: {
                      name: 'Extra appointment',
                      keyVariables: [], // set it empty because there is no reason to set it
                    },
                  }));
                } else {
                  const matchingStudy = patientTrial.studies.find(
                    (s) => s.name === e.target.value,
                  );
                  setNewAppointment((prevAppointment) => ({
                    ...prevAppointment,
                    study: matchingStudy as ClinicalStudy,
                  }));
                }
              }}
            >
              <MenuItem disabled value="" dense>Select a study</MenuItem>
              {Array.isArray(patientTrial.studies) && patientTrial.studies.map((study) => (
                <MenuItem key={study.name} value={study.name} dense>
                  {study.name}
                </MenuItem>
              ))}
              <MenuItem value="Extra appointment" dense>
                Extra appointment
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
