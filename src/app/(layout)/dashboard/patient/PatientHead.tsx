'use client';

import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BrandLogo from 'shared/layout/BrandLogo';
import Container from 'shared/layout/Container';

type Props = {
  name: string;
  trialName: string;
  sx?: SxProps<Theme>;
};

const PatientHead: React.FC<Props> = ({ name, trialName, sx = [] }) => (
  <Container
    component="header"
    sx={[
      {
        py: 4,
        top: 0,
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        textAlign: 'left',
      }}
    >
      <BrandLogo />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '5px',
        }}
      >
        <Typography
          sx={{
            typography: { xxs: 'hSmall', sm: 'hMid' },
            textTransform: 'uppercase',
          }}
          component="h2"
        >
          {name}
        </Typography>
        <Typography color="text.secondary" variant="captionSmall">
          Trial:
          {' '}
          {trialName}
        </Typography>
      </Box>
    </Box>
    <Button variant="contained" color="secondary" href="/api/auth/logout">
      <LogoutIcon sx={{ color: 'common.white' }} />
    </Button>
  </Container>
);

export default PatientHead;
