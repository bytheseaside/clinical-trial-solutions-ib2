import React from 'react';

import { SxProps, Theme } from '@mui/material/styles';

import Container from 'shared/layout/Container';

type Props = {
  sx?: SxProps<Theme>;
};

const PatientPage: React.FC<Props> = ({ sx }) => {
  console.log('patient');
  return <Container>Patient page here:</Container>;
};
