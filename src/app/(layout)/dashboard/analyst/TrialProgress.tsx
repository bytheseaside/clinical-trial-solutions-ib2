'use client';

import React, { useMemo } from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import { ClinicalTrial, Patient } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  patientList: Patient[];
  trial: ClinicalTrial;
};

const TrialProgress: React.FC<Props> = ({ patientList, trial }) => {
  const completedPercentage = useMemo(() => {
    if (!patientList.length || !trial.studies.length) return 0;

    const totalStudies = trial.studies.length;
    const totalPatients = patientList.length;
    let completedStudiesCount = 0;

    patientList.forEach((patient) => {
      if (patient.assessments) {
        trial.studies.forEach((study, index) => {
          if (
            patient?.assessments
            && patient?.assessments[index]
            && Object.keys(patient?.assessments[index]).length > 0
          ) {
            completedStudiesCount += 1;
          }
        });
      }
    });

    return (completedStudiesCount / (totalStudies * totalPatients)) * 100;
  }, [patientList, trial]);

  return (
    <Container>
      <Typography
        color="text.primary"
        sx={{
          typography: { xxs: 'h4' },
          mb: 3,
        }}
      >
        {trial.name}
        {' '}
        Progress
      </Typography>
      <LinearProgress variant="determinate" value={completedPercentage} />
      <Typography
        sx={{
          mt: 1,
          textAlign: 'end',
        }}
        variant="body2"
        color="text.secondary"
      >
        {`${Math.round(completedPercentage)}% completed`}
      </Typography>
    </Container>
  );
};

export default TrialProgress;
