'use client';

import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ClinicalTrial } from 'shared/api';
import BrandLogo from 'shared/layout/BrandLogo';
import Container from 'shared/layout/Container';

type Props = {
  trials: ClinicalTrial[];
  sx?: SxProps<Theme>;
};

const TrialsList: React.FC<Props> = ({ trials, sx = [] }) => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      ...(Array.isArray(sx) ? sx : [sx]),
    }}
  >
    <Typography
      color="text.primary"
      sx={{
        typography: { xxs: 'h4', sm: 'h3' },
        mb: 3,
      }}
    >
      Existent Clinical Trials
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
      See the list of clinical trials that are currently active and their respective
      sign up codes to give.
    </Typography>
  </Container>
);

export default TrialsList;
