'use client';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PatientService from 'services/firebase/patientService';

import Container from 'shared/layout/Container';

type Props = {
  symptoms: string[];
  userId: string;
  sx?: SxProps<Theme>;
};

const ReportSymptom: React.FC<Props> = ({ symptoms, userId, sx = [] }) => {
  const [tag, setTag] = useState('');
  const [startDate, setStartDate] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { tag, startDate, comments };
    await PatientService.updatePatientSymptoms(userId, formData);
    setTag('');
    setStartDate('');
    setComments('');
  };

  return (
    <Container
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        color="text.primary"
        sx={{
          typography: { xxs: 'h4', sm: 'h3' },
          mb: 3,
        }}
      >
        Report new symptom
      </Typography>
      <Typography variant="caption" color="text.secondary">
        If you have any symptoms, please fill out this form.
        It&apos;s important to include the start date.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          margin: '1rem auto',
          mt: 2,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ my: 1 }}
          id="tag"
          label="Symptom"
          variant="outlined"
          required
          fullWidth
          select
          value={tag}
          size="small"
          onChange={(e) => setTag(e.target.value)}
        >
          <MenuItem value="" disabled dense>
            Select a category
          </MenuItem>
          {symptoms.map((symptom) => (
            <MenuItem
              key={symptom}
              value={symptom}
              dense
            >
              {symptom}
            </MenuItem>
          ))}
          <MenuItem
            value="other"
            dense
          >
            Other
          </MenuItem>
        </TextField>
        <TextField
          sx={{ my: 1 }}
          size="small"
          id="startDate"
          variant="outlined"
          type="date"
          required
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          sx={{ my: 1 }}
          id="comments"
          size="small"
          label="Comments"
          variant="outlined"
          multiline
          fullWidth
          rows={3}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            typography: { xxs: 'captionSmall', sm: 'caption' },
            mt: 2,
            alignSelf: 'end',
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ReportSymptom;
